var validator = require("validator");
var Mensaje = require("../models/Mensajes");

var controller = {
    probandoMensaje: function(req,res){
        return res.status(200).send({
            message:"Estoy en el metodo probando"
        });
    },

    testeandoMensaje: function(req,res){
        return res.status(200).send({
            message:"Estoy en el metodo testeando"
        });
    },

    save: function(req,res){
        var params = req.body;
        var validate_idMensaje = !validator.isEmpty(params.idMensaje);
        var validate_messageText = !validator.isEmpty(params.messageText);
                
        //console.log(validate_name);
        if(validate_idMensaje && validate_messageText ){
            var mensaje = new Mensaje();
            mensaje.idMensaje = params.idMensaje;
            mensaje.messageText = params.messageText;
            
            console.log(mensaje);
            mensaje.save((err, mensajeStored) => {
                if(err || !mensajeStored){
                    return res.status(404).send({
                        message:"La categoria no se guardó",
                        status: "error"
                    });
                }
                return res.status(200).send({
                    message:"Mensaje Guardado"
                });
            });
            
        }else{
            return res.status(200).send({
                message:"Validación de datos incorrecto"
            });
        }
        
    },

    updateMensaje:function(req,res){
        var params = req.body;
        var mensajesid = req.params.idMensaje;
        console.log(mensajesid);
        var validate_idMensaje = !validator.isEmpty(params.idMensaje);
        var validate_messageText = !validator.isEmpty(params.messageText);
            if(validate_idMensaje && validate_messageText ){
            
                var update = {
                    idMensaje:params.idMensaje,
                    messageText:params.messageText
                    
                }

                Mensaje.findOneAndUpdate({mensajesid},update,{new:true},(err, mensajeUpdate)=>{
                if(err){
                    return res.status(500).send({
                        message:"Error en la petición",
                        status:"Error"
                    });
                }

                if(!mensajeUpdate){
                    return res.status(404).send({
                        message:"Mensaje no actualizado",
                        status:"Error"
                    });
                }

                return res.status(200).send({
                    message:"actualizado correctamente",
                    status:"success",
                    mensajeUpdate
                });
            })

        }else{
            return res.status(200).send({
                message:"Validación de datos invalido"
            });
        }
        
    },

    eliminarMensaje:function(req,res){
        var mensajeid = req.params.idMensaje;
        Mensaje.findOneAndDelete({_id:mensajeid},(err,mensajeRemoved)=>{
            if(err){
                return res.status(500).send({
                    message:"Error en la petición",
                    status:"Error"
                });
            }

            if(!mensajeRemoved){
                return res.status(404).send({
                    message:"Mensaje no eliminado",
                    status:"Error"
                });
            }

            return res.status(200).send({
                message:"Eliminado exitosamente",
                mensaje:mensajeRemoved
            });
        })
        
    },

    listarMensaje:function(req,res){

        Mensaje.find(function(err,doc){
            console.log(doc);
            return res.status(200).send({
                message:"Mensaje",
                doc
            });

            
        });
        
    },

    mostrarMensaje:function(req,res){
        var mensajeid = req.params.idMensaje;
        Mensaje.findById(mensajeid)
               .exec((err,mensaje)=>{
                    if(err){
                        return res.status(500).send({
                            message:"Error en la petición",
                            status:"Error"
                        });
                    }
        
                    if(!mensaje){
                        return res.status(404).send({
                            message:"Mensaje no encontrado",
                            status:"Error"
                        });
                    }
                    return res.status(200).send({
                        message:"Este es un mensaje",
                        mensaje
                    });
               })
        
    }
}


module.exports = controller;