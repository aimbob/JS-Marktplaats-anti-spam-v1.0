// required modules
var data = require("sdk/self").data;
var buttons = require('sdk/ui/button/action');
var pageMod = require("sdk/page-mod");
var cm = require("sdk/context-menu");
var ss = require("sdk/simple-storage");
var sp = require("sdk/simple-prefs");

var workers;

// Storage 
if (!ss.storage.spammers)
{
	ss.storage.spammers = [];
}



require("sdk/tabs").on("ready", function(tab) {
	for (i = 0; i < ss.storage.spammers.length; i++) {
	    console.log(ss.storage.spammers[i].userid);
	    console.log(ss.storage.spammers[i].username);
	    console.log(ss.storage.spammers[i].date);
	}
});






// modify page
pageMod.PageMod({
  // include: "*.ipvisie.com",
  include: ['*'],
  contentScriptFile: [
    data.url('jquery-1.11.1.min.js'),
    data.url('content.js')
  ],
  contentStyleFile: data.url("content.css"),
  onAttach: function(worker) {

  	workers = worker;

    worker.port.emit("advertTop", sp.prefs['advertTop']);
    worker.port.emit("advertDay", sp.prefs['advertDay']);
    worker.port.emit("advertAdmart", sp.prefs['advertAdmart']);
    worker.port.emit("advertLink", sp.prefs['advertLink']);
    worker.port.emit("advertExtra", sp.prefs['advertExtra']);
    worker.port.emit("advertSpammers", sp.prefs['advertSpammers']);

    require("sdk/simple-prefs").on("", onPrefChange);

	// PREFERENCES 
	function onPrefChange(prefName) {
	    worker.port.emit(prefName, sp.prefs[prefName]);
	    console.log('pref changed: '+prefName);
	}

	worker.port.on("toggleSpammers", function(value) {
		updateSpammersView(worker);
	});

}});





sp.on("sayHello", function() {
  console.log("hello");
});







// ADD TO CONTEXT MENU
cm.Item({
  label: "SPAMMER: voeg toe aan lijst",
  // context: [
  //   cm.URLContext(["*"]),
  //   cm.SelectorContext("img")
  // ],
	context:  cm.SelectorContext(".seller-name a[href]"),
  	contentScriptFile: [
    data.url('collection.js')
  ],
  onMessage: function (spammerString) {
  	
  	// spammer
  	res = spammerString.split(";");
  	var spammer = {};
  	spammer.userid = res[0];
  	spammer.username = res[1];
  	spammer.date = res[2];

  	if(!existsInArray(spammer.userid, ss.storage.spammers))
  	{
		ss.storage.spammers.push(spammer);
		workers.port.emit("hideSpammer", spammer.userid);
		console.log('hideSpammer: '+spammer.userid);
  	}
  	else {
  		removeFromArary(spammer.userid, ss.storage.spammers)
		workers.port.emit("showSpammer", spammer.userid);
		console.log('showSpammer: '+spammer.userid);
  	}

	for (i = 0; i < ss.storage.spammers.length; i++) {
	    console.log(ss.storage.spammers[i].userid);
	    console.log(ss.storage.spammers[i].username);
	    console.log(ss.storage.spammers[i].date);
	}

  	console.log('----------------------------------------------');
  }
});

// checks if ID is already in array
function existsInArray(id, array)
{
	var exists = false;
	for (i = 0; i < ss.storage.spammers.length; i++) {
	    if (ss.storage.spammers[i].userid === id)
	    {
	    	exists = true
	    };
	}
	return exists;
}

function removeFromArary(id, array)
{
	for (i = 0; i < ss.storage.spammers.length; i++) {
	    if (ss.storage.spammers[i].userid === id)
	    {
	    	ss.storage.spammers.splice(i, 1);
	    };
	}
}

function updateSpammersView(worker)
{

	for (i = 0; i < ss.storage.spammers.length; i++) {
		if(sp.prefs['advertSpammers'] == true)
		{
			worker.port.emit("showSpammer", ss.storage.spammers[i].userid);
		}
		else
		{
			worker.port.emit("hideSpammer", ss.storage.spammers[i].userid);
		}
	}

}


// advertLink listener
// workers.port.on("toggleSpammers", function(value) {
// 	updateSpammersView();
// 	console.log('received: toggleSpammers');
// });










// PREF PANEL


	// Construct a panel, loading its content from the "text-entry.html"
	// file in the "data" directory, and loading the "get-text.js" script
	// into it.
	var text_entry = require("sdk/panel").Panel({
		width: 350,
	  contentURL: data.url("sidebar.html"),
	  contentScriptFile: data.url("sidebar.js")
	});


	var sidebar = require("sdk/ui/sidebar").Sidebar({
	  id: 'my-sidebar',
	  title: 'My sidebar',
	  url: require("sdk/self").data.url("sidebar.html"),
	  onAttach: function (worker) {

	  },
	});


	// Create a button
	var button = buttons.ActionButton({
	  id: "show-panel",
	  label: "Show Panel",
	  icon: {
	    "16": "./icon-16.png",
	    "32": "./icon-32.png",
	    "64": "./icon-64.png"
	  },
	  onClick: handleClick
	});

	// Show the panel when the user clicks the button.
	function handleClick(state) {
		sidebar.show();
	}

	// When the panel is displayed it generated an event called
	// "show": we will listen for that event and when it happens,
	// send our own "show" event to the panel's script, so the
	// script can prepare the panel for display.
	text_entry.on("show", function() {
	  text_entry.port.emit("show");
	});

	// Listen for messages called "text-entered" coming from
	// the content script. The message payload is the text the user
	// entered.
	// In this implementation we'll just log the text to the console.
	text_entry.port.on("text-entered", function (text) {
	  console.log(text);
	  text_entry.hide();
	});