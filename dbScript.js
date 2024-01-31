require('dotenv').config()
global.bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const rfs = require("rotating-file-stream");
const volunteer = require('./models/volunteers');
var request = require('request');
const { type } = require('os');
//read up on axios and cors to connect react app with express app

// express app
const app = express();

// Implementation of body parser
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb',
    parameterLimit: 10000
}));

app.use(bodyParser.json({
    limit: '50mb',
    parameterLimit: 10000
}))




// Database side URI connection to MONGO ATLAS
const dbURI = 'mongodb+srv://hundin231:Tastigers231@cluster0.gjb0xxi.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI)
    .then((result) => 
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
    }))
    .catch((error) => console.log(error))



// Morgan setup and creating a log stream
const rfsStream = rfs.createStream("log.txt", {
    size: '10M', // rotate every 10MB
    interval: '1d', // rotate daily
    compress: 'gzip' // compress rotated files
})

// if log file defined then use rfs stream else print to console
app.use(morgan(process.env.LOG_FORMAT || "dev", {
    stream: process.env.LOG_FILE ? rfsStream : process.stdout
 }));
 
 // if log file is defined then also show logs in console
 // else it will use the previous process.stdout to print to console
 if(process.env.LOG_FILE) {
    app.use(morgan(process.env.LOG_FORMAT || "dev"));    
 }

// add log stream to moregan to save logs in file
app.use(morgan("dev", {
    stream: rfsStream
}));


// register view engine
app.set('view engine', 'ejs');

// middleware and static fields
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); //what does this do ?
app.use(morgan('dev'));


// Section below: Functions all related to volunteers directly
// Section below: Functions all related to volunteers directly
// Section below: Functions all related to volunteers directly
app.get('/add-vol', (req, res) => {
    const { username, email, password, firstName, lastName, phoneNumber, gender, education, street, city, postalcode, dob, residentialStatus, skills, pastExperiences, volunteerPref, userRole} = req.body;
    const v = new volunteer({
        username: username,
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        gender: gender,
        education: education,
        address: {
            street: street,
            city: city,
            zipCode: postalcode,
        },
        dateOfBirth: dob, //kiv
        residentialStatus: residentialStatus,
        skills: skills,
        pastExperiences: pastExperiences,
        volunteerPreferences: volunteerPref,
        userRole: userRole,
        userStatus: 'unverified'
         // 20% chance of being an admin
    });
    v.save() //Save and commit to the db the instance
        .then(
            res.send("Registered") 
        )
        .catch((err) => {
            console.log(err)
        });
})

// implement an update function for volunteer status

// Get method for all volunteers in the collection
app.get('/all', (req, res) => {
    volunteer.find() 
        .then((result) => {
            res.send(result);
        })
        .catch((err) => console.log(err))
});

// find a volunteer by unique ID
app.get('/find_vol_byID', (req, res) => {
    volunteer.findById('65b730a40f9ea119f5d7b1e6')
        .then((result) => {
            res.send(result);
        })
        .catch((err) => console.log(err));
});


    
// post request from client side to server side regarding login attempt

app.post('/loginAttempt', async (req, res) => {
    try {
        const { username, password } = await req.body;
        console.log(username);
        const u = await volunteer.findOne({  username, password });

        if (u){
            if (u.userRole == 'admin') {
                res.send(200, 'successful admin login');
            }else{
                res.send(200, 'success');
            }  
        }
         else {
            res.send('invalid');
        }
    } catch (error) {
        console.error('Error during query:', error);
        res.status(500).send('Internal Server Error');
    }
});

// get request to attain all volunteers who need to be approved

app.get('/getUnverifiedVolunteers', async (req, res) => {
    try{
        volunteer.find({$where: "userStatus =='unverified'"})
        .then((result) => {
            res.send(result);
        })
        .catch((err) => console.log(err));

    } catch(error){
        console.error('Error during get unverified volunteers query: ', error);
        res.status(500).send('Internal Server Error');
    }
})

// update request for admins to server side regarding updating status of volunteer

app.put('/updateVolunteerStatus', async (req,res) => {
    try{
        const {userID, newStatus} = await req.body;
        volunteer.updatgeOne({_id: userID}, {$set: {fieldToUpdate: newStatus} }, (err, result) => {
            if (err) {
              console.error(err);
            } else {
              console.log('status update to: ', newStatus);
            } }
        );
    } catch (error) {
        console.error('Error during update volunteer query: ', error);
        res.status(500).send('Internal Server Error');
    }
})

// delete request


// Section below: Functions all related to volunteering events directly
// Section below: Functions all related to volunteering events directly
// Section below: Functions all related to volunteering events directly

// Add a new event
app.post('/addNewEvent', async (req, res) => {
    try{
        const {
            title,
            snippet, 
            body,
            address,
            typeOfEvent,
            comunityProvider,
            dateOfEvent,
            timeOfEvent,
            capacity
        } = await req.body;
        const e = new cEvent({
            title: title,
            snippet: snippet,
            body: body,
            address: address,
            typeOfEvent: typeOfEvent,
            comunityProvider: comunityProvider,
            dateOfEvent: dateOfEvent,
            timeOfEvent: timeOfEvent,
            capacity: capacity
        });
        e.save()
            .then(
                res.send("Registered Event")
            )
            .catch((err) => {
                res.send(500, "Error")
            }
        );

    } catch {
        console.error('Error during adding new event: ',  error);
        res.status(500).send('Internal Server Error');
    }
});

// get all events

// get all events based on the type of event

app.get