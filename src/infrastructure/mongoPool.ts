import { MongoClient, MongoClientOptions, Db } from "mongodb";

const connOptions: MongoClientOptions = {
    useUnifiedTopology: true,
    numberOfRetries: 5,
    poolSize: 10,
    connectTimeoutMS: 500
};

interface IDatabaseEntry {
    [key: string]: Db;
}

const db: IDatabaseEntry = {};

function MongoPool() { }

async function initPool(
    databaseName: string,
    callback?: (cb: Db) => void
): Promise<Function> {
    const client = await MongoClient.connect('mongodb://localhost:27017', connOptions);
    db[databaseName] = client.db(databaseName);
    if (callback) {
        callback(db[databaseName]);
    }
    return MongoPool;
}
MongoPool.initPool = initPool;

async function getInstance(
    databaseName: string = 'mongodb://localhost:27017',
    callback?: (cb: Db) => void
): Promise<Db> {
    if (!db[databaseName]) {
        await initPool(databaseName, callback);
    } else {
        // eslint-disable-next-line no-lonely-if
        if (callback) {
            callback(db[databaseName]);
        }
    }
    return db[databaseName];
}
MongoPool.getInstance = getInstance;

export default MongoPool;