const bcrypt = require("bcrypt");

const hashPassword = async (plainTextPassword) => {
  try {
    let salt = await bcrypt.genSalt();
    let hash = await bcrypt.hash(plainTextPassword, salt);
    console.log(`Hashed password: ${hash}`);
    return hash;
  } catch (err) {
    throw new Error(err);
  }
};

const checkPassword = async (plainTextPassword, hashedPassword) => {
  try {
    let matchResult = await bcrypt.compare(plainTextPassword, hashedPassword);
    console.log(matchResult);
    return matchResult;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  hashPassword: hashPassword,
  checkPassowrd: checkPassword,
};
