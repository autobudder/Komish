if ((typeof cordova == 'undefined') && (typeof Cordova == 'undefined')) alert('Cordova variable does not exist. Check that you have included cordova.js correctly');
if (typeof CDV == 'undefined') alert('CDV variable does not exist. Check that you have included cdv-plugin-fb-connect.js correctly');
if (typeof FB == 'undefined') alert('FB variable does not exist. Check that you have included the Facebook JS SDK file.');
var x = [];
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

             
function search (y,callback) {
var options = new ContactFindOptions();
options.filter= y; 
options.multiple = true;
var fields = ["displayName","phoneNumbers"];
console.log("finding:"+y);

navigator.contacts.find(fields, callback, onError, options);
//navigator.contacts.find(fields, onSuccess, onError);
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

function getLoginStatus() {
	FB.getLoginStatus(function(response) {
					  if (response.status == 'connected') {
					  alert('logged in');
					  } else {
					  //alert('not logged in');
					  }
					  });
}
var friendIDs = [];
var fdata;

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
        		x.push({name: item.name, bday: item.birthday});
      }
    }
    console.log("array:" + print(x));
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
 alert('not logged in');
 }
 },
 { scope: "email,friends_birthday" }
 );
}

document.addEventListener('deviceready', function() {
  try {
  alert('Device is ready! Make sure you set your app_id below this alert.');
  FB.init({ appId: "405651006145953", nativeInterface: CDV.FB, useCachedDialogs: false });
  document.getElementById('data').innerHTML = "";
  } catch (e) {
  alert(e);
  }
  }, false);


function messageSend(x){
	alert('Phone: ' + x + ' Message: Happy Birthday from Kartik' );
	window.plugins.sms.send(x, "Happy Birthday from Kartik", 
		function () { 
		   alert('Message sent successfully');	
	    },
		function (e) {
			alert('Message Failed:' + e);
		}
	);
						
}
//document.addEventListener("deviceready", onDeviceReady, false);
