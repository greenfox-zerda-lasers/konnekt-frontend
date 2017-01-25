var server = require('express');


// START SERVER
var port = process.env.PORT || 3000;
var app = server();
app.use(server.static(__dirname + '/web'));

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
