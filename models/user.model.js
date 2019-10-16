var db = require("../utils/db");

module.exports = {
  getbyEmail: email => {
    return db.load(`select * from users where email = '${email}'`);
  }
};
