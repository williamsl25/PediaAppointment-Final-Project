// Twilio Credentials
var accountSid = 'AC65e988ac9c271350a18f68e745bc7ffd';
var authToken = '3ef3ff672f4c6d9665d41957bce76ab6';

//require the Twilio module and create a REST client
var client = require('twilio')(accountSid, authToken);
client.messages.create({
    to: "+16164058551",
    from: "+16163122370",
    body: "Thank you for using PediaAppointment! This message confirms your appointment",
}, function(err, message) {
    console.log(message.sid);
    console.log('You sent: '+ text.body);
    console.log('Current status of this text message is: '+ text.status);
});
