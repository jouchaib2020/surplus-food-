const router = require('express').Router();
const passport = require('passport');

// POST /auth/sessions 
// This route is used for performing login.
router.post('/auth/sessions', function(req, res, next) {
    passport.authenticate('local', (err, user, info) => { 
      if (err)
        return next(err);
        if (!user) {
          // display wrong login messages
          return res.status(401).json({ error: info});
        }
        // success, perform the login and extablish a login session
        req.login(user, (err) => {
          if (err)
            return next(err);
          
          // req.user contains the authenticated user, we send all the user info back
          // this is coming from userDao.getUser() in LocalStratecy Verify Fn
          return res.json(req.user);
        });
    })(req, res, next);
  });
  
  // GET /auth/sessions/current
  // This route checks whether the user is logged in or not.
  router.get('/auth/sessions/current', (req, res) => {
    if(req.isAuthenticated()) {
      res.status(200).json(req.user);}
    else
      res.status(401).json({error: 'Not authenticated'});
  });
  
  // DELETE /auth/session/current
  // This route is used for loggin out the current user.
  router.delete('/auth/sessions/current', (req, res) => {
    req.logout(() => {
      res.status(200).json({});
    });
  });

module.exports = router;