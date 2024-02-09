// Mern stack import

require('dotenv').config()
global.bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const rfs = require("rotating-file-stream");
const mongoose = require('mongoose');

// Importing schemas releveant 

const volunteer = require('./models/volunteers');
const cEvent = require('./models/cEvents');

// Importing stuff for chatroom

const socket = require('socket.io');
var request = require('request');
const { type } = require('os');


//read up on axios and cors to connect react app with express app

const cors = require('cors');
const { validateHeaderValue } = require('http');
const schema = mongoose.Schema;

// importing multer for image processing

const multer = require('multer');
const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

// express app

const app = express();
app.use(cors());

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

// Setting up an address Schema parser

const addressSchema = new schema({
    city: String,
    street: String,
    houseNumber: String,
    postal_code: String
  });

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
app.get('/volunteer/all', (req, res) => {
    volunteer.find() 
        .then((result) => {
            res.send(result);
        })
        .catch((err) => console.log(err))
});
/**
 * Fetches the count of all volunteers regardless of status
 * @Returns all json count of all volunteer documents in the system
 */
app.get('/volunteer/count', (req,res) => {
    try{
        volunteer.countDocuments({})
            .then((count) => res.json({count}))

    } catch (error) {
        console.error("Error while handling counting vol documents ", error);
        res.status(500).send("Internal Server Error");
    }
})
/**
 * Generic Fetch for volunteers under any param
 * @Params {String, String} - Param and param value in the url query
 * @Returns count of documents that fit the parameters
 */
app.get('/volunteer/count/:param/:paramValue', (req,res) => {
    try{
        const param = req.params.param;
        const paramValue = req.params.paramValue;
        volunteer.countDocuments({[param] : paramValue})
            .then((count) => res.json({count}))

    } catch (error) {
        console.error("Error while handling counting vol documents ", error);
        res.status(500).send("Internal Server Error");
    }
})

app.get('/leaderboard', (req,res) => {
    try{
        volunteer.find({}, {xp: -1, hours: -1, lastName: 1, firstName: 1}).sort({xp: -1})
            .then((result) => {
                console.log(result)
                res.send(result);
            })
            .catch((error) => {
                res.send(error)
            })
    } catch (error) {
        console.error("Error occured while trying to find by hours ", error);
        res.status(500).send("Internal Server Error");
    }
        
})

/** 
 * Get Method which returns unverfied volunteers for admins
 * @Returns all volunteer documents of those who are not verified yet
 */
app.get('/volunteer/unverified', (req, res) => {
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


app.get('/volunteer/byStatus/:status', (req, res) => {
    try{
        const status = req.params.status;
        volunteer.find({status: status})
            .then((result) => {
                res.send(result);
            })
            .catch((err) => console.log(err));
    } catch (error){
        console.error('Error: while fetching volunteers by status', error);
        res.status(500).send('Internal Server Error');
    }

})

/**
 * Fetches volunteer by ID
 * @Params HTTP param {String} - userId
 */
app.get('/volunteer/searchById/:id', (req, res) => {
    const id = req.params.id;
    volunteer.findById(id)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => console.log(err));
});

/**
 * Fetches volunteers by past Event Ids
 * @Params {String} - eventId
 * @Returns all volunteer objs which has participated in X event?
 */
app.get('/volunteer/byPastEvent/:id', (req, res) => {
    try {
        const eventId = req.params.id;
        volunteer.find({
            pastEnrolledServiceEvents: {$elemMatch: eventId}
        })
            .then((result) => {
                res.send(result);
            })
            .catch((error) => 
                console.log(error),
                res.send(error)
            )
    } catch (error) {
        console.error('Error: while trying to fetch volunteers by specific event', error);
        res.status(500).send("Internal Server Error");
    }
})

/**
 * Fetches volunteers by current Event Ids
 * @Params {String} - eventId
 * @Returns all volunteer objs which has participating in X event?
 */
app.get('/volunteer/byEvent/:id', (req, res) => {
    try {
        const eventId = req.params.id;
        volunteer.find({
            currentEnrolledServiceEvents: {$elemMatch: eventId}
        })
            .then((result) => {
                res.send(result);
            })
            .catch((error) => 
                console.log(error),
                res.send(error)
            )
    } catch (error) {
        console.error('Error: while trying to fetch volunteers by specific event', error);
        res.status(500).send("Internal Server Error");
    }
})


/**
 * @VolunteerPostMethodsgit
 * Add new Volunteer through form submission
 * Login attempt by volunteers 
 * Update volunter information
 */

app.post('/volunteer/signup', (req, res) => {
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
 * Updates a volunteer generic param
 * @Params {String, String, String} - volunteer, param to update and the updateValue
 * @Returns a successful update message or unsuccessful
 */

app.put('/volunteer/:id/update/:param', async (req, res) => {
    try {
        const param = req.params.param;
        const vId = req.params.id;
        const {updateValue} = req.body;
        const result = await volunteer.updateOne({ _id: vId }, { $set: { [param]: updateValue } });

        console.log('Volunteer updated successfully:', result);
        res.status(200).send("Volunteer updated successfully");
    } catch (error) {
        console.error("Error while trying to update Volunteer by generic param:", error);
        res.status(500).send("Internal Server Error");
    }
});

/**
 * Post method which auth's login attempt through our system
 * @Params {String, String} - username and password
 * @Returns either and invalid login, successful login or a successful admin login
 */
app.post('/loginAttempt',  (req, res) => {
    try {
        const { username, password } =  req.body;
        console.log(username);
        const u =  volunteer.findOne({  username, password });

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
app.put('/volunter/updateStatus',  (req,res) => {
    try{
        const {userID, newStatus} =  req.body;
        volunteer.updateOne({_id: userID}, {$set: {fieldToUpdate: newStatus} }, (err, result) => {
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

/**w
 * Delete method
 * @Params {String} - userID
 * @Returns either a successful deletion or unsuccessful. Removes document from database
 */
app.delete('/volunteer/remove/:id',  (req, res) => {
    try{
        const id = req.params.id;
        volunteer.deleteOne({_id: id})
            .then((result) => res.send("Volunteer has been deleted"))
            .catch((err) =>
             console.log(err),
             res.send(err)
            )
    } catch(error){
        console.error("Error: While trying to remove a volunteer: ", error);
        res.send(error);
    }
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
        cEvent.find() // Redfine 
            .then((result) => {
                res.send(result);
            })
            .catch((err) => console.log(err))
    } catch(error) {
        console.error("Error when fetching all events: ", error);
        res.status(500).send('Internal Server Error');
    }
})

app.get('/events/fetchNoImage', (req,res) => {
    try {
        cEvent.find({}, '-image')
            .then((result) => res.send(result))
            .catch((err) => res.send(err))
    } catch (error) {
        console.error("Error: while trying to fetch everything with on image")
        res.status(500).send("Internal Server Error");
    }
})

/**
 * Fetches community service events based on Service Type
 * @Params {String} typeOfService - The indicated service field it is involved in
 */
app.get('/events/searchByType/service/:typeOfService',  (req, res) => {
    try {
        const typeOfService =  req.query.param1;
         cEvent.find({$where: queryFormatter("typeOfService", typeOfService) })
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
         cEvent.find({$where: queryFormatter("typeOfEvent",typeOfEvent) })
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
 *  Debugging purposes
 *  @Returns all event names and nothing else
 */
app.get('/debug/events/names', (req, res) => {
    try {
        cEvent.find({}, 'title')
            .then((result) => res.send(result))
            .catch((err) => res.send(err))
    } catch (error) {
        console.error("Error: while trying to fetch event names", error);
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
        cEvent.find({$where: queryFormatter("status", status) })
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
        cEvent.find({ title: { $regex: title, $options: 'i' } })
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
 * Fetch event page by id
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
 * @cEvent functions for posting
 * POST Event data to create new community service event
 * 
 */
/**
 * Post new cEvent data ( by admin ) containing a json file ( req.body )
 * @Params {Json / http req} req - Http request to the backend server
 * @Returns A DB.commit() adding a new document via details filled in by admin submitting form
 */
app.post('/events/createNew', upload.single('image'), async (req, res) => {
    try{
        // get these constants from the body of the req json
        var {
            title,
            snippet, 
            body,
            street,
            city,
            houseNumber,
            zipCode,
            typeOfEvent,
            comunityProvider,
            dateOfEvent,
            timeOfEvent,
            capacity,
            typeOfService,
            hours
        } = req.body;
        // Parse integer values
        const parsedCapacity = parseInt(capacity, 10);
        const parsedHours = parseInt(hours, 10);
        street = String(street);
        city = String(city);
        houseNumber = String(houseNumber);
        zipCode = String(zipCode);
        console.log(req.file);
        const imageBuffer = req.file.buffer; // translates this to binary
        console.log(req.body);
        // create new object
        
        const ev = new cEvent({ 
            title: title,
            snippet: snippet,
            body: body,
            address: {
                street: street,
                city: city,
                postal_code: zipCode,
                houseNumber: houseNumber
            },
            typeOfEvent: typeOfEvent,
            typeOfService: typeOfService,
            comunityProvider: comunityProvider,
            dateOfEvent: dateOfEvent,
            timeOfEvent: timeOfEvent,
            capacity: parsedCapacity,
            hours: parsedHours,
            image: {data: imageBuffer, contentType: req.file.mimetype }
        });
        ev.save()
            .then( () => {
                res.send("Registered Event")
                }
            )
            .catch((err) => {
                res.send(err)
            }
        );

    } catch(error) {
        console.error('Error during adding new event: ', error);
        res.status(500).send('Internal Server Error');
    }
});

/**
 * @cEvent functions for updating
 * @PUT
 * UPDATE X event to add a new / remove a volunteer
 * Updates status of an event
 * 
 */
/**
 * Update X event to add a new volunteer to an event
 * @Params {String, String} - EventID, VolunteerID
 * @Returns a DB commit to adding new volunteer to current volunteers in the event
 */
app.put('/events/addVolunteer', async (req, res) => {
    try{
        const {volID, eventID} = req.body;
        await cEvent.updateOne({_id: eventID}, {$push: {current_volunteers: volID} });
        await volunteer.updateOne({_id: volID}, {$push: {currentEnrolledServiceEvents: eventID} })
            .then((result) => res.send('all good'));
        
    } catch (error) {
        console.error('Error during update volunteer query: ', error);
        res.status(500).send('Internal Server Error');
    }
 

})

/**
 * Update X event to remove a specific volunteer
 * @Params {String, String} - EventID, volunteerID
 * @Returns a DB commit to removing said volunteer
 */
app.put('/events/removeVolunteer', (req, res) => {
    try{
        const {eventID, volID} = req.body;
        cEvent.updateOne({_id: eventID}, {$pull: {current_volunteers: volID}})
            .then((result) => {
                res.send(result)
            })
            .catch((err) => console.log(err));
    } catch(error) {
        console.error('Error during update volunteer query: ', error);
        res.status(500).send('Internal Server Error');
    }
})
/**
 * Updates event status
 * @Params {String} - status, the new event status to be updated
 * @Returns a successful PUT request changing status of said event
 */
app.put('/events/changeStatus', (req, res) => {
    try{
        const {eventID, status} = req.body;
        cEvent.updateOne({_id: eventID}, {$set: {status: status} })
            .then((result) =>{
                res.send(result);
            })
            .catch((err) => console.log(err));
            
        ;
    } catch(error) {
        console.error('Error during update volunteer query: ', error);
        res.status(500).send('Internal Server Error');
    }
})
/**
 * post a comment by a user
 * @Params {User, String, eventID} - custom user schema to encap data and a String of the comment they had and the eventID
 * @Returns a updated push into the events comment section.
 */
app.put('/events/postComment', (req, res) => {
    try{
        const {comment, eventID} = req.body;
        cEvent.updateOne({_id: eventID}, {$push: {comments: comment} })
            .then((result) => {
                res.send(result);
            })
            .catch((error)=>{
                res.send(error);
            })

    } catch(error){
        console.error("Error: While attempting to post a comment: ", error);
        res.status(500).send("Internal Server Error");
    }
})
/**
 * Update a specific event by any X param which is not an array
 * @Params {eventID, Param} - within the route contains the eventId and the Param
 * @Body Contains the new update value
 * @Returns a updated push into the events comment section.
 */
app.put('/events/:id/update/:param', async (req, res) => {
    try {
        const param = req.params.param;
        const eventId = req.params.id;
        const {updateValue} = req.body;
        const result = await cEvent.updateOne({ _id: eventId }, { $set: { [param]: updateValue } });

        console.log('Event updated successfully:', result);
        res.status(200).send("Event updated successfully");
    } catch (error) {
        console.error("Error while trying to update events by generic param:", error);
        res.status(500).send("Internal Server Error");
    }
});
/**
 * Resets a regular timed event 
 * @Params {string} - eventId
 * @Returns a resetted event with empty current volunteers and a new date
 */
app.put('/events/:id/reset', (req, res) => { 
    try {
        const id = req.params.id;
        const newDate = req.body;
        cEvent.updateOne({_id: id}, {$set: {
            current_volunteers: [],
            dateOfEvent: newDate,
        }})
            .then((result) => res.send(result))
            .catch((error) => 
            console.error("Error while resetting a regular service", error),
            res.send("Internal Server Error")
            )
    } catch (error) {
        console.error("Error: while attempting to reset a regular event")
        res.status(500).send("Internal Server Error")
    }
});
/**
 * Sends realized attendance for event
 * @Params {[String]} - volunteer ID arrays from the list of people who are currently enrolled
 * @Returns a commited attendance, and completion for all listed volunteers
 */
app.put('/events/:id/attendance', async (req, res) => {
    try{
        const eventId = req.params.id;
        console.log(eventId);
        const {volAttendance} = req.body;
        const event = await cEvent.findById(eventId);
        volAttendance.forEach( async (v) => {
            console.log(event.hours),
            await volunteer.updateOne({_id: String(v)}, 
                {$inc: {
                    hours: event.hours, 
                    xp: event.hours * 175
                }},
                {$push: {
                    pastEnrolledServiceEvents: eventId
                }},
                {$pull: {
                    currentEnrolledServiceEvents: eventId
                }}
            )
        })

        
    } catch (error){
        console.error("Error occured while trying to mark attendance ", error);
        res.status(500).send(error);
    }
})
/**
 * Deletes an event 
 * @Params {String} - eventId
 * @Returns either an error or a sucessfull delete respponse
 */
app.delete('/events/delete/:eventId', (req, res) => {
    try {
        const eventId = req.params.eventId;
        cEvent.deleteOne({_id: eventId})
            .then((result) => {
                if (result){
                    res.send("no event")
                }
                else{
                    res.send("Deleted Event.")
                }
                
            })
            .catch((err) => res.send(err));
    } catch (error) {
        console.error('Error: while trying to delete ', error);
        res.status(500).send('Internal Server Error');
    }
})
/**
 * delete a comment by a user
 * @Params {User, String, eventID} - custom user schema to encap data and a String of the comment they had and the eventID
 * @Returns a updated push into the events comment section.
 */
app.delete('/events/:eventId/delete/comment/:commentId', (req, res) => {
    try{
        const eventId = req.params.eventId;
        const commentId = req.params.commentId;
        
        cEvent.find({ 
            _id: eventId,
            "comments": {$elemMatch: {id: commentId}}
        })
        .then((result) => {
            res.send("Comment has been deleted");
        })
        .catch((error) => {
            res.send(error);
        })
    }
    catch(error){
        console.error('Error: Trying to delete comment, ', error);
        res.send(error);
    }
});

/**
 * @feedback getting feedback for event
 * @Post for security to ensure only admins can get it
 * @Params {String, String} ID of user attempting to acces, title of the cEvent
 * @Returns If user is admin then return all feedback for X event.
 */
app.post('/events/feedback', async (req, res) => {
    try{
        const{eventId, userId} = await req.body; //eventID
        const u = await volunteer.findOne({userId}, {$where: "userRole == 'admin'"}); 
        if (u) {
            await cEvent.findOne({title})
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


