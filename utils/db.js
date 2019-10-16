var mysql = require("mysql");

var createConnection = () => {
  return mysql.createConnection({
    host: "85.10.205.173",
    port: "3306",
    user: "adminaccount",
    password: "12345678",
    database: "th_news"
  });
};
