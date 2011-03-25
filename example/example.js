var opt = require(__dirname + "/../lib/getopt");

try {
	opt.setopt("xha:b:c::");
} catch (e) {
	switch (e.type) {
		case "unknown":
			console.log("Unknown option: -%s", e.opt);
			break;
		case "required":
			console.log("Required parameter for option: -%s", e.opt);
			break;
		default:
			console.dir(e);
	}
	process.exit(0);
}

opt.getopt(function (o, p) {
	switch (o) {
		case "h":
			opt.showHelp("Program name", function (o) {
				switch (o) {
					case "h": return "Show this help menu";
					case "a": return [ "xx", "Option -a description" ];
					default:  return "Option '"+o+"'";
				}
			});
			process.exit(0);
			break;
		case "x":
			console.log("Option '%s'=%d times", o, p);
			break;
		default:
			console.log("Option '%s'=%s", o, p);
	}
});

console.log("parameters=", opt.params());
