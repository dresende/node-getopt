var opts = {}, params = [];

exports.params = function () {
	return params;
};
exports.getopt = function (cb) {
	for (k in opts) {
		cb(k, opts[k]);
	}
};
exports.setopt = function (o, args) {
	if (typeof args == "undefined") args = process.argv.slice(2);
	if (typeof args.length == "undefined") args = args.split(/\s+/);

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
