const mongoose = require('mongoose')
const DBName = 'food-delivery', username = 'krishnamohanbitsindri', password = 'krishna_123'
const uri = `mongodb+srv://${username}:${password}@cluster0.npaovwg.mongodb.net/${DBName}?retryWrites=true&w=majority`
const options =  {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
const mongoDB = async () => {
    const connection = await mongoose.connect(uri, options);
    // console.log('mongoDB connected: ')
    // const db = await connection.connection.db.collection('foodData')
    // const data = db.find({})
    // const arr = await data.toArray((err, data) => {
    //     if(err) { console.log('err'); return (err);}
    //     console.log('data');
    //     return data
    // })
    // console.log(arr);
    return connection;

}
module.exports = mongoDB;