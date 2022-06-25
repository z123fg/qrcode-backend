const express = require("express");

const StsController = require("../controllers/sts");
const checkAuth = require("../middlewares/check-auth");
const router = express.Router();
router.post("/download", StsController.getDownloadLink);
router.post("/upload", StsController.getUploadLink);
router.get("/", checkAuth, StsController.getSTSToken);
module.exports = router;
