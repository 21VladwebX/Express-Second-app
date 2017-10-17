var MongoCLient = require('mongodb').MongoClient;


var state = {
  db: null

};

exports.conect = function (url, done){
  if(state.db){
    return done();
  };
  MongoCLient.connect( url, function( err, db){
    if(err){
      return done(err);
    }
    state.db = db;
    done();
  })
}


exports.get = function(){
  return state.db; // возвращает ссылку на нашу бд этим абстрогируемся от монги и можем юзать любую бд, а это берет ссылку на бд
}
