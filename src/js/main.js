
@import "modules/pixi.js"
@import "modules/howler.js"
@import "modules/kd.js"
@import "modules/all.js"


let GAME = {
		width: window.innerWidth,
		height: window.innerHeight,
	};


const canabalt = {
	init() {
		// fast references
		this.content = window.find("content");
		// set width + height of canvas
		window.find("canvas").attr(GAME);

		// mute audio
		window.Howler.mute(true);
	},
	dispatch(event) {
		let Self = canabalt,
			el;
		switch (event.type) {
			// system events
			case "window.open":
				break;
			case "window.keystroke":

				switch (event.char) {
					case "space":
						if (main.scroller) {
							main.scroller.player.jumpPressed();
						}
						break;
					case "m":
						// toggle music
						if (window.Howler._muted) window.Howler.unmute();
						else window.Howler.mute(true);
						break;
					case "p":
						// toggle pause
						main._paused = !main._paused;
						if (!main._paused) requestAnimationFrame(main.update.bind(main));
						break;
				}

				break;
			case "open-help":
				defiant.shell("fs -u '~/help/index.md'");
				break;
			// custom events
			case "game-loaded":
				Self.content.removeClass("loading")
					// .addClass("paused");
					.addClass("start-page");

				setTimeout(() => Self.dispatch({ type: "start-game" }), 300);
				setTimeout(() => {
					// main.scroller.player.position.y = 500;
					console.log( main.update );
				}, 500);
				break;
			case "start-game":
				Self.content.removeClass("start-page").addClass("playing");

				setTimeout(() => main.startGame(), 100);
				break;
		}
	}
};

let main = new Main;
let APP = canabalt;


window.exports = canabalt;
