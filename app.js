var map;
var layer;
var startWalk = false;
var init = false;
var tp = false;
var killTp;
var playerWalk = true;
var slot = {
	item: 0
};
var game = new Phaser.Game(640, 480, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload () {

	game.load.image('map', 'assets/map/map.png');

	game.load.image('lbridge', 'assets/map/lbridge.png');
	game.load.image('rbridge', 'assets/map/rbridge.png');


	game.load.image('pokeball', 'assets/map/pokeball.png');

	game.load.image('rock', 'assets/map/rock.png');

	game.load.image('water', 'assets/map/www.png');
	game.load.image('solidWater', 'assets/map/cw.png');

	game.load.image('pokeLean', 'assets/npc/pokeLean.png');
	game.load.image('racail', 'assets/npc/racail.png');
	game.load.image('roucoul', 'assets/npc/roucoul.png');

	game.load.image('bag', 'assets/player/bag.png');

	game.load.image('text1', 'assets/textbox/text1.png');
	game.load.image('text3', 'assets/textbox/txt3.png');
	game.load.image('text2', 'assets/textbox/txt2.png');
	game.load.image('text4', 'assets/textbox/text4.png');
	game.load.image('text8', 'assets/textbox/text8.png');
	game.load.image('node', 'assets/textbox/node.png');
	game.load.image('lnode', 'assets/textbox/lnode.png');
	game.load.image('push', 'assets/textbox/push.png');
	game.load.image('tp', 'assets/textbox/tp.png');
	game.load.image('spush', 'assets/textbox/spush.png');
	game.load.image('aye', 'assets/textbox/aye.png');

	game.load.spritesheet('player', 'assets/player/link.png', 32, 48, 16);
}

function create () {

	game.physics.startSystem(Phaser.Physics.ARCADE);

	map = game.add.sprite(0, 0, 'map');

	npc = game.add.physicsGroup();
	spook = npc.create(20, 20, 'pokeLean');
	game.physics.arcade.enable(spook);
	spook.body.immovable = true;

	bag = game.add.sprite(605, 2, 'bag');
	bag.scale.setTo(0.5, 0.5);

	
	racail = game.add.sprite(230, -10, 'racail');
	game.physics.arcade.enable(racail);
	racail.body.immovable = true;

	pokeball = game.add.sprite(180, 15, 'pokeball');
	game.physics.arcade.enable(pokeball);
	pokeball.body.immovable = true;

	rouc = game.add.physicsGroup();

	rockWaterTop = game.add.physicsGroup();

	for (var i = 0; i < 4; i++) {
		
		randx = Math.floor(Math.random() * (480 - 245 + 1) + 245);
		randy = Math.floor(Math.random() * (420 - 230 + 1) + 230);
		rouc.create(randx, randy, 'roucoul');
	}

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

	for (var i = 0; i < 15; i++) {
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
	game.physics.arcade.collide(player, pokeball, inventory, null, this);
	game.physics.arcade.collide(rockPathTop, racail, vel, null, this);
	game.physics.arcade.collide(racail, player);
	game.physics.arcade.collide(rouc, rockPathLeft);
	game.physics.arcade.collide(rouc, rockPathBot);
	game.physics.arcade.collide(rouc, rockWaterRight);
	/* set physics between rouc */
	for (var i = 0; i < rouc.children.length; i++) {
		rouc.children[i].body.collideWorldBounds = true;
		
		//randRoucX = Math.floor(Math.random() * (480 - 245 + 1) + 245);
		//randRoucX1 = Math.floor(Math.random() * (480 - 245 + 1) + 245);

		//randRoucY = Math.floor(Math.random() * (420 - 230 + 1) + 230);
		//randRoucY1 = Math.floor(Math.random() * (420 - 230 + 1) + 230);
		
		if (rouc.children[i].body.x < 480 && rouc.children[i].body.x > 245 && rouc.children[i].body.y > 230 && rouc.children[i].y < 420){

			ways = ['left', 'right', 'top', 'bot', 'fix'];
			way = ways[Math.floor(Math.random() * ways.length)];

			speeds = [150, 300, 450, 660];
			speed = speeds[Math.floor(Math.random() * speeds.length)];

			//rouc.children[i].body.velocity.x = 0;
			//rouc.children[i].body.velocity.y = 0;

				switch (way) {
					case 'left':
						rouc.children[i].body.velocity.x = 0;
						rouc.children[i].body.velocity.y = 0;
						rouc.children[i].body.velocity.x -= speed;
						break;
					case 'right':
						rouc.children[i].body.velocity.x = 0;
						rouc.children[i].body.velocity.y = 0;
						rouc.children[i].body.velocity.x = speed;
						break;
					case 'top':
						rouc.children[i].body.velocity.x = 0;
						rouc.children[i].body.velocity.y = 0;
						rouc.children[i].body.velocity.y -= speed;
						break;
					case 'bot':
						rouc.children[i].body.velocity.x = 0;
						rouc.children[i].body.velocity.y = 0;
						rouc.children[i].body.velocity.y = speed;
						break;
					case 'fix':
						rouc.children[i].body.velocity.x = 0;
						rouc.children[i].body.velocity.y = 0;
						break;
				}

		}
		else
			rouc.children[i].body.velocity.x -= 2;

		for (var y = 1; y <= rouc.children.length; y++) {
			game.physics.arcade.collide(rouc.children[i], rouc.children[y]);
		}

		//rouc.children[i].body.x = randRoucX;
		//rouc.children[i].body.y = randRoucY;

	}

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

function inventory () {
	playerWalk = false;
	pokeball.destroy();
	pokeball = game.add.sprite(610, 5, 'pokeball');
	slot.item = 1;

	spook.body.velocity.x -= 20;
	spook.body.velocity.y += 20;
	
	game.time.events.add(3000, function () {
			spook.body.velocity.x = 0;
			spook.body.velocity.y = 0;
			adv = textBox.create(spook.body.x - 30, spook.body.y - 50, 'spush');
			game.time.events.add(1000, function () {
				adv.destroy();
				playerWalk = true;
			}, this)
		}, this);
}

function startLore () {
	if (!init)
		initGame();
}

function vel () {
	aye = textBox.create(racail.body.x + 50, racail.body.y + 10, 'aye');

	game.time.events.add(1000, function (){
		for (var i = 0; i < textBox.children.length; i++) {
			textBox.children[i].destroy();
		}
	}, this)
}
