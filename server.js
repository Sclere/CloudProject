const express = require('express');
const bodyParser= require('body-parser');
const app = express();
var path  = require('path');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(bodyParser.json());

app.engine('ejs', require('express-ejs-extend'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

var AWS = require('aws-sdk');
var S3 = require('aws-sdk/clients/s3');

var mys3 = new AWS.S3();
var myBucket = 'my.unique.bucket.name';
var myKey = 'myBucketKey';



const MongoClient = require('mongodb').MongoClient;

/*MLAB Account
* Account name : ClementGarrigues
* email : clementgarrigues@gmail.com
* username : Sclere
* mdp : IBl2ssTh2RainsDownInAfrica
* */

/*DB
* username : Sclere
* mdp : IBl2ssTh2RainsDownInAfrica
* */

var db;

MongoClient.connect('mongodb://Sclere:IBl2ssTh2RainsDownInAfrica@ds115749.mlab.com:15749/cloud-project-test', function(err, client){
    if (err) return console.log(err);
    db = client.db('cloud-project-test');
    app.listen(3000, function() {
        console.log('listening on 3000');
    });
});


app.get('/', function(req, res) {
    db.collection('subscriptions').find().toArray(function (err, result) {
        if (err) return console.log(err);
        res.render('index.ejs', {subscriptions: result});
    });
});

app.get('/index', function (req, res) {
    res.redirect('/');
});



app.get('/create', function (req, res) {
    res.render(__dirname + '/views/create.ejs');
});

/******** Lire tous les Elements *********/
app.get('/', function(req, res) {
    db.collection('subscriptions').find().toArray(function (err, result) {
        if (err) return console.log(err);
        res.render('index.ejs', {subscriptions: result});
    });
});

/******** Création d'un Element*********/
app.post('/subscriptions', function (req, res){
    db.collection('subscriptions').save(req.body, function(err, result){
    if (err) return console.log(err);

    console.log('saved to database');
    res.redirect('/');
    });
});

var prevName;
app.put('/', function (req, res){
    prevName = req.body.prevlastName;
});



/******** Mise a jour d'un Element*********/
app.post('/update', function (req,res) {
   db.collection('subscriptions').findOneAndUpdate({lastName : prevName},{
       $set: {
           lastName: req.body.lastName,
           firstName: req.body.firstName,
           birthDate: req.body.birthDate,
           adress: req.body.adress,
           email: req.body.email,
           subscriptionend: req.body.subscriptionend,
           active: req.body.active,
           renewable: req.body.renewable
       }
   }, {
       sort: {_id: -1},
       upsert: true
   }, function (err, result) {
       if (err) return res.send(err);
       res.redirect('/');
   });
});

/******** Suppression d'un Element*********/
app.delete('/subscriptions', function (req, res) {
    db.collection('subscriptions').findOneAndDelete(
                        {lastName: req.body.lastName},
        function (err, result) {
            if (err) return res.send(500, err);
    });
    res.redirect('/');
});