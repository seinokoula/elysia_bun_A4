import request from 'supertest';
import { Elysia } from 'elysia';
import { usersController } from '../controllers/users';

const app = new Elysia();

app.use(usersController);

describe('Users Controller', () => {
  it('should create a new user', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'testpassword',
      });

    expect(response.status).toBe(201);
    expect(response.body.username).toBe('testuser');
    expect(response.body.email).toBe('testuser@example.com');
    expect(response.body.password).toBeDefined();
  });

  it('should retrieve all users', async () => {
    const response = await request(app).get('/users');

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should retrieve a single user', async () => {
    const usersResponse = await request(app).get('/users');
    const userId = usersResponse.body[0]._id;

    const response = await request(app).get(`/users/${userId}`);

    expect(response.status).toBe(200);
    expect(response.body._id).toBe(userId);
  });

  it('should update a user', async () => {
    const usersResponse = await request(app).get('/users');
    const userId = usersResponse.body[0]._id;

    const response = await request(app)
      .patch(`/users/${userId}`)
      .send({
        username: 'updateduser',
      });

    expect(response.status).toBe(200);
    expect(response.body.username).toBe('updateduser');
  });

  it('should delete a user', async () => {
    const usersResponse = await request(app).get('/users');
    const userId = usersResponse.body[0]._id;

    const response = await request(app).delete(`/users/${userId}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Resource deleted successfully!');
  });
});