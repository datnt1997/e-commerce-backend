"use strict";

const keyTokenModel = require("../models/keyToken.model");
const { Types } = require("mongoose");

class KeyTokenService {
  static createKeyToken = async ({
    userId,
    publicKey,
    privateKey,
    refreshToken,
  }) => {
    try {
      // level 0
      // const tokens = await keyTokenModel.create({
      //   user: userId,
      //   publicKey,
      //   privateKey
      // });

      // return tokens ? tokens.publicKey : null;

      // Level xxx
      const filter = { user: userId },
        update = {
          publicKey,
          privateKey,
          usedRefreshToken: [],
          refreshToken,
        },
        options = { upsert: true, new: true };
      const tokens = await keyTokenModel.findOneAndUpdate(
        filter,
        update,
        options
      );
      return tokens ? token.publicKey : null;
    } catch (error) {
      return error;
    }
  };

  static findByUserId = async (userId) => {
    return await keyTokenModel
      .findOne({ user: new Types.ObjectId(userId) })
      .lean();
  };
  static removeKeyById = async (id) => {
    const result = await keyTokenModel.deleteOne({
      _id: new Types.ObjectId(id),
    });
    return result;
  };
}

module.exports = KeyTokenService;
