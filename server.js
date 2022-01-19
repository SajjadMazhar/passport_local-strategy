const express = require("express")
const app = express()
const {connectMongoose, User} = require("./database")
const ejs = require("ejs")
const passport = require("passport")
const {initializingPassport, isAuthenticated} = require("./passport-config")
const expressSession = require("express-session")

connectMongoose()
initializingPassport(passport)

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(expressSession({secret:"secret", resave:false, saveUninitialized:false}));
app.use(passport.initialize())
app.use(passport.session())

app.set("view engine", "ejs");

app.get("/", (req, res)=>{
    res.render("index")
})
app.get("/register", (req, res)=>{
    res.render("register") 
})
app.get("/login", (req, res)=>{
    res.render("login") 
})

app.get("/profile",isAuthenticated, (req, res)=>{
    res.send(req.user)
})

app.get("/logout", (req, res)=>{
    req.logout()
    res.send("logged out")
})

app.post("/register", async(req, res)=>{
    const user = await User.findOne({username:req.body.username})
    
    if(user) res.status(400).send("User already exists");

    const newUser = await User.create(req.body);
    res.status(201).send("user created")
})

app.post("/login", passport.authenticate("local", {
    failureRedirect:"/login", successRedirect:"/"
}), async(req,res)=>{
})

app.listen(4000, ()=>{
    console.log("server is running on port", 4000)
})