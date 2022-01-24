import request from 'supertest';
import { app } from '../../app';

const { validEmail, validPassword } = global;

it('should clean cookies after signout', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: validEmail,
      password: validPassword,
    })
    .expect(201);

  const response = await request(app)
    .post('/api/users/signout')
    .send({})
    .expect(200);

  const cookie = response.get('Set-Cookie');

  expect(cookie[0]).toEqual(
    'express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
  );
});
