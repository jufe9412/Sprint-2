const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var QuadbikeSchema = Schema ({
    name: String,
    brand: String,
    year: String,
    description: String    
})

module.exports = mongoose.model("Quadbike", QuadbikeSchema);