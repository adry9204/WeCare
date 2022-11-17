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
var patientServicePlugin = require("./patient_service");
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

//get all user data
seneca.add("role:api, cmd:get-all-users", function (args, done) {
  console.log("> get all users request received...");
  seneca.act({ role: "user", cmd: "get-all" }, function (err, msg) {
    console.log(msg);
    done(err, msg);
  });
});

//get one user data
seneca.add("role:api, cmd:get-one-user", function (args, done) {
  console.log("> getting user data of id: " + args.user_id);
  seneca.act(
    { role: "user", cmd: "get", data: { user_id: args.user_id } },
    function (err, msgs) {
      console.log(msg);
      done(err, msg);
    }
  );
});

//edit patient data
seneca.add("role:api, cmd:edit-patient", function (args, done) {
  console.log("> editing patient data processing for id: " + args.patient_id);
  var edit_patient = {
    PatientName: args.PatientName,
    age: args.age,
    DOB: args.DOB,
  };
  seneca.act(
    { role: "patient", cmd: "edit", data: edit_patient },
    function (err, msg) {
      console.log(msg);
      done(err, msg);
    }
  );
});

//get one patient data
seneca.add("role:api, cmd:get-patient", function (args, done) {
  console.log(
    "> getting one patient data request received..." + args.patient_id
  );
  seneca.act(
    { role: "patient", cmd: "get-one", data: { patient_id: args.patient_id } },
    function (err, msg) {
      console.log(msg);
      done(err, msg);
    }
  );
});

//get all patient data
seneca.add(
  "role:api, get:patient, cmd:get-all-patients",
  function (args, done) {
    console.log("> get all patients request received...");
    seneca.act({ role: "patient", cmd: "get-all" }, function (err, msg) {
      console.log(msg);
      done(err, msg);
    });
  }
);

//delete patient
seneca.add("role:api, cmd:delete-patient", function (args, done) {
  console.log(
    "> deleting patient record processing for id: ",
    +args.patient_id
  );
  seneca.act(
    { role: "patient", cmd: "delete", data: { patient_id: args.patient_id } },
    function (err, msg) {
      console.log(msg);
      done(err, msg);
    }
  );
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
      "get-all-patients": { GET: true },
      "get-patient": { GET: true },
      "edit-patient": { POST: true },
      "delete-patient": { GET: true },
      "login-user": { GET: true },
      "logout-user": { POST: true },
    },
  },
});

seneca.use(userServicePlugin);
seneca.use(patientServicePlugin);
git;
seneca.use("seneca-entity");
app.use(require("body-parser").json());
app.use(seneca.export("web"));
app.listen(3009);

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
var patientServicePlugin = require("./patient_service");
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

//get all user data
seneca.add("role:api, cmd:get-all-users", function (args, done) {
  console.log("> get all users request received...");
  seneca.act({ role: "user", cmd: "get-all" }, function (err, msg) {
    console.log(msg);
    done(err, msg);
  });
});

//get one user data
seneca.add("role:api, cmd:get-one-user", function (args, done) {
  console.log("> getting user data of id: " + args.user_id);
  seneca.act(
    { role: "user", cmd: "get", data: { user_id: args.user_id } },
    function (err, msgs) {
      console.log(msg);
      done(err, msg);
    }
  );
});

//edit patient data
seneca.add("role:api, cmd:edit-patient", function (args, done) {
  console.log("> editing patient data processing for id: " + args.patient_id);
  var edit_patient = {
    PatientName: args.PatientName,
    age: args.age,
    DOB: args.DOB,
  };
  seneca.act(
    { role: "patient", cmd: "edit", data: edit_patient },
    function (err, msg) {
      console.log(msg);
      done(err, msg);
    }
  );
});

//get one patient data
seneca.add("role:api, cmd:get-patient", function (args, done) {
  console.log(
    "> getting one patient data request received..." + args.patient_id
  );
  seneca.act(
    { role: "patient", cmd: "get-one", data: { patient_id: args.patient_id } },
    function (err, msg) {
      console.log(msg);
      done(err, msg);
    }
  );
});

//get all patient data
seneca.add(
  "role:api, get:patient, cmd:get-all-patients",
  function (args, done) {
    console.log("> get all patients request received...");
    seneca.act({ role: "patient", cmd: "get-all" }, function (err, msg) {
      console.log(msg);
      done(err, msg);
    });
  }
);

//delete patient
seneca.add("role:api, cmd:delete-patient", function (args, done) {
  console.log(
    "> deleting patient record processing for id: ",
    +args.patient_id
  );
  seneca.act(
    { role: "patient", cmd: "delete", data: { patient_id: args.patient_id } },
    function (err, msg) {
      console.log(msg);
      done(err, msg);
    }
  );
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
      "get-all-patients": { GET: true },
      "get-patient": { GET: true },
      "edit-patient": { POST: true },
      "delete-patient": { GET: true },
      "login-user": { GET: true },
      "logout-user": { POST: true },
    },
  },
});

seneca.use(userServicePlugin);
seneca.use(patientServicePlugin);
git;
seneca.use("seneca-entity");
app.use(require("body-parser").json());
app.use(seneca.export("web"));
app.listen(3009);
