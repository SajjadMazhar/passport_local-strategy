const mongoose = require("mongoose")

exports.connectMongoose = ()=>{
    mongoose.connect("mongodb://localhost:27017/passport").then(e=>{
        console.log("connected to mongodb")
    }).catch(err=>{
        console.log(err)
    });
}

const userSchema = new mongoose.Schema({
    name:String,
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:String,

})

exports.User = mongoose.model("Users", userSchema);