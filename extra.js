const extra=require("mongoose")

extra.connect("mongodb://localhost:27017/admin")
.then(()=>{
    console.log('extra admin connected');
})
.catch((e)=>{
    console.log('failed');
})

const logInSchema=new extra.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const LogInCollection=new extra.model('LogInCollection',logInSchema)

module.exports=LogInCollection