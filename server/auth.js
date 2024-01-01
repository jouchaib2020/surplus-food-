const userDao = require('./controllers/dao-users');
module.exports = {
    verify: async (username, password, callback) => {
            const user = await userDao.getUser(username, password)
            if(!user)
              return callback(null, false, 'Incorrect username or password');  
              
            return callback(null, user); // NOTE: user info in the session (all fields returned by userDao.getUser, i.e, id, username, name)
          },
    // Defining authentication verification middleware
    isLoggedIn: (req, res, next) => {
            if(req.isAuthenticated()) {
              return next();
            }
            return res.status(401).json({error: 'Not authorized'});
          }
}

