function $(id){
	return document.getElementById(id);
}

function initial(){
	var canvas=$("canvas");
	ctx=canvas.getContext("2d");
	var WIDTH=480,HEIGHT=580;

	var bg=new Image();
	bg.src="img/background.png";
	var copyright=new Image();
	copyright.src="img/shoot_copyright.png";
	var loading=[];
	loading[0]=new Image();
	loading[0].src="img/game_loading1.png";
	loading[1]=new Image();
	loading[1].src="img/game_loading2.png";
	loading[2]=new Image();
	loading[2].src="img/game_loading3.png";
	loading[3]=new Image();
	loading[3].src="img/game_loading4.png";
	var hero_img=[];
	hero_img[0]=new Image();
	hero_img[0].src="img/hero1.png";
	hero_img[1]=new Image();
	hero_img[1].src="img/hero2.png";
	hero_img[2]=new Image();
	hero_img[2].src="img/hero_blowup_n1.png";
	hero_img[3]=new Image();
	hero_img[3].src="img/hero_blowup_n2.png";
	hero_img[4]=new Image();
	hero_img[4].src="img/hero_blowup_n3.png";
	hero_img[5]=new Image();
	hero_img[5].src="img/hero_blowup_n4.png";
	var bt_img=new Image();
	bt_img.src="img/bullet1.png";
	var bullet_list=[];
	var score=0;
	var life=3;
	var pause_img=new Image();
	pause_img.src="img/game_pause_nor.png";
	var enemy1_img=[];
	enemy1_img[0]=new Image();
	enemy1_img[0].src="img/enemy1.png";
	enemy1_img[1]=new Image();
	enemy1_img[1].src="img/enemy1_down1.png";
	enemy1_img[2]=new Image();
	enemy1_img[2].src="img/enemy1_down2.png";
	enemy1_img[3]=new Image();
	enemy1_img[3].src="img/enemy1_down3.png";
	enemy1_img[4]=new Image();
	enemy1_img[4].src="img/enemy1_down4.png";
	var enemy2_img=[];
	enemy2_img[0]=new Image();
	enemy2_img[0].src="img/enemy2.png";
	enemy2_img[1]=new Image();
	enemy2_img[1].src="img/enemy2_hit.png";
	enemy2_img[2]=new Image();
	enemy2_img[2].src="img/enemy2_down1.png";
	enemy2_img[3]=new Image();
	enemy2_img[3].src="img/enemy2_down2.png";
	enemy2_img[4]=new Image();
	enemy2_img[4].src="img/enemy2_down3.png";
	enemy2_img[5]=new Image();
	enemy2_img[5].src="img/enemy2_down4.png";
	var enemy3_img=[];
	enemy3_img[0]=new Image();
	enemy3_img[0].src="img/enemy3_n1.png";
	enemy3_img[1]=new Image();
	enemy3_img[1].src="img/enemy3_n2.png";
	enemy3_img[2]=new Image();
	enemy3_img[2].src="img/enemy3_hit.png";
	enemy3_img[3]=new Image();
	enemy3_img[3].src="img/enemy3_down1.png";
	enemy3_img[4]=new Image();
	enemy3_img[4].src="img/enemy3_down2.png";
	enemy3_img[5]=new Image();
	enemy3_img[5].src="img/enemy3_down3.png";
	enemy3_img[6]=new Image();
	enemy3_img[6].src="img/enemy3_down4.png";
	enemy3_img[7]=new Image();
	enemy3_img[7].src="img/enemy3_down5.png";
	enemy3_img[8]=new Image();
	enemy3_img[8].src="img/enemy3_down6.png";
	var enemy_list=[];
	var enemyTime=0;


	var start=1,load=2,play=3,pause=4,end=5;
	var state=start;

	canvas.onclick=function(){
		if(state==start){
			state=load;
		}else if(state==end){
			score=0;
			life=3;
			bullet_list=[];
			enemy_list=[];
			hero.down=false;
			state=play;
		}
	}

	canvas.onmousemove=function(e){
		var x=e.offsetX;
		var y=e.offsetY;

		hero.x=x-hero.width/2;
		hero.y=y-hero.height/2;
	}

	canvas.onmouseout=function(){
		if(state==play){
			state=pause;
		}
	}

	canvas.onmouseover=function(){
		if(state==pause){
			state=play;
		}
	}
	var SKY={image:bg,width:480,height:850,speed:20};
	var Sky=function(config){
		this.bg=config.image;
		this.width=config.width;
		this.height=config.height;
		this.speed=1000/config.speed;
		this.x1=0;
		this.y1=0;
		this.x2=0;
		this.y2=-this.height;
		this.lastTime=0;

		this.step=function(){
			var currentTime=new Date().getTime();
			if(currentTime-this.lastTime>=this.speed){
				this.y1++;
				this.y2++;
				this.lastTime=new Date().getTime();
			}
			if(this.y1>=this.height){
				this.y1=-this.height;
			}
			if(this.y2>=this.height){
				this.y2=-this.height;
			}
		}

		this.paint=function(ctx){
			ctx.drawImage(this.bg,this.x1,this.y1);
			ctx.drawImage(this.bg,this.x2,this.y2);
		}
	}

		var sky=new Sky(SKY);

	var LOGO={image:copyright,width:441,height:225};
	var Logo=function(config){
		this.copyright=config.image;
		this.width=config.width;
		this.height=config.height;
		this.x=(WIDTH-this.width)/2;
		this.y=(HEIGHT-this.height)/2;

		this.paint=function(ctx){
			ctx.drawImage(this.copyright,this.x,this.y);
		}
	}

		var logo=new Logo(LOGO);
	
	var LOAD={image:loading,width:186,height:38,speed:2};
	var Load=function(config){
		this.loading=config.image;
		this.width=config.width;
		this.height=config.height;
		this.speed=1000/config.speed;
		this.x=0;
		this.y=HEIGHT-this.height;
		this.lastTime=0;
		this.load_img=null;
		this.index=0;

		this.step=function(){
			var currentTime=new Date().getTime();
			if(currentTime-this.lastTime>=this.speed){
				if(this.index<4){
				this.load_img=this.loading[this.index];
				this.index++;
				this.lastTime=new Date().getTime();
				}else{
					state=play;
				}
			}
		}

		this.paint=function(ctx){
			ctx.drawImage(this.load_img,this.x,this.y);
		}
	}

		var load=new Load(LOAD);

		var BULLET={image:bt_img,width:9,height:21};
		var Bullet=function(config,x,y){
			this.bt_img=config.image;
			this.width=config.width;
			this.height=config.height;
			this.x=x+(hero.width-this.width)/2;
			this.y=y;
			this.candelete=false;

			this.move=function(){
				this.y-=2;
			}

			this.overrange=function(){
				if(this.y<-this.height){
					return true;
				}
				return false;
			}

			this.paint=function(ctx){
				ctx.drawImage(this.bt_img,this.x,this.y);
			}

			this.destroy=function(){
				this.candelete=true;
			}

		}


		var HERO={image:hero_img,width:99,height:124,speed:10};
		var Hero=function(config){
			this.hero_img=config.image;
			this.width=config.width;
			this.height=config.height;
			this.speed=1000/config.speed;
			this.x=(WIDTH-this.width)/2;
			this.y=(HEIGHT-this.height)*3/4;
			this.lastTime=0;
			this.currentImg=null;
			this.baseCount=2;
			this.index=0;
			this.b_lastTime=0;


			this.step=function(){
				var currentTime=new Date().getTime();
				if(currentTime-this.lastTime>=this.speed){
					if(this.down){
						if(this.index>=this.hero_img.length&&life<=0){
							state=end;
						}else if(this.index>=this.hero_img.length&&life>0){
							this.down=false;
						}else{
							this.currentImg=this.hero_img[this.index];
							this.index++;
							this.lastTime=new Date().getTime();
						}
					}
					else{
					this.currentImg=this.hero_img[this.index%this.baseCount];
					this.index++;
					this.lastTime=new Date().getTime();
					}
				}
				if(currentTime-this.b_lastTime>=400){
					var bullet=new Bullet(BULLET,this.x,this.y);
					bullet_list[bullet_list.length]=bullet;
					this.b_lastTime=new Date().getTime();
				}
			}

			this.paint=function(ctx){
				ctx.drawImage(this.currentImg,this.x,this.y);
			}

			this.destroy=function(){
				life--;
				this.index=this.baseCount;
				this.down=true;
			}

		}

		var hero=new Hero(HERO);

		var ENEMY1={type:1,score:1,life:1,image:enemy1_img,baseindex:1,minspeed:10,maxspeed:20,width:57,height:51};
		var ENEMY2={type:2,score:5,life:3,image:enemy2_img,baseindex:1,minspeed:20,maxspeed:30,width:69,height:95};
		var ENEMY3={type:3,score:10,life:6,image:enemy3_img,baseindex:2,speed:90,width:165,height:261};
		//console.log("running");

		var Enemy=function(config){
			this.type=config.type;
			this.score=config.score;
			this.life=config.life;
			this.image=config.image;
			this.baseindex=config.baseindex;
			this.width=config.width;
			this.height=config.height;
			this.x=Math.floor(Math.random()*(WIDTH-this.width));
			this.y=-this.height;
			this.lastTime=0;
			this.moveTime=0;
			this.currentImg=null;
			this.currentIndex=0;
			this.down=false;
			this.candelete=false;
			this.struck=false;

			
				if(this.type!=3){
					this.minspeed=config.minspeed;
					this.maxspeed=config.maxspeed;
					this.speed=Math.floor(Math.random()*(this.maxspeed-this.minspeed)+this.minspeed);
				}else{
					this.speed=config.speed;
				}
			

			this.step=function(){
				var currentTime=new Date().getTime();
				if(currentTime-this.lastTime>=100){
					if(this.down){
						if(this.currentIndex<this.image.length){
							this.currentImg=this.image[this.currentIndex];
							this.currentIndex++;
							this.lastTime=new Date().getTime();
						}else{
							this.candelete=true;
						}
					}else if(this.struck){
						this.currentImg=this.image[this.currentIndex];
						this.lastTime=new Date().getTime();
						this.struck=false;
					}
					else{
					this.currentImg=this.image[this.currentIndex%this.baseindex];
					this.currentIndex++;
					this.lastTime=new Date().getTime();
					}
				}
				if(currentTime-this.moveTime>=this.speed){
					this.y++;
					this.moveTime=new Date().getTime();
				}

			}

			this.overrange=function(){
				if(this.y>HEIGHT){
					return true;
				}
				return false;
			}

			this.hit=function(c){
				var c_x=c.x+c.width/2;
				var c_y=c.y+c.height/2;
				var min_x=this.x-c.width/2;
				var max_x=this.x+this.width+c.width/2;
				var min_y=this.y-c.height/2;
				var max_y=this.y+this.height+c.height/2;

				var result=min_x<c_x&&c_x<max_x&&min_y<c_y&&c_y<max_y;
				
				return result;
			}

			this.destroy=function(){
				this.life--;
				if(this.life==0){
					score+=this.score;
					if(this.type!=1){
					this.currentIndex=this.baseindex+1;
					}else{
					this.currentIndex=this.baseindex;
					}
					this.down=true;
				}else{
					if(this.type!=1){
					this.currentIndex=this.baseindex;
					this.struck=true;
					}
				}
			}

			this.destroy_h=function(){
				score+=this.score;
				this.currentIndex=this.baseindex;
				this.down=true;
			}

			this.paint=function(ctx){
				ctx.drawImage(this.currentImg,this.x,this.y);
			}

		}

		//var enemy0;

		function enemy(){
			var currentTime=new Date().getTime();
			if(currentTime-enemyTime>=600){
				var num=Math.floor(Math.random()*10);
				//console.log(num);
				//console.log(enemy_list);
				if(num<=6){
					//enemy0=new Enemy(ENEMY1);
					enemy_list[enemy_list.length]=new Enemy(ENEMY1);
					//console.log(enemy_list[enemy_list.length-1]);
					//console.log(enemy0);
				}else if(num>6&&num<=8){
					enemy_list[enemy_list.length]=new Enemy(ENEMY2);
					//console.log(enemy_list[enemy_list.length]);
				}else{
					if(enemy_list.length==0){
						enemy_list[0]=new Enemy(ENEMY3);
					}
					if(enemy_list[0].type!=3){
						enemy_list.splice(0,0,new Enemy(ENEMY3));
					//console.log(enemy_list[enemy_list.length]);
					}
				}
				enemyTime=new Date().getTime();
				//console.log(enemy_list.length);
				//console.log(enemy_list[enemy_list.length-1].speed);
			}
		}

		function move_component(){
			for(var i=0;i<bullet_list.length;i++){
				bullet_list[i].move();
			}

			hero.step();

			for(var j=0;j<enemy_list.length;j++){
				enemy_list[j].step();
			}

		}

		function delete_component(){
			for(var i=0;i<bullet_list.length;i++){
				if(bullet_list[i].overrange()||bullet_list[i].candelete){
					bullet_list.splice(i,1);
				}
			}

			for(var j=0;j<enemy_list.length;j++){
				if(enemy_list[j].overrange()||enemy_list[j].candelete){
					enemy_list.splice(j,1);
				}
			}


		}

		function hit_component(){
			for(var i=0;i<enemy_list.length;i++){
				var enemys=enemy_list[i]
				if(enemys.down||enemys.candelete){
					continue;
				}
				for(var j=0;j<bullet_list.length;j++){
					var bullets=bullet_list[j];
					if(enemys.hit(bullets)){
						enemys.destroy();
						bullets.destroy();
					}
				}
				if(enemys.hit(hero)){
					if(!hero.down){
						hero.destroy();
						enemys.destroy_h();
					}
				}
			}
		}

		function paint_component(ctx){

			for(var i=0;i<bullet_list.length;i++){
				bullet_list[i].paint(ctx);
			}

			hero.paint(ctx);

			for(var j=0;j<enemy_list.length;j++){
				enemy_list[j].paint(ctx);
			}

			ctx.font="20px arial";
			ctx.fillText("SCORE:"+score,10,20);
			ctx.fillText("LIFE:"+life,400,20);
		}	

		var PAUSE={image:pause_img,width:60,height:45};
		var Pause=function(config){
			this.pause_img=config.image;
			this.width=config.width;
			this.height=config.height;
			this.x=(WIDTH-this.width)/2;
			this.y=(HEIGHT-this.height)/2;

			this.paint=function(ctx){
				ctx.drawImage(this.pause_img,this.x,this.y);
			}
		}
		var pause_btn=new Pause(PAUSE);

		setInterval(function(){
			sky.step();
			sky.paint(ctx);
			switch(state){
				case start:
					logo.paint(ctx);
					break;
				case load:
					load.step();
					load.paint(ctx);
					break;
				case play:
					enemy();
					move_component();
					hit_component();
					delete_component();
					paint_component(ctx);
					break;
				case pause:
					paint_component(ctx);
					pause_btn.paint(ctx);
					break;
				case end:
					//paint_component(ctx);
					ctx.font="bold 40px arial";
					var text_w=ctx.measureText("GAME OVER").width;
					ctx.fillText("GAME OVER",(WIDTH-text_w)/2,270);
					break;
			}	
		},1000/100);
}

window.addEventListener("load",initial,false);