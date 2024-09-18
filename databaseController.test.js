const { registerUser } = require('./backend/controllers/databaseController');
const { User } = require('./backend/models/userModel');
const jwt = require('jsonwebtoken');

// Mocking dependencies
jest.mock('./backend/models/userModel');
jest.mock('jsonwebtoken');

describe('databaseController.registerUser', () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: {}, cookies: {} };
    res = { locals: { username: 'testuser', accessToken: 'access', refreshToken: 'refresh' } };
    next = jest.fn();
  });

  test('should update user profile when user already exists', async () => {
    jwt.verify
      .mockReturnValueOnce({ username: 'testuser' })
      .mockReturnValueOnce({ accessToken: 'access' })
      .mockReturnValueOnce({ refreshToken: 'refresh' });

    User.findOne.mockResolvedValue({ username: 'testuser' });

    await registerUser(req, res, next);

    expect(User.findOneAndUpdate).toHaveBeenCalledWith(
      { username: 'testuser' },
      { refresh_token: 'refresh' },
      { new: true },
    );
    expect(next).toHaveBeenCalled();
  });
});
