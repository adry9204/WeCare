var jwt = require("jsonwebtoken");

var productsService = function (options) {
  var seneca = this;
  var blackListToken = [];
  var index = 0;

  seneca.add({ role: "user", cmd: "add" }, function (msg, respond) {
    console.log("> adding user");
    this.make("user").data$(msg.data).save$(respond);
  });

  seneca.add({ role: "user", cmd: "get-all" }, function (msg, respond) {
    console.log("> getting all users in the system");
    this.make("user").list$({}, respond);
  });

  seneca.add({ role: "user", cmd: "logout" }, function (msg, respond) {
    console.log("> loginout user...");
    blackListToken[index] = msg.data.token;
    console.log(blackListToken[index]);
    index += 1;
    respond(null, blackListToken);
  });

  seneca.add({ role: "user", cmd: "login" }, function (msg, respond) {
    console.log("> checking that username and password are correct");

    this.make("user").list$({}, function (err, list) {
      for (let i = 0; i < list.length; i++) {
        //this.make("product").remove$(list[i].id, null);
        if (
          list[i].username == msg.data.username &&
          list[i].password == msg.data.password
        ) {
          var token = jwt.sign(
            { username: msg.data.username },
            msg.data.password
          );
          console.log(token);
          respond(null, { token: token });
          return;
        }
      }
      respond(err, []);
    });
  });
};

module.exports = productsService;
