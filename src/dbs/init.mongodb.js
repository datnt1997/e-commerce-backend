"use strict";

const mongoose = require("mongoose");
const {
  db: { host, name, port },
} = require("../configs/config.mogodb");
const { countConnect } = require("../helpers/check.connect");

const connectString = `mongodb://${host}:${port}/${name}`;
console.log('connectString', connectString)

class Database {
  constructor() {
    this.connect();
  }

  connect(type = "mongodb") {
    mongoose.set("debug", true);
    mongoose.set("debug", { color: true });

    mongoose
      .connect(connectString)
      .then((_) => {
        countConnect();
        console.log(`Connected Mongodb Success`);
      })
      .catch((err) => console.log("Error Connect!"));
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }
}

const instanceMongodb = Database.getInstance();
module.exports = instanceMongodb;
