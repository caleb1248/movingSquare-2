const express = require('express'),
	app = express(),
	server = app.listen(3000),
	io = require('socket.io')(server);

app.use(express.static("."));

let users = []
io.on('connection', socket => {
	console.log('connection');
	var player = new Player();
	users.push(player);
	socket.on('keychange', newKeys => {
		player.keys = newKeys;
	});
	
	socket.on('disconnect', () => {
		users = arrayRemove(player);
	});
});

class Player{
	constructor(){
		this.x = 0
		this.y = 0
		this.bullets = [];
		this.keys = null;
		this.speed = 2;
	}
	update(){
		if(this.keys){
			var { ArrowRight, ArrowLeft, ArrowUp, ArrowDown } = this.keys;
	    if (ArrowRight && ArrowLeft) {
	
	    } else if (ArrowUp && ArrowDown) {
	
	    } else {
	      if (ArrowUp) this.y -= 2;
	      if (ArrowRight) this.x += this.speed;
	      if (ArrowDown) this.y += this.speed;
	      if (ArrowLeft) this.x -= this.speed;
	    }
	    for(var bullet of this.bullets){
	      bullet.update();
	    }
		}
	}
	toArray(){
		return [
			this.x,
			this.y,
			// will later add bullets
		]
	}
}

class Bullet{
	
}

setInterval(() => {
	let u = [];
	for (let user of users) {
		user.update();
		u.push(user.toArray());
	}
	io.emit('frame', u);
}, 1000/60)
function arrayRemove(value) { 
    
  return users.filter(function(ele){ 
    return ele != value; 
  });
}