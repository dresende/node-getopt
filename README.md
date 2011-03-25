## API

### setopt(options, [arguments])

Set the `options` for your program. If `arguments` is not set, `process.argv` is used.

Options is a string containing letters that correspond to the options you want. If a letter
is proceeded by a `:`, the option has a required argument. If a letter is proceeded by double
`:`, the option has an optional argument.

This function throws exceptions when an invalid option is set and when a required option is
not set.

### getopt(callback)

Callback will be called with 2 arguments, where the first is the option name (a letter) and
the second is the option parameter(s) or the number of times the option has appeared.

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
