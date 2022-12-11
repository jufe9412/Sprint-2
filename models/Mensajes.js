const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var MensajeSchema = Schema ({
    idMensaje: String,
    messageText: String
    
    
})

module.exports = mongoose.model("Mensaje", MensajeSchema);