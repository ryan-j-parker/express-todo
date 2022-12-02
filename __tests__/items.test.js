const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');
const Item = require('../lib/models/Item');

describe('items', () => {
  beforeEach(() => {
    return setup(pool);
  });
  afterAll(() => {
    pool.end();
  });

  it('GET /api/v1/items should retrieve a list of items', async () => {
    const res = await request(app).get('/api/v1/items');
    expect(res.status).toBe(200);
  });
});
