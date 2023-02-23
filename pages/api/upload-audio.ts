import { NextApiRequest, NextApiResponse } from 'next';
import formidable, { File } from 'formidable'
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import fs from 'fs'
import { v4 as uuidv4 } from 'uuid';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import ampq from 'amqplib'
import dbObj from '@/libs/mongo';
import { Collection } from 'mongodb';

const form = formidable({ multiples: false })

const isFile = (file: File | File[]): file is File => !Array.isArray(file) && file?.filepath !== undefined


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' })
    }

    try {
        const { dbProm } = dbObj;
      
        const s3Client = new S3Client({ 
            region: process.env.LINODE_REGION,
            endpoint: process.env.LINODE_ENDPOINT,

         });
         const queue = 'tasks'
         const conn = await ampq.connect(process.env.RABBIT_CONNECTION_STRING!)
         const ch1 = await conn.createChannel();
         await ch1.assertQueue(queue);
        let fileId = uuidv4();
        const fileContent: {
            buff: Buffer,
            data: formidable.FileJSON,
            userEmail: string
        } = await (new Promise((resolve, reject) => {
            form.parse(req, (err, _fields, files) => {
                if (isFile(files.file)) {
                    const fileContentBuffer = fs.readFileSync(files.file.filepath)
                    // console.log(_fields)
                    // console.log(files.file.toJSON())
                    resolve({
                        buff: fileContentBuffer,
                        data: files.file.toJSON(),
                        userEmail: _fields.userEmail as string
                    })
                }
                reject(err)
            })
        }))
        const resp = await s3Client.send(new PutObjectCommand({
            Key: fileId,
            Bucket: process.env.LINODE_BUCKET,
            Body: fileContent.buff,
            ContentType: fileContent.data.mimetype!
        }))
     
        const command = new GetObjectCommand({
            Key: fileId,
            Bucket: process.env.LINODE_BUCKET,
        });
        const url = await getSignedUrl(s3Client, command, { expiresIn: 86400 });
        const queueMsg = {
            id: fileId,
            url,
            userEmail: fileContent.userEmail
        }
        ch1.sendToQueue(queue, Buffer.from(JSON.stringify(queueMsg)));

        const transcriptCollection: Collection = (await dbProm).collection('transcript');
        const { insertedId } = await transcriptCollection.insertOne({ fileId, userEmail: fileContent.userEmail });
        res.status(200).send({ message: fileId })
    } catch (err) {
        console.error(err)
        res.status(400).send({ message: 'Bad Request' })
    }
}

export const config = {
    api: {
        bodyParser: false
    },
}
