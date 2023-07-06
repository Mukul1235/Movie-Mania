const express = require("express");
const {
  create,
  updateActor,
  removeActor,
  searchActor,
  getLatestActor,
  getSingleActor,
  getActors,
} = require("../controllers/actor");
const { isAuth, isAdmin } = require("../middleware/Auth");
const { uploadImage } = require("../middleware/multer");
const { actorValidator, validate } = require("../middleware/validator");
const router = express.Router();

router.post(
  "/create",
  isAuth,
  isAdmin,
  uploadImage.single("avatar"),
  actorValidator,
  validate,
  create
);
router.post(
  "/update/:ActorId",
  isAuth,
  isAdmin,
  uploadImage.single("avatar"),
  actorValidator,
  validate,
  updateActor
);

router.delete("/:ActorId", isAuth, isAdmin, removeActor);
router.get("/search", isAuth, isAdmin, searchActor);
router.get("/latest-actors", isAuth, isAdmin, getLatestActor);
router.get('/actors'
  , isAuth,
  isAdmin,
  getActors)
router.get("/single/:id", getSingleActor);

module.exports = router;
