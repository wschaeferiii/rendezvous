'use strict';


// our script will not exit until we have disconnected from the db.
function quit() {
  mongoose.disconnect();
  console.log('\nQuitting!');
}

// a simple error handler
function handleError(err) {
  console.log('ERROR:', err);
  quit();
  return err;
}

//SEED A USER AND A RDV
User.find({}).remove()
.then(() => {
   var joe = User.new({ name: "Joe"})
  return joe.save();
})
.then(function(joe) {
  console.log(joe);
  var r1 = Rdv.create(
  { title: "First RDV!",
    address: "123 Main st., New York City, NY, 11111",
    map: {"Map"},
    users: [User.schema],
    userStartLocations: [{lat: Number, lng: Number}],
    rdvEndLocation: {lat: Number, lng: Number},
    rdvFinishTime: String
  });
  console.log(r1);
  quit();
});






