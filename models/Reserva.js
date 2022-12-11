const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ReservaSchema = Schema ({
  
    fechaInicio: Date,
    fechaFin: Date,
    estado: String
    
})

module.exports = mongoose.model("Reserva", ReservaSchema);