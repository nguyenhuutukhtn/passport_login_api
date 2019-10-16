var db = require("../utils/db");

module.exports = {
  getbyEmail: email => {
    return db.load(`select * from users where email = '${email}'`);
  },
  add: (email, password) => {
    return db.load(
      `insert into users(email, password) value ('${email}','${password}')`
    );
  }
};
