//initialize Ball variables
var canvas = document.getElementById("myCanvas");
var ctx=canvas.getContext("2d");
var x=canvas.width/2;//x ball position
var y = canvas.height-30;//y ball position
var dx=2;//shift on x-axis
var dy=-2;//shift on y-axis
var ballRadius = 10;
var rightPressed = false;
var leftPressed=false;



/**
*Ball class
*/
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
Ball.prototype.drawPaddle=function(){

}
//dynamically draw balls position
Ball.prototype.draw=function(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	this.drawBall();
	paddle.drawPaddle();
	paddle.movePaddle();
	x+=dx;
	y+=dy;
	this.x=x;
	this.y=y;
	this.checkWalls(this.x,this.y);
}

//refresh frame every 10milliseconds to see location of ball
Ball.prototype.refresh=function(){
	setInterval(this.draw.bind(this),8);
}



Ball.prototype.checkWalls=function(x,y){
	//reverse direction if ball hits top or bottom
	
	if(x+dx>canvas.width-ballRadius || x+dx<ballRadius){
		dx=-dx;
	}

	if(y + dy <ballRadius){
		dy=-dy;		
	}else if(y+dy>canvas.height-ballRadius){
		if(x>paddleX && x <paddleX + paddleWidth){
			dy=-dy;
		}else{
			//alert("Game Over");
			$('#myModal').modal("show");
			$('#closeModal').onclick=function(){

				document.location.reload();
				$('#myModal').modal('hide');
			}
			
		}
	}
		


		
	}
	//reverse direction if ball hits left or right
	





//initialize Paddle variables
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;

/**
*Paddle class
*/
function Paddle(){

}

Paddle.prototype.drawPaddle=function(){
	ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

Paddle.prototype.keyDownHandler=function(e){
	if(e.keyCode==39){
		rightPressed=true;
	}else if(e.keyCode==37){
		leftPressed=true;
	}
}

Paddle.prototype.keyUpHandler=function(e){
	if(e.keyCode==39){
		rightPressed=false;
	}else if(e.keyCode==37){
		leftPressed=false;
	}
}

Paddle.prototype.movePaddle=function(){
	if(rightPressed && paddleX < canvas.width-paddleWidth){
		paddleX+=7;
	}else if(leftPressed && paddleX>0){
		paddleX-=7;
	}
}


//instantiate functions (classes)
var ball = new Ball();
var paddle = new Paddle();//called in draw method

//call methods
function initialize(){
	document.addEventListener("keydown", paddle.keyDownHandler, false);
	document.addEventListener("keyup", paddle.keyUpHandler, false);	
	ball.refresh();
}
initialize();
