const MongoClient = require('mongodb').MongoClient;

module.exports = class Music {

    static async insertMusic(req){

        const conn = await MongoClient.connect('mongodb+srv://dbspot:123456a@cluster0.8rpch.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

        const db = conn.db();

        return this.getMusic(req.body.music_name).then((res) => {

            if(res.length === 0){

                let musicData = {
                    "music_name": req.body.music_name,
                    "singer_name": req.body.singer_name,
                    "album_name": req.body.album_name,
                    "music_duration": req.body.music_duration,
                    "owner_user": req.session.login,
                    "album_cover": req.body.album_cover
                };

                return db.collection('musics').insertOne(musicData);
            }

            return {insertedCount:0};
        });
    }

    static async getMusic(music){
        const conn = await MongoClient.connect('mongodb+srv://dbspot:123456a@cluster0.8rpch.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
        const db = conn.db();
        return await db.collection('musics').find({music_name: music}).toArray();
    }

    static async getAdminMusics(email){
        const conn = await MongoClient.connect('mongodb+srv://dbspot:123456a@cluster0.8rpch.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
        const db = conn.db();
        return await db.collection('musics').find({owner_user: email}).toArray();
    }
}