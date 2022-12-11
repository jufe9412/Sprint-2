var validator = require("validator");
const Quadbike = require("../models/Quadbike");

var controller = {
    probandoQuadbike: function(req,res){
        return res.status(200).send({
            message:"Estoy en el metodo probando"
        });
    },

    testeandoQuadbike:function(req,res){
        return res.status(200).send({
            message:"Estoy en el metodo testeando"
        });
    },

    save:function(req,res){
        var params = req.body;
        var validate_name = !validator.isEmpty(params.name);
        var validate_brand = !validator.isEmpty(params.brand);
        var validate_year = !validator.isEmpty(params.year);
        var validate_description = !validator.isEmpty(params.description);
        console.log(validate_description);
        if(validate_name && validate_brand && validate_year && validate_description){
            var quadbike = new Quadbike();
            quadbike.name = params.name;
            quadbike.brand = params.brand;
            quadbike.year = params.year;
            quadbike.description = params.description;
            
            console.log(quadbike);
            quadbike.save((err, quadbikeStored) =>{
                if(err || !quadbikeStored){
                    return res.status(404).send({
                        message:"El quadbike no se guardó",
                        status: "error"
                    });
                }
                return res.status(200).send({
                    message:"Quadbike Guardado"
                });
            });
            
        }else{
            return res.status(200).send({
                message:"Validación de datos incorrecto"
            });
        }
        
    },

    updateQuadbike:function(req,res){
        var params = req.body;
        var quadbikeId = req.params.id;
        //console.log(quadbikeId);
        var validate_name = !validator.isEmpty(params.name);
        var validate_brand = !validator.isEmpty(params.brand);
        var validate_year = !validator.isEmpty(params.year);
        var validate_description = !validator.isEmpty(params.description);
        
            if(validate_name && validate_brand && validate_year && validate_description){
                    var update = {
                    name:params.name,
                    brand:params.brand,
                    year:params.year,
                    description:params.description
                }

        Quadbike.findOneAndUpdate({quadbikeId},update,{new:true},(err, quadbikeUpdate)=>{
            if(err){
                return res.status(500).send({
                    message:"Error en la petición",
                    status:"Error"
                });
            }

                if(!quadbikeUpdate){
                    return res.status(404).send({
                        message:"quadbike no actualizado",
                        status:"Error"
                    });
                }

                return res.status(200).send({
                    message:"actualizado correctamente",
                    status:"success",
                    quadbikeUpdate
                });
            })

        }else{
            return res.status(200).send({
                message:"Validación de datos invalido"
            });
        }
        
    },

    eliminarQuadbike:function(req,res){
        var quadbikeId = req.params.id;
        Quadbike.findOneAndDelete({_id:quadbikeId},(err,quadbikeRemoved)=>{
            if(err){
                return res.status(500).send({
                    message:"Error en la petición",
                    status:"Error"
                });
            }

            if(!quadbikeRemoved){
                return res.status(404).send({
                    message:"quadbike no eliminado",
                    status:"Error"
                });
            }

            return res.status(200).send({
                message:"Eliminado exitosamente",
                quadbike:quadbikeRemoved
            });
        })
        
    },

    listarQuadbike:function(req,res){

        Quadbike.find(function(err,doc){
            console.log(doc);
            return res.status(200).send({
                message:"Quadbike",
                doc
            });

            
        });
        
    },

    mostrarQuadbike:function(req,res){
        var quadbikeId = req.params.id;
        Quadbike.findById(quadbikeId)
               .exec((err,quadbike)=>{
                    if(err){
                        return res.status(500).send({
                            message:"Error en la petición",
                            status:"Error"
                        });
                    }
        
                    if(!quadbike){
                        return res.status(404).send({
                            message:"quadbike no encontrado",
                            status:"Error"
                        });
                    }
                    return res.status(200).send({
                        message:"Este es un usuario",
                        quadbike
                    });
               })
        
    }
}


module.exports = controller;