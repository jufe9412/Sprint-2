var express = require("express");
var mensajeController = require("../controllers/mensaje");

var router = express.Router();

router.get("/probandoMensaje", mensajeController.probandoMensaje);
router.post("/testeandoMensaje", mensajeController.testeandoMensaje);

router.post("/guardarMensaje", mensajeController.save);
router.put("/updateMensaje/:id", mensajeController.updateMensaje);
router.delete("/eliminarMensaje/:id", mensajeController.eliminarMensaje);
router.get("/listarMensaje", mensajeController.listarMensaje);
router.get("/mostrarMensaje/:id", mensajeController.mostrarMensaje);

module.exports = router;