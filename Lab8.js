var IsWinValue = 0;
var level = 1;
var map_size = 8;
var points_all = 0;
var score = 0;
var can = document.getElementById("myCanvas");
var size_x = 800;
var size_y = 800;
var len = 8;
var oldlen = len;

var damage = 1;
var score_multiplier = 1;
var context = can.getContext("2d");
var isCharged = 0;
var IsCrazy = 0;
var IsBlind = 0;
var IsPadSpeedincrased=0;
var IsPadSprint=0;
var CrazyRandom_x = 1;
var CrazyRandom_y = 1;

var rect_y_start = size_y-35;
var rect_y = rect_y_start;
var rect_x_e = 120;
var oldrect_x_e = rect_x_e;
var rect_y_e = 15;
var rect_x = size_x/2-rect_x_e/2;

var x = size_x/2;
var y = rect_y - (len*2);

var Started = 0;
//*speed
var velo_x = 0;
var velo_y = len/1.5; //starting value
var velo_bar = 7;
var velo_bar_jump = 12;
var velo_bar_jump_off = 9;
var is_bar_Jump = 0;
var is_bar_Jump_cooldown = 0;
var jumps=2;
var max_jumps=30;
var oldvelo_bar = velo_bar;

var var_game_loop;
var var_regen_loop;
//game blocks size
var	klocek_x_size = 80;
var klocek_y_size = 25;
var points = 0;
//random
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
//Time

var BG_upgrade_timeout;
var SM_upgrade_timeout;
var CB_upgrade_timeout;
var CB_upgrade_interval;
var PS_upgrade_timeout;
var BLD_upgrade_timeout;
var TIN_upgrade_timeout;
var jump_timeout;
var jump_timeout_cd;
///WAIT
function wait(ms)
{
var d = new Date();
var d2 = null;
do { d2 = new Date(); }
while(d2-d < ms);
}
//*Klocki **/
var klocki_array = [];
const klocek = {
	 kdurability: 5,
	 kpos_x: 0,
	 ksize_x: klocek_x_size,
	 kpos_y: 0,
	 ksize_y: klocek_y_size,
	 isAvailable: 1,
	 Upgrade: 0,
	 UpgradeMe()
   {
	   //GET UPGRADE 1 - Neu 2 - Neg 3 Positive
	   
	   
	   //0,1,2 14,15,16 NOTHING
	   
	   //3
	   if(this.Upgrade == 3){
		   if(rect_x_e >= size_x/2)
		   {
		   GetUpgrade("Score has been increased!",3);
		   score = score + (3*score_multiplier);
		   points_all = points_all + (3*score_multiplier);
		   getLevelPoints();
		   }else{
		   GetUpgrade("Pad size grows!",3);
		   rect_x_e = rect_x_e + 4;
		   rect_x = rect_x - 2;
		   }
		  
	   }
	   
	   //4
	   else if(this.Upgrade == 4){
		   
		   GetUpgrade("Ball speed is increased!",1);
		  
		   if(velo_x > 0){ 
		   velo_x = velo_x + len/2;
		   }else if(velo_x < 0)
		   {
			velo_x = velo_x - len/2;
		   }
		   
		   
		   if(velo_y > 0){ 
		   velo_y = velo_y + len/2;
		   }else if(velo_y < 0)
		   {
			velo_y = velo_y - len/2;
		   }
	   } 
	   //5
	   else if(this.Upgrade == 5){
		   GetUpgrade("The ball is charged!",3);
		   isCharged = isCharged + 3+Math.floor(level/3);
	   } 
	   //6
	   else if(this.Upgrade==6){
		   
		   
		   clearTimeout(BG_upgrade_timeout);
		  
			   
		   GetUpgrade("The ball grows!",3);
		   len=len*1.5;
		   BG_upgrade_timeout = setTimeout(function(){len=oldlen; }, 3500);
	   } 
	   //7
	  else if(this.Upgrade == 7){
		   		   
		   GetUpgrade("Score Multiplier is increased for 8 seconds!",3);
		   score_multiplier=score_multiplier+3;
		   getLevelPoints();
		   SM_upgrade_timeout = setTimeout(function(){score_multiplier=score_multiplier-3; getLevelPoints();}, 8000);
	   } 
	   //8
	  else if(this.Upgrade == 8){
		   clearTimeout(CB_upgrade_timeout);
		   clearInterval(CB_upgrade_interval);
		   GetUpgrade("Ball is crazy!",2);
		   IsCrazy=1;
		   CB_upgrade_timeout = setTimeout(function(){IsCrazy = 0; }, 4000);
           CB_upgrade_interval  = setInterval(function(){GetCrazyValue(); }, 125);
	   } 
	   //9
	   else if(this.Upgrade == 9){
		     clearTimeout(PS_upgrade_timeout);
		   	 GetUpgrade("Pad speed is incrased!",1);
		     velo_bar = velo_bar*1.45;
			 IsPadSpeedincrased=1;
		     PS_upgrade_timeout = setTimeout(function(){velo_bar=oldvelo_bar; IsPadSpeedincrased=0; }, 3500);			 
	   } 
	   //10
	   else if(this.Upgrade == 10){
		   GetUpgrade("Damage has been increased!",3);
		   damage = damage + 1 + Math.floor(level/3);
		   getLevelPoints();
	   } 
	   //11
	   else if(this.Upgrade == 11){
		   GetUpgrade("Score Multiplier has been increased!",3);
		   score_multiplier = score_multiplier + 1 + Math.floor(level/3);
		   getLevelPoints();
	   } 
	   //12
	   else if(this.Upgrade == 12 ){
		    GetUpgrade("You've found some extra points!",3);
		
			points_all = points_all +((1 + Math.floor(level/3))*score_multiplier);
			score = score + ((1 + Math.floor(level/3))*score_multiplier);
			getLevelPoints();
	   } 
	   //13
	   else if(this.Upgrade == 13){
		   GetUpgrade("Something has blinded you!",2);
		   clearTimeout(BLD_upgrade_timeout);
		   IsBlind=1;
		   BLD_upgrade_timeout = setTimeout(function(){IsBlind = 0; }, 1500);
           
	   }
	   	   //14
	   else if(this.Upgrade == 14){
		   GetUpgrade("You've got additional jumping fuel!",3);
		   jumps=jumps+1+Math.floor(level/3);
		   if(jumps > max_jumps) {jumps = max_jumps;}

           
	   }
	   else if(this.Upgrade == 15){
		   GetUpgrade("You've got fuel tank upgrade!",3);
		   max_jumps=max_jumps+3;

           
	   }
	   else if(this.Upgrade == 16){
		   GetUpgrade("Your pad is tiny!",2);
		   clearTimeout(TIN_upgrade_timeout);
 		   rect_x_e=rect_x_e/2;
           TIN_upgrade_timeout = setTimeout(function(){rect_x_e=oldrect_x_e; IsTiny = 0; }, 7500);
           
	   }
	   else if(this.Upgrade == 16){
		   GetUpgrade("Ball speed is decreased!",1);
		  
		   if(velo_x > 0){ 
		   velo_x = velo_x/2;
		   }else if(velo_x < 0)
		   {
			velo_x = velo_x/2;
		   }
		   if(velo_y > 0){ 
		   velo_y = velo_y/2;
		   }else if(velo_y < 0)
		   {
			velo_y = velo_y/2;
		   }
	   } 
	   //reszta
	   else{}
	   
	   
	   
   },
	Colider()
	{
		
		if(this.isAvailable==1)
		{

        if(this.kpos_x < x+len && this.kpos_x+this.ksize_x > x-len && this.kpos_y < y+len && this.kpos_y+this.ksize_y > y-len)
		{
					if(isCharged > 0)
		{
		isCharged = isCharged - 1;
		this.kdurability = 0;	
		}else{
        velo_y = (y-(this.kpos_y+this.ksize_y/2))/(this.ksize_y/5);
		velo_x = (x-(this.kpos_x+this.ksize_x/2))/(this.ksize_x/10);
		}

	    this.kdurability = this.kdurability - damage;
		if(this.kdurability <= 0)
		{	
		this.isAvailable = 0;
		console.log("Block: Destroyed!");
		points = points + 1;
		score = score + (1*score_multiplier);
		points_all = points_all + (1*score_multiplier);
		getLevelPoints();
		this.UpgradeMe();
		}
			
			
		
		}
		}
	},
   Setup()
   {
	   
	   this.isAvailable = 1;
	   this.kdurability = getRandomInt(0,1+level);
	   this.ksize_y = klocek_y_size;
	   this.ksize_x = klocek_x_size;
	   this.kpos_x = 0;
	   this.kpos_y = 0;
	   this.Upgrade = getRandomInt(1,20);
   }
  
   
	};

	
	
	
function Gen_Map()
{
   var cursor = [0,0];
   cursor[0] = getRandomInt(klocek_x_size,klocek_x_size*2);
   cursor[1] = getRandomInt(klocek_y_size,klocek_y_size*2);
   var random = 0;
   var i;
   for (i = 0; i < map_size; i++) { 
   
   

  
  
  klocki_array.push(Object.create(klocek));
  console.log( klocki_array );
  klocki_array[i].Setup();
  klocki_array[i].kpos_x = cursor[0] ;
  klocki_array[i].kpos_y = cursor[1] ;
  console.log(klocki_array[i].kdurability);
  
  
  //przesuwanie kursora
    cursor[0] = cursor[0] + klocek_x_size +1 ;
	//skok 30%
	random = getRandomInt(0,5)
	if(random == 3)
	{
		cursor[0] = cursor[0] + klocek_x_size;
	}
		else if(random == 2)
	{
		cursor[0] = cursor[0] + klocek_x_size*2.5;
	}
	
	//nie mieści się w oknie
  if (cursor[0] >= size_x-(klocek_x_size*2))
  {
	  cursor[0] = getRandomInt(klocek_x_size,klocek_x_size*2);
	  cursor[1] = cursor[1] + klocek_y_size + 1;
	  
	  
	random = getRandomInt(0,5)
	if(random == 3)
	{
		
		cursor[1] = cursor[1] + klocek_y_size*1.5;
	}
	else if(random == 2)
	{
	
		cursor[1] = cursor[1] + klocek_y_size*2.5;
	}
	else if(random == 1)
	{
	
		cursor[1] = cursor[1] + klocek_y_size*4.5;
	}
	 
   //za mało okna na wysokość
   if(cursor[1] >= size_y-(rect_y_e*3))
   {
	   cursor[1] = getRandomInt(klocek_y_size,klocek_y_size*2);
   }
    
  }
  console.log(cursor);
}
	
	
	
}
Gen_Map();




/////

function STARTVALUE()
{



 rect_y_e = 15;
 Started = 0;
 points = 0;


if(IsWinValue == 1)
{
	

if(map_size <= 120)
{
map_size = map_size + 2;
}
if(klocek_x_size >= 35)
{klocek_x_size = klocek_x_size - 3;
}
if(klocek_y_size >= 18){
klocek_y_size = klocek_y_size - 0.6;

}
var i;
for (i = 0; i < map_size; i++) { 
klocki_array.pop();
}

Gen_Map();
IsWinValue = 0;
Started=1;
GAME_LOOP();



}else
{
 rect_y = rect_y_start;
 

 rect_x = size_x/2-rect_x_e/2;
	//reset piłki
 x = size_x/2;
 y = rect_y - (len*2);	
 velo_x = 0;
 velo_y = 0;
 

var i;
for (i = 0; i < map_size; i++) { 
klocki_array[i].kdurability = getRandomInt(0,1+level);
if(klocki_array[i].kdurability>22){klocki_array[i].kdurability=22;}
klocki_array[i].isAvailable = 1;
klocki_array[i].Upgrade = getRandomInt(1,20);
}







	

//upgradable params
  rect_x_e = 120;
  velo_bar = 11;
  damage = 1;
  score_multiplier = 1;	
  jumps=1+Math.floor(level/3);
  max_jumps=max_jumps+1;
   
}
isCharged = 0;
IsCrazy = 0;
IsBlind = 0;
IsPadSpeedincrased=0;
}

function GAME_LOOP()
{
	
	var_game_loop = window.setInterval(render,"26");
	var_regen_loop = window.setInterval(Fuel_Regen,"70");
	getLevelPoints();
    GetInfo("The level number "+level+" begins!");
}
function STOP_LOOP()
{
STARTVALUE();
clearInterval(var_game_loop);
clearInterval(var_regen_loop);
}

function Fuel_Regen()
{
if(is_bar_Jump_cooldown==0 && IsPadSprint ==0)
{
if(jumps < max_jumps)
{jumps = jumps+( max_jumps/10000);
jumps = Math.round(jumps * 1000) / 1000}

getLevelPoints();	
}
}

function velo_anticheat()
{
	if(velo_x > len*2.5) velo_x=len*2.5;
	else if(velo_y > len*2.5) velo_y=-len*2.5;
	else if(velo_x < -len*2.5) velo_x=-len*2.5;
	else if(velo_y < -len*2.5) velo_y=-len*2.5;
	else if(velo_x > -len/2.5 && velo_x < 0) velo_x=-len/2.5;
	else if(velo_y > -len/2.5 && velo_y < 0) velo_y=-len/2.5;
	else if(velo_x < len/2.5 && velo_x > 0) velo_x=len/2.5;
	else if(velo_y < len/2.5 && velo_y > 0) velo_y=len/2.5;
}
function render()
{
velo_anticheat();
if(is_bar_Jump==0)
{
						if(rect_y < rect_y_start)
						{
						rect_y = rect_y+velo_bar_jump_off;
						}
}
if(IsCrazy == 1)
{
x = x+(velo_x*CrazyRandom_x)+0.1;
y = y+(velo_y*CrazyRandom_y)-0.1;

} 
else if(isCharged > 0){
x = x+(velo_x*1.3);
y = y+(velo_y*1.3);
}
else{
x = x+velo_x;
y = y+velo_y;
}
context.clearRect(0,0,size_x,size_y);
//
if(IsBlind == 1){
	context.globalAlpha = 0.4;
}else {
	context.globalAlpha = 1;
}
//gracz R
if(is_bar_Jump==1){ 
context.fillStyle="#FF2233";
}
else if(IsPadSpeedincrased==1)
{
context.fillStyle="#22CCFF";
if(IsPadSprint==1)
{
context.fillStyle="#22EEFF";
}
}
else if(IsPadSprint==1)
{
context.fillStyle="#EE2244";	
}
else{ 
context.fillStyle="#DD2255";
}
context.fillRect(rect_x,rect_y,rect_x_e,rect_y_e);
//klocki G
for(var i=0; i < map_size; i++)
{
	if(klocki_array[i]){
		klocki_array[i].Colider();
		if(klocki_array[i].kdurability >= 13)
		{
         context.fillStyle="#22FF22";
		}else if(klocki_array[i].kdurability <= 13 && klocki_array[i].kdurability > 9)
		{
			context.fillStyle="#33BB33";
		}
		else if(klocki_array[i].kdurability <= 9 && klocki_array[i].kdurability > 7)
		{
			context.fillStyle="#449933";
		}
		else if(klocki_array[i].kdurability <= 7 && klocki_array[i].kdurability > 4)
		{
			context.fillStyle="#446644";
		}
		else if(klocki_array[i].kdurability <= 4 && klocki_array[i].kdurability > 1)
		{
			context.fillStyle="#662233";
		}
		else if(klocki_array[i].kdurability <= 1)
		{
			context.fillStyle="#000000";
		}
	if(klocki_array[i].isAvailable == 1)
	{
    context.fillRect(klocki_array[i].kpos_x,klocki_array[i].kpos_y,klocki_array[i].ksize_x,klocki_array[i].ksize_y);
	}
	}
}
//piłka

if(IsBlind==1)
{
	context.globalAlpha = 0.04;
	context.fillStyle="#EEBBEE"; }
else if(IsCrazy==1)
{
	context.fillStyle="#22FFEE";	
}
else if(isCharged > 0){
	context.fillStyle="#FF3333";}
else{
	context.fillStyle="#22CCFF";	
	}
context.beginPath();
context.arc(x,y,len,0,2*Math.PI);
context.fill();
//



isWin();
FcollisionBlock();
FcollisionBorder();
FcollisionBottom();
}
render();





function getLevelPoints()
{
   document.getElementById('Level').innerHTML = 'Level: '+level;
   document.getElementById('Points').innerHTML = 'Points: '+points;
   document.getElementById('Score').innerHTML = 'Score: '+score;
   document.getElementById('TScore').innerHTML = 'Total Score: '+points_all;
   document.getElementById('Multiplier').innerHTML = 'Score Multiplier x'+score_multiplier;
   document.getElementById('Damage').innerHTML = 'Damage: '+damage;
   document.getElementById('Jumps').innerHTML = 'Fuel: '+Math.round(jumps*100/max_jumps)+"%";
}
function GetInfo(TheInfo)
{
	document.getElementById('info_str').innerHTML = TheInfo;
	document.getElementById("info_str").style.color = "green";
}
function GetUpgrade(TheInfo,type)
{
	//1 NEUTRAL
	//2 NEGATIVE
    //3 POSITIVE
	document.getElementById('info_str').innerHTML = TheInfo;
	if(type==1)
	{
	document.getElementById("info_str").style.color = "purple";
	}else if(type==2)
	{
	document.getElementById("info_str").style.color = "red";
	}
    else if(type==3)
	{
	document.getElementById("info_str").style.color = "green";
	}else {
		document.getElementById("info_str").style.color = "white";
	}
	
}
function GetLost(TheInfo)
{
	document.getElementById('info_str').innerHTML = TheInfo;
	document.getElementById("info_str").style.color = "red";
}
function GetWin(TheInfo)
{
	document.getElementById('info_str').innerHTML = TheInfo;
	document.getElementById("info_str").style.color = "gold";
}

//* Wygrana **//
function isWin()
{
	if(points >= map_size)
	{
		IsWinValue = 1;
		level = level+1;
		//alert("You have won!");
		GetWin("You've won! Your score and bonuses slightly incrased. Press spacebar to continue.");
		STOP_LOOP();
		score_multiplier = score_multiplier + 1 + Math.floor(level/3);
		damage = damage + 1 + Math.floor(level/5);
		jumps = jumps + 1 + Math.floor(level/4);
		if(jumps > max_jumps) {jumps = max_jumps;}
	}
	
}
//* Kolizje **//
function FcollisionBlock()
{
if(x > rect_x-len && x < rect_x+rect_x_e+len && y > rect_y-len && y < rect_y+rect_y_e+len)
{	

velo_y = (y-(rect_y+rect_y_e/2))/(rect_y_e/5);
if(is_bar_Jump==1)
{
	velo_y = velo_y-velo_bar_jump;
	isCharged++;
}
y = rect_y-(len+(len/2));
velo_x = (x-(rect_x+rect_x_e/2))/(rect_x_e/10);
if(IsPadSprint==1)
{
	velo_x = velo_x*1.25;
    
}

}
	
}
function FcollisionBorder()
{


    //prawa
	if(x >= len && !(x > len && x < size_x-len)){
    velo_x = -velo_x-(len/6);
    if(velo_x <= -(len*4)){
	velo_x = -(len*4);
	}	
	if(isCharged>0)
	{
		isCharged--;
		if(isCharged<0) isCharged=0;
	}
	}

    //lewa
	else if(x <= 600-len && !(x > len && x < size_x-len)){
     velo_x = -velo_x+(len/6);
	if(velo_x >= len*4){
	velo_x = len*4;
	}	
		if(isCharged>0)
	{
		isCharged--;
		if(isCharged<0) isCharged=0;
	}
	}
	
	
	//górna

	if(y < 600-len && !(y > len && y < size_y-len) ){
	velo_y = -velo_y+(len/4);
	if(velo_y <= -(len*3)){
	velo_y = -(len*3);
	}	
		if(isCharged>0)
	{
		isCharged--;
		if(isCharged<0) isCharged=0;
	}
	}



	
}
function FcollisionBottom()
{
			if(y >= len && !(y > len && y < size_y-len)){

	velo_y = 0 ;
    //alert("Game Over!");
	GetLost("You've lost! Your score and bonuses were reseted. Press spacebar to continue.");
		//TIMERS
	clearTimeout(SM_upgrade_timeout);
	clearInterval(CB_upgrade_interval);
	////
	score = 0;
	STOP_LOOP();

	}

}
//* KLAWISZE **     32 space, 37 left, 39 right///



//KEYS
function onKeyPress(callback) {
    var keys = {},
        keysCount = 0,
        interval = null,
        trackedKeys = {
            97: true, // A
            65: true, // a
            100: true, // D
            68: true, // d
            37: true, // left arrow
            39: true, // right arrow

			
			32: true, //spacebar
			13: true, //enter
			16: true //shift
        };


document.addEventListener("keydown", function(event) {
var code = event.which;
      
        if (trackedKeys[code]) {
            if (!keys[code]) {
                keys[code] = true;
                keysCount++;
            }
            
            if (interval === null) {
                interval = setInterval(function () {
                    var direction = '';
                    

						  if((keys[32] || keys[13]) && Started == 0) 
 						    {
							 Started = 1;
							 velo_y = len/2; //starting velo
 						     GAME_LOOP();
						  	} 
					else if (keys[16] && ( keys[97] || keys[65] || keys[37] ) )
					{
							if(Started == 1 && rect_x > 0) 
			{
				IsPadSprint=1;
				rect_x = rect_x - (velo_bar*1.5);
				if(rect_x < 0)
				{
					rect_x = 0;
				}
			}
						direction += 's<';
					} 	
					else if (keys[16] && (keys[100] || keys[68] || keys[39]) )
					{
						if (Started == 1 && rect_x+rect_x_e < size_x ) 
						{
							IsPadSprint=1;
							rect_x = rect_x + (velo_bar*1.5);
				            if(rect_x+rect_x_e > size_x)
				            {
				            rect_x = size_x-rect_x_e;
				            }
						}
						direction += 's>';
					}
                    else if (keys[97] || keys[65] || keys[37]) {
						
							if(Started == 1 && rect_x > 0) 
								{
									IsPadSprint=0;
									rect_x = rect_x - velo_bar;
									if(rect_x < 0)
									{
										rect_x = 0;
									}
								}
                        direction += '<';
                    } else if (keys[100] || keys[68] || keys[39]) {
						if (Started == 1 && rect_x+rect_x_e < size_x ) 
						{
							IsPadSprint=0;
								rect_x = rect_x + velo_bar;
				            if(rect_x+rect_x_e > size_x)
				            {
				            rect_x = size_x-rect_x_e;
				            }
						}
                        direction += '>';
                    }else if(keys[32] && keys[16])
					{
						IsPadSprint=0;
                        if(is_bar_Jump_cooldown == 0)
						{
						if(rect_y > size_y/1.2)
						{
                        
						if(jumps > 0)
						{
						
                        jumps=jumps-0.15;
						if(jumps<0) {jumps=0; is_bar_Jump_cooldown=1;}
						jumps = Math.round(jumps * 1000) / 1000;
						getLevelPoints();
						rect_y = rect_y-velo_bar_jump;

						clearTimeout(jump_timeout)
						clearTimeout(jump_timeout_cd);
						is_bar_Jump = 1;
						
                        jump_timeout = setTimeout(function(){ is_bar_Jump=0; is_bar_Jump_cooldown=1;  jump_timeout_cd = setTimeout(function(){is_bar_Jump_cooldown=0;},850)},235);				
						}

						}
					}
					}
                
                    if(callback) callback(direction);
                }, 1000 / 50);
            }
        }
    });
	
document.addEventListener("keyup", function(event) {
	 var code = event.which;
    
        if (keys[code]) {
            delete keys[code];
            keysCount--;
        }
        
        // need to check if keyboard movement stopped
        if ((trackedKeys[code]) && (keysCount === 0)) {
            clearInterval(interval);
            interval = null;
           if(callback) callback('none');
        }
    });
	
}
onKeyPress();

//Upgrades

function GetCrazyValue()
{

 if(x > (size_x-getRandomInt(0,Math.floor(size_x/3))))
 {
	CrazyRandom_x = getRandomInt(-2,0)
 }else{
	CrazyRandom_x = getRandomInt(0,2)
 }
  if(y > size_y -getRandomInt(0,Math.floor(size_x/3)))
 {
	CrazyRandom_x = getRandomInt(-2,0)
 }else{
	CrazyRandom_x = getRandomInt(0,2)
 }

 }

