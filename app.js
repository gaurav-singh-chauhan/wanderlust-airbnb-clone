if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
};

// Express
const express = require("express");
const app = express();
// MongoDB
const mongoose = require("mongoose");
const mongoUrl = process.env.ATLAS_URL;
// Model
const User = require("./models/user.js");
// Flash Message
const flash = require("connect-flash");
// Method Override 
const methodOverride = require("method-override");
// Layout
const ejsMate = require("ejs-mate");
// Express Error Class
const ExpressError = require("./utils/ExpressError.js");
// Session Handling
const session = require("express-session");
// Passport
const passport = require("passport");
const LocalStrategy = require("passport-local");
// Routers (routes)
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");
const users = require("./routes/user.js");
// Mongo Session Store
const MongoStore = require("connect-mongo");

const port = 8080;
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "/public")));

app.use(express.urlencoded({extended: true}));

app.use(methodOverride("_method"));

app.engine("ejs", ejsMate);

// MongoDB connection establishment
async function main(){
    await mongoose.connect(mongoUrl);
};

main()
.then(()=>{
    console.log("Connected with DB");
})
.catch((err)=>{
    console.log(`Oops got an error :[`);
    console.log(err);
});

const store = MongoStore.create({
    mongoUrl: mongoUrl,
    crypto: {
        secret: "supersecretcode",
    },
    touchAfter: 24 * 3600,
});
store.on("error", () => {
    console.log("Mongo Store connection error", err);
});

// Associating Session
const sessionOptions = {
    store: store,
    secret: "supersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,  
    },
};

app.use(session(sessionOptions)); // Session middleware

// Flash middleware
app.use(flash());

// Middlewares of Passport
app.use(passport.initialize()); // Passport initialization
app.use(passport.session()); // connecting passport with session
passport.use(new LocalStrategy(User.authenticate()));
// Methods of Passport
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Local Variables to access in every ejs templates
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.failure = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

// app.get("/demo", async (req, res) => {
//     let fakeUser = new User({
//         email: "ash@gmail.com",
//         username: "ash123"
//     });
//     let registeredUser = await User.register(fakeUser, "helloworld");
//     res.send(registeredUser);
// });

// Middlewares to process coming requests on routes
app.use("/listings", listings); //listing routes
app.use("/listings/:id/reviews", reviews); //review routes
app.use("/", users); //users routes

// Custom error handler if path is incorrect
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page not found..."));
});

// Error handler for every kind of error
app.use((err, req, res, next) => {
    let { status=500, message="Oops! Something went wrong..." } = err;
    res.status(status).render("error.ejs", {err});
    // res.status(status).send(message);
    // res.send("Oops! Something went wrong :(");
});

app.listen(port, () =>  {
    console.log(`server is listening on Port : ${port}`);
});