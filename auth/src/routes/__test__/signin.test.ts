import request from 'supertest';
import { app } from '../../app';

const { validEmail, validPassword } = global;

it('fails when not existing email supplied', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: validEmail,
      password: validPassword,
    })
    .expect(400);
});

it('fails when incorrect password supplied', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: validEmail,
      password: validPassword,
    })
    .expect(201);

  await request(app)
    .post('/api/users/signin')
    .send({
      email: validEmail,
      password: 'pd',
    })
    .expect(400);
});

it('should respond with cookie after successfully sigin', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: validEmail,
      password: validPassword,
    })
    .expect(201);

  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: validEmail,
      password: validPassword,
    })
    .expect(200);

  let cookie = response.get('Set-Cookie');
  expect(cookie).toBeDefined();
});
