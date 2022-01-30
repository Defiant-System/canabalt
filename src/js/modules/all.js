
function extend() {
	for(var i=1; i<arguments.length; i++)
		for(var key in arguments[i])
			if(arguments[i].hasOwnProperty(key))
				arguments[0][key] = arguments[i][key];
	return arguments[0];
}

function ObjectPhysics(n) {
	var t = {
		position: {
			x: 0,
			y: 0
		},
		deltaPos: {
			x: 0,
			y: 0
		},
		maxVelocity: {
			x: Number.POSITIVE_INFINITY,
			y: Number.POSITIVE_INFINITY
		},
		velocity: {
			x: 0,
			y: 0
		},
		acceleration: {
			x: 0,
			y: 0
		},
		rotation: 0,
		angularVelocity: 0
	};
	n = n || t;
	extend(this, t, n);
}

ObjectPhysics.prototype.update = function() {
	var n = GameGlobal.TimeKeeper.elapsed * .001;
	this.velocity.x += this.acceleration.x * n;
	this.velocity.y += this.acceleration.y * n;
	this.velocity.x = Math.min(this.velocity.x, this.maxVelocity.x);
	this.velocity.y = Math.min(this.velocity.y, this.maxVelocity.y);
	this.deltaPos.x = this.velocity.x * n;
	this.deltaPos.y = this.velocity.y * n;
	this.position.x += this.deltaPos.x;
	this.position.y += this.deltaPos.y;
	this.rotation += this.angularVelocity * n;
}


function ObjectPool() {
	this.createObjectPool();
}

ObjectPool.prototype.createObjectPool = function() {
	this.containerLookup = [];
}

ObjectPool.prototype.borrowObjectFromContainer = function(n) {
	return n.shift();
}

ObjectPool.prototype.returnObjectToContainer = function(n, t) {
	t.push(n);
}

ObjectPool.prototype.borrowObject = function(n) {
	var t = this.borrowObjectFromContainer(this.containerLookup[n]);
	return t || console.log("out of " + n), t;
}

ObjectPool.prototype.returnObject = function(n, t) {
	this.returnObjectToContainer(t, this.containerLookup[n]);
}



function SpriteObjectPool() {
	ObjectPool.call(this)
}

SpriteObjectPool.constructor = SpriteObjectPool;

SpriteObjectPool.prototype = Object.create(ObjectPool.prototype);

SpriteObjectPool.prototype.createObjectPool = function() {
	ObjectPool.prototype.createObjectPool.call(this);
	this.createObject4Variation(500, "raw/roof{0}-middle.png", SliceType.ROOF_MIDDLE);
	this.createObject4Variation(100, "raw/roof{0}-left.png", SliceType.ROOF_LEFT);
	this.createObject4Variation(100, "raw/roof{0}-right.png", SliceType.ROOF_RIGHT);
	this.createObject4Variation(1e3, "raw/wall{0}-middle.png", SliceType.WALL_MIDDLE);
	this.createObject4Variation(1e3, "raw/wall{0}-left.png", SliceType.WALL_LEFT);
	this.createObject4Variation(1e3, "raw/wall{0}-right.png", SliceType.WALL_RIGHT);
	this.createObjectNVariation2(500, "raw/roof{0}-middle-cracked{1}.png", SliceType.ROOF_MIDDLE_CRACKED, 4, 8);
	this.createObjectNVariation2(100, "raw/roof{0}-left-cracked{1}.png", SliceType.ROOF_LEFT_CRACKED, 4, 8);
	this.createObjectNVariation2(100, "raw/roof{0}-right-cracked{1}.png", SliceType.ROOF_RIGHT_CRACKED, 4, 8);
	this.createObjectNVariation2(500, "raw/wall{0}-middle-cracked{1}.png", SliceType.WALL_MIDDLE_CRACKED, 4, 8);
	this.createObjectNVariation2(100, "raw/wall{0}-left-cracked{1}.png", SliceType.WALL_LEFT_CRACKED, 4, 8);
	this.createObjectNVariation2(100, "raw/wall{0}-right-cracked{1}.png", SliceType.WALL_RIGHT_CRACKED, 4, 8);
	this.createObjectNVariation(10, "raw/floor{0}-left.png", SliceType.FLOOR_LEFT, 2);
	this.createObjectNVariation(100, "raw/floor{0}-middle.png", SliceType.FLOOR_MIDDLE, 2);
	this.createObjectNVariation(10, "raw/floor{0}-right.png", SliceType.FLOOR_RIGHT, 2);
	this.createObjectNVariation(100, "raw/hall{0}1.png", SliceType.HALL_LEFT, 2);
	this.createObjectNVariation(500, "raw/hall{0}2.png", SliceType.HALL_MIDDLE, 2);
	this.createObjectNVariation(100, "raw/hall{0}3.png", SliceType.HALL_RIGHT, 2);
	this.createSpriteObject(10, "raw/crane11.png", SliceType.CRANE1_LEFT);
	this.createSpriteObject(100, "raw/crane12.png", SliceType.CRANE1_MIDDLE);
	this.createSpriteObject(10, "raw/crane13.png", SliceType.CRANE1_RIGHT);
	this.createSpriteObject(50, "raw/crane2.png", SliceType.CRANE2);
	this.createSpriteObject(10, "raw/crane3.png", SliceType.CRANE3);
	this.createSpriteObject(10, "raw/crane4.png", SliceType.CRANE4);
	this.createSpriteObject(10, "raw/crane5.png", SliceType.CRANE5);
	this.createSpriteObject(100, "raw/girder216.png", SliceType.GIRDER2);
	this.createSpriteObject(500, "raw/block.png", SliceType.BLOCK);
	this.createObjectNVariation(50, "raw/glass{0}.png", SliceType.GLASS, 48);
	this.createObject4Variation(10, "raw/doors{0}.png", SliceType.DOOR);
	this.createObject4Variation(500, "raw/window{0}1.png", SliceType.WINDOW);
	this.createObject4Variation(500, "raw/window{0}2.png", SliceType.WINDOW + 10);
	this.createObject4Variation(500, "raw/window{0}3.png", SliceType.WINDOW + 20);
	this.createObject4Variation(500, "raw/window{0}4.png", SliceType.WINDOW + 30);
	this.createSpriteObject(50, "raw/fence.png", SliceType.FENCE);
	this.createSpriteObject(100, "raw/slope1.png", SliceType.SLOPE_LEFT);
	this.createSpriteObject(1e3, "raw/slope2.png", SliceType.SLOPE_MIDDLE);
	this.createSpriteObject(100, "raw/slope3.png", SliceType.SLOPE_RIGHT);
	this.createSpriteObject(100, "raw/pipe11.png", SliceType.PIPE1_LEFT);
	this.createSpriteObject(1e3, "raw/pipe12.png", SliceType.PIPE1_MIDDLE);
	this.createSpriteObject(100, "raw/pipe13.png", SliceType.PIPE1_RIGHT);
	this.createSpriteObject(100, "raw/pipe2.png", SliceType.PIPE2);
	this.createSpriteObject(10, "raw/reservoir.png", SliceType.RESERVOIR);
	this.createObjectNVariation(20, "raw/antenna{0}.png", SliceType.ANTENNA, 7);
	this.createSpriteObject(50, "raw/ac.png", SliceType.AC);
	this.createSpriteObject(50, "raw/skylight.png", SliceType.SKYLIGHT);
	this.createSpriteObject(50, "raw/access.png", SliceType.ACCESS);
	this.createSpriteObject(50, "raw/escape.png", SliceType.ESCAPE);
	this.createObjectNVariation(50, "raw/obstacles1{0}.png", SliceType.OBSTACLES, 4);
	this.createObjectNVariation(50, "raw/obstacles2{0}.png", SliceType.OBSTACLES2, 2);
	this.createObjectNVariation(500, "raw/demo_gibs{0}.png", SliceType.GIBS, 6);
	this.createObjectNVariation(250, "raw/smoke{0}.png", SliceType.SMOKE, 4);
	this.createSpriteObject(2, "raw/bomb.png", SliceType.BOMB);
	this.createSpriteObject(1, "raw/jet.png", SliceType.JET);
}

SpriteObjectPool.prototype.createSpriteObject = function(n, t, i) {
	this.containerLookup[i] = [];
	this.addSprites(n, t, this.containerLookup[i]);
}

SpriteObjectPool.prototype.addSprites = function(n, t, i) {
	for (var u, r = 0; r < n; r++) u = PIXI.Sprite.fromFrame(t), i.push(u);
}

SpriteObjectPool.prototype.createObject4Variation = function(n, t, i) {
	this.createObjectNVariation(n, t, i, 4);
}

SpriteObjectPool.prototype.createObjectNVariation = function(n, t, i, r) {
	function f(n, t) {
		return n.replace("{0}", t);
	}
	for (var u = 0; u < r; u++) this.createSpriteObject(n, f(t, u + 1), i + u);
}

SpriteObjectPool.prototype.createObjectNVariation2 = function(n, t, i, r, u) {
	function o(n, t, i) {
		return n.replace("{0}", t).replace("{1}", i);
	}
	for (var e, f = 0; f < r; f++) {
		for (e = 0; e < u; e++) this.createSpriteObject(n, o(t, f + 1, e + 1), i + f * u + e);
	}
}



function MovieObjectPool() {
	ObjectPool.call(this);
}

MovieObjectPool.constructor = MovieObjectPool;

MovieObjectPool.prototype = Object.create(ObjectPool.prototype);

MovieObjectPool.prototype.createObjectPool = function() {
	ObjectPool.prototype.createObjectPool.call(this);
	this.createMovieObject(100, "raw/dove{0}.png", 4, SliceType.PIGEON);
	this.createMovieObject(50, "raw/walker{0}.png", 12, SliceType.WALKER);
}

MovieObjectPool.prototype.createMovieObject = function(n, t, i, r) {
	this.containerLookup[r] = [];
	this.addMovies(n, t, i, this.containerLookup[r]);
}

MovieObjectPool.prototype.addMovies = function(n, t, i, r) {
	for (var f, u = 0; u < n; u++) f = this.createMovie(t, i), r.push(f);
}

MovieObjectPool.prototype.createMovie = function(n, t) {
	for (var r = [], u, f, i = 1; i <= t; i++) u = PIXI.Texture.fromFrame(Util.format(n, i)), r.push(u);
	return f = new PIXI.MovieClip(r);
}



function GraphicObjectPool() {
	ObjectPool.call(this);
}

GraphicObjectPool.prototype.constructor = GraphicObjectPool;

GraphicObjectPool.prototype = Object.create(ObjectPool.prototype);

GraphicObjectPool.prototype.createObjectPool = function() {
	ObjectPool.prototype.createObjectPool.call(this);
	this.createGraphicObject(15, this.createGlassWindowGraphic, SliceType.GLASSWINDOW);
	this.createGraphicObject(500, this.createHallGraphic, SliceType.HALL3);
}

GraphicObjectPool.prototype.createGraphicObject = function(n, t, i) {
	this.containerLookup[i] = [];
	this.addGraphics(n, i, t, this.containerLookup[i]);
}

GraphicObjectPool.prototype.addGraphics = function(n, t, i, r) {
	for (var f, u = 0; u < n; u++) f = i(t), r.push(f);
}

GraphicObjectPool.prototype.createHallGraphic = function() {
	var n = new PIXI.Graphics;
	return n.lineStyle(WallSlice.WIDTH, 0x35353d, 1), n.moveTo(0, 0), n.lineTo(0, WallSlice.HEIGHT + 1), n;
}

GraphicObjectPool.prototype.createGlassWindowGraphic = function() {
	var n = new PIXI.Graphics;
	return n.lineStyle(GlassWindow.WIDTH, 0xffffff, 1), n.moveTo(0, 0), n.lineTo(0, WallSlice.HEIGHT), n;
}




function SpriteEmitter(n) {
	PIXI.DisplayObjectContainer.call(this);
	this.members = [];
	this.timer = 0;
	this.counter = 0;
	
	var t = {
		minParticleSpeed: {
			x: -100,
			y: -100
		},
		maxParticleSpeed: {
			x: 100,
			y: 100
		},
		minRotation: -1,
		maxRotation: 1,
		gravity: 400,
		delay: .1,
		quantity: 0
	};
	extend(this, t, n);
}

SpriteEmitter.constructor = SpriteEmitter;

SpriteEmitter.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

SpriteEmitter.prototype.start = function() {
	this.counter = 0;
}

SpriteEmitter.prototype.update = function() {
	this.updateMembers();
	this.updateEmitter();
}

SpriteEmitter.prototype.updateEmitter = function() {
	for (this.timer += GameGlobal.TimeKeeper.elapsedSec; this.timer > this.delay && this.counter < this.quantity;) this.timer -= this.delay, this.emitParticle()
}

SpriteEmitter.prototype.updateMembers = function() {
	for (var n = 0; n < this.counter; n++) this.members[n].update(), this.members[n].render()
}

SpriteEmitter.prototype.emitParticle = function() {
	var n = this.members[this.counter];
	n.physics.position.x = 0, n.physics.position.y = 0, n.physics.velocity = {
		x: this.minParticleSpeed.x + Math.random() * (this.maxParticleSpeed.x - this.minParticleSpeed.x),
		y: this.minParticleSpeed.y + Math.random() * (this.maxParticleSpeed.y - this.minParticleSpeed.y)
	}, n.physics.acceleration.y = this.gravity, n.physics.angularVelocity = this.minRotation + Math.random() * this.maxRotation - this.minRotation, this.counter++
}


function GibEmitter(n) {
	SpriteEmitter.call(this, n);
	this.initWithGibCount(n.quantity);
}

GibEmitter.constructor = GibEmitter;
GibEmitter.prototype = Object.create(SpriteEmitter.prototype);
GibEmitter.prototype.initWithGibCount = function(n) {
	for (var i, t = 0; t < n; t++) i = new ScrollSprite(GameGlobal.PoolKeeper.borrowWallSprite(SliceType.GIBS + Util.random(5)), new ObjectPhysics), this.members.push(i), this.addChild(i.sprite)
}

function poolKeeper() {
	var n, t, i;
	return {
		createPools: function() {
			n = new SpriteObjectPool;
			t = new MovieObjectPool;
			i = new GraphicObjectPool;
		},
		borrowWallSprite: (t) => n.borrowObject(t),
		returnWallSprite: (t, i) => n.returnObject(t, i),
		borrowMovieSprite: (n) => t.borrowObject(n),
		returnMovieSprite: (n, i) => t.returnObject(n, i),
		borrowGraphic: (n) => i.borrowObject(n),
		returnGraphic: (n, t) => i.returnObject(n, t)
	}
}

function TimeKeeper() {
	this.prevTime = 0;
	this.elapsed = 0;
	this.elapsedSec = 0;
	this.update = function(n) {
		this.elapsed = Math.min(n - this.prevTime, TimeKeeper.MAX_ELAPSED);
		this.elapsedSec = this.elapsed * .001;
		this.prevTime = n;
	}
}

function ScreenFocus() {
	this.followTarget = null,
	this.followMin = null,
	this.followMax = null,
	this.scroll = null,
	this.width = 0,
	this.height = 0,
	this.setFocusData = function(n, t) {
		this.width = n,
		this.height = t
	}, 
	this.follow = function(n) {
		this.followTarget = n;
		var t = {
			x: this.width / 2 - this.followTarget.x,
			y: this.height / 2 - this.followTarget.y
		};
		this.scroll = {
			x: t.x,
			y: t.y
		},
		this.doFollow()
	},
	this.followBounds = function(n, t, i, r) {
		this.followMin = {
			x: -n,
			y: -t
		},
		this.followMax = {
			x: -i + this.width,
			y: -r + this.height
		},
		this.followMax.x > this.followMin.x && (this.followMax.x = this.followMin.x), this.followMax.y > this.followMin.y && (this.followMax.y = this.followMin.y), this.doFollow()
	},
	this.doFollow = function() {
		if (this.followTarget !== null) {
			var n = {
				x: this.width / 2 - this.followTarget.x,
				y: this.height / 2 - this.followTarget.y
			};
			this.scroll.x += (n.x - this.scroll.x) * 15 * GameGlobal.TimeKeeper.elapsedSec,
			this.scroll.y += (n.y - this.scroll.y) * 15 * GameGlobal.TimeKeeper.elapsedSec
		}
		this.followMin != null && (this.scroll.x = Math.min(this.scroll.x, this.followMin.x), this.scroll.y = Math.min(this.scroll.y, this.followMin.y)),
		this.followMax != null && (this.scroll.x = Math.max(this.scroll.x, this.followMax.x), this.scroll.y = Math.max(this.scroll.y, this.followMax.y))
	}
}

function ScreenQuake() {
	this.zoom = 0,
	this.width = 0,
	this.height = 0,
	this.intensity = 0,
	this.timer = 0,
	this.scale = {
		x: 1,
		y: 1
	},
	this.pos = {
		x: 0,
		y: 0
	},
	this.initWithScreenData = function(n, t, i) {
		this.zoom = n,
		this.width = t,
		this.height = i
	},
	this.setScale = function(n, t) {
		this.scale.x = n,
		this.scale.y = t
	},
	this.startWithIntensity = function(n, t) {
		this.stop(),
		this.intensity = n,
		this.timer = t
	},
	this.stop = function() {
		this.pos.x = 0,
		this.pos.y = 0,
		this.intensity = 0,
		this.timer = 0
	},
	this.update = function() {
		this.timer > 0 && (this.timer -= GameGlobal.TimeKeeper.elapsedSec, this.timer <= 0 ? (this.timer = 0, this.pos.x = 0, this.pos.y = 0) : (this.pos.x = (Math.random() * this.intensity * this.width * 2 - this.intensity * this.width) * this.zoom * this.scale.x, this.pos.y = (Math.random() * this.intensity * this.height * 2 - this.intensity * this.height) * this.zoom * this.scale.y))
	}
}

function SoundPlayer() {
	this.jsonLoader = new PIXI.JsonLoader("~/data/audiohowler.json");
	this.sound = null;
	this.music = null;
	this.onComplete = null;
	this.load = function() {
		this.jsonLoader.onLoaded = this.jsonLoaded.bind(this);
		this.jsonLoader.load();
	}

	this.jsonLoaded = function() {
		var n = this.jsonLoader.json;
		n.urls[0] = "~/audio/audiohowler.mp3";
		n.loop = !0;
		n.onload = this.musicLoaded.bind(this);
		this.music = new Howl(n);
	}

	this.musicLoaded = function() {
		var n = this.jsonLoader.json;
		n.urls[0] = "~/audio/audiohowler.mp3";
		n.loop = !1;
		n.onload = this.soundsLoaded.bind(this);
		this.sound = new Howl(n);
	}

	this.soundsLoaded = function() {
		this.onComplete && this.onComplete();
	}
}

function WallSlice(n, t, i) {
	this.type = n,
	this.y = t,
	this.sprite = null;
	var r = {
		width: WallSlice.WIDTH,
		offsetX: 0,
		scale: {
			x: WallSlice.SCALE,
			y: WallSlice.SCALE
		},
		anchor: {
			x: 0,
			y: 0
		}
	};
	i = i || r,
	this.options = extend({}, r, i),
	this.width = this.options.width,
	this.offsetX = this.options.offsetX,
	this.scale = this.options.scale,
	this.anchor = this.options.anchor
}

function SliceType() {}

function CollapseSlice(n, t, i) {
	WallSlice.call(this, n, t, i),
	this.collapseObject = i.collapseObject,
	this.collapsePhysics = this.collapseObject.physics,
	this.collapseObject.physicsLock = !0,
	this.haveLock = !1,
	this.go = !1
}

function GibSlice(n, t, i) {
	CollapseSlice.call(this, n, t, i),
	this.appearTime = Util.random(20, 10),
	this.animationTime = Util.random(70, 20),
	this.objectPhysics = new ObjectPhysics({
		velocity: {
			x: -200 + Math.random() * 400,
			y: -120 + Math.random() * 120
		},
		acceleration: {
			x: 0,
			y: 400
		},
		angularVelocity: -2 + Math.random() * 4
	})
}

function PigeonGroup(n) {
	this.y = n,
	this.amount = Util.random(10, 2),
	this.container = new PIXI.DisplayObjectContainer,
	this.sprite = null,
	this.pigeons = [],
	this.flyOffTimer = Util.random(10);
	for (var t = 0; t < this.amount; t++) this.pigeons.push(new Pigeon(this.y))
}

function Pigeon(n) {
	this.type = SliceType.PIGEON,
	this.flaps = ["flap1", "flap2", "flap3", ""],
	this.sprite = null,
	this.objectPhysics = new ObjectPhysics({
		position: {
			x: Util.random(PigeonGroup.WIDTH),
			y: n
		},
		velocity: {
			x: 0,
			y: -50 - Util.random(50)
		},
		acceleration: {
			x: Util.random(200),
			y: -50 - Util.random(300)
		}
	}),
	this.flipped = Math.random() < .5,
	this.flipped || (this.objectPhysics.acceleration.x *= -1)
}

function Shard(n) {
	this.type = SliceType.GLASS + n,
	this.sprite = GameGlobal.PoolKeeper.borrowWallSprite(this.type),
	this.sprite.scale.x = WallSlice.SCALE,
	this.sprite.scale.y = WallSlice.SCALE,
	this.sprite.anchor = {
		x: .5,
		y: .5
	},
	this.t = 1 + Util.random(6),
	this.shardSounds = ["glass1", "glass2", ""]
}

function ShardsAsset() {
	PIXI.DisplayObjectContainer.call(this),
	this.shards = [],
	this.shattered = 0,
	this.animationTime = 500,
	this.setViewportX = function(n, t) {
		this.viewportX = n,
		this.viewportY = t,
		this.update()
	},
	this.addShards(),
	this.initShards(0, 0, {
		x: 0,
		y: 0
	})
}

function GlassWindow(n, t, i) {
	this.type = SliceType.GLASSWINDOW,
	GraphicSlice.call(this, n, t, this.type),
	this.shardAsset = i
}

function Hall3Slice(n, t) {
	this.type = SliceType.HALL3,
	GraphicSlice.call(this, n, WallSlice.WIDTH / 2, this.type),
	this.hallUp = t || !1
}

function GraphicSlice(n, t, i) {
	this.type = i,
	this.y = n,
	this.offsetX = t,
	this.sprite = null
}

function ObstacleSlice(n, t, i) {
	WallSlice.call(this, n, t, i),
	this.stumble = !1,
	this.stumblePhysics = new ObjectPhysics({
		velocity: {
			x: 0,
			y: -120
		},
		acceleration: {
			x: 0,
			y: 320
		},
		angularVelocity: Math.random() * 2 - 1
	})
}

function Smoke() {
	this.type = SliceType.SMOKE;
	var n = GameGlobal.PoolKeeper.borrowWallSprite(this.type);
	this.objectPhysics = new ObjectPhysics({
		position: {
			x: 0,
			y: 0
		},
		velocity: {
			x: -3 + 6 * Math.random(),
			y: -15 + 30 * Math.random()
		},
		angularVelocity: -.08 + .16 * Math.random()
	}),
	this.scrollSprite = new ScrollSprite(n, this.objectPhysics),
	this.scrollSprite.scrollFactor = {
		x: .1,
		y: .05
	}
}

function SmokeEmitter() {
	PIXI.DisplayObjectContainer.call(this),
	this.smokes = [],
	this.addSmokes()
}

function Walker(n) {
	this.type = SliceType.WALKER,
	this.firing = !1,
	this.walkTimer = 0,
	this.idleTimer = 0,
	this.objectPhysics = new ObjectPhysics({
		position: {
			x: -500,
			y: 40 + Math.random() * 10
		}
	}),
	this.smokesObject = n,
	this.animation = new ScrollAnimation("raw/walker{0}.png"),
	this.animation.addAnimation("idle", [1], 1, !1),
	this.animation.addAnimation("walk", [1, 2, 3, 4, 5, 6], .1, !0),
	this.animation.addAnimation("fire", [7, 8, 9, 10, 11, 12], .05, !1),
	this.animation.play("idle");
	var t = this.animation.clip;
	this.scrollSprite = new ScrollSprite(t, this.objectPhysics),
	this.scrollSprite.scrollFactor = {
		x: .1,
		y: .15
	}
}

function ScrollWalker() {
	PIXI.DisplayObjectContainer.call(this),
	this.walkerCap = 3,
	this.walkers = [],
	this.smokesObject = {
		smokes: [],
		s: 0
	},
	this.addSmokes(),
	this.addWalkers()
}

function Jet() {
	this.type = SliceType.JET,
	this.timer = 0,
	this.limit = 12 + Math.random() * 4,
	this.objectPhysics = new ObjectPhysics({
		position: {
			x: -500,
			y: 0
		},
		velocity: {
			x: -1200,
			y: 0
		}
	});
	var n = GameGlobal.PoolKeeper.borrowWallSprite(this.type);
	this.scrollSprite = new ScrollSprite(n, this.objectPhysics),
	this.scrollSprite.scrollFactor = {
		x: 0,
		y: .3
	}
}

function BombSlice(n, t, i) {
	this.type = SliceType.BOMB,
	this.p = t,
	this.e = i,
	this.myY = n - 50,
	this.objectPhysics = new ObjectPhysics({
		position: {
			x: 0,
			y: -80
		},
		velocity: {
			x: 0,
			y: 1200
		}
	}),
	this.sprite = null,
	this.container = new PIXI.DisplayObjectContainer
}

function BombTriggerSlice() {
	this.type = SliceType.GAP,
	this.sprite = undefined
}

function DecoratorInfo(n, t, i) {
	this.height = n,
	this.length = t,
	this.startOffset = i
}

function MapDecorator(n) {
	this.layerIndex = 0,
	this.layers = [],
	this.chances = n || {
		slope: .2,
		pipe1: .35 / 15,
		pipe2: .35 / 10,
		reservoir: .5 / 15,
		antenna: .3 / 5,
		ac: .3 / 5,
		access: .25 / 15,
		skylight: .5 / 15
	},
	this.addAC = !0,
	this.addFence = .4,
	this.addSlope = !0,
	this.addPipes = !0,
	this.addConstruction = .5
}

function MapBuilder(n, t, i, r, u, f, e) {
	this.player = n,
	this.walls = t,
	this.pigeons = i,
	this.shards = r,
	this.obstacles = u,
	this.decorations = f,
	this.gibEmitter = e,
	this.decorator = new MapDecorator,
	this.seq = {
		currIndex: 0
	}
}

function ScrollMovie(n) {
	PIXI.MovieClip.call(this, n)
}

function ScrollSprite(n, t) {
	t = t || new ObjectPhysics({}),
	this.sprite = n,
	this.scrollFactor = {
		x: 1,
		y: 1
	},
	this.physics = t,
	this.translateSprite = function(n, t) {
		this.physics.position.x = n - GameGlobal.ScreenFocus.scroll.x * this.scrollFactor.x,
		this.physics.position.y = t - GameGlobal.ScreenFocus.scroll.y * this.scrollFactor.y,
		this.render()
	},
	this.render = function() {
		var n = this.getScreenXY();
		this.sprite.position.x = n.x,
		this.sprite.position.y = n.y
	},
	this.getScreenXY = function() {
		return {
			x: this.physics.position.x + GameGlobal.ScreenFocus.scroll.x * this.scrollFactor.x,
			y: this.physics.position.y + GameGlobal.ScreenFocus.scroll.y * this.scrollFactor.y
		}
	}
}

function ScrollAnimation(n) {
	this.clip = null,
	this.texture = n,
	this.frames = []
}

function ScrollForeground(n, t) {
	PIXI.DisplayObjectContainer.call(this),
	this.slices = [],
	this.viewportX = 0,
	this.viewportY = 0,
	this.viewportSliceX = 0,
	this.SLICE_WIDTH = n,
	this.SCREEN_WIDTH = t,
	this.VIEWPORT_NUM_SLICES = Math.ceil(ScrollForeground.VIEWPORT_WIDTH / this.SCREEN_WIDTH) + 1,
	this.setViewportX = function(n, t) {
		this.viewportX = this.checkViewportXBounds(n),
		this.viewportY = t;
		var i = this.viewportSliceX;
		this.viewportSliceX = Math.floor(this.viewportX / this.SLICE_WIDTH),
		this.removeOldSlices(i),
		this.addNewSlices()
	}
}

function ScrollBackground(n, t, i, r) {
	r = r || 0;
	var u = PIXI.Texture.fromFrame(n);
	PIXI.TilingSprite.call(this, u, 1024, 256),
	this.position.x = 0,
	this.position.y = 0,
	this.tilePosition.x = 0,
	this.tilePosition.y = 0,
	this.scale.x = WallSlice.SCALE,
	this.scale.y = WallSlice.SCALE,
	this.DELTA_X = t,
	this.DELTA_Y = i,
	this.offsetY = r,
	this.viewportX = 0,
	this.update = function() {},
	this.setViewportX = function(n, t) {
		var i = n - this.viewportX;
		this.viewportX = n,
		this.tilePosition.x += i * this.DELTA_X,
		this.position.y = this.offsetY + Math.floor(t * this.DELTA_Y)
	}
}

function PlayerAsset() {
	this.buildFrames(),
	ScrollMovie.call(this, this.run1Frames),
	this.buildSounds(),
	this.bindKeyHandlers(),
	this.animationSpeed = .5,
	this.gotoAndPlay(0),
	this.onFloor = !1,
	this.stumble = !1,
	this.jump = 0,
	this.craneFeet = !1,
	this.fc = 0,
	this.maxVelocity = {
		x: 1e3,
		y: 360
	},
	this.jumpLimit = 0,
	this.my = 0,
	this.objectPhysics = new ObjectPhysics({
		position: {
			x: WallSlice.WIDTH * 10,
			y: 0
		},
		acceleration: {
			x: 1,
			y: PlayerAsset.GRAVITY
		},
		maxVelocity: {
			x: 1e3,
			y: 360
		},
		velocity: {
			x: 125,
			y: 0
		}
	}),
	this.epitaph = "fall"
}

function HUD(n, t, i) {
	PIXI.DisplayObjectContainer.call(this),
	this.width = i,
	this.textures = [],
	this.buildTextures(),
	this.sprites = [],
	this.buildSprites(),
	this.position = { x: n, y: t };
}

function GameOver(n, t, i, r) {
	PIXI.DisplayObjectContainer.call(this);
	// Game over message
	let str = `You ran ${i}m before ${r.epitaph}`;
	APP.content.find(".game-over .message").html(str);
	// show game over screen
	APP.content.addClass("game-over");
	game_over = !0
}

function PlayState(n, t, i) {
	this.width = t,
	this.height = i,
	this.zoom = 2,
	this.stage = n,
	GameGlobal.ScreenFocus.setFocusData(t / this.zoom, i / this.zoom),
	GameGlobal.ScreenQuake.initWithScreenData(this.zoom, t, i),
	GameGlobal.ScreenQuake.setScale(0, 1),
	this.far = new ScrollBackground("raw/background.png", -.15, .25, 50),
	this.mid = new ScrollBackground("midground3.png", -.4, .5, 112),
	this.front = new ScrollForeground(WallSlice.WIDTH, WallSlice.WIDTH * this.zoom),
	this.pigeonLayer = new ScrollForeground(WallSlice.WIDTH, WallSlice.WIDTH * this.zoom),
	this.obstacleLayer = new ScrollForeground(WallSlice.WIDTH, WallSlice.WIDTH * this.zoom),
	this.decorationLayer = new ScrollForeground(WallSlice.WIDTH, WallSlice.WIDTH * this.zoom),
	this.player = new PlayerAsset,
	this.front.setPlayer(this.player),
	this.pigeonLayer.setPlayer(this.player),
	this.obstacleLayer.setPlayer(this.player),
	this.shardLayer = new ShardsAsset,
	this.front.setShards(this.shardLayer),
	this.walkerLayer = new ScrollWalker,
	this.jet = new Jet,
	this.gibEmitter = new GibEmitter({
		quantity: 40,
		delay: -3,
		minParticleSpeed: {
			x: -240,
			y: -320
		},
		maxParticleSpeed: {
			x: 240,
			y: 0
		},
		minRotation: 0,
		maxRotation: 0,
		gravity: 800
	}),
	this.viewArea = new PIXI.DisplayObjectContainer,
	this.viewArea.addChild(this.jet.jet()),
	this.viewArea.addChild(this.decorationLayer),
	this.viewArea.addChild(this.front),
	this.viewArea.addChild(this.pigeonLayer),
	this.viewArea.addChild(this.shardLayer),
	this.viewArea.addChild(this.obstacleLayer),
	this.viewArea.addChild(this.gibEmitter),
	this.viewArea.addChild(this.player),
	this.viewArea.scale.x = this.zoom,
	this.viewArea.scale.y = this.zoom,
	this.viewArea.x -= WallSlice.WIDTH * this.zoom * 5,
	this.far.scale.x = this.zoom,
	this.far.scale.y = this.zoom,
	this.mid.scale.x = this.zoom,
	this.mid.scale.y = this.zoom,
	this.walkerLayer.scale.x = this.zoom,
	this.walkerLayer.scale.y = this.zoom, n.addChild(this.far), n.addChild(this.walkerLayer), n.addChild(this.mid), n.addChild(this.viewArea),
	this.dist = new HUD(this.width - 85, 5, 80),
	this.dist.setDistance(0), n.addChild(this.dist),
	this.mapBuilder = new MapBuilder(this.player, this.front, this.pigeonLayer, this.shardLayer, this.obstacleLayer, this.decorationLayer, this.gibEmitter),
	this.focus = { x: 0, y: 0 },
	GameGlobal.ScreenFocus.follow(this.focus),
	GameGlobal.ScreenFocus.followBounds(0, 0, Number.POSITIVE_INFINITY, this.height),
	GameGlobal.ScreenQuake.startWithIntensity(.007, 3.1),
	GameGlobal.SoundPlayer.sound.play("crumble")
}


TimeKeeper.MAX_ELAPSED = 20;

let GameGlobal = function() {
	return {
		PoolKeeper: poolKeeper(),
		TimeKeeper: new TimeKeeper,
		ScreenFocus: new ScreenFocus,
		ScreenQuake: new ScreenQuake,
		SoundPlayer: new SoundPlayer
	}
}();

WallSlice.prototype.initDisplay = function(n, t, i) {
	this.sprite = GameGlobal.PoolKeeper.borrowWallSprite(this.type),
	this.sprite.scale.x = this.scale.x,
	this.sprite.scale.y = this.scale.y,
	this.sprite.anchor = this.anchor,
	this.sprite.position.x = n + t * WallSlice.WIDTH + this.offsetX,
	this.sprite.position.y = this.y + i
}

WallSlice.prototype.updateDisplay = function(n, t, i) {
	this.sprite.position.x = n + t * WallSlice.WIDTH + this.offsetX,
	this.sprite.position.y = this.y + i
}

WallSlice.prototype.removeDisplay = function() {
	GameGlobal.PoolKeeper.returnWallSprite(this.type, this.sprite),
	this.sprite = null
}

WallSlice.prototype.checkCollision = function(n, t) {
	var f = this.type < SliceType.WALL_RIGHT,
		e = this.type >= SliceType.FLOOR_LEFT && this.type <= SliceType.FLOOR_RIGHT + 2,
		u = this.type >= SliceType.CRANE1_LEFT && this.type <= SliceType.CRANE1_RIGHT,
		r = this.type >= SliceType.WALL_LEFT && this.type < SliceType.WALL_LEFT + 5,
		i;
	(f || e || u || r) && (n.position.y >= this.sprite.position.y - n.height && n.position.y <= this.sprite.position.y + this.sprite.height && (i = n.position.x - this.sprite.position.x, i > 0 && i < this.width && (r ? n.hitLeft(this.sprite.position.x - n.width + 5) : n.hitBottom(this.sprite.position.y - n.height), u && (n.craneFeet = !0))), t && t.animationTime > 0 && t.shards.forEach(function(n) {
		n.sprite.position.y > this.sprite.position.y - n.sprite.height / 10 && (i = n.sprite.position.x - this.sprite.position.x, i > 0 && i < this.width && (r || n.hitBottom(this.sprite.position.y - n.sprite.height / 10)))
	}, this))
}

WallSlice.SCALE = 1,
WallSlice.WIDTH = 16 * WallSlice.SCALE,
WallSlice.HEIGHT = 16 * WallSlice.SCALE,
WallSlice.CRANE_HEIGHT = 32 * WallSlice.SCALE,
WallSlice.CRANE_WIDTH = 32 * WallSlice.SCALE,
WallSlice.CRANE2_HEIGHT = 30 * WallSlice.SCALE,
WallSlice.CRANE3_WIDTH = 64 * WallSlice.SCALE,
WallSlice.CRANE4_HEIGHT = 48 * WallSlice.SCALE,
WallSlice.CRANE4_WIDTH = 48 * WallSlice.SCALE,
WallSlice.SLOPE_HEIGHT = 15 * WallSlice.SCALE,
WallSlice.SLOPE_WIDTH = 16 * WallSlice.SCALE,
WallSlice.FENCE_HEIGHT = 32 * WallSlice.SCALE,
WallSlice.PIPE1_HEIGHT = 20 * WallSlice.SCALE,
WallSlice.PIPE2_HEIGHT = 40 * WallSlice.SCALE,
WallSlice.PIPE2_WIDTH = 40 * WallSlice.SCALE,
WallSlice.RESERVOIR_HEIGHT = 120 * WallSlice.SCALE,
WallSlice.RESERVOIR_WIDTH = 80 * WallSlice.SCALE,
WallSlice.ANTENNA_HEIGHT = 160 * WallSlice.SCALE,
WallSlice.ANTENNA_WIDTH = 40 * WallSlice.SCALE,
WallSlice.SKYLIGHT_HEIGHT = 20 * WallSlice.SCALE,
WallSlice.SKYLIGHT_WIDTH = 80 * WallSlice.SCALE,
WallSlice.ACCESS_HEIGHT = 30 * WallSlice.SCALE,
WallSlice.ACCESS_WIDTH = 60 * WallSlice.SCALE,
WallSlice.AC_HEIGHT = 20 * WallSlice.SCALE,
WallSlice.AC_WIDTH = 20 * WallSlice.SCALE,
WallSlice.ESCAPE_HEIGHT = 32 * WallSlice.SCALE,
WallSlice.DOOR_HEIGHT = 24 * WallSlice.SCALE,

SliceType.ROOF_RIGHT = 0,
SliceType.ROOF_MIDDLE = 5,
SliceType.ROOF_LEFT = 10,
SliceType.WALL_RIGHT = 15,
SliceType.WALL_MIDDLE = 20,
SliceType.WALL_LEFT = 25,
SliceType.FLOOR_LEFT = 30,
SliceType.FLOOR_MIDDLE = 35,
SliceType.FLOOR_RIGHT = 40,
SliceType.HALL_LEFT = 45,
SliceType.HALL_MIDDLE = 50,
SliceType.HALL_RIGHT = 55,
SliceType.CRANE1_LEFT = 60,
SliceType.CRANE1_MIDDLE = 61,
SliceType.CRANE1_RIGHT = 62,
SliceType.CRANE2 = 63,
SliceType.CRANE3 = 64,
SliceType.CRANE4 = 65,
SliceType.CRANE5 = 66,
SliceType.WINDOW = 67,
SliceType.FENCE = 110,
SliceType.SLOPE_RIGHT = 111,
SliceType.SLOPE_MIDDLE = 112,
SliceType.SLOPE_LEFT = 113,
SliceType.PIPE1_RIGHT = 114,
SliceType.PIPE1_MIDDLE = 115,
SliceType.PIPE1_LEFT = 116,
SliceType.PIPE2 = 117,
SliceType.RESERVOIR = 118,
SliceType.ANTENNA = 119,
SliceType.AC = 127,
SliceType.SKYLIGHT = 128,
SliceType.ACCESS = 129,
SliceType.ESCAPE = 130,
SliceType.GIRDER2 = 131,
SliceType.BLOCK = 132,
SliceType.PIGEON = 133,
SliceType.GLASS = 135,
SliceType.GLASSWINDOW = 189,
SliceType.DOOR = 190,
SliceType.GAP = 195,
SliceType.GIBS = 200,
SliceType.GIBS_DUST1 = 203,
SliceType.GIBS_DUST2 = 204,
SliceType.OBSTACLES = 210,
SliceType.OBSTACLES2 = 215,
SliceType.ROOF_RIGHT_CRACKED = 220,
SliceType.ROOF_MIDDLE_CRACKED = 270,
SliceType.ROOF_LEFT_CRACKED = 320,
SliceType.WALL_RIGHT_CRACKED = 370,
SliceType.WALL_MIDDLE_CRACKED = 420,
SliceType.WALL_LEFT_CRACKED = 470,
SliceType.SMOKE = 520,
SliceType.WALKER = 521,
SliceType.BOMB = 522,
SliceType.JET = 523,
SliceType.HALL3 = 524,

CollapseSlice.constructor = CollapseSlice,
CollapseSlice.prototype = Object.create(WallSlice.prototype),
CollapseSlice.prototype.updateDisplay = function(n, t, i) {
	WallSlice.prototype.updateDisplay.call(this, n, t, i),
	this.haveLock = this.haveLock || this.collapseObject.physicsLock,
	this.haveLock && (this.collapseObject.physicsLock = !1,
	this.collapseObject.startCollapsing && this.collapsePhysics.update()),
	this.sprite.position.y += this.collapsePhysics.position.y
},
CollapseSlice.prototype.initDisplay = function(n, t, i) {
	WallSlice.prototype.initDisplay.call(this, n, t, i)
},
CollapseSlice.prototype.removeDisplay = function() {
	WallSlice.prototype.removeDisplay.call(this),
	this.collapseObject.physicsLock = this.collapseObject.physicsLock || this.haveLock
},
CollapseSlice.prototype.checkCollision = function(n, t) {
	var i;
	this.collapseObject.startCollapsing || (i = n.position.x - this.sprite.position.x, i > -WallSlice.WIDTH && (this.collapseObject.startCollapsing = !0,
		GameGlobal.SoundPlayer.sound.play("crumble"),
		GameGlobal.ScreenQuake.startWithIntensity(.01, 3))), n.position.y >= this.sprite.position.y - n.height && (i = n.position.x - this.sprite.position.x, i > 0 && i < this.width && n.hitBottom(this.sprite.position.y + Math.ceil(this.collapsePhysics.deltaPos.y) - n.height)), t && t.animationTime > 0 && t.shards.forEach(function(n) {
		if (n.sprite.position.y >= this.sprite.position.y - n.sprite.height / 10) {
			var t = n.sprite.position.x - this.sprite.position.x;
			t > 0 && t < this.width && n.hitBottom(this.sprite.position.y - n.sprite.height / 10)
		}
	}, this)
},
GibSlice.constructor = GibSlice,
GibSlice.prototype = Object.create(CollapseSlice.prototype),
GibSlice.prototype.initDisplay = function(n, t, i) {
	CollapseSlice.prototype.initDisplay.call(this, n, t, i), this.sprite.anchor = {
		x: .5,
		y: .5
	},
	this.sprite.alpha = 0
},
GibSlice.prototype.updateDisplay = function(n, t, i) {
	CollapseSlice.prototype.updateDisplay.call(this, n, t, i),
	this.sprite.position.x += this.objectPhysics.position.x,
	this.sprite.position.y += this.objectPhysics.position.y,
	this.sprite.rotation = this.objectPhysics.rotation,
	--this.appearTime < 0 && (
		this.objectPhysics.update(),
		this.sprite.alpha = 1,
		--this.animationTime < 0 && (this.sprite.alpha = 0)
	)
},
GibSlice.prototype.checkCollision = function() {},
PigeonGroup.prototype.initDisplay = function(n, t, i) {
	this.x = n + t * WallSlice.WIDTH;
	for (var r = 0; r < this.amount; r++)
		this.pigeons[r].initDisplay(this.x),
	this.container.addChild(this.pigeons[r].sprite);
	this.sprite = this.container, this.sprite.y = i
},
PigeonGroup.prototype.updateDisplay = function(n, t, i) {
	this.x = n + t * WallSlice.WIDTH;
	for (var r = 0; r < this.amount; r++) this.pigeons[r].updateDisplay(this.x);
	this.sprite.y = i
},
PigeonGroup.prototype.removeDisplay = function() {
	for (var n = 0; n < this.amount; n++)
		this.container.removeChild(this.pigeons[n].sprite),
	this.pigeons[n].removeDisplay();
	this.sprite = null
},
PigeonGroup.prototype.flyOff = function() {
	for (var n = 0; n < this.amount; n++) this.pigeons[n].trigger = !0;
	!!this.nextPigeons && this.flyOffTimer-- < 0 && this.nextPigeons.flyOff()
},
PigeonGroup.prototype.checkCollision = function(n) {
	this.x - n.position.x < PigeonGroup.WIDTH && this.flyOff()
},
PigeonGroup.WIDTH = WallSlice.WIDTH * 5, Pigeon.prototype.initDisplay = function(n) {
	this.sprite = GameGlobal.PoolKeeper.borrowMovieSprite(this.type),
	this.sprite.scale.x = Pigeon.SCALE,
	this.sprite.scale.y = Pigeon.SCALE,
	this.flipped && (
		this.sprite.anchor.x = 1,
		this.sprite.scale.x *= -1
	),
	this.sprite.gotoAndStop(3),
	this.sprite.position.x = n + this.objectPhysics.position.x,
	this.sprite.position.y = this.objectPhysics.position.y,
	this.trigger = !1,
	this.randomFlyOff = Util.random(10)
},
Pigeon.prototype.updateDisplay = function(n) {
	this.trigger &&
	this.randomFlyOff-- < 0 &&
	(this.sprite.playing || (this.sprite.animationSpeed = .4,
		this.sprite.gotoAndPlay(0),
		Math.random() < .5 && GameGlobal.SoundPlayer.sound.play(this.flaps[Util.random(this.flaps.length - 1)])),
	this.objectPhysics.update()),
	this.sprite.position.x = n + this.objectPhysics.position.x,
	this.sprite.position.y = this.objectPhysics.position.y
},
Pigeon.prototype.removeDisplay = function() {
	this.sprite.gotoAndStop(0),
	GameGlobal.PoolKeeper.returnMovieSprite(this.type, this.sprite),
	this.sprite = null
},
Pigeon.SCALE = 1,
Pigeon.HEIGHT = 10 * Pigeon.SCALE,
Pigeon.WIDTH = 10 * Pigeon.SCALE,

Shard.prototype.init = function(n, t, i) {
	this.objectPhysics = new ObjectPhysics({
		position: {
			x: n,
			y: t
		},
		velocity: {
			x: i.x / 2,
			y: i.y / 2 - Math.random() * 40
		},
		acceleration: {
			x: 0,
			y: 500
		},
		angularVelocity: -.25 + Math.random() * .5
	}),
	this.objectPhysics.velocity.x += Math.random() * this.objectPhysics.velocity.x * 2,
	this.objectPhysics.velocity.y += Math.random() * this.objectPhysics.velocity.y * 2
},
Shard.prototype.update = function(n, t) {
	this.objectPhysics.update(),
	this.sprite.position.x = this.objectPhysics.position.x - n,
	this.sprite.position.y = this.objectPhysics.position.y + t,
	this.sprite.rotation = this.objectPhysics.rotation
},
Shard.prototype.hitBottom = function(n) {
	this.t > 5 && 
	this.objectPhysics.velocity.y > 120 &&
	GameGlobal.SoundPlayer.sound.play(this.shardSounds[this.t % 2]),
	this.objectPhysics.position.y = n - GameGlobal.ScreenFocus.scroll.y,
	this.objectPhysics.velocity.x *= .5 + Math.random() * .6,
	this.objectPhysics.velocity.y *= -.2 - Math.random() * .3;
	var t = this.objectPhysics.velocity.y * 3;
	this.objectPhysics.angularVelocity = (Math.random() * t - t * 2) / 16
},
Shard.prototype.hitUp = function(n) {
	this.objectPhysics.position.y = n - GameGlobal.ScreenFocus.scroll.y,
	this.objectPhysics.velocity.y = 0
},
ShardsAsset.constructor = ShardsAsset, ShardsAsset.prototype = Object.create(PIXI.DisplayObjectContainer.prototype), ShardsAsset.prototype.shatter = function(n, t, i) {
	Math.random() < .5
		? GameGlobal.SoundPlayer.sound.play("window1")
		: GameGlobal.SoundPlayer.sound.play("window2"),
	this.shattered = this.animationTime,
	this.initShards(n, t, i)
},
ShardsAsset.prototype.update = function() {
	--this.shattered > 0 && this.updateShards()
},
ShardsAsset.prototype.addShards = function() {
	for (var n = 0; n < 50; n++) this.shards.push(new Shard(Util.random(47))), this.addChild(this.shards[n].sprite)
},
ShardsAsset.prototype.initShards = function(n, t, i) {
	n = n + this.viewportX, t = t - this.viewportY;
	for (var r = 0; r < this.shards.length; r++)
		this.shards[r].init(n, t + r * GlassWindow.HEIGHT / 2, {
		x: i.x,
		y: i.y
	})
},
ShardsAsset.prototype.updateShards = function() {
	for (var n = 0; n < this.shards.length; n++) this.shards[n].update(this.viewportX, this.viewportY)
},
GlassWindow.constructor = GlassWindow,
GlassWindow.prototype = Object.create(GraphicSlice.prototype),
GlassWindow.prototype.checkCollision = function(n) {
	this.sprite.alpha !== 0 && this.sprite.position.x - n.position.x < n.width && (this.sprite.alpha = 0, this.shardAsset !== null && this.shardAsset.shatter(this.sprite.position.x, this.sprite.position.y, {
		x: n.objectPhysics.velocity.x,
		y: n.objectPhysics.velocity.y
	}))
},
GlassWindow.HEIGHT = 4 * WallSlice.SCALE,
GlassWindow.WIDTH = 4 * WallSlice.SCALE,
Hall3Slice.constructor = Hall3Slice,
Hall3Slice.prototype = Object.create(GraphicSlice.prototype),
Hall3Slice.prototype.checkCollision = function(n, t) {
	var r = this.hallUp,
		i;
	r && (n.position.y <= this.sprite.position.y && (i = n.position.x - this.sprite.position.x, i > 0 && i < WallSlice.WIDTH && n.hitUp(this.sprite.position.y)), t && t.animationTime > 0 && t.shards.forEach(function(n) {
		n.sprite.position.y <= this.sprite.position.y && (i = n.sprite.position.x - this.sprite.position.x, i > 0 && i < WallSlice.WIDTH && n.hitUp(this.sprite.position.y))
	}, this))
},
GraphicSlice.prototype.initDisplay = function(n, t, i) {
	var r = n + t * WallSlice.WIDTH;
	this.sprite = GameGlobal.PoolKeeper.borrowGraphic(this.type), this.sprite.alpha = 1, this.sprite.position.x = r + this.offsetX, this.sprite.position.y = this.y + i
},
GraphicSlice.prototype.updateDisplay = function(n, t, i) {
	var r = n + t * WallSlice.WIDTH;
	this.sprite.position.x = r + this.offsetX, this.sprite.position.y = this.y + i
},
GraphicSlice.prototype.removeDisplay = function() {
	GameGlobal.PoolKeeper.returnGraphic(this.type, this.sprite), this.sprite = null
},
GraphicSlice.prototype.checkCollision = function() {},
ObstacleSlice.constructor = ObstacleSlice,
ObstacleSlice.prototype = Object.create(WallSlice.prototype),
ObstacleSlice.WIDTH = 18 * WallSlice.SCALE,
ObstacleSlice.HEIGHT = 18 * WallSlice.SCALE,
ObstacleSlice.prototype.initDisplay = function(n, t, i) {
	WallSlice.prototype.initDisplay.call(this, n, t, i), this.sprite.anchor = {
		x: .5,
		y: .5
	}
},
ObstacleSlice.prototype.updateDisplay = function(n, t, i) {
	WallSlice.prototype.updateDisplay.call(this, n, t, i),
	this.stumble && (
		this.stumblePhysics.update(),
		this.sprite.rotation = this.stumblePhysics.rotation,
		this.sprite.position.x += this.stumblePhysics.position.x,
		this.sprite.position.y += this.stumblePhysics.position.y,
		this.sprite.alpha++,
		this.sprite.alpha %= 2)
},
ObstacleSlice.prototype.checkCollision = function(n) {
	var t, i;
	if (n.position.y >= this.sprite.position.y - n.height && (t = n.position.x + n.width - this.sprite.position.x, t > 0 && t < this.width && !this.stumble)) {
		n.hitObstacle(), this.stumble = !0, i = Util.random(3);
		switch (i) {
			case 0: GameGlobal.SoundPlayer.sound.play("obstacle1"); break;
			case 1: GameGlobal.SoundPlayer.sound.play("obstacle2"); break;
			case 2: GameGlobal.SoundPlayer.sound.play("obstacle3"); break;
		}
		this.stumblePhysics.velocity.y = -120, this.stumblePhysics.velocity.x = n.objectPhysics.velocity.x + Util.random(100) - 50
	}
},
Smoke.prototype.updateSprite = function() {
	this.scrollSprite.update(), this.scrollSprite.render()
},
Smoke.prototype.removeSprite = function() {
	var n = this.scrollSprite.sprite;
	GameGlobal.PoolKeeper.returnWallSprite(n)
},
SmokeEmitter.constructor = SmokeEmitter,
SmokeEmitter.prototype = Object.create(PIXI.DisplayObjectContainer.prototype),
SmokeEmitter.prototype.reset = function(n, t) {
	var i, r;
	for (this.position.x = n, this.position.y = t, i = 0; i < this.smokes.length; i++) r = this.smokes[i], r.objectPhysics.position.x = 0, r.objectPhysics.position.y = 0
},
SmokeEmitter.prototype.addSmokes = function() {
	for (var t, n = 0; n < 25; n++) t = new Smoke, this.smokes.push(t), this.addChild(t.scrollSprite.sprite)
},
SmokeEmitter.prototype.update = function() {
	this.updateSmokes()
},
SmokeEmitter.prototype.updateSmokes = function() {
	for (var n = 0; n < this.smokes.length; n++) this.smokes[n].updateSprite()
},
Walker.prototype.update = function() {
	this.scrollSprite.update(), this.scrollSprite.render(), this.updateAnimation()
},
Walker.prototype.updateAnimation = function() {
	this.walkTimer > 0 ? (this.walkTimer -= GameGlobal.TimeKeeper.elapsedSec, this.walkTimer <= 0 && (this.animation.play("fire"), this.firing = !0, this.objectPhysics.velocity.x = 0, this.updateSmokes())) : this.firing ? this.animation.finished() && (this.firing = !1, this.idleTimer = 1 + Math.random() * 2, this.animation.play("idle")) : this.idleTimer > 0 && (this.idleTimer -= GameGlobal.TimeKeeper.elapsedSec, this.idleTimer <= 0 && (Math.random() < .5 ? (this.walkTimer = 2 + Math.random() * 4, this.animation.play("walk"), this.objectPhysics.velocity.x = this.facing ? 40 : -40) : (this.animation.play("fire"), this.firing = !0, this.updateSmokes())));
	var t = this.scrollSprite.getScreenXY(),
		n = Math.abs(this.scrollSprite.sprite.width);
	t.x + n * 2 < 0 && (this.walkTimer = Math.random() * 2, this.facing = Math.random() > .5 ? !0 : !1, this.objectPhysics.position.x += GameGlobal.ScreenFocus.width + n * 2 + Math.random() * GameGlobal.ScreenFocus.width, this.facing ? (this.scrollSprite.sprite.scale.x = -Math.abs(this.scrollSprite.sprite.scale.x), this.scrollSprite.sprite.anchor.x = 1) : (this.scrollSprite.sprite.scale.x = Math.abs(this.scrollSprite.sprite.scale.x), this.scrollSprite.sprite.anchor.x = 0))
},
Walker.prototype.updateSmokes = function() {
	++this.smokesObject.s, this.smokesObject.s = this.smokesObject.s % this.smokesObject.smokes.length;
	var t = this.smokesObject.smokes[this.smokesObject.s],
		n = {
			x: this.objectPhysics.position.x + (this.facing ? Math.abs(this.scrollSprite.sprite.width) - 22 : 10),
			y: this.objectPhysics.position.y + this.scrollSprite.sprite.height
		};
	t.reset(n.x, n.y)
},
Walker.prototype.remove = function() {
	var n = this.scrollSprite.sprite;
	GameGlobal.PoolKeeper.returnMovieSprite(n)
},
ScrollWalker.constructor = ScrollWalker,
ScrollWalker.prototype = Object.create(PIXI.DisplayObjectContainer.prototype),
ScrollWalker.prototype.update = function() {
	for (var t, i, n = 0; n < this.walkers.length; n++) t = this.walkers[n], t.update();
	for (n = 0; n < this.smokesObject.smokes.length; n++) i = this.smokesObject.smokes[n], i.update()
},
ScrollWalker.prototype.addSmokes = function() {
	for (var t, n = 0; n < 10; n++)
		t = new SmokeEmitter,
	this.smokesObject.smokes.push(t),
	this.addChild(t)
},
ScrollWalker.prototype.addWalkers = function() {
	for (var t, n = 0; n < this.walkerCap; n++)
		t = new Walker(this.smokesObject),
	this.walkers.push(t),
	this.addChild(t.scrollSprite.sprite)
},
Jet.prototype.jet = function() {
	return this.scrollSprite.sprite
},
Jet.prototype.update = function() {
	this.timer += GameGlobal.TimeKeeper.elapsedSec,
	this.timer > this.limit && (
		this.scrollSprite.translateSprite(960, -20 + Math.random() * 120),
		GameGlobal.ScreenQuake.startWithIntensity(.02, 1.5),
		GameGlobal.SoundPlayer.sound.play("flyby"),
		this.timer = 0,
		this.limit = 10 + Math.random() * 20),
	this.scrollSprite.sprite.position.x < -this.scrollSprite.sprite.width || (
		this.scrollSprite.update(),
		this.scrollSprite.render())
},
BombSlice.prototype.initDisplay = function(n, t) {
	var e = n + t * WallSlice.WIDTH - GameGlobal.ScreenFocus.scroll.x,
		f, r, u, i;
	for (this.objectPhysics.position.x = e, f = GameGlobal.PoolKeeper.borrowWallSprite(SliceType.BOMB), this.scrollSprite = new ScrollSprite(f, this.objectPhysics), this.container.addChild(this.scrollSprite.sprite), this.en = [], r = 0; r < 6; r++) u = SliceType.GIBS + Util.random(5), i = new ScrollSprite(GameGlobal.PoolKeeper.borrowWallSprite(u)), i.type = u, this.en.push(i), this.container.addChild(i.sprite);
	this.sprite = this.container
},
BombSlice.prototype.removeDisplay = function() {
	this.container.removeChild(this.scrollSprite.sprite),
	GameGlobal.PoolKeeper.returnWallSprite(this.type, this.scrollSprite.sprite);
	for (var n = 0; n < 6; n++)
		this.container.removeChild(this.en[n].sprite),
	GameGlobal.PoolKeeper.returnWallSprite(this.en[n].type, this.en[n].sprite);
	this.sprite = null
},
BombSlice.prototype.updateDisplay = function() {
	var n, t, i;
	if (this.p.objectPhysics.position.x > this.objectPhysics.position.x - 480)
		for (this.objectPhysics.position.y <= -64 && GameGlobal.SoundPlayer.sound.play("bomb_pre"), this.scrollSprite.update(), this.scrollSprite.render(), n = 0; n < 6; n++) this.en[n].update(), this.en[n].render();
	if (this.objectPhysics.velocity.y > 0 && this.scrollSprite.sprite.position.y > 0 && this.objectPhysics.position.y > this.myY) {
		for (this.objectPhysics.velocity.y = 0, this.objectPhysics.position.y = this.myY, this.objectPhysics.angularVelocity = Math.random() * .3 - .16, this.e.position.x = this.objectPhysics.position.x, this.e.position.y = this.objectPhysics.position.y + 50 - 16, this.e.start(), GameGlobal.ScreenQuake.startWithIntensity(.1, .15), t = 0; t < 6; t++) i = this.en[t], i.physics.position.x = this.objectPhysics.position.x - 8 + t * 8, i.physics.position.y = this.myY + 50 - 16 + Math.random() * 8;
		GameGlobal.SoundPlayer.sound.play("bomb_hit")
	}
},
BombSlice.prototype.checkCollision = function() {},
BombTriggerSlice.prototype.updateDisplay = function() {
	GameGlobal.SoundPlayer.sound.play("bomb_launch"), this.sprite = null
},
BombTriggerSlice.prototype.checkCollision = function() {},
MapDecorator.prototype.buildDecoration = function(n, t) {
	this.layerIndex = 0;
	var i = new DecoratorInfo(n, t, 0);
	this.addSlope && this.addSlopeLayer(i, Util.random(4)), this.addAC && (i.height -= WallSlice.AC_HEIGHT, this.addRandomLayer(SliceType.AC, i, !1, this.chances.ac), i.height += WallSlice.AC_HEIGHT), Math.random() < .5 ? (this.addPipes && this.addPipeLayer(i), Math.random() < this.addConstruction && this.addBigSpriteRandomLayer(i, SliceType.ANTENNA + Util.random(6, 1), WallSlice.ANTENNA_HEIGHT, WallSlice.ANTENNA_WIDTH, this.chances.antenna)) : (this.addReservoirLayer(i), Math.random() < this.addFence && (i.height -= WallSlice.FENCE_HEIGHT, this.addLayer(SliceType.FENCE, i, !0), i.height += WallSlice.FENCE_HEIGHT))
},
MapDecorator.prototype.addReservoirLayer = function(n) {
	this.addBigSpriteRandomLayer(n, SliceType.SKYLIGHT, WallSlice.SKYLIGHT_HEIGHT, WallSlice.SKYLIGHT_WIDTH, this.chances.skylight), this.addBigSpriteRandomLayer(n, SliceType.ACCESS, WallSlice.ACCESS_HEIGHT, WallSlice.ACCESS_WIDTH, this.chances.access), this.addBigSpriteRandomLayer(n, SliceType.RESERVOIR, WallSlice.RESERVOIR_HEIGHT, WallSlice.RESERVOIR_WIDTH, this.chances.reservoir)
},
MapDecorator.prototype.addPipeLayer = function(n) {
	var t = new DecoratorInfo(n.height - WallSlice.PIPE1_HEIGHT, n.length, n.startOffset);
	this.addRandomLayer3Type(SliceType.PIPE1_LEFT, SliceType.PIPE1_MIDDLE, SliceType.PIPE1_RIGHT, t, 0, this.chances.pipe1), this.addBigSpriteRandomLayer(n, SliceType.PIPE2, WallSlice.PIPE2_HEIGHT, WallSlice.PIPE2_WIDTH, this.chances.pipe2)
},
MapDecorator.prototype.addSlopeLayer = function(n, t) {
	for (var i = 0; i < t; i++) n.height -= WallSlice.SLOPE_HEIGHT, n.startOffset = i, this.addLayer3Type(SliceType.SLOPE_LEFT, SliceType.SLOPE_MIDDLE, SliceType.SLOPE_RIGHT, n), n.length -= 1;
	n.length -= 2
},
MapDecorator.prototype.addBigSpriteRandomLayer = function(n, t, i, r, u) {
	var f = Math.floor(r / WallSlice.WIDTH),
		e = new DecoratorInfo(n.height - i, n.length - f, n.startOffset);
	this.addRandomLayer(t, e, f, u)
},
MapDecorator.prototype.addRandomLayer3Type = function(n, t, i, r, u, f) {
	var s = !1,
		h = 0,
		e, o;
	for (this.layers[this.layerIndex] = [], e = 0; e < r.startOffset; e++) this.layers[this.layerIndex].push(null);
	for (e = r.startOffset; e < r.length; e++)
		if (s = Math.random() < f, s) {
			for (h = Util.random(15, 1), this.layers[this.layerIndex].push(new WallSlice(n, r.height)), e++, o = 0; o < h && e < r.length; e++, o++) this.layers[this.layerIndex].push(new WallSlice(t, r.height));
			for (this.layers[this.layerIndex].push(new WallSlice(i, r.height)), e++, o = 0; o < u && e < r.length; o++, e++) this.layers[this.layerIndex].push(null)
		} else this.layers[this.layerIndex].push(null);
	this.layerIndex++
},
MapDecorator.prototype.addRandomLayer = function(n, t, i, r) {
	var e = !1,
		u, f;
	for (this.layers[this.layerIndex] = [], u = 0; u < t.startOffset; u++) this.layers[this.layerIndex].push(null);
	for (u = t.startOffset; u < t.length; u++)
		if (e = Math.random() < r, e)
			for (this.layers[this.layerIndex].push(new WallSlice(n, t.height)), f = 0; f < i && u < t.length; f++, u++) this.layers[this.layerIndex].push(null);
		else this.layers[this.layerIndex].push(null);
	this.layerIndex++
},
MapDecorator.prototype.addLayer3Type = function(n, t, i, r) {
	this.layers[this.layerIndex] = [];
	for (var u = 0; u < r.startOffset; u++) this.layers[this.layerIndex].push(null);
	for (this.layers[this.layerIndex].push(new WallSlice(n, r.height)), r.startOffset++, u = r.startOffset; u < r.length - 1; u++) this.layers[this.layerIndex].push(new WallSlice(t, r.height));
	this.layers[this.layerIndex].push(new WallSlice(i, r.height)), this.layerIndex++
},
MapDecorator.prototype.addLayer = function(n, t, i) {
	i = i || !1, this.layers[this.layerIndex] = [];
	for (var r = 0; r < t.startOffset; r++) this.layers[this.layerIndex].push(null);
	for (r = t.startOffset; r < t.length; r++) i && r % 2 == 1 ? this.layers[this.layerIndex].push(null) : this.layers[this.layerIndex].push(new WallSlice(n, t.height));
	this.layerIndex++
},
MapDecorator.prototype.addPigeonGroupLayer = function(n) {
	var r = 20,
		t, i;
	for (this.layers[this.layerIndex] = [], t = 0; t < n.startOffset; t++) this.layers[this.layerIndex].push(null);
	for (t = n.startOffset; t < n.length; t++)
		for (this.layers[this.layerIndex].push(new PigeonGroup(n.height)), i = 0; i < r && t < n.length; i++, t++) this.layers[this.layerIndex].push(null);
	this.layerIndex++
},
MapDecorator.prototype.addDecorationSlices = function(n, t) {
	for (var r, i = 0; i < this.layerIndex; i++) r = this.layers[i][t], !r || n.push(r)
},
MapBuilder.TYPES = {
	ROOF: 0,
	HALLWAY: 1,
	COLLAPSE: 2,
	BOMB: 3,
	CRANE: 4,
	BILLBOARD: 5,
	LEG: 6
},
MapBuilder.WALL_MAXDROP = 5, MapBuilder.WALL_MAXHEIGHT = 480, MapBuilder.prototype.getType = function() {
	return this.seq.type
},
MapBuilder.prototype.nextType = function() {
	return this.seq.nextType
},
MapBuilder.prototype.update = function() {
	while (this.walls.shouldAddSlices()) this.createMap()
},
MapBuilder.prototype.createMap = function() {
	var n, r, i, u;
	if (this.seq.type = this.seq.nextType, this.seq.nextType = Util.random(MapBuilder.TYPES.LEG), this.seq.currIndex === 0) this.seq.y = 5 * WallSlice.HEIGHT, this.seq.width = 60, this.seq.gap = 5, this.seq.type = MapBuilder.TYPES.HALLWAY;
	else if (this.seq.currIndex === 1) this.seq.y = 15 * WallSlice.HEIGHT, this.seq.width = 40, this.seq.gap = 5, this.seq.type = MapBuilder.TYPES.ROOF;
	else {
		n = 0, n = this.player.objectPhysics.velocity.x > 640 ? 7 : this.player.objectPhysics.velocity.x > 480 ? 6 : this.player.objectPhysics.velocity.x > 320 ? 5 : this.seq.currIndex > 0 ? 4 : 3;
		var f = this.player.objectPhysics.velocity.x * .75 / 20 * .75,
			e = Math.max(4, f * .4),
			o = Math.random();
		this.seq.gap = e + o * (f - e), r = Math.max(6, this.walls.VIEWPORT_NUM_SLICES - this.seq.gap), r < 15 && this.player.objectPhysics.velocity.x < this.player.maxVelocity.x * .8 && (r = 15);
		var s = r * 2,
			t = this.seq.y / WallSlice.HEIGHT - 2 - n,
			h = 6 * this.player.jumpLimit / .35;
		t = Math.min(t, h), t > 0 && (t = Math.ceil(t * (1 - o))), i = Util.random(MapBuilder.WALL_MAXDROP) - t, this.seq.type === MapBuilder.TYPES.HALLWAY && (i = 0), this.seq.type === MapBuilder.TYPES.CRANE && (i = -2), i === 0 && --i, this.seq.y += i * WallSlice.HEIGHT, this.seq.width = Math.floor(r + Util.random(s)), u = PigeonGroup.WIDTH / WallSlice.WIDTH, this.seq.width += u - this.seq.width % u
	}
	this.seq.type === MapBuilder.TYPES.COLLAPSE && this.seq.width > 55 ? this.seq.type = MapBuilder.TYPES.ROOF : this.seq.type === MapBuilder.TYPES.BOMB && this.seq.width < 90 && (this.seq.type = MapBuilder.TYPES.ROOF), this.seq.type === MapBuilder.TYPES.ROOF ? this.createWallSpan(this.seq.y, this.seq.width, Util.random(3)) : this.seq.type === MapBuilder.TYPES.HALLWAY ? this.createHall(this.seq.y, n, this.seq.width, Util.random(1), Util.random(3)) : this.seq.type === MapBuilder.TYPES.CRANE ? this.createCrane(this.seq.y, this.seq.width) : this.seq.type === MapBuilder.TYPES.COLLAPSE ? (this.createCollapse(this.seq.y, this.seq.width, Util.random(3)), this.seq.y += 3 * WallSlice.HEIGHT) : this.seq.type === MapBuilder.TYPES.BOMB ? this.createWallSpan(this.seq.y, this.seq.width, Util.random(3), !0) : this.createWallSpan(this.seq.y, this.seq.width, 0), this.createGap(this.seq.gap), this.seq.currIndex++
},
MapBuilder.prototype.createGap = function(n) {
	this.addWallGap(n), this.addGapButWall(n)
},
MapBuilder.prototype.createCrane = function(n, t) {
	var i = Math.random() < .5,
		r;
	this.addCraneSlice(n, SliceType.CRANE1_LEFT, !0), this.addWallGap(1), this.addGapButWall(2), this.addCraneMid(n, t, i), this.addPigeonsOrGap(n, t * 2), this.addObstacleGap(t * 2), this.addCraneSlice(n, SliceType.CRANE1_RIGHT, !0), i ? (r = n, this.addWallSlices([new WallSlice(SliceType.CRANE3, r + 5, {
		width: WallSlice.CRANE3_WIDTH,
		offsetX: -WallSlice.WIDTH * 3.5
	})])) : this.addWallGap(1), this.addGapButWall(2)
},
MapBuilder.prototype.createHall = function(n, t, i, r, u) {
	r = r || 0, u = u || 0, t = t || 5, this.addFloorSlice(n, t, SliceType.FLOOR_LEFT + r, SliceType.WALL_LEFT + u, SliceType.HALL_LEFT), this.addGlassWindow(n, t), this.addFloorMid(n, t, i, r, u), this.addObstacles(n, i + 2, SliceType.OBSTACLES, 3), this.addPigeonGap(i), this.addFloorSlice(n, t, SliceType.FLOOR_RIGHT + r, SliceType.WALL_RIGHT + u, SliceType.HALL_RIGHT), this.addGlassWindow(n, t, !0)
},
MapBuilder.prototype.createWallSpan = function(n, t, i, r) {
	i = i || 0, r = r || !1, r ? this.addWallSliceWithBombTrigger(n, SliceType.ROOF_LEFT + i, SliceType.WALL_LEFT + i) : this.addWallSlice(n, SliceType.ROOF_LEFT + i, SliceType.WALL_LEFT + i), this.addGapButWall(1);
	var u = t;
	this.addWallMid(n, u, i, r), this.addPigeonsOrGap(n, u), this.addObstacles(n, u, SliceType.OBSTACLES2, 2, .5), this.addWallSlice(n, SliceType.ROOF_RIGHT + i, SliceType.WALL_RIGHT + i), this.addGapButWall(1), this.addDecorationEscape(n), this.addGapButWall(1)
},
MapBuilder.prototype.createCollapse = function(n, t, i) {
	i = i || 0;
	var r = {
		startCollapsing: !1,
		physics: new ObjectPhysics({
			maxVelocity: {
				x: 0,
				y: 300
			},
			velocity: {
				x: 0,
				y: 60
			},
			acceleration: {
				x: 0,
				y: 40
			}
		})
	};
	this.addCollapseSlice(n, SliceType.ROOF_LEFT_CRACKED + i * 8, SliceType.WALL_LEFT_CRACKED + i * 8, r), this.addCollapseMid(n, t, i, r), this.addCollapseSlice(n, SliceType.ROOF_RIGHT_CRACKED + i * 8, SliceType.WALL_RIGHT_CRACKED + i * 8, r), this.addGibs(n, t + 2, r), this.addPigeonGap(1), this.addPigeonsOrGap(n, t), this.addPigeonGap(1)
},
MapBuilder.prototype.addWallMid = function(n, t, i, r) {
	var f, e, o, u;
	for (i = i || 0, r = r || !1, o = n, this.decorator.buildDecoration(o, t), u = 0; u < t; u++) f = [], e = [], this.decorator.addDecorationSlices(e, u), r && u === Math.ceil(t / 2) && f.push(new BombSlice(n, this.player, this.gibEmitter)), this.buildWindowedWallSlice(f, n, SliceType.ROOF_MIDDLE + i, SliceType.WALL_MIDDLE + i, SliceType.WINDOW + i), this.addWallSlices(f, e)
},
MapBuilder.prototype.addWallSliceWithBombTrigger = function(n, t, i) {
	var r = this.buildWallSlice([], n, t, i);
	r.push(new BombTriggerSlice), this.addWallSlices(r)
},
MapBuilder.prototype.addWallSlice = function(n, t, i) {
	this.addWallSlices(this.buildWallSlice([], n, t, i))
},
MapBuilder.prototype.buildWallSlice = function(n, t, i, r) {
	var f = t,
		u;
	for (n.push(new WallSlice(i, f)), u = f + WallSlice.HEIGHT; u < f + MapBuilder.WALL_MAXHEIGHT; u += WallSlice.HEIGHT) n.push(new WallSlice(r, u));
	return n
},
MapBuilder.prototype.buildWindowedWallSlice = function(n, t, i, r, u) {
	var s, e = t,
		o = !0,
		f;
	for (n.push(new WallSlice(i, e)), f = e + WallSlice.HEIGHT; f < e + MapBuilder.WALL_MAXHEIGHT; f += WallSlice.HEIGHT, o = !o) o ? n.push(new WallSlice(r, f)) : (s = Util.random(3) * 10, n.push(new WallSlice(u + s, f)));
	return n
},
MapBuilder.prototype.addFloorMid = function(n, t, i, r, u) {
	for (var f, o, e = 0; e < i; e++) f = [], this.buildFloorSlice(f, n, t, SliceType.FLOOR_MIDDLE + r, SliceType.WALL_MIDDLE + u, SliceType.HALL_MIDDLE, SliceType.WINDOW + u), Math.random() < .15 && (o = n, f.push(new WallSlice(SliceType.DOOR + Util.random(3), o - WallSlice.DOOR_HEIGHT))), this.addWallSlices(f)
},
MapBuilder.prototype.addFloorSlice = function(n, t, i, r, u, f) {
	this.addWallSlices(this.buildFloorSlice([], n, t, i, r, u, f))
},
MapBuilder.prototype.buildFloorSlice = function(n, t, i, r, u, f, e) {
	var a = !e ? 0 : 10,
		c, h, o, s, l;
	for (e = e || u, h = !0, o = t, n.push(new WallSlice(r, o)), s = o + WallSlice.HEIGHT; s < o + MapBuilder.WALL_MAXHEIGHT; s += WallSlice.HEIGHT, h = !h) h ? n.push(new WallSlice(u, s)) : (c = Util.random(3) * a, n.push(new WallSlice(e + c, s)));
	for (o -= WallSlice.HEIGHT, n.push(new WallSlice(f, o)), o -= WallSlice.HEIGHT, n.push(new WallSlice(f + 1, o)), l = 2; l < i; l++) o -= WallSlice.HEIGHT, n.push(new Hall3Slice(o, l === i - 1));
	for (h = !0, s = o - WallSlice.HEIGHT; s >= o - WallSlice.HEIGHT * 15; s -= WallSlice.HEIGHT, h = !h) h ? n.push(new WallSlice(u, s)) : (c = Util.random(3) * a, n.push(new WallSlice(e + c, s)));
	return n
},
MapBuilder.prototype.addCraneMid = function(n, t, i) {
	var u = n,
		c = 0,
		e = Math.floor(t * .3),
		h = Util.random(t - 1, e + 2),
		f, r, o, s;
	for (i && (c = t - 2, e = t - e - 1, h = t - h - 1), f = 0; f < t; f++) {
		if (r = [], r.push(new WallSlice(SliceType.CRANE1_MIDDLE, u, {
				width: WallSlice.CRANE_WIDTH
			})), i || f !== c + 1)
			if (f === e + 1) {
				for (o = -WallSlice.CRANE4_WIDTH, s = u - 20 + WallSlice.CRANE4_HEIGHT; s < u + MapBuilder.WALL_MAXHEIGHT; s += WallSlice.CRANE2_HEIGHT) r.push(new WallSlice(SliceType.CRANE2, s, {
					width: WallSlice.CRANE2_WIDTH,
					offsetX: o + 8
				}));
				r.push(new WallSlice(SliceType.ANTENNA + 4, u - WallSlice.ANTENNA_HEIGHT, {
					offsetX: o + 8
				})), r.push(new WallSlice(SliceType.CRANE4, u - 8, {
					width: WallSlice.CRANE4_WIDTH,
					offsetX: o,
					scale: {
						x: i ? -WallSlice.SCALE : WallSlice.SCALE,
						y: WallSlice.SCALE
					},
					anchor: {
						x: i ? 1 : 0,
						y: 0
					}
				}))
			} else f === h && r.push(new WallSlice(SliceType.CRANE5, u + WallSlice.HEIGHT * 1.4, {
				width: WallSlice.CRANE5_WIDTH,
				offsetX: -10,
				scale: {
					x: i ? WallSlice.SCALE : -WallSlice.SCALE,
					y: WallSlice.SCALE
				},
				anchor: {
					x: i ? 0 : 1,
					y: 0
				}
			}));
		else r.push(new WallSlice(SliceType.CRANE3, u + 5, {
			width: WallSlice.CRANE3_WIDTH,
			offsetX: -WallSlice.WIDTH * 3.5
		}));
		this.addWallSlices(r), this.addWallSlices([new WallSlice(SliceType.GAP)])
	}
},
MapBuilder.prototype.addCraneSlice = function(n, t, i) {
	var i = i || !1,
		u = n,
		r = [];
	r.push(new WallSlice(t, u, {
		width: WallSlice.CRANE_WIDTH
	})), i && r.push(new WallSlice(SliceType.ANTENNA + 4, u - WallSlice.ANTENNA_HEIGHT)), this.addWallSlices(r)
},
MapBuilder.prototype.addCollapseMid = function(n, t, i, r) {
	var u, f;
	for (i = i || 0, f = 0; f < t; f++) u = [], this.buildWindowedCollapseSlice(u, n, SliceType.ROOF_MIDDLE_CRACKED + i * 8, SliceType.WALL_MIDDLE_CRACKED + i * 8, SliceType.WINDOW + i, r), this.addWallSlices(u)
},
MapBuilder.prototype.addCollapseSlice = function(n, t, i, r) {
	this.addWallSlices(this.buildCollapseSlice([], n, t, i, r))
},
MapBuilder.prototype.buildCollapseSlice = function(n, t, i, r, u) {
	var e = t,
		o = Util.random(7),
		f;
	for (n.push(new CollapseSlice(i + o, e, {
			collapseObject: u
		})), f = e + WallSlice.HEIGHT; f < e + MapBuilder.WALL_MAXHEIGHT; f += WallSlice.HEIGHT) o = Util.random(7), n.push(new CollapseSlice(r + o, f, {
		collapseObject: u
	}));
	return n
},
MapBuilder.prototype.buildWindowedCollapseSlice = function(n, t, i, r, u, f) {
	var c, o = Util.random(7),
		s = t,
		h = !0,
		e;
	for (n.push(new CollapseSlice(i + o, s, {
			collapseObject: f
		})), e = s + WallSlice.HEIGHT; e < s + MapBuilder.WALL_MAXHEIGHT; e += WallSlice.HEIGHT, h = !h) h ? (o = Util.random(7), n.push(new CollapseSlice(r + o, e, {
		collapseObject: f
	}))) : (c = Util.random(3) * 10, n.push(new CollapseSlice(u + c, e, {
		collapseObject: f
	})));
	return n
},
MapBuilder.prototype.addDecorationEscape = function(n) {
	for (var i = n, r = [], t = i + WallSlice.HEIGHT; t < i + MapBuilder.WALL_MAXHEIGHT; t += WallSlice.ESCAPE_HEIGHT) r.push(new WallSlice(SliceType.ESCAPE, t));
	this.addWallSlices(r)
},
MapBuilder.prototype.addPigeons = function(n, t) {
	for (var e = n, f = new PigeonGroup, r, u, i = 0; i < t; i++)
		for (r = new PigeonGroup(e - Pigeon.HEIGHT), f.nextPigeons = r, f = r, this.pigeons.addSlices([r]), u = 1; u < PigeonGroup.WIDTH / WallSlice.WIDTH; u++, i++) this.pigeons.addSlices([new WallSlice(SliceType.GAP)])
},
MapBuilder.prototype.addGibs = function(n, t, i) {
	for (var u, r, f = 0; f < t; f++) {
		for (u = [], r = n; r < n + MapBuilder.WALL_MAXHEIGHT; r += WallSlice.HEIGHT) Util.percentChance(90) || u.push(new GibSlice(SliceType.GIBS + Util.random(5), r, {
			collapseObject: i
		}));
		this.obstacles.addSlices(u)
	}
},
MapBuilder.prototype.addObstacles = function(n, t, i, r, u) {
	var e, f;
	for (u = u || 1.5, e = !1, f = 0; f < t; f++) !e && f > 1 && f < t - 1 && Util.percentChance(u) ? (this.obstacles.addSlices([new ObstacleSlice(i + Util.random(r - 1), n - ObstacleSlice.HEIGHT / 2)]), e = !0) : (this.obstacles.addSlices([new WallSlice(SliceType.GAP)]), e = !1)
},
MapBuilder.prototype.addPigeonsOrGap = function(n, t) {
	Util.percentChance(70) ? this.addPigeons(n, t) : this.addPigeonGap(t)
},
MapBuilder.prototype.addWallGap = function(n) {
	for (var t = 0; t < n; t++) this.addWallSlices([new WallSlice(SliceType.GAP)])
},
MapBuilder.prototype.addGapButWall = function(n) {
	this.addObstacleGap(n), this.addPigeonGap(n)
},
MapBuilder.prototype.addObstacleGap = function(n) {
	for (var t = 0; t < n; t++) this.obstacles.addSlices([new WallSlice(SliceType.GAP)])
},
MapBuilder.prototype.addPigeonGap = function(n) {
	for (var t = 0; t < n; t++) this.pigeons.addSlices([new WallSlice(SliceType.GAP)])
},
MapBuilder.prototype.addGlassWindow = function(n, t, i) {
	for (var e = i ? WallSlice.WIDTH * .8 : WallSlice.WIDTH * .2, r = n, u = [], f = 0; f < t - 1; f++) r -= WallSlice.HEIGHT, u.push(new GlassWindow(r, e, null));
	r -= WallSlice.HEIGHT, u.push(new GlassWindow(r, e, this.shards)), this.pigeons.addSlices(u)
},
MapBuilder.prototype.addWallSlices = function(n, t) {
	t || (t = n.map(function() {
		return new WallSlice(SliceType.GAP)
	})), this.walls.addSlices(n), this.decorations.addSlices(t)
},
ScrollMovie.constructor = ScrollMovie, ScrollMovie.prototype = Object.create(PIXI.MovieClip.prototype), ScrollMovie.prototype.update = function() {}, ScrollSprite.prototype.update = function() {
	this.physics.update(), this.sprite.rotation = this.physics.rotation
},
ScrollAnimation.prototype.addAnimation = function(n, t, i, r) {
	var u = this,
		f = t.reduce(function(n, t) {
			return n.push(u.getFrameTexture(t)), n
		}, []);
	this.frames[n] = {
		textures: f,
		speed: i,
		loop: r
	}
},
ScrollAnimation.prototype.play = function(n) {
	var t = this.frames[n];
	this.clip = this.clip || new PIXI.MovieClip(t.textures),
	this.clip.textures = t.textures,
	this.clip.loop = t.loop,
	this.clip.animationSpeed = t.speed,
	this.clip.gotoAndPlay(0)
},
ScrollAnimation.prototype.finished = function() {
	return !this.clip.playing
},
ScrollAnimation.prototype.getFrameTexture = function(n) {
	return PIXI.Texture.fromFrame(Util.format(this.texture, n))
},
ScrollForeground.VIEWPORT_WIDTH = 1256, ScrollForeground.VIEWPORT_HEIGHT = 320, ScrollForeground.constructor = ScrollForeground, ScrollForeground.prototype = Object.create(PIXI.DisplayObjectContainer.prototype), ScrollForeground.prototype.checkViewportXBounds = function(n) {
	var t = (this.slices.length - this.VIEWPORT_NUM_SLICES) * this.SLICE_WIDTH;
	return n < 0 ? n = 0 : n >= t && (n = t), n
},
ScrollForeground.prototype.shouldAddSlices = function() {
	return this.slices.length < this.viewportSliceX + this.VIEWPORT_NUM_SLICES + 1
},
ScrollForeground.prototype.addSlices = function(n) {
	this.slices.push(n)
},
ScrollForeground.prototype.removeOldSlices = function(n) {
	var u = this.viewportSliceX - n,
		t, f, i, r;
	for (u > this.VIEWPORT_NUM_SLICES && (u = this.VIEWPORT_NUM_SLICES), t = n; t < n + u; t++)
		for (f = this.slices[t], i = 0; i < f.length; i++) r = f[i], r.sprite !== null && (this.removeChild(r.sprite), r.removeDisplay())
},
ScrollForeground.prototype.addNewSlices = function() {
	for (var f = -(this.viewportX % this.SLICE_WIDTH), u, r, n, t = this.viewportSliceX, i = 0; t < this.viewportSliceX + this.VIEWPORT_NUM_SLICES; t++, i++)
		for (u = this.slices[t], r = 0; r < u.length; r++) n = u[r], n.sprite === null && n.type !== SliceType.GAP ? (n.initDisplay(f, i, this.viewportY), this.addChild(n.sprite)) : n.sprite !== null && (n.updateDisplay(f, i, this.viewportY), n.checkCollision(this.player, this.shards))
},
ScrollForeground.prototype.setPlayer = function(n) {
	this.player = n
},
ScrollForeground.prototype.setShards = function(n) {
	this.shards = n
},
ScrollBackground.constructor = ScrollBackground,
ScrollBackground.prototype = Object.create(PIXI.TilingSprite.prototype),
PlayerAsset.prototype.constructor = PlayerAsset,
PlayerAsset.prototype = Object.create(ScrollMovie.prototype),
PlayerAsset.GRAVITY = 1200,
PlayerAsset.prototype.jumpPressed = function() {
	if (game_over) {
		return main.restart();
	}
	console.log(this.jump);
	if (this.jump >= 0) {
		if (this.jump === 0) {
			var n = Util.random(4);
			switch (n) {
				case 0: GameGlobal.SoundPlayer.sound.play("jump1"); break;
				case 1: GameGlobal.SoundPlayer.sound.play("jump2"); break;
				case 2: GameGlobal.SoundPlayer.sound.play("jump3"); break;
			}
		}
		this.jump += GameGlobal.TimeKeeper.elapsed * .001,
		this.jump > this.jumpLimit && (this.jump = -1)
	} else this.jump = -1
},
PlayerAsset.prototype.update = function() {
	if (this.position.y > 484) {
		this.dead = !0;
		return
	}
	this.updatePlayer(), this.objectPhysics.update(), this.position.x += this.objectPhysics.deltaPos.x, this.position.y += this.objectPhysics.deltaPos.y, this.render()
},
PlayerAsset.prototype.updatePlayer = function() {
	this.objectPhysics.acceleration.x <= 0 || (this.updateJump(), this.updateSpeed(), this.updateAnimation(), this.updateSound(), this.onFloor = !1, this.stumble = !1)
},
PlayerAsset.prototype.render = function() {
	var n = {
		x: this.objectPhysics.position.x + GameGlobal.ScreenFocus.scroll.x,
		y: this.objectPhysics.position.y + GameGlobal.ScreenFocus.scroll.y
	};
	this.position.x = n.x, this.position.y = n.y
},
PlayerAsset.prototype.updateSpeed = function() {
	this.objectPhysics.velocity.x < 0 ? this.objectPhysics.velocity.x = 0 : this.objectPhysics.acceleration.x = this.objectPhysics.velocity.x < 100 ? 60 : this.objectPhysics.velocity.x < 250 ? 36 : this.objectPhysics.velocity.x < 400 ? 24 : this.objectPhysics.velocity.x < 600 ? 12 : 4
},
PlayerAsset.prototype.updateJump = function() {
	this.objectPhysics.velocity.y === this.objectPhysics.maxVelocity.y && (this.my += GameGlobal.TimeKeeper.elapsedSec),
	this.onFloor ? (this.objectPhysics.velocity.y = 0, this.objectPhysics.acceleration.y = 0) : this.objectPhysics.acceleration.y = PlayerAsset.GRAVITY,
	this.jump > 0 && (this.objectPhysics.velocity.y = this.jump < .08 ? -this.maxVelocity.y * .65 : -this.maxVelocity.y),
	this.jumpLimit = this.objectPhysics.velocity.x / (this.maxVelocity.x * 2.5),
	this.jumpLimit > .35 && (this.jumpLimit = .35),
	this.onFloor ? this.jump = 0 : this.prevJump === this.jump ? this.jump = -1 : this.prevJump = this.jump
},
PlayerAsset.prototype.updateAnimation = function() {
	this.onFloor && this.stumble && this.textures !== this.stumbleFrames ? (this.loop = !1, this.animationSpeed = .3, this.textures = this.stumbleFrames, this.gotoAndPlay(0)) : this.onFloor && this.textures !== this.run1Frames && (this.textures !== this.stumbleFrames || !this.playing) ? (this.loop = !0, this.animationSpeed = .5, this.textures = this.run1Frames, this.gotoAndPlay(0)) : this.jump > 0 && this.textures !== this.jumpFrames ? (this.animationSpeed = .1, this.textures = this.jumpFrames, this.gotoAndPlay(0)) : !this.onFloor && this.objectPhysics.velocity.y > 0 && this.textures !== this.fallFrames && (this.loop = !0, this.animationSpeed = .2, this.textures = this.fallFrames, this.gotoAndPlay(0))
},
PlayerAsset.prototype.updateSound = function() {
	if (this.onFloor) {
		var n = (1 - this.objectPhysics.velocity.x / this.objectPhysics.maxVelocity.x) * .35;
		n = Math.max(n, .15), this.fc += GameGlobal.TimeKeeper.elapsedSec, this.fc > n && (this.fc = 0, this.craneFeet ? (GameGlobal.SoundPlayer.sound.play(this.feetC[Util.random(this.feetC.length - 1)]), this.craneFeet = !1) : GameGlobal.SoundPlayer.sound.play(this.feet[Util.random(this.feet.length - 1)]))
	}
	this.stumble && GameGlobal.SoundPlayer.sound.play("tumble")
},
PlayerAsset.prototype.hitBottom = function(n) {
	this.objectPhysics.position.y = n - GameGlobal.ScreenFocus.scroll.y, this.onFloor = !0, this.my > .16 && (this.stumble = !0), this.my = 0
},
PlayerAsset.prototype.hitUp = function(n) {
	this.objectPhysics.position.y = n - GameGlobal.ScreenFocus.scroll.y, this.objectPhysics.velocity.y = 0
},
PlayerAsset.prototype.hitLeft = function(n) {
	GameGlobal.SoundPlayer.sound.play("wall"), this.objectPhysics.acceleration.x = 0, this.objectPhysics.velocity.x = 0, this.objectPhysics.maxVelocity.y = 1e3, this.epitaph = "hit", this.objectPhysics.position.x = n - GameGlobal.ScreenFocus.scroll.x
},
PlayerAsset.prototype.hitObstacle = function() {
	this.stumble = !0, this.objectPhysics.velocity.x *= .7
},
PlayerAsset.prototype.buildSounds = function() {
	this.feet = ["foot1", "foot2", "foot3", "foot4", ""], this.feetC = ["footc1", "footc2", "footc3", "footc4", ""]
},
PlayerAsset.prototype.buildFrames = function() {
	this.run1Frames = [],
	this.run2Frames = [],
	this.jumpFrames = [],
	this.fallFrames = [],
	this.stumbleFrames = [];
	for (var n = 1; n <= 38; n++) n <= 16 ? (this.run1Frames.push(this.getFrameTexture(n)), n % 2 == 1 && this.run2Frames.push(this.getFrameTexture(n))) : n <= 19 ? this.jumpFrames.push(this.getFrameTexture(n)) : n <= 26 ? this.fallFrames.push(this.getFrameTexture(n)) : n <= 38 && this.stumbleFrames.push(this.getFrameTexture(n))
},
PlayerAsset.prototype.getFrameTexture = function(n) {
	return PIXI.Texture.fromFrame("raw/player" + n + ".png")
},
PlayerAsset.prototype.bindKeyHandlers = function() {
	// kd.Z.down(this.jumpPressed.bind(this))
},
HUD.constructor = HUD,
HUD.prototype = Object.create(PIXI.DisplayObjectContainer.prototype),
HUD.DIGITS = 6,
HUD.prototype.setDistance = function(n) {
	this.distance !== n && (this.distance = n, this.updateCoordinates())
},
HUD.prototype.updateCoordinates = function() {
	for (var i = [], f = this.distance, e, t, u, o, n, r = 1; r < HUD.DIGITS + 1; ++r) i[r] = f % 10, f = Math.floor(f / 10);
	for (i[0] = 10, e = 0, t = 0; t < HUD.DIGITS + 1; ++t) u = this.sprites[t], u.texture = this.textures[i[t]], e += u.width, u.position.x = this.width - e;
	for (o = !0, n = HUD.DIGITS; n >= 1; --n) i[n] != 0 && (o = !1), this.sprites[n].visible = o ? !1 : !0
},
HUD.prototype.buildSprites = function() {
	for (var n = 0; n < HUD.DIGITS + 1; n++) this.sprites[n] = new PIXI.Sprite(this.textures[0]), this.addChild(this.sprites[n])
},
HUD.prototype.buildTextures = function() {
	for (var n = 0; n < 11; n++) this.textures[n] = PIXI.Texture.fromFrame("hud" + n + ".png")
},
game_over = !1, GameOver.constructor = GameOver,
GameOver.prototype = Object.create(PIXI.DisplayObjectContainer.prototype),
PlayState.prototype.update = function() {
	var t = this.player.dead,
		n;
	this.updateChildren(),
	this.dist.setDistance(Math.ceil(this.player.objectPhysics.position.x / 10)),
	this.player.dead && !t && (
		n = Math.round(this.player.objectPhysics.position.x / 10),
		this.updatePlayerEpitaph(n),
		this.gameOver = new GameOver(this.width / this.zoom, this.height / this.zoom, n, this.player),
		this.gameOver.scale.x = this.zoom,
		this.gameOver.scale.y = this.zoom,
		this.stage.addChild(this.gameOver)
	)
},
PlayState.prototype.updateChildren = function() {
	this.mapBuilder.update(), GameGlobal.ScreenFocus.doFollow(), this.focus.x = this.player.objectPhysics.position.x + GameGlobal.ScreenFocus.width * .5 - WallSlice.WIDTH * this.zoom * 5, this.focus.y = this.player.objectPhysics.position.y + GameGlobal.ScreenFocus.height * .18, this.focus.x += GameGlobal.ScreenQuake.pos.x * 2, this.focus.y += GameGlobal.ScreenQuake.pos.y * 2, this.player.update();
	var n = -GameGlobal.ScreenFocus.scroll.x,
		t = GameGlobal.ScreenFocus.scroll.y;
	this.decorationLayer.setViewportX(n, t), this.obstacleLayer.setViewportX(n, t), this.pigeonLayer.setViewportX(n, t), this.shardLayer.setViewportX(n, t), this.front.setViewportX(n, t), this.far.setViewportX(n, t), this.mid.setViewportX(n, t), this.walkerLayer.update(), this.jet.update(), this.gibEmitter.update()
},
PlayState.prototype.updatePlayerEpitaph = function(n) {
	var i, t;
	if (this.player.epitaph !== "bomb")
		if (this.player.epitaph === "hit")
			if (n < 105) this.player.epitaph = "just barely\nstumbling out of the first hallway.";
			else {
				t = this.mapBuilder.getType();
				switch (t) {
					case MapBuilder.TYPES.HALLWAY: this.player.epitaph = "\nmissing another window."; break;
					case MapBuilder.TYPES.COLLAPSE: this.player.epitaph = "\nknocking a building down."; break;
					case MapBuilder.TYPES.CRANE: this.player.epitaph = "somehow\n hitting the edge of a crane."; break;
					case MapBuilder.TYPES.BILLBOARD: this.player.epitaph = "somehow\nhitting the edge of a billboard."; break;
					case MapBuilder.TYPES.LEG: this.player.epitaph = "colliding\nwith some enormous obstacle."; break;
					default: this.player.epitaph = "hitting\na wall and tumbling to your death."
				}
			}
	else if (i = this.mapBuilder.getType(), t = this.mapBuilder.nextType(), t > 0) switch (t) {
		case MapBuilder.TYPES.HALLWAY: this.player.epitaph = "completely\n missing the entire hallway."; break;
		case MapBuilder.TYPES.CRANE: this.player.epitaph = "\n missing a crane completely."; break;
		case MapBuilder.TYPES.BILLBOARD: this.player.epitaph = "not\nquite reaching a billboard."; break;
		case MapBuilder.TYPES.LEG: this.player.epitaph = "landing\nwhere a building used to be."; break;
		default: this.player.epitaph = "\nfalling to your death."
	} else switch (i) {
		case MapBuilder.TYPES.HALLWAY: this.player.epitaph = "\nfalling out of a hallway."; break;
		case MapBuilder.TYPES.COLLAPSE: this.player.epitaph = "riding\na falling building all the way down."; break;
		case MapBuilder.TYPES.BOMB: this.player.epitaph = "dodging\n a bomb only to miss the next roof."; break;
		case MapBuilder.TYPES.CRANE: this.player.epitaph = "\nfalling off a crane."; break;
		case MapBuilder.TYPES.BILLBOARD: this.player.epitaph = "\nstumbling off the edge of a billboard."; break;
		case MapBuilder.TYPES.LEG: this.player.epitaph = "jumping\nclear over...something."; break;
		default: this.player.epitaph = "\nfalling to your death."
	}
};

function Main() {
	let dim = { ...GAME },
		canvas = window.find("canvas").attr(dim);

	this.stage = new PIXI.Stage(0xb0b0bf);
	this.renderer = PIXI.autoDetectRenderer(GAME.width, GAME.height, canvas[0]);
	this.width = dim.width;
	this.height = dim.height;
	this.loadSounds();
}


var Util = {
	format: function(n, t) {
		return n.replace("{0}", t)
	},
	random: function(n, t) {
		return t = t || 0, Math.floor(Math.random() * (n - t + 1)) + t
	},
	percentChance: function(n) {
		return Util.random(100) < n
	},
	randomSign: function() {
		return Math.random() < .5 ? 1 : -1
	}
},
game_over;


Main.prototype.loadSounds = function() {
	GameGlobal.SoundPlayer.onComplete = this.soundsLoaded.bind(this);
	GameGlobal.SoundPlayer.load();
};

Main.prototype.loadSpriteSheet = function() {
	PIXI.scaleModes.DEFAULT = PIXI.scaleModes.NEAREST;

	var t = [
			"~/data/canabaltpnotrim0.json",
			"~/data/canabaltpnotrim1.json",
			"~/data/canabaltBack.json"
		],
		n = new PIXI.AssetLoader(t);
	n.onComplete = this.spriteSheetLoaded.bind(this);
	n.load();
};

Main.prototype.soundsLoaded = function() {
	this.loadSpriteSheet()
};

Main.prototype.spriteSheetLoaded = function() {
	APP.dispatch({ type: "game-loaded" });
};

Main.prototype.startGame = function() {
	GameGlobal.PoolKeeper.createPools();
	this.scroller = new PlayState(this.stage, this.width, this.height);
	requestAnimationFrame(this.update.bind(this));
};

Main.prototype.update = function(n) {
	if (this._paused) return;
	GameGlobal.TimeKeeper.update(n);
	GameGlobal.ScreenQuake.update();
	this.scroller.update();
	this.renderer.resize(GAME.width, GAME.height);
	this.renderer.render(this.stage);
	// kd.tick();
	requestAnimationFrame(this.update.bind(this));
};

Main.prototype.restart = function() {
	APP.content.removeClass("game-over");
	game_over = !1;
	for (var n = main.stage.children.length - 1; n >= 0; n--) {
		main.stage.removeChild(main.stage.children[n]);
	}
	GameGlobal.PoolKeeper.createPools();
	this.scroller = new PlayState(this.stage, this.width, this.height);
};

