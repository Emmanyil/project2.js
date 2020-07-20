const express = require("express");
const bodyParser = require("body-parser");
const Sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
const { Op } = Sequelize;
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const cors = require("cors");
const expressJwt = require("express-jwt");
// const mailer = require("./smtpGmail");
const app = express();

app.use(bodyParser.json());
app.use(express.static("myproject"));
// app.use(errorHandler);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const sequelize = new Sequelize("emrada2", "root", "Emmanuil2228125%", {
  timezone: "+03:00",
  host: "localhost",
  dialect: "mysql",
});

class User extends Sequelize.Model {}

User.init(
  {
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    nickname: Sequelize.STRING,
  },
  { sequelize, modelName: "user" }
);

const secret = `7.!BMB?Y+Bc2vZE-Hb5YuCT6QvE^FN,JWN6M?_VtFXeC5dLtB!`;
const secretPass = "JcFWhuLkpaK9aB3Gtbvo2Y0BApdw5q1tUyAyJeD8fJXs78d7zR";

const authenticate = async ({ email, password }) => {
  const user = await User.findOne({ where: { email, password } });
  if (user) {
    const token = jwt.sign({ sub: { id: user.id, email: user.email } }, secret);
    return token;
  }
};

var schema = buildSchema(`
  type Query {
    login(email: String, password: String): String
    getUser(id: ID!): User
  } 
  type Mutation {
    createUser(email: String, password: String, nickname: String): User
  } 
  type User {
    id: Int
    createdAt: String
    email: String
    nickname: String
  }
`);

const getUser = async ({ id }) => await User.findByPk(id);

const login = async ({ email, password }) => {
  const userFind = await User.findOne({ where: { email, password } });
  return authenticate(userFind);
};

const createUser = async ({ email, password, nickname }) => {
  const wasUserCreated = await User.findOne({ where: { email } });
  if (!wasUserCreated) {
    // const passwordModification = jwt.sign(password + secretPass, secret);
    const user = { email, password, nickname };
    const newUser = new User(user);
    await newUser.save();
  } else console.log("bye");
  return await User.findOne({ where: { email } });
};

var root = { getUser, login, createUser };

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.get("/users", async (req, res) => res.send(await User.findAll()));

// app.post("/users", async (req, res) => {
//   // const twoUsers = async () => {
//   //   const userEmail = await User.findOne({ where: { email: req.body.email } });
//   //   if (userEmail !== null) console.log(err);
//   //   else {
//   //     console.log("hi");
//   var newUser = new User(req.body);
//   // const message = {
//   //   to: req.body.email,
//   //   subject: "Registered",
//   //   text: `Отлично. Вот ваши данные:
//   //   login: ${req.body.email}
//   //   password: ${req.body.password}

//   //   Перейдите по ссылке, чтобы войти в свой аккаунт
//   //   url: http://localhost:3335/sign_in`,
//   // };
//   // mailer(message);
//   await newUser.save();
//   res.status(201).send(newUser);
//   // }
//   // };
//   // twoUsers();
// });

app.get("/login", async (req, res) => {
  res.send(await User.findAll());
});

// function errorHandler(err, req, res, next) {
//   if (typeof err === "string") {
//     return res.status(400).json({ message: err });
//   }

//   if (err.name === "UnauthorizedError") {
//     return res.status(401).json({ message: "Invalid Token" });
//   }

//   return res.status(500).json({ message: err.message });
// }

app.post("/users/authenticate", async (req, res, next) => {
  authenticate(req.body)
    .then((user) => {
      user
        ? res.json(user)
        : res
            .status(400)
            .json({ message: "Username or password is incorrect" });
    })
    .catch((err) => next(err));
});

// app.use(jwtWare());

app.get("/a", (req, res, next) => {
  console.log(req.headers.authorization);
  const token1 = req.headers.authorization;
  console.log(token1);
  // if (token) {
  const data = jwt.verify(token1, secret);
  console.log(data);
  // if (data) {
  console.log(data.sub.nickname);
  res.send(`<h1>Hello ${data.sub.nickname}</h1>`);
  // } else {
  //   res.send(`<h1>Hello haker</h1>`);
  // }
  // }
});

// (async () => {
//   let persone =
//     // User.findOne({ where: { login: "David" } }) ||
//     (await User.create({ email: "1", password: "1", nickname: "1" }));
// })();

sequelize.sync();

app.listen(3330, () => console.log("The server started on port 3330"));
