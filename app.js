var map;
var layer;
var startWalk = false;
var init = false;
var tp = false;
var killTp;
var playerWalk = true;
var game = new Phaser.Game(640, 480, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload () {

	game.load.image('map', 'assets/map/map.png');

	game.load.image('lbridge', 'assets/map/lbridge.png');
	game.load.image('rbridge', 'assets/map/rbridge.png');

	game.load.image('wood', 'assets/map/wood.png');

	game.load.image('pokeball', 'assets/map/pokeball.png');

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
	game.load.image('tp', 'assets/textbox/tp.png');
	game.load.spritesheet('player', 'assets/player/link.png', 32, 48, 16);
}

function create () {

	game.physics.startSystem(Phaser.Physics.ARCADE);

	map = game.add.sprite(0, 0, 'map');

	npc = game.add.physicsGroup();
	spook = npc.create(20, 20, 'pokeLean');
	game.physics.arcade.enable(spook);
	spook.body.immovable = true;

	pokeball = game.add.sprite(180, 15, 'pokeball');
	game.physics.arcade.enable(pokeball);
	spook.body.immovable = true;

	rockWaterTop = game.add.physicsGroup();
	
	var loopTop = 0;
	
	for (var i = 0; i < 9; i++) {
		y = 270;
		rockWaterTop.create(loopTop, y, 'rock');
		loopTop += 25;
	}

	rockWaterBot = game.add.physicsGroup();

	var loopBot = 0;

	for (var i = 0; i < 9; i++) {
		y = 390;
		rockWaterBot.create(loopBot, y, 'rock');
		loopBot += 25;
	}

	rockWaterRight = game.add.physicsGroup();

	var loopRight = 390;

	for (var i = 0; i < 6; i++) {
		x = 225;
		rockWaterRight.create(x, loopRight, 'rock');
		loopRight -= 25;
	}

	rockPathRight = game.add.physicsGroup();

	var loopPathRight = 455;

	for (var i = 0; i < 14; i++) {
		x = 590;
		rockPathRight.create(x, loopPathRight, 'rock');
		loopPathRight -= 25;
	}

	rockPathLeft = game.add.physicsGroup();

	var loopPathLeft = 455;

	for (var i = 0; i < 10; i++) {
		x = 525;
		rockPathLeft.create(x, loopPathLeft, 'rock');
		loopPathLeft -= 25;
	}

	rockPathTop = game.add.physicsGroup();

	var loopPathTop = 590;

	for (var i = 0; i < 18; i++) {
		y = 105;
		rockPathTop.create(loopPathTop, y, 'rock');
		loopPathTop -= 25;
	}

	rockPathBot = game.add.physicsGroup();

	var loopPathBot = 500;

	for (var i = 0; i < 12; i++) {
		y = 230;
		rockPathBot.create(loopPathBot, y, 'rock')
		loopPathBot -= 25;
	}

	for (var i = 0; i < rockPathBot.children.length; i++)
		rockPathBot.children[i].body.immovable = true;

	for (var i = 0; i < rockPathLeft.children.length; i++)
		rockPathLeft.children[i].body.immovable = true;

	for (var i = 0; i < rockPathTop.children.length; i++)
		rockPathTop.children[i].body.immovable = true;

	for (var i = 0; i < rockWaterTop.children.length; i++) {
		if (i !== 0 && i !== 1)
			rockWaterTop.children[i].body.immovable = true;
	}

	for (var i = 0; i < rockWaterBot.length; i++)
		rockWaterBot.children[i].body.immovable = true;

	for (var i = 0; i < rockWaterRight.length; i++)
		rockWaterRight.children[i].body.immovable = true;

	for (var i = 0; i < rockPathRight.length; i++)
		rockPathRight.children[i].body.immovable = true;

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

		txt1 = textBox.create(spook.body.x, spook.body.y - 50, 'text1'); // add !!!
		playerWalk = false;
		game.time.events.add(2000, function () {

			txt1.kill();
			txt1 = textBox.create(player.body.x - 240, player.body.y - 100, 'text4');

			game.time.events.add(4000, function () {

				txt1.kill();
				txt1 = textBox.create(spook.body.x + 40, spook.body.y - 50, 'node');

				game.time.events.add(2000, function () {

					txt1.kill();
					txt1 = textBox.create(spook.body.x, spook.body.y - 50, 'text2');

					game.time.events.add(2000, function () {

						txt1.kill();
						txt1 = textBox.create(spook.body.x - 75, spook.body.y - 55, 'text3');

						game.time.events.add(3500, function () {
							txt1.kill();
							txt1 = textBox.create(player.body.x - 40, player.body.y - 60, 'lnode');

							game.time.events.add(2000, function () {

								txt1.kill();
								txt1 = textBox.create(player.body.x - 110, player.body.y - 60, 'text8');

								game.time.events.add(2000, function () {

									txt1.kill();
									txt1 = textBox.create(spook.body.x - 50, spook.body.y - 50, 'push');

									game.time.events.add(2000, function () {
										txt1.kill();
										playerWalk = true;
										rockPathTop.children[14].body.immovable = false;
										rockPathTop.children[13].body.immovable = false;
									}, this);
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

killTp = function () {

	spook.body.velocity.y = 0; // teleportation
	teleportation = textBox.create(spook.body.x - 20, spook.body.y - 50, 'tp');

	game.time.events.add(2000, function () {

		/* delete sprite */
		for (var i = 0; i < textBox.children.length; i++) {
			textBox.children[i].destroy();
		}
		spook.destroy();
		
		/* recreate spook */
		spook = npc.create(160, 140, 'pokeLean');
		game.physics.arcade.enable(spook);
		spook.body.immovable = true;

		/* end tp phase allow player to move */
		tp = true;
		playerWalk = true;
	}, this);
};

function update () {

	game.physics.arcade.collide(player, fallWater); // function to set up new world
	game.physics.arcade.collide(player, spook, startLore, null, this);
	game.physics.arcade.collide(player, rockWaterTop);
	game.physics.arcade.collide(player, rockWaterRight);
	game.physics.arcade.collide(player, rockWaterBot); // function delete to let pass user not possible to move if dialog not setup
	game.physics.arcade.collide(rockWaterTop, rockWaterBot);
	game.physics.arcade.collide(player, rockPathRight);
	game.physics.arcade.collide(player, rockPathTop);
	game.physics.arcade.collide(player, rockPathLeft);
	game.physics.arcade.collide(player, rockPathBot);
	game.physics.arcade.collide(player, pokeball);

	player.body.velocity.x = 0;
	player.body.velocity.y = 0;

	if (!startWalk) {

		if (spook.body.y < 70)
			spook.body.velocity.y += 2;
		else
			spook.body.velocity.y -= 2
	}
	else {
		if (!tp) {
			playerWalk = false;
			killTp();
		}

	}
// check ordre et technique pour propre

	if (playerWalk) {
		if (cursors.left.isDown) {
			if (player.body.y <= 230)
				startWalk = true;
			player.animations.play('left', 10, false);
			player.body.velocity.x = -200;
		} else if (cursors.right.isDown) {
			if (player.body.y <= 230)
				startWalk = true;
			player.animations.play('right', 10, false);
			player.body.velocity.x = 200;
		}
		if (cursors.up.isDown) {
			if (player.body.y <= 230)
				startWalk = true;
			player.animations.play('up', 10, false);
			player.body.velocity.y = -200;
		} else if (cursors.down.isDown) {
			if (player.body.y <= 230)
				startWalk = true;
			player.animations.play('down', 10, false);
			player.body.velocity.y = 200;
		}
	}
}

function startLore () {
	if (!init)
		initGame();
}
