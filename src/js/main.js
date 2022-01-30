
let GAME = {
		width: window.innerWidth,
		height: window.innerHeight,
	};

let data = {
		audio: @import "../../public/data/audiohowler.json",
	};


@import "modules/pixi.js"
@import "modules/howler.js"
@import "modules/all.js"


let main = new Main;


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
		switch (event.type) {
			case "window.open":
				break;
			case "window.keystroke":
				main.scroller.player.jumpPressed();
				break;
			case "open-help":
				defiant.shell("fs -u '~/help/index.md'");
				break;
		}
	}
};

window.exports = canabalt;
