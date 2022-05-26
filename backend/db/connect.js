const mongoose = require('mongoose')

const connectDB = (url) =>{
return mongoose.connect(url,{
    useNewUrlParser: true,
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology:true,
})
.then(()=>console.log('Connected to Database...'))
.catch((err)=>console.log(err));    
}

module.exports = connectDB