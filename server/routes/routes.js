const router = require('express').Router();
const authRouter = require('./auth-router');

const { errorFormatter } = require('../utils');
const {isLoggedIn} = require('../auth');

router.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

router.use('/auth', authRouter);


exports.router = router;