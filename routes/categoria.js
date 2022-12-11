var express = require("express");
var CategController = require("../controllers/categoria");

var router = express.Router();

router.get("/probandoCategoria", CategController.probandoCategoria);
router.post("/testeandoCategoria", CategController.testeandoCategoria);

router.post("/guardarCategoria", CategController.save);
router.put("/updateCategoria/:id", CategController.updateCategoria);
router.delete("/eliminarCategoria/:id", CategController.eliminarCategoria);
router.get("/listarCategoria", CategController.listarCategoria);
router.get("/mostrarCategoria/:id", CategController.mostrarCategoria);

module.exports = router;