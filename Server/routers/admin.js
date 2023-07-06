const { getAppInfo, getMostRated } = require("../controllers/admin");
const { isAuth, isAdmin } = require("../middleware/Auth");

const router = require("express").Router();

router.get("/app-info",
    isAuth,
    isAdmin,
    getAppInfo);
router.get("/most-rated",
    // isAuth,
    // isAdmin,
    getMostRated);

module.exports = router;
