const request = require('supertest');
const express = require('express');
const app = express();
app.use(express.json());

const bcrypt = require('bcrypt'); // Add this line
const jwt=require('jsonwebtoken');
const User = require('../models/User'); // Add this line

const usersRouter = require('../routes/users');
app.use('/api/users', usersRouter);

jest.mock('../models/User', () => ({
  findOne: jest.fn(),
  create: jest.fn(),
}));

jest.mock('bcrypt', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(() => 'mockToken'),
}));

describe('Users Route', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should register a new user', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      reEnterPassword: 'password123',
    };

    const hashedPassword = 'hashedPassword';
    bcrypt.hash.mockResolvedValue(hashedPassword);
    User.findOne.mockResolvedValue(null);
    User.create.mockResolvedValue({ _id: 'mockUserId', ...userData });

    const response = await request(app)
      .post('/api/users/register')
      .send(userData);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      message: 'User registered successfully',
      user: { _id: 'mockUserId', ...userData },
    });
    expect(User.findOne).toHaveBeenCalledWith({ email: userData.email });
    expect(User.create).toHaveBeenCalledWith({
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
    });
  });

  it('should handle registration error', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      reEnterPassword: 'password123',
    };

    User.findOne.mockRejectedValue(new Error('Mock error'));

    const response = await request(app)
      .post('/api/users/register')
      .send(userData);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      message: 'Error registering user',
      error: 'Mock error',
    });
  });

  

  afterAll(() => {
    jest.restoreAllMocks();
  });
});
describe('Login Route', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('should log in an existing user', async () => {
      const userData = {
        email: 'john@example.com',
        password: 'password123',
      };
  
      const mockedUser = {
        _id: 'mockUserId',
        name: 'John Doe',
        email: userData.email,
        password: await bcrypt.hash('password123', 10),
      };
  
      User.findOne.mockResolvedValue(mockedUser);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue('mockToken');
  
      const response = await request(app)
        .post('/api/users/login')
        .send(userData);
  
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token', 'mockToken');
      expect(User.findOne).toHaveBeenCalledWith({ email: userData.email });
      expect(bcrypt.compare).toHaveBeenCalledWith(userData.password, mockedUser.password);
      expect(jwt.sign).toHaveBeenCalledWith({ userId: mockedUser._id }, 'secret_key');
    });
  
    it('should handle login for non-existing user', async () => {
      const userData = {
        email: 'nonexistent@example.com',
        password: 'password123',
      };
  
      User.findOne.mockResolvedValue(null);
  
      const response = await request(app)
        .post('/api/users/login')
        .send(userData);
  
      expect(response.status).toBe(401);
      expect(response.body).toEqual({ message: 'Wrong username or password' });
      expect(User.findOne).toHaveBeenCalledWith({ email: userData.email });
      expect(bcrypt.compare).not.toHaveBeenCalled();
      expect(jwt.sign).not.toHaveBeenCalled();
    });
  
    it('should handle incorrect password', async () => {
      const userData = {
        email: 'john@example.com',
        password: 'incorrectPassword',
      };
  
      const mockedUser = {
        _id: 'mockUserId',
        name: 'John Doe',
        email: userData.email,
        password: await bcrypt.hash('password123', 10),
      };
  
      User.findOne.mockResolvedValue(mockedUser);
      bcrypt.compare.mockResolvedValue(false);
  
      const response = await request(app)
        .post('/api/users/login')
        .send(userData);
  
      expect(response.status).toBe(401);
      expect(response.body).toEqual({ message: 'Wrong username or password' });
      expect(User.findOne).toHaveBeenCalledWith({ email: userData.email });
      expect(bcrypt.compare).toHaveBeenCalledWith(userData.password, mockedUser.password);
      expect(jwt.sign).not.toHaveBeenCalled();
    });
  
    it('should handle login error', async () => {
      const userData = {
        email: 'john@example.com',
        password: 'password123',
      };
  
      User.findOne.mockRejectedValue(new Error('Mock error'));
  
      const response = await request(app)
        .post('/api/users/login')
        .send(userData);
  
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: 'Error logging in', error: 'Mock error' });
    });
  
    afterAll(() => {
      jest.restoreAllMocks();
    });
  });
  