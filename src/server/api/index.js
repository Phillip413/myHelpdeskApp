// load necessary modules
const express = require("express");

// creating a router
const apiRouter = express.Router();

const jwt = require("jsonwebtoken");

const volleyball = require('volleyball');
apiRouter.use(volleyball);

// use middleware function on all incoming requests to check the request header for a valid token
apiRouter.use(async (req, res, next) => {
  const auth = req.header("Authorization");
  if (!auth) {
    next();
  } else if (auth?.startsWith("Bearer ")) {
    try {
      const token = auth.slice(7);
      if (token === "null") {
        next();
      } else {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
        next();
      }
    } catch (error) {
      next(error);
    }
  } else {
    next({
      name: "AuthorizationHeaderError",
      message: `Authorization token must start with 'Bearer '`,
    });
  }
});

// API Routes
const usersRouter = require("./users");
const ticketsRouter = require("./tickets");

// add any routes you/ve defined in other files
apiRouter.use('/users', usersRouter);
apiRouter.use('/tickets', ticketsRouter);

// add the default error handler
apiRouter.use((err, req, res, next) => {
  res.status(res.statusCode ? res.statusCode : 500).send(err);
})


module.exports = apiRouter;
