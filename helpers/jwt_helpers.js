const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const client = require("../helpers/init_redis");

module.exports = {
  signAccessToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {};

      const options = {
        expiresIn: "30s",
        issuer: "parsamorshed.netlify.app",
        audience: userId,
      };

      jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_SECRET,
        options,
        (err, token) => {
          if (err) {
            console.log(err.message);
            return reject(createError.InternalServerError());
          }

          resolve(token);
        }
      );
    });
  },
  signRefreshToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {};

      const options = {
        expiresIn: "1y",
        issuer: "parsamorshed.netlify.app",
        audience: userId,
      };

      jwt.sign(
        payload,
        process.env.REFRESH_TOKEN_SECRET,
        options,
        (err, token) => {
          if (err) {
            console.log(err.message);
            return reject(createError.InternalServerError());
          }

          client.SET(userId, token, "EX", 365 * 24 * 60 * 60, (err, reply) => {
            if (err) {
              console.log(err.message);
              return reject(createError.InternalServerError());
            }

            resolve(token);
          });
        }
      );
    });
  },
  verifyAccessToken: (req, res, next) => {
    const token = req.cookies.accessToken;

    if (!token) return next(createError.Unauthorized());

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) {
        const message =
          err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;

        return next(createError.Unauthorized(message));
      }

      req.payload = payload;
      next();
    });
  },
  verifyRefreshToken: (refreshToken) => {
    return new Promise((resolve, reject) => {
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, payload) => {
          if (err) return reject(createError.Unauthorized());
          const userId = payload.aud;
          client.GET(userId, (err, result) => {
            if (err) {
              console.log(err.message);
              return reject(createError.InternalServerError());
            }

            if (refreshToken === result) return resolve(userId);

            reject(createError.Unauthorized());
          });
        }
      );
    });
  },
};
