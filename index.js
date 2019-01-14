const apiai = require('apiai')('fe7e66395b37426d8d902ba17a27fb4c');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname + '/views')); // html
app.use(express.static(__dirname + '/public')); // js, css, images

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

io.on('connection', function(socket) {
    socket.on('chat message', (text) => {
        
        // Get a reply from API.AI
        
        let apiaiReq = apiai.textRequest(text, {
            sessionId: 'APIAI_SESSION_ID'
        });
        
        apiaiReq.on('response', (response) => {
            let aiText = response.result.fulfillment.speech;
            console.log('bot reply', aiText);
            socket.emit('bot reply', aiText); // Send the result back to the browser!
        });
        
        apiaiReq.on('error', (error) => {
            console.log(error);
        });
        
        apiaiReq.end();
    });
});


const server = http.listen(3000);