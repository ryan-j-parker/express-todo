const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');
const Item = require('../lib/models/Item');

const mockUser = {
  email: 'email@sweet.net',
  password: 'secret5038',
  firstName: 'bingowuz',
  lastName: 'hisnamo',
};

const mockItem = {
  description: 'go to the gym',
  urgency: 5,
  completed: false,
};

const registerAndLogin = async (userProps = {}) => {
  const password = userProps.password ?? mockUser.password;

  // Create an "agent" that gives us the ability
  // to store cookies between requests in a test
  const agent = request.agent(app);

  // Create a user to sign in with
  const user = await UserService.create({ ...mockUser, ...userProps });

  // ...then sign in
  const { email } = user;
  await agent.post('/api/v1/users/sessions').send({ email, password });
  return [agent, user];
};

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

  it('POST /api/v1/items should add a new item', async () => {
    const [agent, user] = await registerAndLogin();

    const res = await agent.post('/api/v1/items').send(mockItem);
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      description: mockItem.description,
      urgency: mockItem.urgency,
      completed: mockItem.completed,
      user_id: user.id,
    });
  });
});
