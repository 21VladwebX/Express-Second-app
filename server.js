var express = require('express'),
    bodyParser = require('body-parser'),
  //  MongoCLient = require('mongodb').MongoClient, //для подключения к бд
    ObjectId = require('mongodb').ObjectId; //   все id которые создаються в mongodb это спецальные ObjectId  и по этомукогда нам необходимо найти какойто документ нам необходимо  эту строку конвертировать в ObjectId

var db = require('./db');

var app = express();
//var db;



app.use(bodyParser.json()); // строчка нужна чтобы парсить правильно json, который передали в  body
app.use(bodyParser.urlencoded({extended: true})); // стока нужна чтобы  правильно парсить даные формы

// var artists = [
//   {
//     id: 1,
//     name: 'Metalica'
//
//   },
//   {
//     id: 2,
//     name: 'Iron Maiden'
//
//   },
//   {
//     id: 3,
//     name: 'Deep Purple'
//
//   }
// ]

app.get('/', function(req, res){
  res.send('Hello API!');
} );

app.get('/artist', function(req,res){
  db.get().collection('artists').find().toArray(function(err, docs){ //docs - все документы которые мы нашли в колекции артиста
    if(err){
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(docs);
  });
  //res.send(artists);
} );

app.get('/artist/:id',function(req,res) {
  db.get().collection('artists').findOne({_id: ObjectId(req.params.id) }, function(err, docs){
    if(err){
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(docs );
  });
  // var artist = artists.find(function(artist){
  //   return artist.id === Number(req.params.id);
  // } );
  // //console.log(req.params);
  // res.send(artist);
} );

app.post('/artist', function(req,res){
  var artist = {
    //id: Date.now(),
    name: req.body.name
  };
  //console.log(req.body.name);
  //artists.push(artist);
  db.get().collection('artists').insert(artist,function(err,result){
    if(err){
      console.log(err);
      return res.sendStatus(500);
    }

    //console.log(artist.name);
    res.send(artist);// mongodb автоматически всавляет в негo id
  });
  //res.send('post data');
});

app.put('/artist/:id',function(req,res){

  db.get().collection('artists').updateOne(  /*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/
    { _id: ObjectId(req.params.id) },
    { name: req.body.name },
    function(err, result){
      if(err){
        console.log(err);
        return res.sendStatus(500);
      }
    //  console.log(ObjectId(req.params.id));
    //  console.log(req.body.name);
      res.sendStatus(200);
    }
  )
  // var artist = artists.find(function(artist){
  //   return artist.id === Number(req.params.id);
  // } );
  // artist.name = req.body.name;
  // res.sendStatus(200);
});


app.delete('/artist/:id', function(req,res) {
  db.get().collection('artists').deleteOne(
    {_id: ObjectId(req.params.id) },
    function(err, result){
      if(err){
        console.log(err);
        return res.sendStatus(200);
      }
      res.sendStatus(200);

    }
  )


  // artists = artists.filter(function(artist){
  //   return artist.id !== Number(req.params.id);
  // });
  // console.log(req.params.id);
  // console.log(artists);
  // res.sendStatus(200);
});



// MongoCLient.connect('mongodb://localhost:27017/myapi', function(err, database){
db.conect('mongodb://localhost:27017/myapi', function(err){
  if(err){
    return console.log(err);
  }
  app.listen('3012', function(){
    console.log('API app started');
  } );
});
