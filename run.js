// Server
var express = require('express');

// Includes
var User = require('./server/User.js');
var Menu = require('./data/Menu.js');

// Initialize appliaction
var app = express.createServer();

// Variables
var users = {};

// Enable bodyparser
app.use(express.bodyParser());

// Enable sessions (Using sencha connect)
app.use(express.cookieParser()); 
app.use(express.session({ secret: "snacken tokkie" }));

// Simple menu return
app.get('/list', function(req, res){
    res.contentType('application/json');
    res.send(Menu);
});

// Requests
app.post('/order', function(req, res){
    var result = {
        success: false
    };
    res.contentType('application/json');
    
    // Collect data
    var name = req.body.name;
    var extra = req.body.extra;
    var order = req.body.order;
    var time = req.body.time;
    
    // Userobject
    var user;
    
    // save user details
    if (!req.session.userId) {
        user = new User(name);
        var id = user.get('id') || 0;
        users[id] = user;
        req.session.userId = id;
        
    } else {
        user = users[req.session.userId];
        user.set('name', name);
    }
    
    if (name && order){
        user.set('time', time);
        user.set('order', order);
        user.set('extra', extra);
        console.log('++ Order received from: ' + name + ' ---> ' + order);
        result.success = true;
    }
    res.send(result);
});

app.get('/orderlist', function(req, res){
    
    // Return JSON
    res.contentType('application/json');
    
    var items = [];
    var result = { 
        success: true 
    };
    
    for (var key in users){
        var user = users[key];
        items.push({ 
            id: user.get('id'),
            name: user.get('name'), 
            order: user.get('order'), 
            extra: user.get('extra'),
            time: user.get('time')
        });
    }
    
    result.items = items;
    res.send(result);
});

// Static directory
app.use(express.static(__dirname + '/client/public'));

var port = process.env.PORT || 3001;
app.listen(port, function() {
  console.log("Listening on " + port);
});