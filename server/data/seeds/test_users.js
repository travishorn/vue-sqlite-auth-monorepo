require("dotenv").config();

const bcrypt = require("bcryptjs");

exports.seed = (knex) => {
  const users = [
    { username: "test1", password: "test1" },
    { username: "test2", password: "test2" },
    { username: "test3", password: "test3" },
  ].map((user) => {
    return {
      username: user.username,
      password_hash: bcrypt.hashSync(user.password, +process.env.SALT_ROUNDS),
    };
  });

  return knex("users")
    .del()
    .then(function () {
      return knex("users").insert(users);
    });
};
