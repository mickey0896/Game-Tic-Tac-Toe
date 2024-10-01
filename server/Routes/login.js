const express = require("express");
const router = express();
const { login } = require("../Controllers/login");

router.post("/login", login);

module.exports = router;
