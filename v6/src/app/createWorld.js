var app = app || {};

app.createWorld = (function(Room, commands, World) {
	return function() {
		var world = new World();

		world.add('westfield', {
			description:
				'You\'re in the west end of a deserted battlefield. Corpses of ' +
				'humans and bug-warriors lie spread across ground. This is the place ' +
				'of one of the most horrific scenes in the history of this planet. ' +
				'The stench is unbearable. ',
			lookAts: {
				'stench': 'Maybe you could smell it instead',
				'field': 'A truly horrific scene',
				'corpses': 'The corpses are of both humans and bug-warriors. Over a day old now',
				'humans': 'The human corpses are ripped as the bug-warriors use their claws to kill',
				'bugs': 'The bug-warrior corpses are ridden with gunshots. That\'s how we kill them',
				'scene': 'War is not beautiful.',
				'planet': 'Daedalon, a border planet between human and bug space'
			},
			actions: {
				'smell': function(input, print, currentRoom) {
					if (!input.contains('stench', 'air', 'field')) {
						print("Smell what?");
						return true;
					}

					print("You take a good whiff of the rotten smell and almost faint");
					return true;
				}
			},
			exits: {
				'east': 'eastfield'
			}
		});

		world.add('eastfield', {
			description: 'This place is empty. There is only a fence towards the east at the end of the battlefield.',
			actions: {
				'jump,hop,skip': function(input, print, currentRoom) {
					if (input.contains('fence')) {
							print('You ' + input(0) + ' the fence!');
							currentRoom(world.get('pastfence'));
							commands.look(input, print, currentRoom);
							return true;
					}

					print(input(0) + ' what now?');
					return true;
				}
			},
			lookAts: {
				'place': 'Seems empty',
				'fence': 'Hmm. Wonder if one could jump the fence.'
			},
			exits: {
				'west': 'westfield'
			}
		});

		var roomHasGold = true;

		world.add('pastfence', {
			description: function() {
				if (roomHasGold) {
					return 'There\'s gold here on the other side of the fence!';
				} else {
					return 'There\'s no more gold. We took it all.';
				}
			},
			lookAts: {
				'gold': function() {
					return (roomHasGold ? 'We\'re rich! Take it all. Take it!' : 'Alas. It is no more');
				}
			},
			actions: {
				'take,get': function(input, print, currentRoom) {
					if (!input.contains('gold')) {
						print(input(0) + ' what?');
						return true;
					}

					if (roomHasGold) {
						print('You ' + input(0) + ' all the gold. All of it!');
						roomHasGold = false;
					} else {
						print('There\'s no more gold to ' + input(0) + '!');
					}

					return true;
				}
			},
			exits: {
				'back': 'eastfield'
			}
		});

		return world;
	};

})(tg.Room, tg.commands, tg.World);
