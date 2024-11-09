const express = require('express');
const bodyParser = require('body-parser');
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const path = require('path');
const cors = require('cors');  
const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});


app.post('/', function (req, res) {
    const email = req.body.email; 

    console.log("Email: " + email);

 
    const mailgun = new Mailgun(formData);
    const mg = mailgun.client({
        username: 'api',
        key: process.env.MAILGUN_API_KEY || 'cc848e64be7b642f048c46166679af3a-f6fe91d3-e8889503' 
    });

   
    mg.messages.create('sandbox8853fefa0e6f49c8a67a30695aa78b50.mailgun.org', {
        from: "Excited User <mailgun@your-mailgun-domain>",
        to: [email],
        subject: "Hello!",
        text: "Welcome to our mailing list!",
        html: "<h1>Welcome to our mailing list!</h1>"
    })
    .then(msg => {
        console.log("Email sent successfully: ", msg);
        res.send("Form submitted and email sent successfully!");
    })
    .catch(err => {
        console.error("Error sending email: ", err);
        res.send("There was an error sending the email.");
    });
});


app.listen(8000, function () {
    console.log("Server is listening on port 8000");
});
