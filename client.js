
const canvas = document.querySelector('canvas'),
	ctx = canvas.getContext("2d"),
	socket = io();

window.onresize = () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}
window.onresize();

let keys = {
  'ArrowRight': false,
  'ArrowUp': false,
  'ArrowDown': false,
  'ArrowLeft': false
};

onkeydown = onkeyup = function(e) {
	e.preventDefault();
	keys[e.key] = e.type == "keydown";
	
	var { ArrowRight, ArrowLeft, ArrowDown, ArrowUp } = keys;
	keys = { ArrowRight: ArrowRight, ArrowLeft: ArrowLeft, ArrowDown: ArrowDown, ArrowUp: ArrowUp };

	socket.emit('keychange', keys);
}

socket.on('frame', frame => {
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "black"
	for (let pos of frame) {
		ctx.fillRect(pos[0], pos[1], 15, 15)
	}
})