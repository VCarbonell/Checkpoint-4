const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const hashPassword = (req, res, next) => {
  req.body = JSON.parse(req.body.body);
  argon2
    .hash(req.body.password, {
      type: argon2.argon2id,
      timeCost: 5,
      memoryCost: 2 ** 16,
      parallelism: 1,
    })
    .then((hashedPassword) => {
      req.body.password = hashedPassword;
      next();
    })
    .catch((err) => next(err));
};

const verifyPassword = (req, res, next) => {
  argon2
    .verify(req.user.password, req.body.password)
    .then((isVerified) => {
      if (isVerified) {
        const payload = { sub: req.user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        delete req.user.password;
        res.send({ token, user: req.user });
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => next(err));
};

const verifyToken = (req, res, next) => {
  req
    .get("Authorization")
    .then((authorization) => {
      if (!authorization) {
        throw new Error("Authorization header is missing");
      } else {
        const [type, token] = authorization.split(" ");
        if (type !== "Bearer") {
          throw new Error("Authorization header has not the 'Bearer' type");
        }
        req.payload = jwt.verify(token, process.env.JWT_SECRET);
        next();
      }
    })
    .catch((err) => next(err));
};

module.exports = {
  hashPassword,
  verifyPassword,
  verifyToken,
};
