const mongoose = require('mongoose')
const db_url = process.env.MONGODB_URI;
mongoose.connect(db_url);
const conn = mongoose.connection;
conn.once('open',()=>{
    console.log('connected');
});
conn.on('error',(e)=>{
    console.log(e);
})
