const Agenda = require("agenda");
const agenda = new Agenda({ db: { address: process.env.MONGODB_URI } });

module.exports = agenda;
