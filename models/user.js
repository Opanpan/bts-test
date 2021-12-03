"use strict";
const { Model } = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {}

    generateToken = () => {
      const payload = {
        id: this.id,
        email: this.email,
      };

      const token = jwt.sign(payload, "ifanalrianysah");

      return token;
    };

    static #encrypt = (password) => bcrypt.hashSync(password, 10);

    checkPassword = (password) => bcrypt.compareSync(password, this.password);

    static register = async ({
      username,
      email,
      password,
      phone,
      address,
      city,
      country,
      name,
      postcode,
    }) => {
      try {
        const user = await this.findOne({ where: { email } });
        const encryptedPassword = this.#encrypt(password);

        if (user) {
          return Promise.resolve("Email already register");
        }

        return Promise.resolve({ email, username }).then(
          this.create({
            username,
            email,
            password: encryptedPassword,
            phone,
            address,
            city,
            country,
            name,
            postcode,
          })
        );
      } catch (error) {
        return Promise.reject(error);
      }
    };

    static userAuthenticate = async ({ email, password }) => {
      try {
        const user = await this.findOne({ where: { email } });

        if (!user || !user.checkPassword(password)) {
          return Promise.reject("Invalid email or password !!!");
        }

        return Promise.resolve(user);
      } catch (error) {
        return Promise.reject(error);
      }
    };
  }
  user.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      city: DataTypes.STRING,
      country: DataTypes.STRING,
      name: DataTypes.STRING,
      postcode: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
