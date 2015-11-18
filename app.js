var map;
var layer;
var test;
var init = false;

var game = new Phaser.Game(640, 480, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload () {

	game.load.image('map', 'assets/map/map.png');

	game.load.image('lbridge', 'assets/map/lbridge.png');
	game.load.image('rbridge', 'assets/map/rbridge.png');

	game.load.image('wood', 'assets/map/wood.png');

	game.load.image('water', 'assets/map/www.png');
	game.load.image('solidWater', 'assets/map/cw.png');

	game.load.image('pokeLean', 'assets/npc/pokeLean.png');

	game.load.image('text1', 'assets/textbox/text1.png');
	game.load.image('text3', 'assets/textbox/txt3.png');
	game.load.image('text4', 'assets/textbox/text4.png');
	game.load.image('text8', 'assets/textbox/text8.png');
	game.load.image('node', 'assets/textbox/node.png');

	game.load.spritesheet('player', 'assets/player/link.png', 32, 48, 16);
}

function create () {

	game.physics.startSystem(Phaser.Physics.ARCADE);

	map = game.add.sprite(0, 0, 'map');

	npc = game.add.physicsGroup();
	spook = npc.create(50, 120, 'pokeLean');
	game.physics.arcade.enable(spook);
	spook.body.immovable = true;

	bridges = game.add.physicsGroup();
	bridges.create(99, 320, 'lbridge');
	bridges.create(160, 320, 'rbridge');

	fallWater = game.add.sprite(130, 320, 'water');
	game.physics.arcade.enable(fallWater);
	fallWater.body.immovable = true;

	water = game.add.physicsGroup();


	textBox = game.add.physicsGroup();

	player = game.add.sprite(390, 200, 'player');
	game.physics.arcade.enable(player);

	player.body.collideWorldBounds = true;

	player.animations.add('right', [8, 9, 10, 11, 8], 10, true);
	player.animations.add('left', [4, 5, 6, 7, 4], 10, true);
	player.animations.add('up', [12, 13, 14, 15, 12], 10, true);
	player.animations.add('down', [0, 1, 2, 3, 0], 10, true);

	woods = game.add.physicsGroup();
	
	w1 = woods.create(65, 295, 'wood');
	w1.body.immovable = true;

	w2 = woods.create(65, 350, 'wood');
	w2.body.immovable = true;

	cursors = game.input.keyboard.createCursorKeys();


	initGame = function () {

		txt1 = textBox.create(60, 90, 'text1');

		game.time.events.add(1000, function () {

			txt1.kill();
			txt1 = textBox.create(player.body.y - 130, player.body.x - 80, 'text4');
			
			game.time.events.add(1000, function () {
				txt1.kill();
			}, this);
		}, this);
// rock can be push player can move // bool variable

/*	
		game.time.events.add(1000, function () {
			txt4 = textBox.create(60, 90, 'text4');
		}, this);
		

		game.time.events.add(1000, function () {
			txt4.kill();
		}, this);
*/
		init = true;
		/*
		txt2 = textBox.create(10, 10, 'text2');
		txt3 = textBox.create(20, 20, 'text3');
		txt4 = textBox.create(30, 30, 'text4');
		txt5 = textBox.create(40, 40, 'text5');
		txt6 = textBox.create(50, 50, 'text6');
		txt7 = textBox.create(60, 60, 'text7');
		txt8 = textBox.create(70, 70, 'text8');
		*/
	};
}

function update () {

	game.physics.arcade.collide(player, fallWater); // function to set up new world
	game.physics.arcade.collide(player, spook, startLore, null, this);

	player.body.velocity.x = 0;
	player.body.velocity.y = 0;

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

function startLore () {
	console.log('asd');
	if (!init)
		initGame();
}
