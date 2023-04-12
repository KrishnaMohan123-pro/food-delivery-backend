const express = require('express');
const mongoDB = require('./db')
const cors = require('cors')
const port = 5000
const app = express();
app.use(cors())
app.use(express.json())
mongoDB();


app.get('/', (req, res) => res.send('express app running'));
app.use('/user', require('./routes/user'))
app.use('/items', require('./routes/items'))
app.use('/category', require('./routes/categoy'))
app.use('/checkout', require('./routes/checkout'))

app.listen(port, () => console.log(`app listening to ${port}`))