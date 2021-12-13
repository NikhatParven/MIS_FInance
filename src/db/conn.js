const mongoose = require("mongoose");
require('./faculty_staff');
mongoose.connect("mongodb://localhost:27017/Complaint",{
useNewUrlParser:true,
useUnifiedTopology:true
}).then(()=>{
    console.log('connection sucesll');
}) .catch(()=>{
    console.log('no connection');
})
