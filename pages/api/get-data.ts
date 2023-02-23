import { NextApiRequest, NextApiResponse } from 'next';
import { dbConnection } from '@/config/db';
import dbObj from '@/libs/mongo';
import { Collection } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {


    try {
        // const db = dbConnection();
        const { dbProm } = dbObj;
        const fileId = req.body.id;
        // const queryResult: any = await db.query('CALL get_transcription(?)', [fileId])
        const transcriptCollection: Collection = (await dbProm).collection('transcript');
        const transcription = await transcriptCollection.findOne({ fileId:  "" });
        console.log(transcription)
        res.status(200).send({ queryResult: null })

    } catch (error) {
        console.error(error)
        res.status(400).send({ message: 'Bad Request' })
    }



}