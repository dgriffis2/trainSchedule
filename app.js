  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDeELRgjuCNlobfeEBDpamZDj8PQspBElA",
    authDomain: "trains-23ae2.firebaseapp.com",
    databaseURL: "https://trains-23ae2.firebaseio.com",
    projectId: "trains-23ae2",
    storageBucket: "",
    messagingSenderId: "139968941762"
  };
  firebase.initializeApp(config);


  var database = firebase.database();

  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    var trnName = $("#train-name-input").val().trim();
    var dest = $("#destination-input").val().trim();
    var trnStart = moment($("#train-start-input").val().trim(), "HH:mm").format("X");
    var freq = $("#frequency-input").val().trim();
  
    var newTrn = {
      name: trnName,
      dest: dest,
      trnStart: trnStart,
      freq: freq
    };
  
    database.ref().push(newTrn);
  
    alert("Train successfully added");
  
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#train-start-input").val("");
    $("#frequency-input").val("");
  });
  
  database.ref().on("child_added", function(childSnapshot) {
  
    var trnName = childSnapshot.val().name;
    var dest = childSnapshot.val().dest;
    var trnStart = childSnapshot.val().trnStart;
    var freq = childSnapshot.val().freq;
    
    var firstTimeConverted = moment(trnStart, "HH:mm")

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    var tRemainder = diffTime % freq;

    var minAway = (freq - tRemainder);

    var nextArrival = moment().add(minAway, "minutes");
    
    var newRow = $("<tr>").append(
      $("<td>").text(trnName),
      $("<td>").text(dest),
      $("<td>").text(freq),
      $("<td>").text(nextArrival),
      $("<td>").text(minAway)
    );
  
    $("#train-table > tbody").append(newRow);
  });