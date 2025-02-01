import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('請在環境變數中設定 MONGODB_URI');
}

const uri = process.env.MONGODB_URI;
const options = {
  ssl: true,
  tls: true,
  tlsAllowInvalidCertificates: false,
  tlsAllowInvalidHostnames: false,
  directConnection: false,
  retryWrites: true,
  maxPoolSize: 10,
  minPoolSize: 1,
  maxIdleTimeMS: 15000,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 30000,
};

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
