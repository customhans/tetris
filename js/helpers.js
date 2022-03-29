function wait(ms) {
	let inMs = ms + new Date().getTime();
	while (new Date() < inMs){}
	console.log("waited " + ms + " ms");
}
