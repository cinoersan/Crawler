// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

// Global Variables

export const collections: { companies?: mongoDB.Collection } = {}

// Initialize Connection

export async function connectToDatabase() {
    dotenv.config();

    console.log(process.env.DB_CONN_STRING);

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING);

    await client.connect();

    const db: mongoDB.Db = client.db(process.env.DB_NAME);

    const companyCollection: mongoDB.Collection = db.collection(process.env.COMPANY_COLLECTION_NAME);

    collections.companies = companyCollection;

    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${companyCollection.collectionName}`);
}