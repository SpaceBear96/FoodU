var express = require("express");
var axios = require("axios");
var index = require("../config/index");
var router = express.Router();
var ID;
/* GET users listing. */

router.post("/food", (req, res) => {
    const { Nombre,Descripcion,Precio,Stock} = req.body;
    console.log(req.body);
    data = {
      Nombre:Nombre,
      Descripcion:Descripcion,
      Precio:Precio,
      Stock:Stock
    };
    console.log(data);
    return true;
  });
  

router.get("/", (req, res) => {
    console.log("Llegamos a admin con el index: ",index.datos.id);
    ID = index.datos.id;
    if(ID != 0){
    console.log("Variable ",ID);
    path=index.url+'/food/'+ID;

    axios.get(path,{ headers: {"Authorization" : `Bearer ${index.datos.token}`} })
    .then(function (response) {
        console.log(response.data );
        res.render("admin/index",{datos: response.data},function(err,html){
            console.log(response.data);
            if(err) throw err;
            res.render("admin/navbar",{
                section: html,
            });
        });
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    });
    }else{
        msg="TIENES QUE LOGUEARTE PRIMERO"
        res.redirect('/login?msg='+msg);    
    }
});

router.get("/disconnect",(req,res)=>{
    ID = index.datos.id;
    if(ID != 0){
    index.datos.id = 0;
    index.datos.id ="";
    console.log(index.datos);
    res.redirect('/');
    }else{
        msg="TIENES QUE LOGUEARTE PRIMERO"
        res.redirect('/login?msg='+msg);    
    }
});

router.get("/register",(req,res)=>{
    ID = index.datos.id;
    if(ID != 0){
    res.render("admin/register",{datos: index.datos},function(err,html){
        if(err) throw err;
        res.render("admin/navbar",{
            section: html
        });
    });
}else{
        msg="TIENES QUE LOGUEARTE PRIMERO"
        res.redirect('/login?msg='+msg);    
    }
});


module.exports = router;
