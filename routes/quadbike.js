var express = require("express");
var QuadbikeController = require("../controllers/quadbike");

var router = express.Router();

router.get("/probandoQuadbike", QuadbikeController.probandoQuadbike);
router.post("/testeandoQuadbike", QuadbikeController.testeandoQuadbike);

router.post("/guardarQuadbike", QuadbikeController.save);
router.put("/updateQuadbike/:id", QuadbikeController.updateQuadbike);
router.delete("/eliminarQuadbike/:id", QuadbikeController.eliminarQuadbike);
router.get("/usuarios", QuadbikeController.listarQuadbike);
router.get("/usuario/:id", QuadbikeController.mostrarQuadbike);

module.exports = router;