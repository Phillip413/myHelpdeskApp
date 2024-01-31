// all the /api/users routes

// load necessary modules to handle user requests like login and register
const express = require("express");
const usersRouter = express.Router();
const { isLoggedIn } = require("./roles");

const {
    createUser,
    getUser,
    getAllUsers,
    getUserById,
    getUserByEmail,
} = require("../db");


const jwt = require("jsonwebtoken");

// GET /api/users/
usersRouter.get("/", isLoggedIn("admin"), async (req, res, next) => {
    try {
      const users = await getAllUsers();
  
      res.send({
        users,
      });
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

// GET /api/users/info
usersRouter.get("/info", async (req, res, next) => {
    try {
      if (!req?.user?.id) {
        res.status(400).json("User is required");
        return;
      }
      const user = await getUserById(req?.user?.id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).body("Unable to find user by given id");
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

// GET /api/users/info/:id
usersRouter.get("/info/:id", async (req, res, next) => {
    try {
      const user = await getUserById(req.params.id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).body("Unable to find user by given id");
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

// POST /api/users/login
usersRouter.post("/login", async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      next({
        name: "MissingCredentialsError",
        message: "Please supply both an email and password",
      });
    }
    try {
      const user = await getUser({ email, password });
      if (user) {
        const token = jwt.sign(
          {
            id: user.id,
            email,
            role: user.role,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1w",
          }
        );
  
        res.send({
          message: "Login successful!",
          token,
        });
      } else {
        next({
          name: "IncorrectCredentialsError",
          message: "Username or password is incorrect",
        });
      }
    } catch (err) {
      next(err);
    }
  });

// POST /api/users/register
usersRouter.post("/register", async (req, res, next) => {
    const { name, email, password, role } = req.body;
    try {
      const _user = await getUserByEmail(email);
  
      if (_user) {
        next({
          name: "UserExistsError",
          message: "A user with that email already exists",
        });
      }
  
      // validation to ensure no fields are empty
      if (name == "" || email == "" || password == "") {
        next({
          name: "EmptyFieldsError",
          message: "All fields Must be filled out",
        });
        // prevent form submission (stop it from getting added ot the db table)
        event.preventDefault();
      }
  
      const user = await createUser({
        name,
        email,
        password,
        role,
      });
  
      const token = jwt.sign(
        {
          id: user.id,
          email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1w",
        }
      );
  
      res.send({
        message: "Sign up successful!",
        token,
      });
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

// export thses routes so the top level router can access them
module.exports = usersRouter;