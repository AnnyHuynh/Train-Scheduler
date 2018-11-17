
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBb0DECPl1SsB17YZahIJ2mKFz1h-7Nor8",
    authDomain: "train-scheduler-2d7c4.firebaseapp.com",
    databaseURL: "https://train-scheduler-2d7c4.firebaseio.com",
    projectId: "train-scheduler-2d7c4",
    storageBucket: "",
    messagingSenderId: "238309025791"
  };
  firebase.initializeApp(config);
  var database = firebase.database();

// 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var trainTime = $("#train-time-input").val().trim();
  var frequency = $("#frequency-input").val().trim();
  // Creates local "temporary" object for holding employee data
  var display = {
    name: trainName,
    where: destination,
    firstTime: trainTime,
    often: frequency
  };

  // Uploads employee data to the database
  database.ref().push(display);

  // Logs everything to console
  console.log(display.name);
  console.log(display.where);
  console.log(display.often);
  console.log(display.timeArrive);
  console.log(display.tRemainder);

  alert("Train Schedule successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#train-time-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());


  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().where;
  var trainTime = childSnapshot.val().firstTime;
  var frequency = childSnapshot.val().often;
  // Employee Info
  console.log(trainName);
  console.log(destination);
  console.log(trainTime);
  console.log(frequency);

  // Grabs user input
  var firstTime = moment(trainTime, "HH:mm").subtract(1, "years");

  //console.log(trainTime);
  //var frequency = moment($("#frequency-input").val().trim()).format("minutes");
  var diffTime = moment().diff(moment(firstTime), "minutes");
  console.log(diffTime);
  //var timeFrequency = parseInt(frequency);
  console.log(frequency);
  var tRemainder = diffTime % frequency;
  console.log(tRemainder);
  var timeCalculation = frequency - tRemainder;
  var nextArrive = moment().add(timeCalculation, 'minutes').format("HH:mm");

  // Create the new row
  var newRow = $("<tr>").append(
    $("<th>").text(trainName),
    $("<th>").text(destination),
    $("<th>").text(frequency),
    $("<th>").text(nextArrive),
    $("<th>").text(timeCalculation)

  );

  // Append the new row to the table
  $('#train-table > tbody').append(newRow);
});


