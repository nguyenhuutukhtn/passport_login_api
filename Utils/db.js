var mysql = require("mysql");

var createConnection = () => {
  return mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "123456",
    database: "th_news"
  });
};
