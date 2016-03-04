/**
*Ball class
*/
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
var score=0;
$('#winner').hide();
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

	paddle.drawPaddle();//must be called in draw
	paddle.movePaddle();//must be called in draw	
	this.drawBall();	
	s.drawScore();
	bricks.collisionDetection();
	x+=dx;
	y+=dy;
	this.x=x;
	this.y=y;
	this.checkWalls(this.x,this.y);
}

//refresh frame every 10milliseconds to see location of ball
Ball.prototype.refresh=function(){
	
	setInterval(this.draw.bind(this),15);

}



Ball.prototype.checkWalls=function(x,y){
	//reverse direction if ball hits left or right
	if(x+dx>canvas.width-ballRadius || x+dx<ballRadius){
		dx=-dx;
	}

	//if ball hits top then reverse, if ball hits bottom then show modal message
	if(y + dy <ballRadius){
		dy=-dy;

	//if ball hits paddle, then reverse			
	}else if(y+dy>canvas.height-ballRadius){

		if(x>paddleX && x <paddleX + paddleWidth){
			dy=-dy;
		}else{
			$('#myModal').modal("show");
			$('#closeModal').onclick=function(){

				document.location.reload();
				$('#myModal').modal('hide');
			}			
		}
	}
	
}
	
	



/**
*Paddle class
*/

//initialize Paddle variables
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;

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

/**
*
*/
Paddle.prototype.mouseMoveHandler=function(e){
	var relativeX=e.clientX - canvas.offsetLeft;
	if(relativeX > 0 && relativeX < canvas.width){
		paddleX=relativeX-paddleWidth/2;
	}
}

Paddle.prototype.movePaddle=function(){
	if(rightPressed && paddleX < canvas.width-paddleWidth){
		paddleX+=7;
	}else if(leftPressed && paddleX>0){
		paddleX-=7;
	}
	x=x+dx;
	y=y+dy;
}


/**
*Brick class
*/

//Brink variables
var brickRowCount=3;
var brickColumnCount=5;
var brickWidth=75;
var brickHeight=20;
var brickPadding = 10;
var brickOffsetTop=30;
var brickOffsetLeft=30;
var bricks = [];

function Bricks(){
	
}

//generates bricks in a two-dimensional array
Bricks.prototype.generateBricks=function(){
	for(col=0;col<brickColumnCount;col++){
		bricks[col]=[];
		for(row=0;row<brickRowCount;row++){
			bricks[col][row]={x:0,y:0,status:1};

		}
	}
}

//draws bricks to canvas
Bricks.prototype.drawBricks=function(){	
	//this.collisionDetection();
	for(col=0;col<brickColumnCount;col++){
		for(row=0;row<brickRowCount;row++){
			//checks if bricks status is 1. If 1, draw brick. If 0, remove brick.
			if(bricks[col][row].status==1){
				var brickX = (col*(brickWidth+brickPadding))+brickOffsetLeft;
				var brickY = (row*(brickHeight+brickPadding))+brickOffsetTop;
				bricks[col][row].x=brickX;
				bricks[col][row].y=brickY;
				ctx.beginPath();
				ctx.rect(brickX,brickY,brickWidth,brickHeight);
				ctx.fillStyle="#0095DD";
				ctx.fill();
				ctx.closePath();
			}			

		}
	}
}

/**
*Check if ball hits a brick
*
*x-position of the ball is > x-position of brick
*x-position of the ball is <x-position of brick+width
*y-position of the ball is > y-position of the brick
*y-position of ball is < y-positoin of the brick plus its height
*/
Bricks.prototype.collisionDetection=function(){
	bricks.drawBricks();
	var countB= 0;
	for(c=0;c<brickColumnCount;c++){
		for(r=0;r<brickRowCount;r++){
			var b = bricks[c][r];			
			if(b.status==1){
				if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight){
					console.log("I've been hit");
					dy=-dy;
					b.status=0;
					score++;//add points each time block is hit

					//check if winner
					if(score==brickRowCount*brickColumnCount){
						$('#winner').show();
						//document.location.reload();
					}
					
				}
			}
		}
	}
}



/**
*Score class
*/


function Score(){

}
Score.prototype.drawScore=function(){
	ctx.font="16px Arial";
	ctx.fillStyle="#0095DD";
	ctx.fillText("Score: "+ score,8,20);
}


//instantiate functions (classes)
var ball = new Ball();
var paddle = new Paddle();//called in draw method
var bricks = new Bricks();//called in draw method
var s = new Score();
//call methods
function initialize(){
	bricks.generateBricks();
	

	
	document.addEventListener("keydown", paddle.keyDownHandler, false);
	document.addEventListener("keyup", paddle.keyUpHandler, false);
	document.addEventListener("mousemove",paddle.mouseMoveHandler,false);
	s.drawScore();
	ball.refresh();

	bricks.drawBricks();


	
}
initialize();
