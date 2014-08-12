self.on("click", function (node) {

	// user id
	var result = /(\d+)/.exec(node.href);
	var userId = result[0];
	
	// username
	var userName = node.innerHTML;

	// date
	var d = new Date();
	var cdate = d.getTime();
	// var ddate = d.getUTCDate()+'-'+d.getUTCDay()+'-'+d.getYear()+' '+d.getUTCHours()+':'+d.getUTCMinutes()+':'+d.getUTCSeconds();


	var val = userId+';'+userName+';'+cdate;

	self.postMessage(val);

	return true;
});