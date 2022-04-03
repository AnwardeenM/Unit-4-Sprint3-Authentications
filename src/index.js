const express = require("express");
const connect = require("./configs/db");
const { register, login } = require("./controllers/auth.controller");
const productController = require("./controllers/post.controller");
const { body} = require('express-validator');
const app = express();

app.use(express.json());

// app.use("/users", userController) // /register /login
app.post("/register",

body("name").isLength({min:5}),
body("password").isLength({min:8}),
body("email").isEmail(),register);

app.post("/login",body("password").isLength({min:8}),
body("email").isEmail(),login);

app.use("/posts", productController);

app.listen(4321, async ()=> {
  await connect();
  console.log("listening on port 4321");
});