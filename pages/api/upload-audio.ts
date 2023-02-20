import { NextApiRequest, NextApiResponse } from 'next';
import formidable, { File } from 'formidable'
import fs from 'fs'

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
        const fileContent: Buffer = await(new Promise((resolve, reject) => {
            form.parse(req, (err, _fields, files) => {
                if (isFile(files.file)) {
                    const fileContentBuffer = fs.readFileSync(files.file.filepath)
                    // const fileContentReadable = fileContentBuffer.toString('utf8')
                    console.log(files.file.toJSON())
                    resolve(fileContentBuffer)
                }

                reject()
            })
        }))

        // Do whatever you'd like with the file, since it's already in text
        // console.log(fileContent)

        res.status(200).send({ message: 'ok' })
    } catch (err) {
        res.status(400).send({ message: 'Bad Request' })
    }
}

export const config = {
    api: {
        bodyParser: false
    },
}
