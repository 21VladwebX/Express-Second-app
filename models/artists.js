var db = require('../db');
var ObjectId = require('mongodb').ObjectId;



exports.all = function(cb) {
  db.get().collection('artists').find().toArray(function(err, docs){
    cb(err,docs);
  });
}

exports.findById = function(id,cb){
  db.get().collection('artists').findOne({_id: ObjectId(id) }, function(err, docs){
    cb(err, docs);
  });
}

exports.create = function(artist,cb){
  db.get().collection('artists').insert(artist,function(err,result){
    cb(err,result)
  });
}


exports.update = function (id, newData, cb) {
  db.get().collection('artists').updateOne(
    { _id: ObjectId(id) },
    //{ name: newData },// передает как объект и инсертит не верно,
    newData, // а так верно
    function(err, result){
      console.log(newData);
      cb(err,result);
    });
}


exports.delete = function (id , cb){
  db.get().collection('artists').deleteOne(
    { _id : ObjectId(id) },
    function(err,result){
    cb(err,result);
  });
}
