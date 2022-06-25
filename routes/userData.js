const express = require("express");

const UserDataController = require("../controllers/userData");
const checkAuth = require("../middlewares/check-auth");
const router = express.Router();

router.get("/", checkAuth, UserDataController.getGlobalUserDataList);
router.post("/", checkAuth, UserDataController.createSingleUserData);
router.post("/list", checkAuth, UserDataController.createUserDataList);
router.put("/:id", checkAuth, UserDataController.updateUserData);
router.delete("/:id", checkAuth, UserDataController.deleteUserData);

module.exports = router;