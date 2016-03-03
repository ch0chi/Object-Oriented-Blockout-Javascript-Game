//initialize variables


var canvas = document.getElementById("myCanvas");
var ctx=canvas.getContext("2d");
var x=canvas.width/2;//x ball position
var y = canvas.height-30;//y ball posi
var dx=2;
var dy=-2;
var ballRadius = 10;
function Ball(){

	
}
//draws gameball
Ball.prototype.drawBall=function(){
	ctx.beginPath();
	ctx.arc(x,y,ballRadius,0,Math.PI*2);
	//this.checkWalls();
	fillStyle="#0095DD";
	ctx.fill();
	ctx.closePath();
}
//dynamically draw balls position
Ball.prototype.draw=function(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	this.drawBall();
	x+=dx;
	y+=dy;
	this.x=x;
	this.y=y;
	this.checkWalls(this.x,this.y);
}
Ball.prototype.refresh=function(){
	setInterval(this.draw.bind(this),8);
}
//refresh frame every 10milliseconds to see location of ball
//setInterval(draw,8);

Ball.prototype.checkWalls=function(x,y){
	//reverse direction if ball hits top or bottom
	console.log(dy);
	if(y+dy> canvas.height-ballRadius || y + dy <ballRadius){
		dy=-dy;
		console.log(dy);
		
	}
	//reverse direction if ball hits left or right
	if(x+dx>canvas.width-ballRadius || x+dx<ballRadius){
		dx=-dx;
	}	
}

//instantiate objects
var ball = new Ball();
ball.refresh();
//define paddle
