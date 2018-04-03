const express = require('express');
//const app = express.Router();
const app = express();
const data =  require('./index.js');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 8080;
app.listen(port);
console.log('port listenong on 8080');

app.get('/', (req, res) => {
    res.send('This is the HomePage');
});

app.get('/getinfo', (req, res) => {
    res.status(200).json({
        message:'getting info correctly'
    });
});

app.post('/addapost', (req, res, next) => {
    const DetailsOfPost = {
        post_id: req.body.post_Id,
        post_description: req.body.post_Description,
        post_by: req.body.post_By,
        post_url: req.body.post_Url
    };

    res.status(201).json({
        message:'Got the data',
        DetailsOfPost: DetailsOfPost
    });

    //const sql_query = 'CALL ADD_POST(?)';
    data.query('CALL ADD_POST(?, ?, ?, ?)', [DetailsOfPost.post_id, DetailsOfPost.post_description, DetailsOfPost.post_by, DetailsOfPost.post_url] , (err, result) => {
        if (err) throw err;
        console.log(result);
    });
});

data.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
    data.query('USE sample_photoapp;', (err, result) => {
        if (err) throw err;
        console.log('Using the sample_photoapp database');
    });


app.get('/posts', (req, res) => {
        const sql_query = 'CREATE TABLE POSTS(post_Id VARCHAR(250), post_Description VARCHAR(350), post_By VARCHAR(50), post_URL VARCHAR(350), PRIMARY KEY(post_Id))';
        data.query(sql_query, (err, result) => {
            if(err) {
                throw err;
            } 
            else {
                console.log(result);
                console.log('Posts Table Created');
            }
        });
    });
});


app.get('/addpost', () => {
    data.query('USE sample_photoapp;', (err, result) => {
        if (err) throw err;
        console.log('Using the sample_photoapp database');
    });
    const postdetails = {post_ID:'13', post_Description:'This is cool !', post_By:'Vicky', post_URL:'/ok/ji/dhudsuduhsd8d8sdsudhsud'};
    const sql_query = 'INSERT INTO POSTS SET ?';
    data.query(sql_query, postdetails , (err, result) => {
        if (err) throw err;
        console.log(result);
    });
});

app.get('/getallposts', () => {
    data.query('CALL Display_Posts()', (err, result) => {
        if (err) throw err;
        console.log('Called SPS');
        console.log(result);
    });
});




