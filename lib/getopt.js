var opt_defs = "",
    opts = {},
    params = [];

function stringRepeat(str, num) {
	return new Array(num + 1).join(str);
}

exports.showHelp = function (title, cb) {
	var path = require('path');

	console.log("  %s", title);
	console.log("  ------------------");
	console.log("  \033[1m%s\033[0m <options>", path.basename(process.argv[path.basename(process.execPath) == process.argv[0] ? 1 : 0]));
	console.log("");
	
	var list = [],
	    default_param = "param",
	    param_maxlen = default_param.length;

	for (var i = 0; i < opt_defs.length; i++) {
		if (opt_defs[i] == ":") continue;
		
		var desc = cb(opt_defs[i]);

		if (opt_defs.length > i + 1 && opt_defs[i + 1] == ":") {
			var param_name = default_param;

			if (typeof desc == "object" && desc.length && desc.length > 1) {
				param_name = desc[0];
				desc = desc[1];
			}
			
			param_name = "<" + param_name + ">";
			
			if (opt_defs.length > i + 2 && opt_defs[i + 2] == ":") {
				param_name = "[" + param_name + "]";
			}
			
			if (param_name.length > param_maxlen) {
				param_maxlen = param_name.length;
			}
			
			list.push({
				"opt"	: opt_defs[i],
				"desc"	: desc,
				"param"	: param_name
			});
		} else {
			list.push({
				"opt"	: opt_defs[i],
				"desc"	: desc,
				"param"	: ""
			});
		}
	}
	
	for (var i = 0; i < list.length; i++) {
		list[i].param += stringRepeat(" ", param_maxlen - list[i].param.length);
	}

	for (var i = 0; i < list.length; i++) {
		console.log("  \033[1m-%s %s\033[0m  %s", list[i].opt, list[i].param, list[i].desc);
	}
};
exports.params = function () {
	return params;
};
exports.getopt = function (cb) {
	for (k in opts) {
		cb(k, opts[k]);
	}
};
exports.setopt = function (o, args) {
	if (typeof args == "undefined") {
		var path = require('path');
		// allows argv like "node script.js params" and "script.js params"
		args = process.argv.slice(path.basename(process.execPath) == process.argv[0] ? 2 : 1);
	}
	
	opt_defs = o;

	for (var i = 0; i < args.length; i++) {
		if (args[i].length == 0) continue;
		if (args[i][0] != "-") {
			params.push(args[i]);
			continue;
		}
		if (args[i].length == 1) continue;
		
		var ii = 0;

		for (var j = 1; j < args[i].length; j++) {
			var p = o.indexOf(args[i][j]);
			
			if (p == -1) {
				throw { "type": "unknown", "opt": args[i][j] };
				continue;
			}
			
			if (o.length >= p && o[p + 1] == ":") {
				if (args.length > i + 1 + ii && args[i + 1 + ii][0] != "-") {
					if (typeof opts[args[i][j]] == "undefined") {
						opts[args[i][j]] = [];
					}
					opts[args[i][j]].push(args[i + 1 + ii]);
					ii++;
				} else if (o.length > p && o[p + 2] == ":") {
					opts[args[i][j]] = 1;
				} else {
					throw { "type": "required", "opt": args[i][j] };
				}
				continue;
			}
			opts[args[i][j]] = (opts[args[i][j]] || 0) + 1;
		}
		
		i += ii;
	}
};
