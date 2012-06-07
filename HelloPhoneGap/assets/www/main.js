if ((typeof cordova == 'undefined') && (typeof Cordova == 'undefined')) alert('Cordova variable does not exist. Check that you have included cordova.js correctly');
if (typeof CDV == 'undefined') alert('CDV variable does not exist. Check that you have included cdv-plugin-fb-connect.js correctly');
if (typeof FB == 'undefined') alert('FB variable does not exist. Check that you have included the Facebook JS SDK file.');
var x = [];
var db;
var friendIDs = [];
var fdata;
var results;
var today = {};
FB.Event.subscribe('auth.login', function(response) {
//	alert('auth.login event');
});

FB.Event.subscribe('auth.logout', function(response) {
	alert('auth.logout event');
});

FB.Event.subscribe('auth.sessionChange', function(response) {
	//alert('auth.sessionChange event');
});

FB.Event.subscribe('auth.statusChange', function(response) {
	//alert('auth.statusChange event');
});

             
function search (y,m) {
var options = new ContactFindOptions();
options.filter= y; 
options.multiple = true;
var fields = ["displayName","phoneNumbers"];
console.log("finding:"+y);

navigator.contacts.find(fields, render(m), onError, options);
//navigator.contacts.find(fields, onSuccess, onError);
}

function render(m){
  return function(contacts){
        
        if( typeof(contacts) != "undefined" && contacts.hasOwnProperty(length) ){
          console.log("return:" + print(contacts));
        for(var i=0; i<contacts.length; i++) {
          if( contacts[i].hasOwnProperty("phoneNumbers") && typeof(contacts[i].phoneNumbers) != "undefined" && contacts[i].phoneNumbers != null && contacts[i].phoneNumbers.hasOwnProperty(length) ){
             for (var j=0; j<contacts[i].phoneNumbers.length; j++) {
               if( contacts[i].phoneNumbers[j].value != ""){
                 break;
               }
             }
              if ( j != contacts[i].phoneNumbers.length ){              
                
                console.log("found:" + contacts[i].displayName + contacts[i].phoneNumbers[j].value);
                today[results.rows.item(m).uid] = { uid: results.rows.item(m).uid,
                name: results.rows.item(m).name,
                bday: results.rows.item(m).birthday,
                number: contacts[i].phoneNumbers[j].value
              }
                $("#log").append("<br/>" + results.rows.item(m).uid + " " + results.rows.item(m).name + " " + results.rows.item(m).birthday + " " + contacts[i].phoneNumbers[j].value + "<button id='" + results.rows.item(m).uid + "' onclick='messageSend(this.id)'>Send</button>" );
              }
            }
        }
      }
    }
  }
function onSuccess(contacts) {
alert(contacts.length);
//$("#contacts").html("hello");
for (var i=0; i<contacts.length; i++) {
//console.log("Display Name = " + contacts[i].birthday);     
//console.log(typeof(contacts[i].birthday));
//var x =   contacts[i].birthday;
//if(x != null){    

   for (var j=0; j<contacts[i].phoneNumbers.length; j++) {            
	//	$("#contacts").html($("#contacts").html() + "<br/>" + contacts[i].displayName + " " + contacts[i].birthday + " " + contacts[i].phoneNumbers[j].value);
	//	$("#contacts").html($("#contacts").html() + "<br/>" + contacts[i].displayName + " " + contacts[i].birthday + " " + contacts[i].phoneNumbers[j].value);
	console.log("found:" + contacts[i].displayName + contacts[i].phoneNumbers[j].value);
		//alert(typeof(contacts[i].birthday));
		//messageSend(contacts[i].phoneNumbers[j].value);
	}

//}
}
}
// onError: Failed to get the contacts
//
function onError(contactError) {
alert('onError!');
}

// Populate the database 
//
function populateDB(tx) {
     //tx.executeSql('DROP TABLE IF EXISTS DEMO');
   //  tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');
    for(var i = 0; i< x.length; i++){
      var sql = 'INSERT INTO birthdays (uid,name,birthday) VALUES (' + x[i].id + ',"' + x[i].name + '","' + x[i].bday + '")';
    	      tx.executeSql(sql);
    	      console.log("sql:" + sql);
    	
    }
     //tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")');
}

// Transaction error callback
//
function errorCB(tx, err) {
    alert("Error processing SQL: "+ print(arguments) + err);
    alert("No Bday today");
}
function queryDB(tx) {
  var date = new Date();
  var string = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth()+1)).slice(-2);
  //string = "06/08";
  //tx.executeSql('SELECT * FROM birthdays WHERE birthday LIKE "%' + string + '%"', [], querySuccess, errorCB);
  tx.executeSql('SELECT * FROM birthdays WHERE birthday', [], querySuccess, errorCB);
}

// Query the success callback
function querySuccess(tx, r) {
  results = r;
    console.log("Rows Affected = " + results.rowAffected);
    // the number of rows returned by the select statement
    console.log("Insert ID = " + results.rows.length);
    //console.log("db dump:" + print(results));
     var len = results.rows.length;
     console.log("today:"+ len);
    for (var k=0; k<20; k++){
            search(results.rows.item(k).name,k); 
    
  }
    return true;
}
    
// Transaction success callback
//
function successCB() {
    alert("success!");
    db.transaction(queryDB, errorCB);
    return true;
}
    
function getLoginStatus() {
	FB.getLoginStatus(function(response) {
					  if (response.status == 'connected') {
					  alert('logged in');
					  } else {
					  //alert('not logged in');
					  }
					  });
}


var print = function(o){
    var str='';

    for(var p in o){
        if(typeof o[p] == 'string'){
            str+= p + ': ' + o[p]+'; ';
        }else{
            str+= p + ': { ' + print(o[p]) + '}';
        }
    }

    return str;
}
function me() {
	FB.api('/me/friends', { fields: 'id, name, birthday' },  function(response) {
	if (response.error) {
		alert(JSON.stringify(response.error));
	} else {
		var data = document.getElementById('data');
		fdata=response.data;
		console.log("fdata: "+print(fdata));
    for(var i in fdata){
      item = fdata[i];
			//console.log("typeof bday:" + typeof(item.birthday));
			if(item.hasOwnProperty("birthday") ){
				console.log("bday:" + item.birthday);
				console.log("name:" + item.name);
				console.log("json:" + print(item));
        		x.push({id: item.id, name: item.name, bday: item.birthday});
      }
    }
    console.log("array:" + print(x));
    db.transaction(populateDB, errorCB, successCB);
    search(x[0].name, function(contacts){
				console.log("found:"+ print(contacts));
        
        var j=0;
					//alert(contacts.length + item.name);
					//for (var i=0; i<contacts.length; i++) {
					//	for (var j=0; j<contacts.phoneNumbers.length; j++) { 
							var d = document.createElement('div');
						//	d.innerHTML = x[0].name + " " + x[0].birthday + contacts.phoneNumbers[j].value;
							data.appendChild(d);
                 //         console.log("number:"+contacts.phoneNumbers[j].value);

					//	}
					//}
				});	
	var friends = response.data;
	console.log(friends.length); 
	for (var k = 0; k < friends.length && k < 200; k++) {
        var friend = friends[k];
        var index = 1;

        friendIDs[k] = friend.id;
        //friendsInfo[k] = friend;
	}
	console.log("friendId's: "+friendIDs);
}
	});
}

function logout() {
	FB.logout(function(response) {
			  alert('logged out');
			  });
}

function login() {
FB.login(
 function(response) {
 if (response.session) {
 alert('logged in');
 } else {
 //alert('not logged in');
 }
 },
 { scope: "email,friends_birthday" }
 );
}

document.addEventListener('deviceready', function() {
  onDeviceReady();
  try {
 // alert('Device is ready! Make sure you set your app_id below this alert.');
  FB.init({ appId: "405651006145953", nativeInterface: CDV.FB, useCachedDialogs: false });
  document.getElementById('data').innerHTML = "";
  } catch (e) {
  alert(e);
  }
  }, false);


function messageSend(id){
  	console.log('dumpq: ' + print(today));
  	console.log('id: ' + id);

  var x = today[id].name;
  var y = today[id].number;
  
	console.log('Sending: ' + x + ' ' + y );
	window.plugins.sms.send(9008420482, "Happy Birthday " + x, 
		function () { 
		   alert('Message sent successfully');	
	    },
		function (e) {
			alert('Message Failed:' + e);
		}
	);
						
}
function createTable(tx){
  tx.executeSql('CREATE TABLE IF NOT EXISTS birthdays (uid primary key, name text, birthday text)');
}
function onDeviceReady(){
  db = window.openDatabase("autobudder", "1.0", "AutoBudder", 1000000);
  db.transaction(createTable, errorCB, successCB);
}
