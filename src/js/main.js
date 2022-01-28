
const canabalt = {
	init() {
		// fast references
		this.content = window.find("content");
		this.cvs = window.find("canvas");
		this.ctx = this.cvs[0].getContext("2d");
	},
	dispatch(event) {
		switch (event.type) {
			case "window.open":
				break;
			case "open-help":
				defiant.shell("fs -u '~/help/index.md'");
				break;
		}
	}
};

window.exports = canabalt;
