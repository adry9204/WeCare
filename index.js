console.log("Hello!");
console.log("Server listening on http://127.0.0.1:3009 ...");
console.log("Endpoints:");
console.log(
  "http://localhost:3009/wecare/add-user?username=adry&email=adry@gmail.com&password=pass"
);
console.log("localhost:3009/wecare/get-all-users");
console.log(
  "http://localhost:3009/wecare/login-user?username=adry&password=pass"
);
console.log(
  "localhost:3009/wecare/logout-user?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkcnkiLCJpYXQiOjE2NjcxMDgxNTF9.u7SbNfzMHucJhbv8l3hH7zLwDv_e0eAvlWqQvcg8G9U"
);

var userServicePlugin = require("./user_service");
var seneca = require("seneca")();
var express = require("express");
var app = express();

seneca.add("role:api, cmd:add-user", function (args, done) {
  console.log("> add user request received...");
  var new_user = {
    username: args.username,
    email: args.email,
    password: args.password,
  };
  seneca.act({ role: "user", cmd: "add", data: new_user }, function (err, msg) {
    console.log(msg);
    done(err, msg);
  });
});

seneca.add("role:api, cmd:get-all-users", function (args, done) {
  console.log("> get all users request received...");
  seneca.act({ role: "user", cmd: "get-all" }, function (err, msg) {
    console.log(msg);
    done(err, msg);
  });
});

seneca.add("role:api, cmd:login-user", function (args, done) {
  console.log("> login request received for...");
  console.log(args.username);
  console.log(args.password);
  seneca.act(
    {
      role: "user",
      cmd: "login",
      data: { username: args.username, password: args.password },
    },
    function (err, msg) {
      console.log(msg);
      done(err, msg);
    }
  );
});

seneca.add("role:api, cmd:logout-user", function (args, done) {
  console.log("> logout user received... ");
  seneca.act(
    { role: "user", cmd: "logout", data: { token: args.token } },
    function (err, msg) {
      console.log(msg);
      done(err, msg);
    }
  );
});

seneca.act("role:web", {
  use: {
    prefix: "/wecare",
    pin: { role: "api", cmd: "*" },
    map: {
      "add-user": { POST: true },
      "get-all-users": { GET: true },
      "login-user": { GET: true },
      "logout-user": { POST: true },
    },
  },
});

seneca.use(userServicePlugin);
seneca.use("seneca-entity");
app.use(require("body-parser").json());
app.use(seneca.export("web"));
app.listen(3009);
