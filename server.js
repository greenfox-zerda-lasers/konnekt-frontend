var server = require('express');
var bodyParser = require('body-parser');
var responseOK;


// START SERVER
var port = process.env.PORT || 3000;
var app = server();
var responseToken;
var registerdUsers = ['Helga', 'Balazs', 'Attila'];

app.use(server.static(`${__dirname}/web`));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  if (registerdUsers.indexOf(req.body.email) >= 0 && req.body.password === req.body.email) {
    responseOk = true;
    responseToken = 'Hi, I am a reponse token here!';
  } else {
    responseOk = false;
    responseToken = '';
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
  if (responseOk) {
    let response = { user_id: 0 }
    res.status(201).send(JSON.stringify(response));
  } else {
    let response = {
      errors: [
        {
          name: 'Unknown user error',
          message: 'not user by this name',
        },
      ],
    };
    res.status(401).send(JSON.stringify(response));
  }
});

// app.post('/login', function (req, res) {
//   console.log('login on server');
//   // console.log(req.body);
//   res.setHeader['token'] = 'oke';
//   // res.setHeader({ "token", "oke" });
//   res.send('success login');
// });
