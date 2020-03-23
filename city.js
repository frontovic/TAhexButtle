var it;
var ctx;
var point = {};
var clickPoint = {};
var mousedownPoint = {};
var plane;
var hram;
var frank;
var arka;
var kanava;
var starscount;
var arctik;
var squarePlane;
var arrAllBuildings = []; // допилить завтра
var shift = {dx:0, dy:0, oldX:0, oldY:0};
var isDragging = false;
const _360 = 2 * Math.PI;
var warmillEffect = {ticks: 0};
loadResources(); 

function loadResources() {
    plane = new Image();
    plane.src = "images/plane.png";
    hram = new Image();
    hram.src = "images/hram.png";
    squarePlane = new Image();
    squarePlane.src = "images/squarePlane.png";
    warmillSprite = new Image();
    warmillSprite.src = "images/warmillSprite.png";
    karusel = new Image();
    karusel.src = "images/karuselSprite.png";
    frank = new Image();
    frank.src = "images/frank.png";
    arka = new Image();
    arka.src = "images/arka.png";
    starscount = new Image();
    starscount.src = "images/starscount.png";
    kanava = new Image();
    kanava.src = "images/kanava.png";
    arctik = new Image();
    arctik.src = "images/arctik.png";
    
    
    
    
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
           
            shift.dx = shift.oldX + (mousedownPoint.x - evt.pageX);
            shift.dy = shift.oldY + (mousedownPoint.y - evt.pageY);
           // console.log(shift); 
        }
        
        //console.log(shift);  
       // checkCollision();
   }
    canvas.onmousedown = function(evt) {
        console.log('onmousedown');
       // shift.oldX = shift.dx;
       // shift.oldY = shift.dy;
        mousedownPoint.x = evt.pageX;
        mousedownPoint.y = evt.pageY;
        //console.log(mousedownPoint); 
        isDragging = true;
       // console.log(mousedownPoint);       
    }
    canvas.onmouseup = function(evt) {
       // shift.oldX = shift.oldX + shift.dx;
       // shift.oldY = shift.oldY + shift.dy;
       shift.oldX = shift.dx;
       shift.oldY = shift.dy;
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
    arrAllBuildings.push({x:5, y:24, mX:6, mY:6, pic: hram});
    arrAllBuildings.push({x:11, y:24, mX:5, mY:7, pic: arka});
    arrAllBuildings.push({x:9, y:9, mX:7, mY:7, pic: arctik});
    
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
      // ctx.strokeStyle = 'red';
       ctx.strokeStyle = "blue";
       ctx.strokeRect(0, 0, 1400, 800);      
        //ctx.drawImage(grid,0,0);
        drawGrid();
        drawUnits();
       // drawHpEffect();
       // drawInfo();
       // ctx.fillRect(point.x,point.y,10,10); 
       //попытка нарисовать круги клика если такой был. 
       // drawClick();
}
function drawGrid()
{ 
    let dx = shift.dx;
    let dy = shift.dy;
   // ctx.drawImage(squarePlane,0,0, 800, 400, 700-(530/4)-dx, 0-dy, 530/2, 265/2);
  //  ctx.drawImage(squarePlane,0,0, 800, 400, 700-(530/2)-dx, 265/4-dy, 530/2, 265/2);
   // ctx.drawImage(squarePlane,0,0, 800, 400, 700-(530/4)-dx, 265/2-dy, 530/2, 265/2);
   // ctx.drawImage(squarePlane,0,0, 800, 400, 700-dx, 265/4-dy, 530/2, 265/2);
for (let startindex = 0; startindex < 5; startindex++) {
   
    let stX = 700-(530/4) - (530/4)*startindex;
    let stY = (265/4)*startindex;

    for (let index = 0; index < 5; index++) {

        ctx.drawImage(squarePlane,0,0, 800, 400, stX+(index*(530/4))-dx, stY+(index*(265/4))-dy, 530/2, 265/2);        
    }
}
   // ctx.drawImage(squarePlane,0,0, 800, 400, 100-dx, 200-dy, 530, 265);
//     let stX = 100;
//     let stY = 100;
//     let s = 2;
//     let w = 40;
//     let h = 20;   
//     ctx.beginPath();
//    // ctx.strokeStyle = 'blue';
//     ctx.fillStyle = 'grey';
//     ctx.lineWidth = "1";
//    // ctx.translate(0.5,0.5);
//     ctx.moveTo(stX, stY);
//     ctx.lineTo(stX+160, stY+30 );
//     ctx.lineTo(stX+60, stY+130 );
//     ctx.closePath();
//     ctx.stroke();
   // ctx.translate(-0.5,-0.5);
    //ctx.lineTo(stX+60, stY+130 );
   // ctx.closePath();
   // ctx.fill();

}
function drawUnits()
{  
    let dx = shift.dx;
    let dy = shift.dy;
    let kadr = Math.floor(warmillEffect.ticks/10) % 8;
   if(kadr < 7)
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
  
  // ctx.drawImage(warmillSprite,sx,0, 429, 429, 420-dx, 170-dy, 200, 200);
  // ctx.drawImage(warmillSprite,sx,0, 429, 429, 470-dx, 200-dy, 200, 200);
   //ctx.drawImage(warmillSprite,sx,0, 429, 429, 520-dx, 250-dy, 200, 200); karusel

  // ctx.drawImage(karusel,sx,0, 800, 800, 100-dx, 80-dy, 400, 400);
  // ctx.drawImage(hram,0,0, 800, 514, 206-dx, 293-dy, 480, 308);
 // ctx.drawImage(arrAllBuildings[0].pic, 100/2-dx, 458/2-dy, hram.width/2, hram.height/2);
 let x = (700+((106/4)*(arrAllBuildings[0].x - arrAllBuildings[0].y)));
 x = x - ((arrAllBuildings[0].pic.width/6)/4)*arrAllBuildings[0].mX;
 let y = 53/2 + ((53/4)*(arrAllBuildings[0].x + arrAllBuildings[0].y));
 y = y - arrAllBuildings[0].pic.height/2-7;
 ctx.drawImage(arrAllBuildings[0].pic, x-dx, y-dy, hram.width/2, hram.height/2);
  
   x = (700+((106/4)*(arrAllBuildings[1].x - arrAllBuildings[1].y)));
  x = x - ((arrAllBuildings[1].pic.width/6)/4)*arrAllBuildings[1].mX;
   y = 53/2 + ((53/4)*(arrAllBuildings[1].x + arrAllBuildings[1].y));
  y = y - arrAllBuildings[1].pic.height/2;
  ctx.drawImage(arrAllBuildings[1].pic, x-dx, y-dy, arka.width/2, arka.height/2);


  x = (700+((106/4)*(arrAllBuildings[2].x - arrAllBuildings[2].y)));
  x = x - ((arrAllBuildings[2].pic.width/7)/4)*arrAllBuildings[2].mX;
   y = 53/2 + ((53/4)*(arrAllBuildings[2].x + arrAllBuildings[2].y));
  y = y - arrAllBuildings[2].pic.height/2-2;
  ctx.drawImage(arrAllBuildings[2].pic, x-dx, y-dy, arctik.width/2, arctik.height/2);


  //ctx.drawImage(starscount, 516/2-dx, 666/2-dy, starscount.width/2, starscount.height/2);
  ctx.drawImage(kanava, 1139/2-dx, 817/2-dy, kanava.width/2, kanava.height/2);
  ctx.drawImage(frank, 1618/2-dx, 506/2-dy, frank.width/2, frank.height/2);

}