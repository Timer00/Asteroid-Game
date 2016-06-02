var canvas, ctx, player,players,Player, keyDown, keyUp, keyLeft, keyRight, intervalo,shipCannon,distance,bullet,Bullet,bullets,tiros,timer,meteor,seconds,secondz,money,intervalo2,soundAdder,soundAdder2,soundAdder3,canPlay,soundRandom,cannons2,shipCannon2,adder,adder2,healingEffect;   
keyUp = 87; keyDown = 83; keyLeft = 65; keyRight = 68;tiros = 0;timer = 0;seconds = 0;money = 0;soundAdder = 0;soundAdder2 = 0;soundAdder3 = 0;canPlay = true;cannons2 = false;gradientAdder = 0; gradientAdder2 = 0; healingEffect = false;
function load(){
//	----------Canvas declarations-----------
	canvas = document.getElementById('box');
	ctx = canvas.getContext('2d');
//	---------------Objects-------------
	function cannon(x,y,width,height,color) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.color = color;
		
		this.drawn = function(){
			ctx.fillStyle = this.color;
			ctx.fillRect(this.x,this.y,this.width,this.height);
		}
	}
	function player(x,y,width,height,speed,health,baseHealth,armor){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.speed = speed;
		this.health = health;
		this.baseHealth = baseHealth;
		this.armor = armor;
		
		this.up = false;
		this.down = false;
		this.right = false;
		this.left = false;
		
		this.drawn = function(){
			ctx.fillStyle = "black";
			ctx.fillRect(this.x,this.y,this.width,this.height);
			ctx.fillStyle = "red";
			ctx.fillRect(this.x+(this.width/4),this.y+(this.height/4),this.width/2,this.height/2);
			if (cannons2){
				shipCannon = new cannon(this.x+(this.width*0.9),this.y+(this.height*0.35),this.width/10,this.height/10,"red");
				shipCannon2 = new cannon(this.x+(this.width*0.9),this.y+(this.height*0.55),this.width/10,this.height/10,"red");			
			} else {
				shipCannon = new cannon(this.x+(this.width*0.9),this.y+(this.height*0.45),this.width/10,this.height/10,"red");
			}
			
			
		}
	}
	players = new player(200,250,50,50,5,50,50,1);
	function bullet(x,y,width,height,speed){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.speed = speed;
		
		this.drawn = function(){
			ctx.fillStyle = this.color;
			ctx.fillRect(this.x,this.y,this.width,this.height);
		}
	}
	Bullet = new Array();
	
	meteor = function(x,y,width,height,speed,health,color,damage,resets){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.speed = speed;
		this.health = health;
		this.color = color;
		this.damage = damage;
		this.resets = resets;
		
		this.drawn = function(){
			ctx.fillStyle = this.color;
			ctx.fillRect(this.x,this.y,this.width,this.height);
		}
	}
	Meteor = new Array();
	for (var z = 0;z < 15;z++){
		Meteor.push(new meteor(Math.random()*canvas.width+canvas.width,Math.random()*canvas.height,
		Math.random()*30+15,Math.random()*30+15,Math.random()*10+3,Math.random()*2,"gray",1,false));
	}
	
	function healthContainer(x,y,width,height,color,speed,healing){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.color = color;
		this.speed = speed;
		this.healing = healing;
		
		this.drawn = function(){
			ctx.fillStyle = this.color;
			ctx.fillRect(this.x,this.y,this.width,this.height);
			ctx.fillStyle = "white";
			ctx.fillRect(this.x+5,this.y+5,20,10);
		}
	}
	lifeContainer = new healthContainer(Math.random()*5000+3000,Math.random()*(canvas.height-30),30,20,"rgb(0,191,255)",7,10);
	
	distance = function(objX,objY,obj2X,obj2Y){
		dx = objX - obj2X;
		dy = objY - obj2Y;
		distances = Math.sqrt(dx*dx + dy*dy);
		return [distances];
	}
	function price(){
		this.baseHealth = 150;
		this.increaseSpeed = 150;
		this.makeSmall = 500;
		this.increaseHealing = 300;
		this.moreCannons = 550;
	}
	prices = new price();
	
	function quantity(){
		this.baseHealth = 0;
		this.increaseSpeed = 0;
		this.makeSmall = 0;
		this.increaseHealing = 0;
		this.moreCannons = 0;
	}
	quantities = new quantity();
//	----------------Key detection-------------------
//				||Mouse||
	canvas.onmousedown = function(){
		if (players.health > 0){
			tiros++;
			Bullet.push(new bullet(shipCannon.x,shipCannon.y,5,players.height/10,10));
			if(cannons2){
				Bullet.push(new bullet(shipCannon2.x,shipCannon2.y,5,players.height/10,10));
			}
			shootSound = document.getElementById('pew');
			//shootSound.volume = 0.15;
			shootSound.play();
			shootSound.volume = 0.4;
			if (soundAdder >= 1){
				shootSound.pause();
				shootSound.currentTime = 0;
				shootSound.play();
				soundAdder -= 1;
			}
			soundAdder++;
		}
	}
//					||keyboard||
	window.addEventListener("keydown", checkKeyDown, false);
	function checkKeyDown(event) {
		if (event.keyCode == keyUp){
			players.up = true;
		} else if (event.keyCode == keyDown){
			players.down = true;
		} else if (event.keyCode == keyLeft){
			players.left = true;
		} else if (event.keyCode == keyRight){
			players.right = true;
		}
	}
	window.addEventListener("keyup", checkKeyUp, false);	
	function checkKeyUp(event){
		if (event.keyCode == keyUp){
			players.up = false;
		} else if (event.keyCode == keyDown){
			players.down = false;
		} else if (event.keyCode == keyLeft){
			players.left = false;
		} else if (event.keyCode == keyRight){
			players.right = false;
		}
	}
}

function play(){
	if (canPlay){
		intervalo = setInterval(animation, 1000/60);
		intervalo2 = setInterval(timerSeconds, 100);
		bgMusic.play();
		bgMusic.volume = 0.35;
	}
	canPlay = false;
}
function timerSeconds(){
	seconds++;
	document.getElementById('secondsBox').innerHTML = seconds/10 + " s"
}
function playAgain(){
	adder = 0;
//	-------------Hide gameOver text-------------
	document.getElementById('gameOver').style.visibility = "hidden";
	document.getElementById('survived').style.visibility = "hidden";	
//	-----Players reset-----
	if (players.health <= 0){
		intervalo2 = setInterval(timerSeconds, 100);
	}
	players.health = players.baseHealth;
	players.x = 200;
	players.y = 250;	
//	----Meteor reset----
	Meteor.length = 15;	
	for (var h = 0;h < Meteor.length; h++){
		meteors = Meteor[h];
		meteors.x = Math.random()*canvas.width + canvas.width;
		meteors.y = Math.random()*canvas.height;
		meteors.width = Math.random()*30+15;
		meteors.height = Math.random()*30+15;
		meteors.speed = Math.random()*10+3;
		meteors.health = Math.random()*3;
	}
//	-Timer reset-
	timer = 0;
	seconds = 0;
	secondz = 0;
//	----------Life container reset----------
	lifeContainer.x = Math.random()*5000+1500;
	lifeContainer.y = Math.random()*(canvas.height-30);
}
//	|=======================|Shop|========================|
//	                   ||Basic stats||
//	  	                   |Player|
	function increaseHealth(){
		if (money >= prices.baseHealth){ 
			players.baseHealth += 20;
			money -= prices.baseHealth;
			prices.baseHealth += Math.floor((prices.baseHealth*0.5));
			quantities.baseHealth++;
			document.getElementById('increaseHealthQuantity').innerHTML = quantities.baseHealth;
			document.getElementById('increaseHealthPrice').innerHTML = prices.baseHealth + ",00";
		}
	}
	function increaseSpeed(){
		if (money >= prices.increaseSpeed){
			players.speed += 1;
			money -= prices.increaseSpeed;
			prices.increaseSpeed += Math.floor((prices.increaseSpeed*0.5))
			quantities.increaseSpeed++;
			document.getElementById('increaseSpeedQuantity').innerHTML = quantities.increaseSpeed;
			document.getElementById('inscreaseSpeedPrice').innerHTML = prices.increaseSpeed + ",00";
		}
	}
	function makeSmall(){
		if (money >= prices.makeSmall){
			if (quantities.makeSmall < 4){
				players.width -= 10;
				players.height -= 10;
				money -= prices.makeSmall;
				prices.makeSmall += Math.floor((prices.makeSmall*1))
				quantities.makeSmall++;
				document.getElementById('makeSmallQuantity').innerHTML = quantities.makeSmall;
				document.getElementById('makeSmallPrice').innerHTML = prices.makeSmall + ",00";
				if (quantities.makeSmall == 4){
					document.getElementById('makeSmallPrice').innerHTML = "max";
				}
			}
		}
	}
//							|Container|	
	function increaseHealing(){
		if (money >= prices.increaseHealing){
			lifeContainer.healing += 10;
			console.log(lifeContainer.healing);
			money -= prices.increaseHealing;
			prices.increaseHealing += Math.floor((prices.increaseHealing*0.5))
			quantities.increaseHealing++;
			document.getElementById('increaseHealingQuantity').innerHTML = quantities.increaseHealing;
			document.getElementById('increaseHealingPrice').innerHTML = prices.increaseHealing + ",00";
		}
	}
//							||Cannons||
//						   |Add cannons|
	function moreCannons(){
		if (money >= prices.moreCannons){
			if(!cannons2){
				cannons2 = true;
				money -= prices.moreCannons;
				prices.moreCannons += Math.floor((prices.moreCannons*0.5))
				quantities.moreCannons++;
				document.getElementById('increaseCannonQuantity').innerHTML = quantities.moreCannons;
				document.getElementById('increaseCannonPrice').innerHTML = prices.moreCannons + ",00";
				if(cannons2){
					document.getElementById('increaseCannonPrice').innerHTML = "max";
				}
			}
		}
	}
function animation(){
//	------Canvas clear------
	ctx.fillStyle = "white";
	ctx.fillRect(0,0,canvas.width,canvas.height);
//	                  |Health container|	
//	--Meteor increase--
	timer++;
	if (timer == 100){
		timer = 0;
		Meteor.push(new meteor(Math.random()*canvas.width+canvas.width,Math.random()*canvas.height,
		Math.random()*30+15,Math.random()*30+15,Math.random()*10+3,Math.random()*2,"gray",1));
	}
//	-----------Key events---------
	if (players.up){
		players.y -= players.speed;
	}
	if (players.down){
		players.y += players.speed;
	}
	if (players.right){
		players.x += players.speed;
	}
	if (players.left){
		players.x -= players.speed;
	}
//	-----------Wall colision----------
		if (players.y < 0){
			players.y += players.speed;
		}
		if (players.y > canvas.height - players.height){
			players.y -= players.speed;
		}
		if (players.x < 0){
			players.x += players.speed;
		}
		if (players.x > 300 - players.width){
			players.x -= players.speed;
		}
//	----------Life container stuff------------	
	lifeContainer.drawn();
	lifeContainer.x -= lifeContainer.speed;
//					||Player colision||
	if (!(players.x+players.width < lifeContainer.x) &&
		!(lifeContainer.x+lifeContainer.width < players.x) &&
		!(players.y+players.height < lifeContainer.y) &&
		!(lifeContainer.y+lifeContainer.height < players.y)) {
			healingEffect = true;
			healingSound = document.getElementById('healingSound');
			healingSound.play();
			healingSound.volume = 0.30;
			if (soundAdder2 >= 1){
				healingSound.pause();
				healingSound.currentTime = 0;
				healingSound.play();
				soundAdder3 -= 1;
			}
			soundAdder3++;
//							|Reset|
			if (!(players.x < lifeContainer.x)){
				lifeContainer.x = Math.random()*5000+1500;
				lifeContainer.y = Math.random()*canvas.height-30;
//					~~~~~~|Function|~~~~~~
				players.health += lifeContainer.healing;
			}
		}
	if (lifeContainer.x < -30){
		lifeContainer.x = Math.random()*5000+1500;
		lifeContainer.y = Math.random()*canvas.height-30;
	}		
//  ----------Player stuff-----------
	if (!(players.health <= 0)){
		players.drawn();
//			||Healing effect||
//				 |Timer|
		if (healingEffect){
			gradientAdder2++;
			if (gradientAdder2 >= 0 && gradientAdder2 <= 100){
				gradientAdder += 0.01;
			}
			if (gradientAdder2 >= 100){
				gradientAdder2 = 0;
				gradientAdder = 0;
				healingEffect = false;
			}
//				|Gradient|
		var gradientX = players.x+(players.width/4);
		var gradientY = players.y+(players.height/4);
		var gradientW = players.width/2;
		var gradientH = players.height/2;
		var gradient = ctx.createLinearGradient(gradientX-50,gradientY,gradientX+gradientW+50,gradientY);
		gradient.addColorStop(0,"red");
		gradient.addColorStop(Math.abs(0.6-gradientAdder),"red");
		gradient.addColorStop(Math.abs(0.7-gradientAdder),"white");
		gradient.addColorStop(Math.abs(0.8-gradientAdder),"red");
		gradient.addColorStop(1,"red");
		ctx.fillStyle = gradient;
		ctx.fillRect(gradientX,gradientY,gradientW,gradientH);
		}
//				||Cannon stuff||
		shipCannon.drawn();
		if(cannons2){
			shipCannon2.drawn();
		}
		secondz = seconds/10;
	} else {
//		                       ||Show gameOver text||
		document.getElementById('gameOver').style.visibility = "visible";
		document.getElementById('survived').style.visibility = "visible";
		document.getElementById('survived').innerHTML = "survived " + secondz + " seconds";
		players.y = -600;
		clearInterval(intervalo2);
	}
//	-------------Cannon stuff-------------
//Coming soon;
//	-------------Bullet stuff-------------
	for (var i = 0;i < Bullet.length;i++){
		bullets = Bullet[i];
//		~~~~~~~~~|Function|~~~~~~~~
		bullets.x += bullets.speed;
//		~~~~~~~~~~~~~~~~~~~~~~~~~~
		bullets.drawn();
	}
//	--------------Meteor stuff-------------	
	for (var h = 0;h < Meteor.length; h++){
		meteors = Meteor[h];
//					||Player colision||
		if (!(players.x+players.width < meteors.x) &&
				!(meteors.x+meteors.width < players.x) &&
				!(players.y+players.height < meteors.y) &&
				!(meteors.y+meteors.height < players.y)) {
//			~~~~~~~~~|Function|~~~~~~~~
			players.x -= meteors.speed;		
			if (players.right){
				players.x -= players.speed;
			}
			players.health -= (meteors.damage*players.armor);
//			~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		}
//							||Bullet colision||		
		if (tiros >= 1){
			for (var iBullets = 0; iBullets < Bullet.length; iBullets++){
				bullets = Bullet[iBullets];
				if (!(bullets.x+bullets.width < meteors.x) &&
				!(meteors.x+meteors.width < bullets.x) &&
				!(bullets.y+bullets.height < meteors.y) &&
				!(meteors.y+meteors.height < bullets.y)) {
//					~~~|Function|~~~
					meteors.health--;
					money++;
//					~~~~~~~~~~~~~~~~~
					bullets.x = 8000;
					bullets.y = 5000;
				}
			}
		}
		meteors.fillStyle = meteors.color;
		meteors.drawn();
		meteors.x -= meteors.speed;
//					||Meteor re-use||
		if (meteors.x < -30 || meteors.health <= 0){
			if (meteors.health <= 0){
				soundRandom = Math.floor((Math.random()*3)+1);
				console.log(soundAdder2)
				if (soundRandom == 1){
					hitSound = document.getElementById('hitSound');
					hitSound.play();
					hitSound.volume = 1;
				}
				if (soundRandom == 2){
					hitSound2 = document.getElementById('hitSound2');
					hitSound2.play();
					hitSound2.volume = 1;
				}
				if (soundRandom == 3){
					hitSound3 = document.getElementById('hitSound3');
					hitSound3.play();
					hitSound3.volume = 1;
				}
				/*if (soundAdder2 >= 1){
					hitSound.pause();
					hitSound.currentTime = 0;
					hitSound.play();
					soundAdder2 -= 1;
				}
				soundAdder2++;*/
			//Se for necessario que cada asteroide possua um som individual fazer o seguinte:criar um objeto que tenha a funsao de criar copias dos
			//soms existentes com cloneNode(), depois criar um if que detecte se hitSound.playing == true, se sim dar push new no objeto de som para criar outra copia
			// e em seguida dar play.
			}
			meteors.x = Math.random()*canvas.width + canvas.width;
			meteors.y = Math.random()*canvas.height;
			meteors.width = Math.random()*30+15;
			meteors.height = Math.random()*30+15;
			meteors.speed = Math.random()*10+3;
			meteors.health = Math.random()*3;
		}
	}
//	----------------------------innerHTML changes-------------------------
	document.getElementById('healthBox').innerHTML = players.health + " hp";
	document.getElementById('moneyBox').innerHTML = "$" + money + ",00";	
}