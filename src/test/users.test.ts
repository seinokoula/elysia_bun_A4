import request from 'supertest';
import { Elysia } from 'elysia';
import { usersController } from '../controllers/users';

// This file contains tests for the users controller

// Test creating a new user
describe('Users Controller', () => {
  it('should create a new user', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'testpassword',
      });

    // Ensure that the response status is 201
    expect(response.status).toBe(201);
    // Ensure that the username is correct
    expect(response.body.username).toBe('testuser');
    // Ensure that the email is correct
    expect(response.body.email).toBe('testuser@example.com');
    // Ensure that the password is defined
    expect(response.body.password).toBeDefined();
  });

  // Test retrieving all users
  it('should retrieve all users', async () => {
    const response = await request(app).get('/users');

    // Ensure that the response status is 200
    expect(response.status).toBe(200);
    // Ensure that the response body has at least one user
    expect(response.body.length).toBeGreaterThan(0);
  });

  // Test retrieving a single user
  it('should retrieve a single user', async () => {
    const usersResponse = await request(app).get('/users');
    const userId = usersResponse.body[0]._id;

    const response = await request(app).get(`/users/${userId}`);

    // Ensure that the response status is 200
    expect(response.status).toBe(200);
    // Ensure that the user ID is correct
    expect(response.body._id).toBe(userId);
  });

  // Test updating a user
  it('should update a user', async () => {
    const usersResponse = await request(app).get('/users');
    const userId = usersResponse.body[0]._id;

    const response = await request(app)
      .patch(`/users/${userId}`)
      .send({
        username: 'updateduser',
      });

    // Ensure that the response status is 200
    expect(response.status).toBe(200);
    // Ensure that the username is updated
    expect(response.body.username).toBe('updateduser');
  });

  // Test deleting a user
  it('should delete a user', async () => {
    const usersResponse = await request(app).get('/users');
    const userId = usersResponse.body[0]._id;

    const response = await request(app).delete(`/users/${userId}`);

    // Ensure that the response status is 200
    expect(response.status).toBe(200);
    // Ensure that the response message is correct
    expect(response.body.message).toBe('Resource deleted successfully!');
  });
});