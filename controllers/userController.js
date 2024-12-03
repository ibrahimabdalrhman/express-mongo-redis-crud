const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const redis = require("redis");
const redisClient = redis.createClient();

redisClient.connect();

exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  return res.json(user);
});

exports.getAll = asyncHandler(async (req, res, next) => {
  const cacheUsers = await redisClient.get("users");
  if (cacheUsers) {
    return res.json(JSON.parse(cacheUsers));
  }

  const users = await User.find();
  await redisClient.set("users", JSON.stringify(users), { EX: 60 });
  return res.json(users);
});


