var recordService = function (options) {
  var seneca = this;

  //add record
  seneca.add({ role: "record", cmd: "add" }, function (msg, respond) {
    console.log("> adding record");
    this.make("record").data$(msg.data).save$(respond);
  });

  //get one record
  seneca.add({ role: "record", cmd: "get-one" }, function (msg, respond) {
    this.make("record").load$(msg.data.record_id, respond);
  });

  //delete one record
  seneca.add({ role: "record", cmd: "delete" }, function (msg, respond) {
    console.log("> deleting one record");
    this.make("record").remove$(msg.data.record_id, respond);
  });

  seneca.add({ role: "record", cmd: "get-all" }, function (msg, respond) {
    console.log("> getting all records of single patient");

    this.make("record").list$({}, function (err, list) {
      var records = [];
      var index = 0;
      for (let i = 0; i < list.length; i++) {
        if (list[i].patient_id == msg.data.patient_id) {
          console.log(list[i].patient_id);
          records[index] = list[i];
          index += 1;
        }
      }
      respond(err, records);
    });
  });

  //delete all records for one patient
  seneca.add({ role: "record", cmd: "delete-all" }, function (msg, respond) {
    console.log("> delete all records");

    this.make("record").list$({}, function (err, list) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].patient_id == msg.data.patient_id) {
          this.make("record").remove$(list[i].id, null);
        }
      }
      respond(err, []);
    });
  });
};

module.exports = recordService;
