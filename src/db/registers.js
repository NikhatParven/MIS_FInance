const mongoose = require("mongoose");
const  miscomplaintSchema= new mongoose.Schema({
    yourname:{
        type:Array,
        required:[true,"name  is required"]
    },
    youremail:{
        type:Array,
        required:[true,"email is required"]

        
    },
    yourmessage:{
        type:Array,
        required:[true,"message is required"]
    }
})

//now we need to create a collection
const Index = new mongoose.model("Info",miscomplaintSchema);
module.exports= Index;
