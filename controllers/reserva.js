var validator = require("validator");
const Reserva = require("../models/Reserva");


var controller = {
    probandoReserva: function(req,res){
        return res.status(200).send({
            message:"Estoy en el metodo probando"
        });
    },

    testeandoReserva: function(req,res){
        return res.status(200).send({
            message:"Estoy en el metodo testeando"
        });
    },

    save: function(req,res){
        var params = req.body;
        var validate_fechaInicio = !validator.isEmpty(params.fechaInicio);
        var validate_fechaFin = !validator.isEmpty(params.fechaFin);
        var validate_estado = !validator.isEmpty(params.estado);                
        //console.log(validate_name);
        if(validate_fechaInicio && validate_fechaFin && validate_estado ){
            var reserva = new Reserva();
            reserva.fechaInicio = params.fechaInicio;
            reserva.fechaFin = params.fechaFin;
            reserva.estado = params.estado;
            
            console.log(reserva);
            reserva.save((err, reservaStored) => {
                if(err || !reservaStored){
                    return res.status(404).send({
                        message:"La reserva no se guardó",
                        status: "error"
                    });
                }
                return res.status(200).send({
                    message:"Reserva Guardada"
                });
            });
            
        }else{
            return res.status(200).send({
                message:"Validación de datos incorrecto"
            });
        }
        
    },

    updateReserva:function(req,res){
        var params = req.body;
        var reservaid = req.params.idReserva;
        console.log(reservaid);
        var validate_fechaInicio = !validator.isEmpty(params.fechaInicio);
        var validate_fechaFin = !validator.isEmpty(params.fechaFin);
        var validate_estado = !validator.isEmpty(params.estado);                
        
        if(validate_fechaInicio && validate_fechaFin && validate_estado ){
            
                var update = {
                    fechaInicio:params.fechaInicio,
                    fechaFin:params.fechaFin,
                    estado:params.estado,
                    
                }

                Reserva.findOneAndUpdate({reservaid},update,{new:true},(err, reservaUpdate)=>{
                if(err){
                    return res.status(500).send({
                        message:"Error en la petición",
                        status:"Error"
                    });
                }

                if(!reservaUpdate){
                    return res.status(404).send({
                        message:"REserva no actualizada",
                        status:"Error"
                    });
                }

                return res.status(200).send({
                    message:"actualizado correctamente",
                    status:"success",
                    reservaUpdate
                });
            })

        }else{
            return res.status(200).send({
                message:"Validación de datos invalido"
            });
        }
        
    },

    eliminarReserva:function(req,res){
        var reservaid = req.params.idReserva;
        Reserva.findOneAndDelete({_id:reservaid},(err,reservaRemoved)=>{
            if(err){
                return res.status(500).send({
                    message:"Error en la petición",
                    status:"Error"
                });
            }

            if(!reservaRemoved){
                return res.status(404).send({
                    message:"Reserva no eliminada",
                    status:"Error"
                });
            }

            return res.status(200).send({
                message:"Eliminado exitosamente",
                mensaje:reservaRemoved
            });
        })
        
    },

    listarReserva:function(req,res){

        Mensaje.find(function(err,doc){
            console.log(doc);
            return res.status(200).send({
                message:"Reserva",
                doc
            });

            
        });
        
    },

    mostrarReserva:function(req,res){
        var reservaid = req.params.idReserva;
        Reserva.findById(reservaid)
                .exec((err,reserva)=>{
                    if(err){
                        return res.status(500).send({
                            message:"Error en la petición",
                            status:"Error"
                        });
                    }
        
                    if(!reserva){
                        return res.status(404).send({
                            message:"Reserva no encontrada",
                            status:"Error"
                        });
                    }
                    return res.status(200).send({
                        message:"Esta es un reserva",
                        reserva
                    });
               })
        
    }
}


module.exports = controller;