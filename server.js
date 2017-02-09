var server = require('express');
var bodyParser = require('body-parser');

// START SERVER
var port = process.env.PORT || 3000;
var app = server();

var responseToken;
var responseOk;
let response;
var registerdUsers = ['Helga', 'Balazs', 'Attila'];
var registerdUsersTokens = ['Helga token', 'Balazs token', 'Attila token'];

app.use(server.static(`${__dirname}/web`));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  if (registerdUsers.indexOf(req.body.email) >= 0 && req.body.password === req.body.email) {
    responseOk = true;
    responseToken = registerdUsersTokens[registerdUsers.indexOf(req.body.email)];
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
  response = { user_id: 0 };
  res.setHeader('session_token', 'regtoken');
  res.status(201).send(JSON.stringify(response));
});


app.post('/login', function (req, res) {
  console.log('login on server');
  if (responseOk) {
    response = { user_id: 0 };
    res.status(201).send(JSON.stringify(response));
  } else {
    response = { errors: [{ name: 'Unknown user error', message: 'not user by this name' }] };
    res.status(401).send(JSON.stringify(response));
  }
});

app.get('/contacts', function (req, res) {
  console.log('login on server');
  const contacts = {
    count: 2,
    contacts: [
      {
        id: 0,
        user: {
          id: 0,
          name: 'John Smith',
          email: 'john@smith.com',
        },
        name: 'Lo Bela',
        description: 'Bela real superhero!',
      },
      {
        id: 0,
        user: {
          id: 1,
          name: 'Ms. Smith',
          email: 'ms_Smith@smith.com',
        },
        name: 'Lo Bela',
        description: 'this is a sample stupid text',
      },
      {
        id: 0,
        user: {
          id: 2,
          name: 'Gipsz Jakab',
          email: 'gipsz@jakab.hu',
        },
        name: 'Senkié',
        description: 'hellobello',
      },
      {
        id: 0,
        user: {
          id: 0,
          name: 'John Smith',
          email: 'john@smith.com',
        },
        name: 'Lo Bela',
        description: 'Bela real superhero!',
      },
      {
        id: 0,
        user: {
          id: 1,
          name: 'Ms. Smith',
          email: 'ms_Smith@smith.com',
        },
        name: 'Lo Bela',
        description: 'this is a sample stupid text',
      },
      {
        id: 0,
        user: {
          id: 2,
          name: 'Gipsz Jakab',
          email: 'gipsz@jakab.hu',
        },
        name: 'Senkié',
        description: 'hellobello',
      },
      {
        id: 0,
        user: {
          id: 0,
          name: 'John Smith',
          email: 'john@smith.com',
        },
        name: 'Lo Bela',
        description: 'Bela real superhero!',
      },
      {
        id: 0,
        user: {
          id: 1,
          name: 'Ms. Smith',
          email: 'ms_Smith@smith.com',
        },
        name: 'Lo Bela',
        description: 'this is a sample stupid text',
      },
      {
        id: 0,
        user: {
          id: 2,
          name: 'Gipsz Jakab',
          email: 'gipsz@jakab.hu',
        },
        name: 'Senkié',
        description: 'hellobello',
      },
      {
        id: 0,
        user: {
          id: 0,
          name: 'John Smith',
          email: 'john@smith.com',
        },
        name: 'Lo Bela',
        description: 'Bela real superhero!',
      },
      {
        id: 0,
        user: {
          id: 1,
          name: 'Ms. Smith',
          email: 'ms_Smith@smith.com',
        },
        name: 'Lo Bela',
        description: 'this is a sample stupid text',
      },
      {
        id: 0,
        user: {
          id: 2,
          name: 'Gipsz Jakab',
          email: 'gipsz@jakab.hu',
        },
        name: 'Senkié',
        description: 'hellobello',
      },
      {
        id: 0,
        user: {
          id: 0,
          name: 'John Smith',
          email: 'john@smith.com',
        },
        name: 'Lo Bela',
        description: 'Bela real superhero!',
      },
      {
        id: 0,
        user: {
          id: 1,
          name: 'Ms. Smith',
          email: 'ms_Smith@smith.com',
        },
        name: 'Lo Bela',
        description: 'this is a sample stupid text',
      },
      {
        id: 0,
        user: {
          id: 2,
          name: 'Gipsz Jakab',
          email: 'gipsz@jakab.hu',
        },
        name: 'Senkié',
        description: 'hellobello',
      },
      {
        id: 0,
        user: {
          id: 0,
          name: 'John Smith',
          email: 'john@smith.com',
        },
        name: 'Lo Bela',
        description: 'Bela real superhero!',
      },
      {
        id: 0,
        user: {
          id: 1,
          name: 'Ms. Smith',
          email: 'ms_Smith@smith.com',
        },
        name: 'Lo Bela',
        description: 'this is a sample stupid text',
      },
      {
        id: 0,
        user: {
          id: 2,
          name: 'Gipsz Jakab',
          email: 'gipsz@jakab.hu',
        },
        name: 'Senkié',
        description: 'hellobello',
      },
    ],
  };

  // response for testing:
  responseOk = true;

  if (responseOk) {
    res.status(200).send(JSON.stringify(contacts));
  } else {
    response = { errors: [{ name: 'Unknown contacts', message: 'no contats here' }] };
    res.status(401).send(JSON.stringify(response));
  }
});
