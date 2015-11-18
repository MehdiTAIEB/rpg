var map;
var layer;
var test;
var init = false;
var playerWalk = true;
var game = new Phaser.Game(640, 480, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload () {

	game.load.image('map', 'assets/map/map.png');

	game.load.image('lbridge', 'assets/map/lbridge.png');
	game.load.image('rbridge', 'assets/map/rbridge.png');

	game.load.image('wood', 'assets/map/wood.png');

	game.load.image('rock', 'assets/map/rock.png');

	game.load.image('water', 'assets/map/www.png');
	game.load.image('solidWater', 'assets/map/cw.png');

	game.load.image('pokeLean', 'assets/npc/pokeLean.png');

	game.load.image('text1', 'assets/textbox/text1.png');
	game.load.image('text3', 'assets/textbox/txt3.png');
	game.load.image('text2', 'assets/textbox/txt2.png');

	game.load.image('text4', 'assets/textbox/text4.png');
	game.load.image('text8', 'assets/textbox/text8.png');
	game.load.image('node', 'assets/textbox/node.png');
	game.load.image('lnode', 'assets/textbox/lnode.png');
	game.load.image('push', 'assets/textbox/push.png');
	game.load.spritesheet('player', 'assets/player/link.png', 32, 48, 16);
}

function create () {

	game.physics.startSystem(Phaser.Physics.ARCADE);

	map = game.add.sprite(0, 0, 'map');

	npc = game.add.physicsGroup();
	spook = npc.create(170, 120, 'pokeLean');
	game.physics.arcade.enable(spook);
	spook.body.immovable = true;

	rock = game.add.physicsGroup();

	rockTop1 = rock.create(0, 270, 'rock');
	rockTop2 = rock.create(25, 270, 'rock');

	rockTop3 = rock.create(50, 270, 'rock');
	rockTop3.body.immovable = true;

	rockTop4 = rock.create(75, 270, 'rock');
	rockTop4.body.immovable = true;

	rockTop5 = rock.create(100, 270, 'rock');
	rockTop5.body.immovable = true;

	rockTop6 = rock.create(125, 270, 'rock');
	rockTop6.body.immovable = true;

	rockTop7 = rock.create(150, 270, 'rock');
	rockTop7.body.immovable = true;

	rockTop8 = rock.create(175, 270, 'rock');
	rockTop8.body.immovable = true;

	rockTop9 = rock.create(200, 270, 'rock');
	rockTop9.body.immovable = true;

	rockBot1 = rock.create(0, 390, 'rock');
	rockBot1.body.immovable = true;

	rockBot2 = rock.create(25, 390, 'rock');
	rockBot2.body.immovable = true;

	rockBot3 = rock.create(50, 390, 'rock');
	rockBot3.body.immovable = true;

	rockBot4 = rock.create(75, 390, 'rock');
	rockBot4.body.immovable = true;

	rockBot5 = rock.create(100, 390, 'rock');
	rockBot5.body.immovable = true;

	rockBot6 = rock.create(125, 390, 'rock');
	rockBot6.body.immovable = true;

	rockBot7 = rock.create(150, 390, 'rock');
	rockBot7.body.immovable = true;

	rockBot8 = rock.create(175, 390, 'rock');
	rockBot8.body.immovable = true;

	rockBot9 = rock.create(200, 390, 'rock');
	rockBot9.body.immovable = true;

	rockRight1 = rock.create(225, 390, 'rock');
	rockRight1.body.immovable = true;
	
	rockRight2 = rock.create(225, 365, 'rock');
	rockRight2.body.immovable = true;

	rockRight3 = rock.create(225, 340, 'rock');
	rockRight3.body.immovable = true;																	// FAIRE 3 PHYSICS GROUP REDUIRE VARIABLES // loop ?

	rockRight4 = rock.create(225, 315, 'rock');
	rockRight4.body.immovable = true;

	rockRight5 = rock.create(225, 290, 'rock');
	rockRight5.body.immovable = true;

	rockRight6 = rock.create(225, 265, 'rock');
	rockRight6.body.immovable = true;

	rockPathRight1 = rock.create(590, 455, 'rock');
	rockPathRight2 = rock.create(590, 405, 'rock');
	rockPathRight3 = rock.create(590, 430, 'rock');
	rockPathRight4 = rock.create(590, 380, 'rock');
	rockPathRight5 = rock.create(590, 355, 'rock');
	rockPathRight6 = rock.create(590, 330, 'rock');
	rockPathRight7 = rock.create(590, 305, 'rock');
	rockPathRight8 = rock.create(590, 280, 'rock');
	rockPathRight9 = rock.create(590, 255, 'rock');
	rockPathRight10 = rock.create(590, 230, 'rock');
	rockPathRight11 = rock.create(590, 205, 'rock');
	rockPathRight12 = rock.create(590, 180, 'rock');
	rockPathRight13 = rock.create(590, 155, 'rock');
	rockPathRight14 = rock.create(590, 130, 'rock');
	rockPathRight15 = rock.create(590, 105, 'rock');


	bridges = game.add.physicsGroup();
	bridges.create(99, 320, 'lbridge');
	bridges.create(160, 320, 'rbridge');

	fallWater = game.add.sprite(130, 320, 'water');
	game.physics.arcade.enable(fallWater);
	fallWater.body.immovable = true;

	water = game.add.physicsGroup();

	textBox = game.add.physicsGroup();

	player = game.add.sprite(550, 440, 'player');
	game.physics.arcade.enable(player);

	player.body.collideWorldBounds = true;

	player.animations.add('right', [8, 9, 10, 11, 8], 10, true);
	player.animations.add('left', [4, 5, 6, 7, 4], 10, true);
	player.animations.add('up', [12, 13, 14, 15, 12], 10, true);
	player.animations.add('down', [0, 1, 2, 3, 0], 10, true);

	woods = game.add.physicsGroup();

	w1 = woods.create(65, 350, 'wood');
	w1.body.immovable = true;

	cursors = game.input.keyboard.createCursorKeys();


	initGame = function () {

		txt1 = textBox.create(spook.body.x, spook.body.y - 50, 'text1');
		playerWalk = false;
		game.time.events.add(1000, function () {

			txt1.kill();
			txt1 = textBox.create(player.body.x - 250, player.body.y - 100, 'text4');

			game.time.events.add(1000, function () {
				
				txt1.kill();
				txt1 = textBox.create(spook.body.x + 40, spook.body.y - 50, 'node');

				game.time.events.add(1000, function () {

					txt1.kill();
					txt1 = textBox.create(spook.body.x, spook.body.y - 50, 'text2');

					game.time.events.add(1000, function () {
						
						txt1.kill();
						txt1 = textBox.create(spook.body.x - 75, spook.body.y - 55, 'text3');

						game.time.events.add(1000, function () {
							txt1.kill();
							txt1 = textBox.create(player.body.x - 40, player.body.y - 60, 'lnode');

							game.time.events.add(1000, function () {
								
								txt1.kill();
								txt1 = textBox.create(player.body.x - 110, player.body.y - 60, 'text8');
								
								game.time.events.add(1000, function () {
								txt1.kill();
								txt1 = textBox.create(spook.body.x, spook.body.y, 'push');
								playerWalk = true;
								txt1.kill();

								}, this);
							}, this);
						}, this);
					}, this);
				}, this);
			}, this);
		}, this);
// rock can be push player can move // bool variable

		init = true;
	};
}

function update () {

	game.physics.arcade.collide(player, fallWater); // function to set up new world
	game.physics.arcade.collide(player, spook, startLore, null, this);
	game.physics.arcade.collide(player, rock);
	game.physics.arcade.collide(rockTop1, rockBot1); // function delete to let pass user not possible to move if dialog not setup
	game.physics.arcade.collide(rockTop2, rockBot2);
	
	player.body.velocity.x = 0;
	player.body.velocity.y = 0;

	if (playerWalk) {
		if (cursors.left.isDown) {
			player.animations.play('left', 10, false);
			player.body.velocity.x = -200;
		} else if (cursors.right.isDown) {
			player.animations.play('right', 10, false);
			player.body.velocity.x = 200;
		}
		if (cursors.up.isDown) {
			player.animations.play('up', 10, false);
			player.body.velocity.y = -200;
		} else if (cursors.down.isDown) {
			player.animations.play('down', 10, false);
			player.body.velocity.y = 200;
		}
	}
}

function startLore () {
	if (!init)
		initGame();
}
