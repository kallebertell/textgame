var tg = tg || {};

tg.buildInput = (function() {

	return function buildInput(str) {
		var tokens = _.map(str.split(' '), function(token) {
			return token.trim().toLowerCase();
		});

		tokens = _.filter(tokens, function(token) {
			return token.length > 0;
		});

		return function(from, to) {
			if (arguments.length < 1) {
				return tokens.join(' ');
			}

			if (to) {
				return tokens.slice(from, to+1).join(' ');
			}

			return tokens[from];
		};
	};

})();
