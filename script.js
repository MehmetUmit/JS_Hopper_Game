const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
document.getElementById("count").value = 0 ;
const pipeSpace = 100;
const height = 500;
const width = 750;
var frame = 0;
var pipes=[];
var playerX = 100;
var playerY = 220;
var gravity = 0 ;
var velocity = 0;
var Update ; //For clear an interval from another function.
var PlayerEvent ; //For clear an interval from another function.
var count = 0;
var gameStop = false;
gameLoop();
//Player key press 
document.onkeypress = function(e){
    if(e.key == "c"){
        gravity = 0;
        velocity = 10;
    }
}
//Player movement
function playerEvent(){
    if(gravity>velocity){velocity = -gravity}else{ velocity -= gravity;}
    playerY -= velocity;
    if(playerY >= 485){playerY = 485;}else if(playerY <= 15){playerY = 15;}
    gravity +=0.3;
    if(gravity >= 20){gravity = 20}
    
    
}
//Draw player
function playerDraw() {
    ctx.fillStyle = "gold";
    ctx.beginPath();
    ctx.arc(playerX,playerY, 15, 0, 2 * Math.PI); //x,y,r,startangle,endangle
    ctx.fill(); 
}
//Draw pipe
function Pipe() {
    this.x = 750;
    this.firstPipe =  Math.random() * 400 ;
    this.secondPipe = this.firstPipe + pipeSpace;
    this.draw = function(){
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x,0,30,this.firstPipe);
        ctx.fillRect(this.x,this.secondPipe,30,500-(this.secondPipe));
    }
    
}
//Update
function update(){ 
    ctx.clearRect(0,0,750,500);
    //Pipe movement
    for(var i=0;i<pipes.length;i++){
        pipes[i].draw();
        pipes[i].x -=2;
        if(pipes[i].x + 30  <= 0){
            pipes.splice(i,1);
        }
        playerDraw();
        //Count
        if(pipes[i].x == playerX){
            count +=1;
            document.getElementById("count").value = count;
        
        }
        //Collusion detection
        if(playerX +15 >=pipes[i].x   && playerX + 15 <=pipes[i].x + 30 || playerX +15 >=pipes[i].x   && playerX - 15 <=pipes[i].x + 30 ){
            if(playerY -15 <= pipes[i].firstPipe || playerY +15 >= pipes[i].secondPipe){
                clearInterval(Update);
                clearInterval(PlayerEvent);
                gameStop = true;
                document.getElementById("gameBox").style.display = 'unset';
                if(parseInt(document.querySelector(".highScoreCount").innerHTML) < count){
                    document.querySelector(".highScoreCount").innerHTML = count;
                }
                document.getElementById("gameBox").style.display = 'unset';
                document.onkeydown = function start(e){
                    if(gameStop == false){return;}
                    if(e.key == "c"){
                        gameStart();
                        document.getElementById("gameBox").style.display = 'none';
                        
                        
                    }
                    return;
                }
                    
            }
        }
    }
    //Spawn pipe
    if(frame %100 == 0){pipes.push(new Pipe());}
    frame +=1;
   
    
}
//Loop
function gameLoop(){
    Update = setInterval(update,12);
    PlayerEvent = setInterval(playerEvent,15);

}
function gameStart(){
    gameStop = false;
    frame = 0;
    count = 0;
    document.getElementById("count").value = count;
    gravity = 0 ;
    velocity = 0;
    playerX = 100;
    playerY = 220;
    pipes=[];
    gameLoop();
}







