const express = require("express");
const { create } = require("../controllers/actor");
const { uploadImage } = require("../middleware/multer");
const { actorValidator, validate } = require("../middleware/validator");
const router = express.Router();

router.post("/create", uploadImage.single("avtar"),actorValidator,validate, create);

module.exports = router;
