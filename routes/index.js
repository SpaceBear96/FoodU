var express = require('express');
var axios = require('axios');
var index = require("../config/index");
var router = express.Router();

router.get('/',(req,res)=>{
  res.render("index");
});

router.get('/login',(req,res)=>{
  men = req.param("msg");
  console.log(men);
  res.render("login",{msg:men});
});

router.get('/about',(req,res)=>{
  res.render("about");
});

router.get('/menu',(req,res)=>{
  console.log("Estas en el menu");
  console.log(index.token);
  res.render("menu");

});

router.get('/register',(req,res)=>{
  path=index.url+'/universities';
  axios.get(path)
  .then(function (response) {
    console.log(response.data );
    res.render('register',{ data:response.data });
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });
});

module.exports = router;
