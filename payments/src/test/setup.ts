import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

declare global {
  var signin: (id?: string) => string[];
  var validEmail: string;
  var validPassword: string;
}

jest.mock('./../nats-wrapper');

process.env.STRIPE_KEY = 'sk_test_dfW5dOcGg98Mlo43GMNUvx6z';

let mongo: any;
beforeAll(async () => {
  process.env.JWT_SECRET = 'asdasdsadsadsadasda';
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();
  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = (id?: string) => {
  const token = jwt.sign(
    {
      id: id || new mongoose.Types.ObjectId().toHexString(),
      email: global.validEmail,
    },
    process.env.JWT_SECRET!
  );

  const session = { jwt: token };

  const sessionJSON = JSON.stringify(session);

  const base64 = Buffer.from(sessionJSON).toString('base64');

  return [`express:sess=${base64}`];
};

global.validEmail = 'test@test.com';
