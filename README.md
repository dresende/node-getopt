## Example

An example is worth 1000 words..

    var opt = require('getopt');
    
    try {
		// set options, 2nd argument is optional, if not set it will fetch process.argv
		opt.setopt("abc:d::", [ "-ab", "-ac", "34", "-d" ]);
	} catch (e) {
		// exceptions are thrown when an invalid option
		// is set or a required parameter is not set
		console.dir(e);
	}
    
    opt.getopt(function (o, p) {
    	switch (o) {
    		case "a":
    		case "b":
    			console.log("option %s set %d times", o, p);
    			break;
    		case "c":
    			console.log("option c param = '%s'", p);
    			break;
    		case "d":
    			console.log("option d set");
    	}
    });
