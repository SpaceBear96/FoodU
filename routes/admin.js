var express = require("express");
var axios = require("axios");
var index = require("../config/index");
var aws = require('../libs/aws-s3');
const NEW_BUCKET_NAME = index.aws.s3.BUCKET_NAME + '/Comida'; 
var router = express.Router();
var ID;
/* GET users listing. */
router.post('/insert',function (req, res, next) {
    const { Documento } = req.files;
    console.log(Documento);
    const { Nombre, Descripcion, Precio,Stock} = req.body;
    var nm = aws.putObject(NEW_BUCKET_NAME, Documento);
    console.log("Posiblenombre : "+nm);
    data = {
        Nombre:Nombre,
        Descripcion:Descripcion,
        Precio:Precio,
        Stock:Stock,
        User: index.datos.id,
        Img: nm
    }
    path=index.url+'/food/create';
    axios
    .post(path, data,{ headers: {"Authorization" : `Bearer ${index.datos.token}`} })
    .then(rs => {
        console.log(rs);
        res.redirect("/admin");
    })
    .catch(error => {
      console.log(error);
    });
    // const fd = new FormData();
    // fd.append('Document',imagen,req.file.originalname);
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

router.get("/pendientes", (req, res) => {
    console.log("Llegamos a admin con el index: ",index.datos.id);
    ID = index.datos.id;
    if(ID != 0){
    console.log("Variable ",ID);
    path=index.url+'/order/pendientes/'+ID;

    axios.get(path,{ headers: {"Authorization" : `Bearer ${index.datos.token}`} })
    .then(function (response) {
        console.log(response.data );
        res.render("admin/pendiente",{datos: response.data},function(err,html){
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

router.get("/terminadas", (req, res) => {
    console.log("Llegamos a admin con el index: ",index.datos.id);
    ID = index.datos.id;
    if(ID != 0){
    console.log("Variable ",ID);
    path=index.url+'/order/terminadas/'+ID;

    axios.get(path,{ headers: {"Authorization" : `Bearer ${index.datos.token}`} })
    .then(function (response) {
        console.log(response.data );
        res.render("admin/terminadas",{datos: response.data},function(err,html){
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

router.get("/food/view/:id",(req,res)=>{
    id = req.params.id;
    ID_ = index.datos.id;
    if(ID_ != 0){
    console.log("Variable ",id);
    path=index.url+'/food/view/'+id;

    axios.get(path,{ headers: {"Authorization" : `Bearer ${index.datos.token}`} })
    .then(function (response) {
        console.log(response.data );
        res.render("admin/editar",{datos: response.data},function(err,html){
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

router.post("/food/edit",(req,res)=>{
    const { Documento } = req.files;
    var nm;
    if(Documento){
        nm = aws.putObject(NEW_BUCKET_NAME, Documento);
        console.log("Posiblenombre : ",nm);
    }else{
        nm = req.body.ngm;
        console.log("Mantiene la imagen : ",nm);
    }

    const { Nombre,Descripcion,Price,Stock,Status,Image} = req.body

    data ={
        Nombre:Nombre,
        Descripcion:Descripcion,
        Price:Price,
        Stock:Stock,
        Image:Image
    }

    console.log(data);

});

router.post('/verificar',(req,res)=>{
    const {ID,Code} = req.body;
    console.log(req.body);
    data={
        Code:Code
    }

    path=index.url+'/order/confirmar';
    console.log("====================================================");
    console.log("El codigo es",data.Code);
    axios
    .post(path, data,{ headers: {"Authorization" : `Bearer ${index.datos.token}`} })
    .then(rs => {
        console.log(rs);
        res.redirect("/admin/pendientes");
    })
    .catch(error => {
      console.log(error);
    });

    console.log(ID,Code);
});

module.exports = router;
