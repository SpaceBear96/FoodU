var express = require("express");
var axios = require("axios");
var index = require("../config/index");
var router = express.Router();

/* GET users listing. */
router.get("/", (req, res) => {
    res.render('admin/index');
});


module.exports = router;
