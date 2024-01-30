// load necessary modules
const express = require('express');
const apiRouter = express.Router();
const jwt = require('jsonwebtoken');

const volleyball = require('volleyball');
apiRouter.use(volleyball);

// use middleware function on all incoming requests to check the reques5 header for a valid token
// set `req.user` if possible, using token sent in the request header
apiRouter.use(async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');
  
  if (!auth) { 
    next();
  } 
  else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);
    
    try {
      const parsedToken = jwt.verify(token, JWT_SECRET);
      const id = parsedToken && parsedToken.id
      if (id) {
        req.user = await getUserById(id);
        next();
      }
    } catch (error) {
      next(error);
    }
  } 
  else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with 'Bearer'`
    });
  }
});

// add any routes you/ve defined in other files
const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

// add the default error handler
apiRouter.use((err, req, res, next) => {
  res.status(res.statusCode ? res.statusCode : 500).send(err);
})

module.exports = apiRouter;
