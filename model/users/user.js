const MongoClient = require('mongodb').MongoClient;

module.exports = class User {
     static async insertUsers(req){
         const conn = await MongoClient.connect('mongodb://127.0.0.1:27017/spotify_clone');
         const db = conn.db();
         let is_adm = false;

         return this.getUser(req.body.username).then((res) =>{
             if(res.length === 0){

                 if(parseInt(req.body.is_adm_code) === 1010){
                     is_adm = true;
                 }

                 let userData = {
                     "username": req.body.username,
                     "name": req.body.name,
                     "email": req.body.email,
                     "password": req.body.password,
                     "is_adm": is_adm
                 };

                 return db.collection('users').insertOne(userData);
             }

             return {insertedCount:0};
         });
     }

     static async getUser(username){
         const conn = await MongoClient.connect('mongodb://127.0.0.1:27017/spotify_clone');
         const db = conn.db();
         return await db.collection('users').find({username}).toArray();
     }
}