// const mysql = require('mysql');
const express = require('express');
const app = express();
const con = require('./connection');
const cloudinary = require('cloudinary');
// const getpostsbytopic = require('./posts');
const posts = require('./posts');

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 8080;
app.listen(port);

cloudinary.config({
    cloud_name:'pixelsapp',
    api_key: '921914376421383',
    api_secret: 'Kcsx9wMBbZVG8O-raoth2N76ByM'
});

console.log('port running on 8080');

    con.query('USE photoapp;', (err, result) => {
         if (err) throw err;
         console.log('Using the photoapp database');
     });


    app.get('/getpostsbytopic/:topic_id', (req, res) => {
        if(!isNaN(req.params.topic_id)) {
            posts.getpostsbytopic(req.params.topic_id).then((result) => {
                console.log(result);
                res.status(201).json({
                    result
                });
            }).catch((err) => { throw err; });
        }
        else{
            console.log('Not null failed');
        }
    });

    app.get('/getinitialinfo/:user_id', (req, res) => {
        if(!isNaN(req.params.user_id)) {
            posts.getinitialinfo(req.params.user_id).then((result) =>{
                console.log(result);
            }).catch((err) => { throw err });
        }
        else{
            console.log('Not null failed');
        }
    });

    // app.get('/getimage', (req, res) => {
    //     res.send(
    //         //cloudinary.image("https://upload.wikimedia.org/wikipedia/commons/0/0c/Scarlett_Johansson_Césars_2014.jpg", {type: "fetch"})    
    //         cloudinary.image("https://upload.wikimedia.org/wikipedia/commons/0/0c/Scarlett_Johansson_Césars_2014.jpg", {type: "fetch"})
    //     );
    // });
    
    
    

//  app.get('/getallposts', (req, res) => {
//      con.query('CALL Display_Posts()', (err, result) => {
//          if (err) throw err;
//           //console.log('Called SPS');
//          console.log(result);
//          res.status(201).json({
//              message: result
//          });
//      });
//  });


//   app.get('/getpostsbyid/:id', (req, res) => {
//      con.query('CALL Get_Posts_By_id(?)', [req.params.id],  (err, result) => {
//          if(err) throw err;
//          console.log(result);
//          res.status(201).json({
//              result
//          });
//      });
//  });


// module.exports = con;