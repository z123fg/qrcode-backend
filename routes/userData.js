const express = require("express");

const UserDataController = require("../controllers/userData");
const checkAuth = require("../middlewares/check-auth");
const router = express.Router();

router.get("/", checkAuth, UserDataController.getUserData);
router.post("/", checkAuth, UserDataController.postUserData);
router.post("/list", checkAuth, UserDataController.postUserDataList);
router.put("/:id", checkAuth, UserDataController.patchUserData);
router.delete("/:id", checkAuth, UserDataController.deleteUserData);

module.exports = router;