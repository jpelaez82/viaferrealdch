/*  NODEJS APP START */
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');

/* MongoDB Atlas Connection */
/*var uri = "mongodb+srv://one-mongo:*atlasOn3*@cluster0-qidhz.mongodb.net/test?retryWrites=true&w=majority";*/
var uri = "mongodb://one-mongo:*atlasOn3*@cluster0-shard-00-00-qidhz.mongodb.net:27017,cluster0-shard-00-01-qidhz.mongodb.net:27017,cluster0-shard-00-02-qidhz.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority";
var dbConn = mongodb.MongoClient.connect(uri);

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, 'public')));

app.post('/add-encuesta', function(req, res) {
    dbConn.then(function(db) {
        delete req.body._id;
        db.collection('encuesta').insertOne(req.body);
    });
    res.send('Datos recibidos:\n' + JSON.stringify(req.body));
});

app.listen(process.env.PORT || 3000, process.env.IP || '0.0.0.0');