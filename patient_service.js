var jwt = require("jsonwebtoken");

var patientsService = function (options) {
  var seneca = this;

  //add patient
  seneca.add({ role: "patient", cmd: "add" }, function (msg, respond) {
    console.log("> adding patient");
    this.make("patient").data$(msg.data).save$(respond);
  });

  //get one patient
  seneca.add({ role: "patient", cmd: "get-one" }, function (msg, respond) {
    console.log("> getting patient id: ", + msg.data.patient_id);
    this.make("patient").load$(msg.data.patient_id, respond);
  });

  //get all patients
  seneca.add({ role: "patient", cmd: "get-all" }, function (msg, respond) {
    console.log("> getting all patients in the system");
    this.make("patient").list$({}, respond);
  });

  //edit patient
  seneca.add({ role: "patient", cmd: "edit" }, function (msg, respond) {
    console.log("> getting patient data to edit");
    this.make("patient").remove$(msg.data.patient_id, respond);
    this.make("patient").data(msg.data).save$(respond);
  });

  //delete patient
  seneca.add({ role: "patient", cmd: "delete" }, function (msg, respond) {
    console.log("> deleting patient data...");
    this.make("patient").remove$(msg.data.patient_id, respond);
  });
}

module.exports = patientsService;