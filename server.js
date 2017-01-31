var server = require('express');


// START SERVER
var port = process.env.PORT || 3000;
var app = server();
app.use(server.static(__dirname + '/web'));

app.use(function(req, res, next) {
  console.log('myheader has sessiontoken!');
  res.setHeader('sessiontoken', '12345');
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
  // console.log(req.body);
  res.send('success login');
});

// app.post('/login', function (req, res) {
//   console.log('login on server');
//   // console.log(req.body);
//   res.setHeader['token'] = 'oke';
//   // res.setHeader({ "token", "oke" });
//   res.send('success login');
// });
