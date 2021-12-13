const express= require("express");
const path= require("path");
const app = express();
const hbs= require("hbs");

require("./db/conn");
const Index =require("./db/registers");
const employee=require("./db/faculty_staff");

const port =process.env.PORT||3000;

const static_path=path.join(__dirname,"../public");
const template_vpath = path.join(__dirname,"../Templates/views");
const partial_path = path.join(__dirname,"../Templates/partials");
app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.set("view engine","hbs");

app.set("views",template_vpath);
hbs.registerPartials(partial_path);


app.get("/",(req,res)=>{
    console.log("in home");
    res.render("index");
    });
app.get("/login",(req,res)=>{
    console.log("in login");
    res.render("login");
});

app.get("/student",(req,res)=>{
    console.log("in student");
    res.render("student");
});


app.get("/loginEmployee",(req,res)=>{
    console.log("in loginEmployee");
    res.render("loginEmployee");
});

app.get("/employee",(req,res)=>{
    console.log("in Employee");
    res.render("employee");
});
app.get("/index",(req,res)=>{
    console.log("in INdex");
    res.render("index");
});
app.get("/complaint",(req,res)=>{
    console.log("in complaint INdex");
    res.render("complaint");
});
let id=null;
app.post("/employee",(req,res)=>{
    console.log("in employee post");
    id=req.body.typeEmailX;
    console.log(id);
    res.render("employee");
});
app.post("/complaint",async(req,res)=>{
    try
    {
        // console.log('hello');
          const Complaint =new Index({
          yourname:req.body.name,
          youremail:req.body.email,
          yourmessage: req.body.message
         })
     
         const complaint_send  = await Complaint.save();

        res.render("complaint");
        
    }
    catch (error)
    {
        res.status(400).send(error);
    }
})



app.post("/stafflogin",async(req,res)=>{

    try{
        const Userid=req.body.staffuserid;
        const Pass=req.body.staffpassword;
        const Staff=await employee.findOne({userid:Userid});
        if(Staff.password===Pass){
            res.render("staffHome",{faculty:Staff});
        }
        else{
            res.send("Password is incorrect.");
        }
    }catch(error){
        console.log(error);
        res.status(400).send("Userid does Not Exist.");
    }
});






app.listen(port,()=>{
    console.log(`Server running at http://${port}`);
})