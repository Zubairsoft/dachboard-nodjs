const express=require('express')
const mongoose=require('mongoose')
const {userModel,skillModel,experinceModel,serviceModel,projectModel,mediaModel}=require("./models/model") // Import model 
const passport=require('passport')
const passportSetup=require('./config/passport')
const passportLocalMongoose = require('passport-local-mongoose');
const bodyParser = require('body-parser'); // parser middleware
const session = require('express-session');  // session middleware
const connectEnsureLogin = require('connect-ensure-login'); //authorization
const LocalStrategy=require('passport-local')
const DB='mongodb://localhost/zubair'
const PORT = process.env.PORT || 5000; //Use PORT of Heroku or 5000
const app=express()

// conneting to database
mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true }).then((result)=>{console.log(result+"coneting database scuessfuly")})
.catch((error)=>{console.log(error+"error conection")});


app.use(express.urlencoded());
// ejs setting
app.set("view engine", "ejs"); 
app.set('views', 'public');
app.use(express.static('public'));

//Configure middleware

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(passport.initialize()); //Middleware to use Passport with Express
// app.use(passport.session()); //Needed to use express-session with passport
// passport.use(userModel.createStrategy());// Declear stratgy 

// // 

// app.use(session({
//     secret: 'r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
//   }));

//   //

//   passport.use(new LocalStrategy(
//     // function of username, password, done(callback)
//     function(email, password, done) {
//       // look for the user data
//       User.findOne({ email: email }, function (err, email) {
//         // if there is an error
//         if (err) { return done(err); }
//         // if user doesn't exist
//         if (!email) { return done(null, false, { message: 'Email not founde' }); }
//         // if the password isn't correct
//         if (!email.verifyPassword(password)) { return done(null, false, {   
//         message: 'Invalid password.' }); }
//         // if the user is properly authenticated
//         return done(null, email);
//       });
//     }
//   ));

//   // To use with sessions
// passport.serializeUser(userModel.serializeUser());
// passport.deserializeUser(userModel.deserializeUser());


// star routing 
// app.get(['/','/login'], (req, res) => {
//     res.render('login')
//   });
//   app.post('/login', passport.authenticate('local', { failureRedirect: '/' }),  function(req, res) {
// 	console.log(req.user)
// 	res.redirect('/home');
// });

// home routing for display profilo page
app.get("/home",   async (req, res) => {
    let user = await userModel.find(); // For show all information about user in user collection
    let skill = await skillModel.find();// For show all information about skill in skill collection
    let experience = await experinceModel.find();// For show all information about experince in experince collection
    let service = await serviceModel.find();// For show all information about service in service collection
    let project= await projectModel.find()// For show all information about project in project collection
    let media = await mediaModel.find();// For show all information media user in media collection
    res.render("home", {  user: user[0], skill: skill, experience: experience, service: service,project:project, media: media });
});

 //Routing for  show dachboard page
app.get("/edit",  async (req, res) => {
    let user = await userModel.find();
    res.render("dachboard", {  user: user[0] });
});


// Routing for edit profilo information and update data
app.post("/edit" , async (req, res) => {
    let user = await userModel.find();
    user = user[0];
// Update user information
    await userModel.updateOne( // To update user information
        { id: user.id },
        {
            $set: {
                FullName: req.body.fullname, 
                marketDes: req.body.mdesc,
                discription: req.body.desc,
                email: req.body.email,
                password:req.body.password,
                cv: req.body.cv,
                image:req.body.image
            }
        });
    console.log(user._id)
    res.redirect("/edit");
});

// skills routing for add and delete skills
 
// Routing for show skills page
app.get("/skill",   async (req, res) => {
    let skills = await skillModel.find(); // For select all infomation about skills
    res.render("skills", { skills: skills });
});


// Route for insert data into skill model
app.post("/skill", async (req, res) => {
    let data = {      
        skill: req.body.skill,
    }
    skill = new skillModel(data);
    await skill.save(function(err, doc) {
        if (err) return alert.error(err);
        console.log("Document inserted succussfully!"); // Make sure the doucment inserted succussflly
      });;

    let user = await userModel.find();
    userModel.updateOne(
        { _id: user[0]._id },
        { $push: { skill: skill._id } });
    console.log(user[0]._id)
    res.redirect("/skill");
});


//Route for delete data skills

app.post("/skill/delete/:id", async (req, res) => {
    console.log(await skillModel.findByIdAndRemove({ _id: req.params.id })); //For delete skill by using id
    res.redirect("/skill");
});

// Routing experince for add and delete experince
 
// Routing for show experince page
app.get("/experience",  async (req, res) => {
    let experience = await experinceModel.find();
    res.render("experience", {  experience: experience });
});

//  Routing inset data into experince model

app.post("/experience", async (req, res) => {
    let data = {
        exName: req.body.Experince,
        date:req.body.date
    }
    experience = new experinceModel(data); // For insert data to experince collection
    await experience.save(); // Save  experince data to collection
    res.redirect("/experience");

});

// Routing delete data from experince model
app.post("/experience/delete/:id", async (req, res) => {
    console.log(await experinceModel.findByIdAndRemove({ _id: req.params.id })); //Delete by document by using id of experince
    res.redirect("/experience");
});

//Routing for add and delete service
//Rounting for show service page
app.get("/service",  async (req, res) => {
    let service = await serviceModel.find();
    console.log(service)
    res.render("service", { service: service });
});
 
//Routing for  insert data into service model
app.post("/service", async (req, res) => {
    let data = {
        service: req.body.service,
        Image:req.body.img
    }
    service = new serviceModel(data);
    await service.save(); // for Save data into service collection
    res.redirect("/service");
});

//Routing for delete service

app.post("/service/delete/:id", async (req, res) => {
    console.log(await serviceModel.findByIdAndRemove({ _id: req.params.id }));// delete service by using id
    res.redirect("/service");
});

//Routing for add and delete the project 

//Routing for show project with information 
app.get("/project",  async (req, res) => {
    let project = await projectModel.find();
    console.log(project)
    res.render("project", {  project: project });
});

//Routing for insert data into project model

app.post("/project", async (req, res) => {
    let data = {
        project_Name: req.body.project,
        date: req.body.date,
        Image: req.body.img
    }
    project = new projectModel(data); // Save data of project collection
    await project.save();
    res.redirect("/project");
});

//Routing for delete data form project model

app.post("/project/delete/:id", async (req, res) => {
    console.log(await projectModel.findByIdAndRemove({ _id: req.params.id }));
    res.redirect("/project");
});

//Routing for add and delete social media information
// Routing for show social media page 
app.get("/media", async (req, res) => {
    let media = await mediaModel.find();
    console.log(media)
    res.render("media", { media: media });
});

//Routing for insert media data 
app.post("/media", async (req, res) => {
    let data = {
        name: req.body.name,
        link: req.body.link,
        logo: req.body.logo
    }

    media = new mediaModel(data);
    await media.save();
    res.redirect("/media");
});
//  Routing for delete social media data 
app.post("/media/delete/:id", async (req, res) => {
    console.log(await mediaModel.findByIdAndRemove({ _id: req.params.id }));
    res.redirect("/media");
});

//midelware to conferm save process



// For  runnig port in localhost
app.listen(PORT,(req,res)=>{
    console.log(  "server running....")
})