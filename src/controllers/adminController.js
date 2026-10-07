const userModel = require("../models/userModel");
const requestModel = require("../models/requestModel");
const documentModel = require("../models/documentModel");

function index(req, res) {
  res.render("admin", {
    users: userModel.all(),
    requests: requestModel.all(),
    documents: documentModel.all()
  });
}

module.exports = {
  index
};