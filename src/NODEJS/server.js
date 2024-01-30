global.body_parser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const volunteer = require('./models/volunteers');

// body-parser implementation 
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '50mb',
  parameterLimit: 100000
}))
app.use(bodyParser.json({
  limit: '50mb',
  parameterLimit: 100000
}))

// express app
const app = express();

app.get("/api", (req, res) => {
    res.json("users": ["user1", "user2"])
})

const dbURI = 'mongodb+srv://hundin231:Tastigers231@cluster0.gjb0xxi.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI)
    .then((result) => 
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
    }))
    .catch((error) => console.log(err))

// register view engine
app.set('view engine', 'ejs');

// middleware and static fields
app.use(express.static('public'));
app.use(morgan('dev'));


// mongoose and mongo sandbox routes
app.get('/add-vol', (req, res) => {
    const v = new volunteer({
        username: `rainbowWarriro`,
        email: `hundin231@example.com`,
        password: 'randomPassword',
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: `+123456789`,
        gender: 'Male',
        education: 'Bachelor\'s Degree',
        address: {
            street: "no",
            city: "no",
            state: "no",
            zipCode: "1010101",
        },
        dateOfBirth: new Date('1990-01-01'),
        residentialStatus: 'Singaporean Citizen',
        skills: ['Programming', 'Communication', 'Teamwork'],
        pastExperiences: 'Previous experience in volunteering',
        volunteerPreferences: 'Open to various volunteering opportunities',
        acceptanceStatus: 'Pending',
         // 20% chance of being an admin
    });
    v.save() //Save and commit to the db the instance
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        });
})

app.get('/all-blogs', (req, res) => {
    volunteer.find() //Finding on the blog not an instance
        .then((result) => {
            res.send(result);
        })
        .catch((err) => console.log(err))
});
    
app.get('/single-vol', (req, res) => {
    volunteer.findById('65b730a40f9ea119f5d7b1e6')
        .then((result) => {
            res.send(result);
        })
        .catch((err) => console.log(err));
});


//Post request handling experimentation
app.post('/volunteerRegister', (req, res) => {
    //handle signup logic here
})

