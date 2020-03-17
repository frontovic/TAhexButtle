var it;
var ctx;
var point = {};
var clickPoint = {};
var mousedownPoint = {};
var plane;
var hram;
var man;
var shift = {dx:0, dy:0};
var isDragging = false;
const _360 = 2 * Math.PI;
var warmillEffect = {ticks: 0};
loadResources(); 

function loadResources() {
    plane = new Image();
    plane.src = "images/plane.png";
    hram = new Image();
    hram.src = "images/hram.png";
    man = new Image();
    man.src = "images/man.png";
    warmillSprite = new Image();
    warmillSprite.src = "images/warmillSprite.png";
    karusel = new Image();
    karusel.src = "images/karusel.png";
    
    
}
window.requestAnimFrame = (function(){ 
    return  window.requestAnimationFrame       || 
            window.webkitRequestAnimationFrame || 
            window.mozRequestAnimationFrame    || 
            window.oRequestAnimationFrame      || 
            window.msRequestAnimationFrame     || 
            function( callback ){ 
              window.setTimeout(callback, 1000 / 60); 
            }; 
  })();

  $(document).ready(function(){
    Init();
    var canvas = document.getElementById('canvas'); 
    ctx = canvas.getContext('2d'); 
    ctx.fillStyle = 'red';  
    canvas.onmousemove = function(evt) {
        point.x = evt.pageX - canvas.offsetLeft;
        point.y = evt.pageY - canvas.offsetTop;

        if(isDragging){
            shift.dx = mousedownPoint.x - evt.pageX;
            shift.dy = mousedownPoint.y - evt.pageY;
            console.log(shift); 
        }
        
        //console.log(shift);  
       // checkCollision();
   }
    canvas.onmousedown = function(evt) {
        console.log('onmousedown');
        mousedownPoint.x = evt.pageX;
        mousedownPoint.y = evt.pageY;
        isDragging = true;
       // console.log(mousedownPoint);       
    }
    canvas.onmouseup = function(evt) {        
        isDragging = false;
        console.log('onmouseup');       
    }

   canvas.onclick = function(evt) {
    clickPoint.x = evt.pageX- canvas.offsetLeft;
    clickPoint.y = evt.pageY- canvas.offsetTop;
   // objClick.radius = 0;
   // objClick.isActive = true;     
    }

   window.requestAnimFrame(drowPlane);
});
function Init()
{
   // console.log('init');
   // shift.dx = 0;
   // shift.dy = 0;
}
function drowPlane()
{
    window.requestAnimFrame(drowPlane);    
       // ctx.fillStyle = 'red';
      // console.log(shift);  
       let dx = shift.dx;
       let dy = shift.dy;
       ctx.clearRect(0, 0, 1400, 800);
        ctx.drawImage(plane,0-dx,0-dy, 1400, 800);
        //ctx.drawImage(grid,0,0);
       // drawGrid();
        drawUnits();
       // drawHpEffect();
       // drawInfo();
       // ctx.fillRect(point.x,point.y,10,10); 
       //попытка нарисовать круги клика если такой был. 
       // drawClick();
}
function drawUnits()
{  
    let dx = shift.dx;
    let dy = shift.dy;
    let kadr = Math.floor(warmillEffect.ticks/5) % 9;
   if(kadr < 8)
   {         
    warmillEffect.ticks ++;
   }
   else
   {
    warmillEffect.ticks = 1;   
    kadr = 0;
   }

  // let sx = 429*kadr;
  let sx = 800*kadr;
   ctx.drawImage(man,sx,0, 800, 800, 50-dx, 100-dy, 300, 300);
  // ctx.drawImage(warmillSprite,sx,0, 429, 429, 420-dx, 170-dy, 200, 200);
  // ctx.drawImage(warmillSprite,sx,0, 429, 429, 470-dx, 200-dy, 200, 200);
   //ctx.drawImage(warmillSprite,sx,0, 429, 429, 520-dx, 250-dy, 200, 200); karusel

   ctx.drawImage(hram,0,0, 700, 450, 300-dx, 300-dy, 280, 200);
   ctx.drawImage(karusel,0,0, 460, 460, 220-dx, 220-dy, 200, 200);

}