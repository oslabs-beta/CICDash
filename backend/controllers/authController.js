const createJWT = require('../utils/JWT');

const authController = {};

authControllers.verifyToken = (req, res, next) => {
  try {
    let token = req.cookies.accessToken;
    console.log('>>> token in authControllers.verifyToken: ', token);

    // if there is no tolen for current user
    if (!token) {
      const notoken = {
        log: 'Express error handler caught authControllers.verifyToken error',
        status: 400,
        message: { err: 'No Token Found' },
      };
      return next(notoken);
    }

    // if there is token then verify its token
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          res.locals.correctUser = false;
          return res.redirect('/');
        } else {
          return next('Error in authControllers.verifyToken jwt.verify: ' + JSON.stringify(err));
        }
      }

      console.log('decoded content in jwt.verify: ', decoded);

      const currentUser = await User.findOne({ _id: decoded.userID });
      if (currentUser) {
        res.locals.user = currentUser;
        console.log('>>> current user: ', res.locals.user);
      } else {
        return next('User not found in the db.');
      }

      req.userID = decoded.id;
      res.locals.correctUser = true;
      return next();
    });
  } catch (err) {
    return next('Error in authControllers.verifyToken: ' + JSON.stringify(err));
  }
};
