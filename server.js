var server = require('express');

// START SERVER

var port = process.env.PORT || 3000;
var app = server();
app.use('/', server.static('web'));

app.listen(port, function () {
  console.log(`Server running on port ${port}`);
});
