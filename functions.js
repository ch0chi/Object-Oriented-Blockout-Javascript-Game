/**
*Ball class
*/
var canvas = document.getElementById("myCanvas");
var ctx=canvas.getContext("2d");
var x=canvas.width/2;//x ball position
var y = canvas.height-30;
var dx=2;//shift on x-axis
var dy=-2;//shift on y-axis
var ballRadius = 10;
var rightPressed = false;
var leftPressed=false;

function Ball(){

}
Ball.prototype.drawBall=function(){
	ctx.beginPath();
	ctx.arc(x,y,ballRadius,0,Math.PI*2);
	fillStyle="#0095DD";
	ctx.fill();
	ctx.closePath();
}
Ball.prototype.checkWalls=function(){
	var hitLeftSide = x+dx>canvas.width-ballRadius;
	var hitRightSide = x+dx<ballRadius;
	var hitTop = y+dy<ballRadius;
	var hitPaddle = y+dy>canvas.height-ballRadius;
	var hitBottom = x>paddleX && x <paddleX + paddleWidth;

	if(hitLeftSide||hitRightSide){
		dx=-dx;
	}	
	if(hitTop){
		dy=-dy;	

	}else if(hitPaddle){
		if(hitBottom){
			dy=-dy;

		}else{
			lives--;
			if(!lives){
				dx=0;
				dy=0;
				$('#myModal').modal("show");
				$('#closeModal').onclick=function(){				
					$('#myModal').modal('hide');
				}
				//do some function here
			}else{				
				x=canvas.width/2;
				y=canvas.height-30;
				dx=2;
				dy=-2;
				paddleX=(canvas.width-paddleWidth)/2;
				
			}			
		}
	}	
}

/**
*Paddle class
*/
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
Paddle.prototype.mouseMoveHandler=function(e){
	var relativeX=e.clientX - canvas.offsetLeft;
	//check if paddle has moved out of view. If it has, change the relative position
	//of the paddle to half of the paddle width
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
Bricks.prototype.generateBricks=function(){
	for(col=0;col<brickColumnCount;col++){
		bricks[col]=[];
		for(row=0;row<brickRowCount;row++){
			bricks[col][row]={x:0,y:0,hitStatus:1};

		}
	}
}
Bricks.prototype.drawBricks=function(){
	for(col=0;col<brickColumnCount;col++){
		for(row=0;row<brickRowCount;row++){
			if(bricks[col][row].hitStatus==1){
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
Bricks.prototype.collisionDetection=function(){
	bricks.drawBricks();
	var countB= 0;
	for(col=0;col<brickColumnCount;col++){
		for(row=0;row<brickRowCount;row++){
			var brick = bricks[col][row];			
			if(brick.hitStatus==1){
				if(x > brick.x && x < brick.x+brickWidth && y > brick.y && y < brick.y+brickHeight){
					dy=-dy;
					brick.hitStatus=0;
					score++;				
					if(player.isWinner()){
						$('#winner').show();
						dx=0;
						dy=0;
					}
					
				}
			}
		}
	}
}

/**
*Player class
*/
var score = 0;
var lives = 3;
function Player(){

}
Player.prototype.drawScore=function(){
	ctx.font="16px Arial";
	ctx.fillStyle="#0095DD";
	ctx.fillText("Score: "+ score,8,20);
}
Player.prototype.drawLives=function(){
	ctx.font="16px Arial";
	ctx.fillStyle="#0095DD";
	ctx.fillText("Lives: "+lives,canvas.width-65,20);
}
Player.prototype.isWinner=function(){
	if(score==brickRowCount*brickColumnCount){
		return true;
	}
	return false;
}


var ball = new Ball();
var paddle = new Paddle();
var bricks = new Bricks();
var player = new Player();

function draw(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	paddle.drawPaddle();//must be called in draw
	paddle.movePaddle();//must be called in draw	
	ball.drawBall();	
	player.drawScore();
	player.drawLives();
	bricks.collisionDetection();
	x+=dx;
	y+=dy;
	ball.checkWalls();
	requestAnimationFrame(draw);
}

function initialize(){
	$('#winner').hide();
	document.addEventListener("keydown", paddle.keyDownHandler, false);
	document.addEventListener("keyup", paddle.keyUpHandler, false);
	document.addEventListener("mousemove",paddle.mouseMoveHandler,false);
	bricks.generateBricks();	
	draw();
}

initialize();
