var express = require('express');
var faker = require('faker');
var app = express();

app.use(express.static('public'));

app.get('/data', function(req, res) {
  res.json({employees: getLargeData()});
});

app.listen(3000, function () {
  console.log('Listening on port 3000');
});


function getLargeData() {
  var result = [];
  for(var i=0; i<5000; i++) {
    result.push({
      name: faker.name.findName(),
      email: faker.internet.email(),
      country: faker.address.country(),
      city: faker.address.city(),
      company: faker.company.companyName(),
      userName: faker.internet.userName(),
      phoneNumber: faker.phone.phoneNumber()
    });
  }
  return result;
}
