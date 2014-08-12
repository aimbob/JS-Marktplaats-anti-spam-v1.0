var advertTop;
var advertDay;
var advertAdmart;
var advertLink;
var advertExtra;
var advertSpammer;



// FUNCTIONS 

	// advertTop
	function hideTopAdds(){
		$(".column-price:contains('Topadvertentie')").parents('tr').hide();
		console.log('hide adds: Top adds');
	}
	function showTopAdds(){
		$(".column-price:contains('Topadvertentie')").parents('tr').show();
		console.log('show adds: Top adds');
	}
	function toggleTopAdds(){
		if(advertTop == true){
			hideTopAdds();
		}
		else {
			showTopAdds();
		}
	}

	// advertDay
	function hideDailyAdds(){
		$(".column-price:contains('Dagtopper')").parents('tr').hide();
		console.log('hide adds: Daily adds');
	}
	function showDailyAdds(){
		$(".column-price:contains('Dagtopper')").parents('tr').show();
		console.log('show adds: Daily adds');
	}
	function toggleDailyAdds(){
		if(advertDay == true){
			hideDailyAdds();
		}
		else {
			showDailyAdds();
		}
	}

	// advertAdmart
	function hideAdMartAdds(){
		$('.bottom-listing').hide();
		$('#bottom-listings-divider').hide();
		$('.mp-adsense-header').hide();
		console.log('hide adds: AddMart adds');
	}
	function showAdMartAdds(){
		$('.bottom-listing').show();
		$('#bottom-listings-divider').show();
		$('.mp-adsense-header').show();
		console.log('show adds: AddMart adds');
	}
	function toggleAdMartAdds(){
		if(advertAdmart == true){
			hideAdMartAdds();
		}
		else {
			showAdMartAdds();
		}
	}


	// advertLink
	function hideLinkAdds(){
		$('.seller-link').parents('tr').hide();
		console.log('hide adds: Linked adds');
	}
	function showLinkAdds(){
		$('.seller-link').parents('tr').show();
		console.log('show adds: Linked adds');
	}
	function toggleLinkAdds(){
		if(advertLink == true){
			hideLinkAdds();
		}
		else {
			showLinkAdds();
		}
	}


	// advertExtra
	function hideExtraAdds(){
		$('.horizontal-extended-listing').hide();
		$('.horizontalRichSnippet').hide();
		console.log('hide adds: Extra adds');
	}

	function showExtraAdds(){
		$('.horizontal-extended-listing').show();
		$('.horizontalRichSnippet').show();
		console.log('show adds: Extra adds');
	}

	function toggleExtraAdds(){
		if(advertExtra == true){
			hideExtraAdds();  
		}
		else {
			showExtraAdds();
		}
	}

	// spammers
	function showSpammer(spammerId)
	{

		$("a[href*='"+spammerId+"']").parents("tr").removeClass('mpasSpammer');
		console.log('Spammer visible: '+spammerId+' - a[href*="'+spammerId+'"]');
	}

	function hideSpammer(spammerId)
	{
		$("a[href*='"+spammerId+"']").parents("tr").addClass('mpasSpammer');
		console.log('Spammer hidden: '+spammerId+ ' - a[href*="'+spammerId+'"]');
	}

	function toggleSpammerAdds()
	{
		self.port.emit("toggleSpammers", "true");
	}

	// all
	function toggleAll(){
		toggleTopAdds();
		toggleDailyAdds();
		toggleAdMartAdds();
		toggleLinkAdds();
		toggleExtraAdds();
		toggleSpammerAdds();
	}



// LISTENERS

	self.port.on("advertTop", function(value) {
		advertTop = value;
		toggleTopAdds();
	});

	self.port.on("advertDay", function(value) {
		advertDay = value;
		toggleDailyAdds();
	});

	self.port.on("advertAdmart", function(value) {
		advertAdmart = value;
		toggleAdMartAdds();
	});

	self.port.on("advertLink", function(value) {
		advertLink = value;
		toggleLinkAdds();
	});

	self.port.on("advertExtra", function(value) {
		advertExtra = value;
		toggleExtraAdds();
	});

	self.port.on("advertSpammer", function(value) {
		advertSpammer = value;
		toggleExtraAdds();
	});

	self.port.on("hideSpammer", function(value) {
		hideSpammer(value);
	});

	self.port.on("showSpammer", function(value) {
		showSpammer(value);
	});



// DOCUMENT READY

	$(function () {

		toggleAll();

		// $('body').prepend("<div id='mpasContainer'><div id='mpasLabel'>Marktplaats Anti Spam</div><div id='mpasHidden'></div></div>");

	});