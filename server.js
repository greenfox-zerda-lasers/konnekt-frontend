var server = require('express');
var bodyParser = require('body-parser');

// START SERVER
var port = process.env.PORT || 3000;
var app = server();

var responseToken;
var responseOk;
let response;
var registerdUsers = ['Attila', 'Balazs', 'Helga'];
var registerdUsersTokens = ['Attila token', 'Balazs token', 'Helga token'];

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
  response = { user_id: registerdUsers.indexOf(req.body.email) };
  res.setHeader('session_token', 'regtoken');
  res.status(201).send(JSON.stringify(response));
});


app.post('/login', function (req, res) {
  console.log('login on server');
  if (responseOk) {
    response = { user_id: registerdUsers.indexOf(req.body.email) };
    res.status(201).send(JSON.stringify(response));
  } else {
    response = { errors: [{ name: 'Unknown user error', message: 'not user by this name' }] };
    res.status(401).send(JSON.stringify(response));
  }
});

app.post('/contacts', function (req, res) {
  if (responseOk) {
    console.log(req.body)
  } else {
    console.log('error')
  }
});

app.put('/contacts/1', function (req, res) {
  if (responseOk) {
    delete contacts.contacts[0];
    res.status(201).send('Got a PUT request at /contacts');
  } else {
    console.log(req.body);
    // response = { errors: [{ name: 'Unknown user error', message: 'not user by this name' }] };
    // res.status(401).send(JSON.stringify(response));
  }
});

app.put('/delete/', function (req, res) {
  if (responseOk) {
    console.log('deleted contact: ', req.params.id);
    res.status(201).send('Successfull delete');
  } else {
    console.log(req.body);
    // response = { errors: [{ name: 'Unknown user error', message: 'not user by this name' }] };
    // res.status(401).send(JSON.stringify(response));
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
          name: 'Attila',
          email: 'john@smith.com',
        },
        name: 'Lo Bela',
        description: 'Bela real superhero!',
      },
      {
        id: 1,
        user: {
          id: 1,
          name: 'Balazs',
          email: 'ms_Smith@smith.com',
        },
        name: 'Lo Bela',
        description: 'this is a sample stupid text',
      },
      {
        id: 2,
        user: {
          id: 2,
          name: 'Helga',
          email: 'gipsz@jakab.hu',
        },
        name: 'Senkié',
        description: 'hellobello',
      },
      {
        id: 3,
        user: {
          id: 0,
          name: 'Attila',
          email: 'john@smith.com',
        },
        name: 'Lo Bela',
        description: 'Bela real superhero!',
      },
      {
        id: 4,
        user: {
          id: 1,
          name: 'Balazs',
          email: 'ms_Smith@smith.com',
        },
        name: 'Lo Bela',
        description: 'this is a sample stupid text',
      },
      {
        id: 5,
        user: {
          id: 2,
          name: 'Helga',
          email: 'gipsz@jakab.hu',
        },
        name: 'Senkié',
        description: 'hellobello',
      },
      {
        id: 6,
        user: {
          id: 0,
          name: 'Attila',
          email: 'john@smith.com',
        },
        name: 'Lo Bela',
        description: 'Bela real superhero!',
      },
      {
        id: 7,
        user: {
          id: 1,
          name: 'Balazs',
          email: 'ms_Smith@smith.com',
        },
        name: 'Lo Bela',
        description: 'this is a sample stupid text',
      },
      {
        id: 8,
        user: {
          id: 2,
          name: 'Helga',
          email: 'gipsz@jakab.hu',
        },
        name: 'Senkié',
        description: 'hellobello',
      },
      {
        id: 9,
        user: {
          id: 0,
          name: 'Attila',
          email: 'john@smith.com',
        },
        name: 'Lo Bela',
        description: 'Bela real superhero!',
      },
      {
        id: 10,
        user: {
          id: 1,
          name: 'Balazs',
          email: 'ms_Smith@smith.com',
        },
        name: 'Lo Bela',
        description: 'this is a sample stupid text',
      },
      {
        id: 11,
        user: {
          id: 2,
          name: 'Helga',
          email: 'gipsz@jakab.hu',
        },
        name: 'Senkié',
        description: 'hellobello',
      },
      {
        id: 12,
        user: {
          id: 0,
          name: 'Attila',
          email: 'john@smith.com',
        },
        name: 'Lo Bela',
        description: 'Bela real superhero!',
      },
      {
        id: 13,
        user: {
          id: 1,
          name: 'Balazs',
          email: 'ms_Smith@smith.com',
        },
        name: 'Lo Bela',
        description: 'this is a sample stupid text',
      },
      {
        id: 14,
        user: {
          id: 2,
          name: 'Helga',
          email: 'gipsz@jakab.hu',
        },
        name: 'Senkié',
        description: 'hellobello',
      },
      {
        id: 15,
        user: {
          id: 0,
          name: 'Attila',
          email: 'john@smith.com',
        },
        name: 'Lo Bela',
        description: 'Bela real superhero!',
      },
      {
        id: 16,
        user: {
          id: 1,
          name: 'Balazs',
          email: 'ms_Smith@smith.com',
        },
        name: 'Lo Bela',
        description: 'this is a sample stupid text',
      },
      {
        id: 17,
        user: {
          id: 2,
          name: 'Helga',
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
