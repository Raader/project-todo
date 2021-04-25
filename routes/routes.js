const express = require("express");
const router = express.Router();

router.use("/user", require("./user"));
router.use("/project", require("./project"));
router.use("/todo", require("./todo"));
router.use("/side", require("./side"));
module.exports = router;
