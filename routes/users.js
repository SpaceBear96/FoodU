var express = require("express");
var axios = require("axios");
var index = require("../config/index");
var router = express.Router();

/* GET users listing. */
router.post("/register", (req, res) => {
  const { name, lsname, email, uni, rol, pass } = req.body;
  data = {
    Name: name,
    LastName: lsname,
    Role: parseInt(rol),
    Email: email,
    Password: pass,
    University: parseInt(uni)
  };
  path = index.url + "/users/create";
  axios
    .post(path, data)
    .then(rs => {
      console.log(rs);
      res.render("menu");
    })
    .catch(error => {
      console.log(error);
    });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  data = {
    Email: email,
    Password: password
  };
  path = index.url + "/users/login";
  console.log(data);
  axios
    .post(path, data)
    .then(rs => {
      if(rs.data.Token === undefined){
        console.log(rs.data.message);
        var men = rs.data.message;
        res.redirect("/login?msg="+men+"");
      }else{
        index.token = rs.data.Token;
        console.log(index.token);
        res.redirect("/menu");  
      }
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;
