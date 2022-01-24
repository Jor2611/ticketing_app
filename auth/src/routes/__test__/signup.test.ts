import request from 'supertest';
import { app } from '../../app';

const { validEmail, validPassword } = global;

it('should return 201 status code for successful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: validEmail,
      password: validPassword,
    })
    .expect(201);
});

it('should return 400 status code for invalid email supply', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'teasdsadsadasd',
      password: validPassword,
    })
    .expect(400);
});

it('should return 400 status code for invalid password supply', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: validEmail,
      password: 'p',
    })
    .expect(400);
});

it('should return 400 status code without email and password fields', async () => {
  return request(app).post('/api/users/signup').send({}).expect(400);
});

it("shouldn't allow  email duplicates", async () => {
  await request(app).post('/api/users/signup').send({
    email: validEmail,
    password: validPassword,
  });
  expect(201);

  await request(app).post('/api/users/signup').send({
    email: validEmail,
    password: validPassword,
  });
  expect(400);
});
