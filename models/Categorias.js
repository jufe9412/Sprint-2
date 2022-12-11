const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CategoriaSchema = Schema ({
    id: String,
    name: String,
    descripcion: String
    
})

module.exports = mongoose.model("Categoria", CategoriaSchema);