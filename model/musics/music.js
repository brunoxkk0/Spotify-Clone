const MongoClient = require('mongodb').MongoClient;

module.exports = class Music {

    static async insertMusic(req){

        const conn = await MongoClient.connect('mongodb://127.0.0.1:27017/spotify_clone');

        const db = conn.db();

        return this.getMusic(req.body.music_name).then((res) => {

            if(res.length === 0){

                let musicData = {
                    "music_name": req.body.music_name,
                    "singer_name": req.body.singer_name,
                    "single_cover": req.body.single_cover,
                    "album_name": req.body.album_name,
                    "music_lyric": req.body.music_lyric,
                    "music_length": req.body.music_length,
                    "owner_user": req.body.owner_user
                };

                return db.collection('musics').insertOne(musicData);
            }

            return {insertedCount:0};
        });
    }

    static async getMusic(music_name){
        const conn = await MongoClient.connect('mongodb://127.0.0.1:27017/spotify_clone');
        const db = conn.db();
        return await db.collection('musics').find({music_name:music_name}).toArray();
    }

    static async removeMusic(music_id){
        const conn = await MongoClient.connect('mongodb://127.0.0.1:27017/spotify_clone');
        const db = conn.db();
        return await db.collection('musics').deleteOne({_id:music_id});
    }
}