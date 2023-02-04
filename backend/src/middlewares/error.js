/* eslint-disable no-unused-vars */
const handleErrorMiddleware = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!!");
};

module.exports = handleErrorMiddleware;
