var liveServer = require("live-server");
var params = {
	port: 5656,
	host: "0.0.0.0", 
	root: "./docs",
	open: true,
};
liveServer.start(params);