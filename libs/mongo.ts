import { Db, MongoClient, MongoClientOptions } from 'mongodb'

if (!process.env.MONGO_URI) {
    throw new Error('Please add your Mongo URI to .env.local')
}

if (!process.env.MONGO_DB_NAME) {
    throw new Error('Please add your Mongo DB Name to .env.local')
}

let dbProm: Promise<Db>;
let clientProm: Promise<MongoClient>;
const opts: MongoClientOptions = {
    tls: true,
    authSource: process.env.MONGO_DB_NAME,
    authMechanism : 'DEFAULT'
};

if (process.env.NODE_ENV === 'production') {
    clientProm = (new MongoClient(process.env.MONGO_URI)).connect()
        .catch(err => {
            throw new Error(JSON.stringify(err));
        });
    dbProm = clientProm
        .then(client => client.db(process.env.MONGO_DB_NAME))
        .catch(err => {
            throw new Error(JSON.stringify(err));
        })
} else {
    let globalWithDb = global as typeof globalThis & {
        dbProm: Promise<Db>;
        clientProm: Promise<MongoClient>;
    };

    if (!globalWithDb.dbProm) {
        globalWithDb.clientProm = (new MongoClient(process.env.MONGO_URI)).connect()
            .catch(err => {
                throw new Error(JSON.stringify(err));
            });
        globalWithDb.dbProm = globalWithDb.clientProm
            .then(client => client.db(process.env.MONGO_DB_NAME))
            .catch(err => {
                throw new Error(JSON.stringify(err));
            });
    }
    dbProm = globalWithDb.dbProm;
    clientProm = globalWithDb.clientProm
}
const dbObj = {
    dbProm,
    clientProm
};

export default dbObj;