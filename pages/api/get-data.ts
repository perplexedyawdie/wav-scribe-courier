import { NextApiRequest, NextApiResponse } from 'next';
import { dbConnection } from '@/config/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {


    try {
        const db = dbConnection();
        const fileId = req.body.id;
        const queryResult: any = await db.query('CALL get_transcription(?)', [fileId])
        res.status(200).send({ queryResult: queryResult[0][0][0]?.scribe_data ?? null })

    } catch (error) {
        console.error(error)
        res.status(400).send({ message: 'Bad Request' })
    }



}