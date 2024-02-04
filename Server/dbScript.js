require('dotenv').config()
global.bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const socket = require('socket.io');
const mongoose = require('mongoose');
const rfs = require("rotating-file-stream");
const volunteer = require('./models/volunteers');
const cEvent = require('./models/cEvents');
var request = require('request');
const { type } = require('os');
//read up on axios and cors to connect react app with express app

// express app
const app = express();

// Socket setup
var server = app.listen(4000, function(){
    console.log('listening to request on port 4000');
})
var io = socket(server);


// on socket connection, passes thru function with socket
io.on('connection', function(socket){ 
    console.log('made socket connection');
});

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


function queryFormatter( param,  reqObj,){
    return param + " == '" + String(reqObj) + "'";
}


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

/**
 * @VolunteerGetMethods
 * Below are all the getter methods
 * Fetch all volunteers
 * Fetch vol by ID
 * Fetch by name
 * Fetch by any metric they want
 */




/**
 * Fetches all volunteers 
 * @Returns all volunteer documents
 */
app.get('/all', (req, res) => {
    volunteer.find() 
        .then((result) => {
            res.send(result);
        })
        .catch((err) => console.log(err))
});

/**
 * Get Method which returns unverfied volunteers for admins
 */
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

/**
 * Fetches volunteer by ID
 * @Params HTTP param {String} - userId
 */
app.get('/find_vol_byID', (req, res) => {
    volunteer.findById('65b730a40f9ea119f5d7b1e6')
        .then((result) => {
            res.send(result);
        })
        .catch((err) => console.log(err));
});


    
/**
 * @VolunteerPostMethods
 * Add new Volunteer through form submission
 * Login attempt by volunteers 
 * Update volunter information
 */
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

/**
 * Post method which auth's login attempt through our system
 * @Params {String, String} - username and password
 * @Returns either and invalid login, successful login or a successful admin login
 */
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


/**
 * Put method which updates a volunteer status
 * @Params {String, String} - {uniqueID, status}, the id of the vol and the new status to update through a json file
 * @Returns either a successful update or a unsuccessful update to the database
 */
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

/**
 * Delete method
 * @Params {String} - userID
 * @Returns either a successful deletion or unsuccessful. Removes document from database
 */
app.delete('/removeVolunteer', async (res, req) => {

})



/**
 * @Header
 * Following app methods 
 * Are all related to 
 * Community Service Schema and Documents
 */

/**
 * Adds a new Community Service Event
 * @Params {Json} from front end, but takes in all neccessary elements to make a event document
 * Saves staright to the MongoDB
 */




//Fetch methods below

/**
 * Fetches all community service events 
 * @Contains Methods such as
 * All Events
 * Events by service
 * Events by Type
 * Events by Status
 * Events by name
 * Events by start date
 * Events by end date
 * Regular Events by Day
 * 
 */
app.get('/events/getAll', (req, res) => {
    try{
        cEvents.find() // Redfine 
            .then((result) => {
                res.send(result);
            })
            .catch((err) => console.log(err))
    } catch(error) {
        console.error("Error when fetching all events: ", error);
        res.status(500).send('Internal Server Error');
    }
})

/**
 * Fetches community service events based on Service Type
 * @Params {String} typeOfService - The indicated service field it is involved in
 */
app.get('/events/searchByType/service/:typeOfService',  (req, res) => {
    try {
        const typeOfService =  req.query.param1;
         cEvents.find({$where: queryFormatter("typeOfService", typeOfService) })
            .then((result) => {
                res.send(result);
            })
            .catch((err) => console.log(err))
    } catch(error) {
        console.error("Error when fetching all events: ", error);
        res.status(500).send('Internal Server Error');
    }
})

/**
 * Fetches community service events based on the type of Event it is
 * @Params {String} typeOfEvent - This is indicating whether it is a regular or adhoc event
 */
app.get('/events/searchByType/event/:typeOfEvent',  (req, res) => {
    try {
        const typeOfEvent =  req.query.param1;
         cEvents.find({$where: queryFormatter("typeOfEvent",typeOfEvent) })
            .then((result) => {
                res.send(result);
            })
            .catch((err) => console.log(err))
    } catch(error) {
        console.error("Error when fetching all events: ", error);
        res.status(500).send('Internal Server Error');
    }
})

/**
 * Fetches all community service events by status
 * @Params {String} status - Stauts included [Ongoing, Completed, Cancelled]
 */
app.get('/events/searchByStatus/:status',  (req, res) => {
    try {
        const status = req.query.param1;
        cEvents.find({$where: queryFormatter("status", status) })
            .then((result) => {
                res.send(result);
            })
            .catch((err) => console.log(err))
    } catch(error) {
        console.error("Error when fetching all events: ", error);
        res.status(500).send('Internal Server Error');
    }
})

/**
 * Fetches all community service events by contains name
 * @Params {String} title - Typed in title of the event
 * @Returns all events with the title which contains a substring of the title
 */
app.get('/events/searchByName/:title',  (req, res) =>{
    try {
        const title =  req.query.param1;
        cEvents.find({ title: { $regex: title, $options: 'i' } })
            .then((result) => {
                res.send(result);
            })
            .catch((err) => console.log(err))
    } catch(error) {
        console.error("Error when fetching all events: ", error);
        res.status(500).send('Internal Server Error');
    }
})

/**
 * Fetch blog page by id
 * @Params {String} - id, unique objectid for each event
 * @Returns the event page when user clicks on event
 */
app.get('/events/:id', (req, res) => {
    const id = req.params.id;
    cEvent.findById(id)
        .then(result => {
            //render('details', {event: result, title: 'Event Details'})
            res.send(result);
        })
        .catch((err) => console.log(err));
})

/**
 * @cEvents functions for posting
 * POST Event data to create new community service event
 * 
 */
/**
 * Post new cEvent data ( by admin ) containing a json file ( req.body )
 * @Params {Json / http req} req - Http request to the backend server
 * @Returns A DB.commit() adding a new document via details filled in by admin submitting form
 */
app.post('/events/createNew', async (req, res) => {
    try{
        // get these constants from the body of the req json
        const {
            title,
            snippet, 
            body,
            address,
            typeOfEvent,
            comunityProvider,
            dateOfEvent,
            timeOfEvent,
            capacity,
            typeOfService
        } = await req.body; 

        // create new object
        const ev = new cEvent({ 
            title: title,
            snippet: snippet,
            body: body,
            address: address,
            typeOfEvent: typeOfEvent,
            typeOfService: typeOfService,
            comunityProvider: comunityProvider,
            dateOfEvent: dateOfEvent,
            timeOfEvent: timeOfEvent,
            capacity: capacity
        });
        ev.save()
            .then(
                res.send("Registered Event")
            )
            .catch((err) => {
                console.log('f'),
                res.send(err)
            }
        );

    } catch(error) {
        console.log('g'),
        console.error('Error during adding new event: ', error);
        res.status(500).send('Internal Server Error');
    }
});

/**
 * @cEvents functions for updating
 * UPDATE X event to add a new / remove a volunteer
 * 
 */
/**
 * Update X event to add a new volunteer to an event
 * @Params {String, String} - EventID, VolunteerID
 * @Returns a DB commit to adding new volunteer to current volunteers in the event
 */
app.put('/events//')



/**
 * @feedback getting feedback for event
 * @Post for security to ensure only admins can get it
 * @Params {String, String} ID of user attempting to acces, title of the cEvent
 * @Returns If user is admin then return all feedback for X event.
 */
app.post('/getFeedbackForEvent', async (req, res) => {
    try{
        const{_Id, title} = await req.body; //eventID
        const u = await volunteer.findOne({_Id}, {$where: "userRole == 'admin'"}); // most likely error
        if (u) {
            await cEvents.findOne({title})
                .then((results) => 
                    res.send(results))
                .catch((err) => console.log(err))
        }else {
            res.send("Invalid User");
        }
    } catch {
        console.error('Error during adding new event: ',  error);
        res.status(500).send('Internal Server Error');
    }
})

/**
 * 
 */
