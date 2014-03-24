var tg = tg || {};

tg.buildInput = (function(aliases) {
	function isAlias(str) {
		return !!aliases[str];
	}

	return function buildInput(str) {

		var tokens =
			_(str.split(' '))
				.map(function(token) {
					return token.trim().toLowerCase();
				})
				.filter(function(token) {
					return token.length > 0;
				})
				.value();

		if (isAlias(tokens[0])) {
			// expand aliases and re-parse
			tokens[0] =  aliases[tokens[0]];
			return buildInput(tokens.join(' '));
		}


		var input = function(from, to) {
			if (arguments.length < 1) {
				return tokens.join(' ');
			}

			if (to) {
				return tokens.slice(from, to+1).join(' ');
			}

			return tokens[from];
		};

		input.contains = function() {
			var args = Array.prototype.slice.call(arguments);

			for(var i=0; i<args.length; i++) {
				if (input().indexOf(args[i]) !== -1) {
					return true;
				}
			}

			return false;
		};

		return input;
	};

})(tg.aliases);
