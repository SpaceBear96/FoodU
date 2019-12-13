var express = require("express");
var axios = require("axios");
var index = require("../config/index");
var router = express.Router();

/* GET users listing. */

router.post("/register", (req, res) => {
  const { name, lsname, email, uni, pass } = req.body;
  console.log("Nuestro usuario es ", uni);
  data = {
    Name: name,
    LastName: lsname,
    Role: { Role: 1 },
    Email: email,
    Password: pass,
    University: { University: uni }
  };
  path = index.url + "/users/create";
  axios
    .post(path, data)
    .then(rs => {
      index.datos.token = rs.data.Token;
      index.datos.id = rs.data.ID;
      index.datos.uni_id = res.data.Universities_ID;
      console.log(index.token);
      res.redirect("/admin");
    })
    .catch(error => {
      console.log(error);
    });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  data = {
    Email: email,
    Password: password
  };
  path = index.url + "/users/login";
  console.log(data);
  axios
    .post(path, data)
    .then(rs => {
      if (rs.data.Token === undefined) {
        console.log(rs.data.message);
        var men = rs.data.message;
        res.redirect("/login?msg=" + men + "");
      } else {
        if (rs.data.Role == 2) {
          var men = "Administrador solo para vendedores";
          res.redirect("/login?msg=" + men + "");
        } else {
          console.log("Token es :", rs.data.Token);
          console.log("ID es :", rs.data.ID);
          console.log(rs.data);
          index.datos.token = rs.data.Token;
          index.datos.id = rs.data.ID;
          index.datos.uni_id = rs.data.Universities_ID;
          res.redirect("/admin");
        }
      }
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;
