const createError = require("http-errors");
const User = require("../models/User");
const { registerSchema, loginSchema } = require("../helpers/validation_schema");
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require("../helpers/jwt_helpers");
const client = require("../helpers/init_redis");

module.exports = {
  verifyUser: async (req, res, next) => {
    try {
      const user = await User.findById(req.payload.aud);
      res.json({ userId: user.id, username: user.username });
    } catch (err) {
      next(err);
    }
  },
  register: async (req, res, next) => {
    try {
      const result = await registerSchema.validateAsync(req.body);

      const usernameExist = await User.findOne({ username: result.username });

      if (usernameExist)
        throw createError.Conflict(`"${result.username}" is already taken`);

      const emailExist = await User.findOne({ email: result.email });

      if (emailExist)
        throw createError.Conflict(`${result.email} is already registered`);

      const user = new User({
        username: result.username,
        email: result.email,
        password: result.password,
      });

      const savedUser = await user.save();

      const accessToken = await signAccessToken(savedUser.id);
      const refreshToken = await signRefreshToken(savedUser.id);

      res.cookie("accessToken", accessToken, { httpOnly: true });
      res.cookie("refreshToken", refreshToken, { httpOnly: true });
      res.json({ userId: savedUser.id, username: savedUser.username });
    } catch (err) {
      if (err.isJoi === true) err.status = 422;
      next(err);
    }
  },
  login: async (req, res, next) => {
    try {
      const result = await loginSchema.validateAsync(req.body);

      const user = await User.findOne({ email: result.email });

      if (!user)
        throw createError.Conflict(`${result.email} is not registered`);

      const isMatch = await user.isValidPassword(result.password);

      if (!isMatch) throw createError.Unauthorized("Email/Password not valid");

      const accessToken = await signAccessToken(user.id);
      const refreshToken = await signRefreshToken(user.id);

      res.cookie("accessToken", accessToken, { httpOnly: true });
      res.cookie("refreshToken", refreshToken, { httpOnly: true });

      res.json({ userId: user.id, username: user.username });
    } catch (err) {
      if (err.isJoi === true)
        return next(createError.BadRequest("Invalid Email/Password"));
      next(err);
    }
  },
  logout: async (req, res, next) => {
    try {
      const { refreshToken } = req.cookies;

      if (!refreshToken) throw createError.BadRequest();

      const userId = await verifyRefreshToken(refreshToken);

      client.DEL(userId, (err, value) => {
        if (err) {
          console.log(err.message);
          throw createError.InternalServerError();
        }

        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        res.sendStatus(204);
      });
    } catch (err) {
      next(err);
    }
  },
  refreshToken: async (req, res, next) => {
    try {
      const { refreshToken } = req.cookies;

      if (!refreshToken) throw createError.BadRequest();

      const userId = await verifyRefreshToken(refreshToken);

      const accessToken = await signAccessToken(userId);
      const refToken = await signRefreshToken(userId);

      res.cookie("accessToken", accessToken, { httpOnly: true });
      res.cookie("refreshToken", refToken, { httpOnly: true });
      res.send();
    } catch (err) {
      next(err);
    }
  },
};
