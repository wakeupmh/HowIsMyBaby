const app = require("express")();
const http = require("http").Server(app);
const fs = require("fs");
const io = require("socket.io")(http);
 
app.get('/', onRequest);
app.get('/client', onRequest);
http.listen(process.env.PORT || 3000, function() {
    console.log('server started');
});

function notFound(response) {
    response.writeHead(404, {"Content-Type" : "text/plain"});
    response.write("Error 404: Page not found");
    response.end();
}

function onRequest(request, response) {
    console.log(request.url);
  if(request.method == 'GET' && request.url == '/') {
    response.writeHead(200, {"Content-Type" : "text/html"});
    fs.createReadStream("./streamer.html").pipe(response);
  } else if(request.method == 'GET' && request.url == '/client'){
    fs.createReadStream("./client.html").pipe(response);
  }
  else {
    notFound(response);
  }
}
 
io.on('connection', function(socket) {
    console.log("a user connected");
    socket.on('stream', function(stream) {
        socket.broadcast.emit("stream", stream);
    });
    socket.on('disconnect', function () {
        console.log("user disconnected");
    });
});
