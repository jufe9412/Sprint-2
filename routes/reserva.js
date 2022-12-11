var express = require("express");
var reservaController = require("../controllers/reserva");

var router = express.Router();

router.get("/probandoReserva", reservaController.probandoReserva);
router.post("/testeandoReserva", reservaController.testeandoReserva);

router.post("/guardarReserva", reservaController.save);
router.put("/updateReserva/:id", reservaController.updateReserva);
router.delete("/eliminarReserva/:id", reservaController.eliminarReserva);
router.get("/listarReserva", reservaController.listarReserva);
router.get("/mostrarReserva/:id", reservaController.mostrarReserva);

module.exports = router;