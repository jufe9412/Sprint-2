var validator = require("validator");
var Categoria = require("../models/Categorias");

var controller = {
    probandoCategoria: function(req,res){
        return res.status(200).send({
            message:"Estoy en el metodo probando"
        });
    },

    testeandoCategoria: function(req,res){
        return res.status(200).send({
            message:"Estoy en el metodo testeando"
        });
    },

    save: function(req,res){
        var params = req.body;
        var validate_id = !validator.isEmpty(params.id);
        var validate_name = !validator.isEmpty(params.name);
        var validate_descripcion = !validator.isEmpty(params.descripcion) ;
        
        //console.log(validate_name);
        if(validate_name && validate_descripcion ){
            var categoria = new Categoria();
            categoria.id = params.id;
            categoria.name = params.name;
            categoria.descripcion = params.descripcion;
            console.log(categoria);
            categoria.save((err, categoriaStored) => {
                if(err || !categoriaStored){
                    return res.status(404).send({
                        message:"La categoria no se guardó",
                        status: "error"
                    });
                }
                return res.status(200).send({
                    message:"Categoria Guardada"
                });
            });
            
        }else{
            return res.status(200).send({
                message:"Validación de datos incorrecto"
            });
        }
        
    },

    updateCategoria:function(req,res){
        var params = req.body;
        var categoriasid = req.params.id;
        console.log(categoriasid);
        var validate_id = !validator.isEmpty(params.id);
        var validate_name = !validator.isEmpty(params.name);
        var validate_descripcion = !validator.isEmpty(params.descripcion) ;
            if(validate_id && validate_name && validate_descripcion ){
            
                var update = {
                    id:params.id,
                    name:params.name,
                    descripcion:params.descripcion,
                }

            Categoria.findOneAndUpdate({categoriasid},update,{new:true},(err, userUpdate)=>{
                if(err){
                    return res.status(500).send({
                        message:"Error en la petición",
                        status:"Error"
                    });
                }

                if(!userUpdate){
                    return res.status(404).send({
                        message:"La categoria no actualizada",
                        status:"Error"
                    });
                }

                return res.status(200).send({
                    message:"actualizada correctamente",
                    status:"success",
                    userUpdate
                });
            })

        }else{
            return res.status(200).send({
                message:"Validación de datos invalido"
            });
        }
        
    },

    eliminarCategoria:function(req,res){
        var categoriaid = req.params.id;
        Categoria.findOneAndDelete({_id:categoriaid},(err,userRemoved)=>{
            if(err){
                return res.status(500).send({
                    message:"Error en la petición",
                    status:"Error"
                });
            }

            if(!userRemoved){
                return res.status(404).send({
                    message:"Categoria no eliminada",
                    status:"Error"
                });
            }

            return res.status(200).send({
                message:"Eliminado exitosamente",
                usuario:userRemoved
            });
        })
        
    },

    listarCategoria:function(req,res){

        Categoria.find(function(err,doc){
            console.log(doc);
            return res.status(200).send({
                message:"Categoria",
                doc
            });

            
        });
        
    },

    mostrarCategoria:function(req,res){
        var categoriaid = req.params.id;
        Categoria.findById(categoriaid)
               .exec((err,categoria)=>{
                    if(err){
                        return res.status(500).send({
                            message:"Error en la petición",
                            status:"Error"
                        });
                    }
        
                    if(!usuario){
                        return res.status(404).send({
                            message:"Categoria no encontrada",
                            status:"Error"
                        });
                    }
                    return res.status(200).send({
                        message:"Este es un usuario",
                        usuario
                    });
               })
        
    }
}


module.exports = controller;