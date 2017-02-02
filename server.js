var server = require('express');
var bodyParser = require('body-parser');


// START SERVER
var port = process.env.PORT || 3000;
var app = server();
var responseToken;
var registerdUsers = ['Helga', 'Balazs', 'Attila'];

app.use(server.static(__dirname + '/web'));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  if (registerdUsers.indexOf(req.body.email) >= 0 && req.body.password === req.body.email) {
    responseToken = `Hello, ${req.body.email}`;
  } else {
    responseToken = 'Hello, unknown';
  }
  res.setHeader('session_token', responseToken);
  next();
});

// Port settings
app.listen(port, function () {
  console.log(`Server running on port ${port}`);
});

// Routes
app.get('/', function (req, res) {
  res.render('index.html');
});

app.post('/register', function (req, res) {
  console.log('registration on server');
  // console.log(req.body);
  res.send('success registration');
});

app.post('/login', function (req, res) {
  console.log('login on server');
  res.send('success login');
});

// app.post('/login', function (req, res) {
//   console.log('login on server');
//   // console.log(req.body);
//   res.setHeader['token'] = 'oke';
//   // res.setHeader({ "token", "oke" });
//   res.send('success login');
// });
