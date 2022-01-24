import request from 'supertest';
import { app } from '../../app';

const { signin, validEmail } = global;

it('must return current user credentials', async () => {
  let cookie = await signin();

  let response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send({})
    .expect(200);

  expect(response.body.currentUser.email).toEqual(validEmail);
});

it('current user must be null without authorization cookie', async () => {
  let response = await request(app)
    .get('/api/users/currentuser')
    .send({})
    .expect(200);

  expect(response.body.currentUser).toBeNull();
});
