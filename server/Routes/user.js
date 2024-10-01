const express = require("express");
const router = express();
const { read, list, create, update } = require("../Controllers/user");

router.get("/getUser/:email", read);
router.get("/getUser", list);
router.post("/endGame", update);

module.exports = router;
