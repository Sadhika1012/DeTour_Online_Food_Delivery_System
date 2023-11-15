const request = require('supertest');
const express = require('express');
const app = express();
app.use(express.json());

const foodRouter = require('../routes/foods'); // Assuming your route file is named foods.js
app.use('/foods', foodRouter); // Assuming your route URL is '/foods'

const Food = require('../models/Food');

jest.mock('../models/Food', () => ({
  find: jest.fn(),
}));

describe('Food Route', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should get food items', async () => {
    const mockFoodItems = [
      { _id: '1', name: 'Food1' },
      { _id: '2', name: 'Food2' },
    ];

    Food.find.mockResolvedValue(mockFoodItems);

    const response = await request(app).get('/foods/food'); // Adjust the route URL based on your implementation

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockFoodItems);
    expect(Food.find).toHaveBeenCalled();
  });

  it('should handle server error when getting food items', async () => {
    Food.find.mockRejectedValue(new Error('Mock error'));

    const response = await request(app).get('/foods/food'); // Adjust the route URL based on your implementation

    expect(response.status).toBe(500);
    expect(response.text).toBe('Internal Server Error');
    expect(Food.find).toHaveBeenCalled();
  });

  // Clean up mocks after all tests
  afterAll(() => {
    jest.restoreAllMocks();
  });
});
