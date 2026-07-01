    class Example extends Phaser.Scene {

        preload () {
            this.load.image('shirt', 'assets/SHIRT-ASUIF.png');
            this.load.image('hate', 'assets/enemy.png');
            this.load.image('BGM1', 'assets/garage.png');
            this.load.image('fan', 'assets/FAN.png');
            this.load.audio("coin","assets/COIN.mp3");
            this.load.audio("broke","assets/broke.mp3");
            this.load.audio("BOO","assets/BOO.mp3");
            this.load.audio("DIE","assets/DIE.mp3");
            this.load.audio("slap","assets/Slap.mp3");



        }

        create () {
          
            //variables
            const cam = this.cameras.main;
            const clearTint = (upgrade) => upgrade.clearTint();
            this.clothprice = 100;
            this.firstbuy = true;
            this.cpc = 1;
            this.rebirthcost = 1000;
            this.fanprice = 500;
            this.rebirths = 0;
            this.fantotal = 0;
            this.difficulty = 1;
            this.multiplyer = 1;
            this.totalhaterlt = 0;
            const enemylist = [];
            const updups = [];
            const dienmy = []; 
            this.totalhater = 0;
            const shirtcolors = [0xff0000,0x00008b,0x800080,0xffff00,0x00ff00,0xffc0cb]
            this.basecolor = 0xffffff;
            const shirtcolor = () => {
                this.color = Phaser.Utils.Array.GetRandom(shirtcolors);

                shirt.setTint(this.color);
                this.basecolor = this.color;

            };
            const upgrades = [
                { name: "Flynn worker",cost: 10,cps: 2,amount:0,ogp: 10 },
                { name: "AI classmates",cost: 50,cps: 10,amount:0,ogp: 50},
                { name: "Catch James",cost: 120,cps: 25,amount:0,ogp: 120},
                { name: "FACTORY",cost: 500,cps: 50,amount:0,ogp: 500},
                { name: "Company",cost: 1000,cps:100,amount:0,ogp: 1000},
                { name: "Boss Eli",cost: 10000,cps: 2000,amount:0,ogp: 10000},
                { name: "JACK CEO",cost: 100000, cps: 5000,amount:0,ogp: 100000},


            ];
            //BG
            const background = this.add.sprite(cam.centerX,cam.centerY, 'BGM1');
            background.setScale(5.2,5.2);
            this.pound = 0;
            const padding = 5;
            this.cps = 0;
            //orientation
            this.scale.on('orientationchange', (orientation) => {
                if (orientation === Phaser.Scale.LANDSCAPE) {
                    //something 
                } else {
                    //will do it later
                }
            });           
            //update money counter function
            this.poundtext = (color) => {
                this.scoreText.setColor(color); //'#00ff00'
                this.scoreText.setText('£: ' + this.pound);
                this.time.delayedCall(200, () => {
                    this.scoreText.setColor('#ffffff');
                });
                if (Math.floor(this.pound/1000)===0) {
                    this.difficulty = 0;
                }else {
                    this.difficulty = Math.floor(this.pound/1000);
                }
                
            };
            //spawn fan

            const spawnfan = () => {
                let fan = this.add.image(cam.centerX,cam.centerY, 'fan'
                ).setDepth(999999).setScale(2/40,2/40);
                let target = false;
                let there = false;
                fan.preFX.addPixelate(3);
                this.fantotal += 1;
                let postar = Phaser.Utils.Array.GetRandom(enemylist);
                let myIndex = enemylist.indexOf(postar);
                this.time.addEvent({
                    delay: 1000,      
                    loop: true,
                    callback: () => {
                        if (target===false && enemylist.length > 0) {
                            postar = Phaser.Utils.Array.GetRandom(enemylist);
                            myIndex = enemylist.indexOf(postar);
                            let targetmove = this.tweens.add({
                                targets: fan,
                                x: postar.xenemy-Phaser.Math.FloatBetween(-1,1),          
                                y: postar.yenemy-Phaser.Math.FloatBetween(-1,1),             
                                duration: 1000,       
                                ease: 'Power2',
                                yoyo: false,           
                                loop: 0              
                            });
                            target = true;
                            this.time.addEvent({
                                delay: 500,      
                                callback: () => {
                                   there = true;
                                }   
                            });
                        }
                    }
                });
                this.time.addEvent({
                    delay: 500,      
                    loop: true,
                    callback: () => {
                        if (target===true && enemylist.length > 0&& enemylist.includes(postar))  {
                             this.time.addEvent({
                                delay: postar.wait-1000,      
                                loop: false,
                                callback: () => {
                                    if (target===true && enemylist.length > 0&& enemylist.includes(postar)&&there===true)  {
                                        postar.damage();
                                    }     
                                }   
                            });

                        }
                            
                    }   
                });
                const enemydie = (id) => {
                    
                    console.log(id)
                    console.log(myIndex)

                    if (id===myIndex) {
                        there = false;
                        console.log("target false");
                        target = false;
                        postar = Phaser.Utils.Array.GetRandom(enemylist);
                        myIndex = enemylist.indexOf(postar);
                    }
                }
                dienmy.push(enemydie);


            }
            //money count
            this.scoreText = this.add.text( cam.width *0.15 , 30, '£: ' + this.pound, {
                font: '24px Arial',
                fill: '#ffffff'
            }).setDepth(9999).setScale(2,2).setOrigin(0.5, 0);
            this.scoreText.setFontSize(24);
            //cps text
            this.cpstext = this.add.text( cam.width * 0.15 , 80, 'CPS: ' + this.cps, {
                font: '24px Aial',
                fill: '#ffffff'
            }).setDepth(9999).setScale(2,2).setOrigin(0.5, 0);
            //fanstotal
            this.ftxt = this.add.text( cam.width * 0.15 , 230, 'Fans: ' + this.fantotal, {
                font: '24px Aial',
                fill: '#ffffff'
            }).setDepth(9999).setScale(2,2).setOrigin(0.5, 0);
            //cpc
            this.cpctext = this.add.text( cam.width * 0.15 , 130, 'CPC: ' + this.cpc, {
                font: '24px Aial',
                fill: '#ffffff'
            }).setDepth(9999).setScale(2,2).setOrigin(0.5, 0);
            //rebirths
            this.retxt = this.add.text( cam.width * 0.15 , 180, 'Rebirths: ' + this.rebirths, {
                font: '24px Aial',
                fill: '#ffffff'
            }).setDepth(9999).setScale(2,2).setOrigin(0.5, 0);
            //title
            this.title = this.add.text(this.cameras.main.centerX, 0, 'LAZE SIMULATOR', {
                font: '32px Arial',
                fill: '#ffffff'
            }).setDepth(9999).setScale(2,2).setOrigin(0.5, 0)
          
            //clothes
            let bpcl = false
            const clotheup = this.add.text(cam.width * 0.2, 430,`${this.clothprice} - Buy new shirt`, {
                font: '20px Arial',
                fill: '#ffffff'
            }).setDepth(9999).setScale(2,2).setOrigin(0.5, 0).setInteractive();
            clotheup.on("pointerdown",()=>{
                if (this.pound>this.clothprice-1 && bpcl===false) {
                    clotheup.setTint(0x90ee90);
                    bpcl = true
                    this.pound -= this.clothprice; 
                    this.poundtext('#ff0000');
                    this.sound.play('coin');
                    shirtcolor();
                    this.clothprice *=  2;
                    this.cpc *= 2
                    clotheup.setText(`${this.clothprice} - Buy new shirt`);
                    this.cpctext.setText('CPC: ' + this.cpc);
                    rclbg();

                } else {
                    clotheup.setTint(0xff0000);
                    this.sound.play('broke');
                }
            })
                
            clotheup.on('pointerout', () => {clearTint(clotheup);bpcl = false});
            clotheup.on('pointerup', () => {clearTint(clotheup);bpcl = false});
            let boundupcl = clotheup.getBounds();
            const clbg = this.add.graphics();
            clbg.fillStyle(0x000000, 1);
            clbg.setInteractive();

            const rclbg = () => {
                boundupcl = clotheup.getBounds();
                clbg.fillRect(
                boundupcl.x -padding,
                boundupcl.y -padding,
                boundupcl.width + padding * 2,
                boundupcl.height + padding * 2
            )}
            rclbg();
                
              

            clbg.on("pointerdown",()=>{
                if (this.pound>clothprice-1 && bpcl === false) {
                    clotheup.setTint(0x90ee90);
                    bpcl = true
                    this.pound -= this.clothprice; 
                    this.poundtext('#ff0000');
                    this.sound.play('coin');
                    shirtcolor();
                    this.clothprice *=  2;
                    this.cpc *= 2
                    clotheup.setText(`${this.clothprice} - Buy new shirt`);
                    this.cpctext.setText('CPC: ' + this.cpc);
                    rclbg();

                } else {
                    clotheup.setTint(0xff0000);
                    this.sound.play('broke');
                }
            })
                
            clbg.on('pointerout', () => {clearTint(clotheup);bpcl = false});
            clbg.on('pointerup', () => {clearTint(clotheup);bpcl = false});

            //FANS buy
            let bgf = false
            const fansp = this.add.text(cam.width * 0.2, 630,`${this.fanprice} - Hire fans`, {
                font: '18px Arial',
                fill: '#ffffff'
            }).setDepth(9999).setScale(2,2).setOrigin(0.5, 0).setInteractive();
            fansp.on("pointerdown",()=>{
                if (this.pound>this.fanprice-1 && bpr===false) {
                    fansp.setTint(0x90ee90);
                    bpr = true
                    this.pound -= this.fanprice; 
                    this.poundtext('#ff0000');
                    this.sound.play('coin');
                    //work
                    this.fanprice *= 4;
                    this.fantotal +=1;
                    spawnfan();      
                    //end of work
                    fansp.setText(`${this.fanprice} - Hire fans`);
                    this.ftxt.setText('Fans: ' + this.fantotal);
                    fclr();

                } else {
                    fansp.setTint(0xff0000);
                    this.sound.play('broke');
                }
            })
                
            fansp.on('pointerout', () => {clearTint(fansp);bpr = false});
            fansp.on('pointerup', () => {clearTint(fansp);bpr = false});
            let boundupf = fansp.getBounds();
            const fbg = this.add.graphics();
            fbg.fillStyle(0x000000, 1);
            fbg.setInteractive();

            const fclr = () => {
                boundupf = fansp.getBounds();
                fbg.fillRect(
                boundupf.x -padding,
                boundupf.y -padding,
                boundupf.width + padding * 2,
                boundupf.height + padding * 2
            )}
            fclr();
                
              

            fbg.on("pointerdown",()=>{
                 if (this.pound>this.fanprice-1 && bpr===false) {
                    fansp.setTint(0x90ee90);
                    bpr = true
                    this.pound -= this.fanprice; 
                    this.poundtext('#ff0000');
                    this.sound.play('coin');
                    //work
                    this.fanprice *= 4;
                    this.fantotal +=1;
                    spawnfan();      
                    //end of work
                    fansp.setText(`${this.fanprice} - Hire fans`);
                    this.ftxt.setText('Fans: ' + this.fantotal);
                    fclr();

                } else {
                    fansp.setTint(0xff0000);
                    this.sound.play('broke');
                }
            })
                
            fbg.on('pointerout', () => {clearTint(fansp);brl = false});
            fbg.on('pointerup', () => {clearTint(fansp);bpr = false});
            //upgrades
            upgrades.forEach((upgrade,index) => {
                //getting the y position
                const y = 100 + (index*80)
                let bp = false

                const upgradetext = this.add.text(cam.width*0.82,y,`${upgrade.name} - £${upgrade.cost}`,{
                    font: '20px Arial',
                    fill: '#ffffff'
                }).setInteractive().setDepth(9999).setScale(2,2).setOrigin(0.5, 0.5);

                upgradetext.on("pointerdown",()=>{
                    if (this.pound>upgrade.cost-1 && bp === false) {
                        bp = true
                        upgradetext.setTint(0x90ee90);
                        this.pound -= upgrade.cost; 
                        this.poundtext('#ff0000');
                        this.sound.play('coin');
                        upgrade.cost = Math.round(1.2*upgrade.cost);
                        upgrade.amount += 1;
                        this.cps += upgrade.cps;
                        upgradetext.setText(`${upgrade.amount} - ${upgrade.name} - £${upgrade.cost}`);
                        this.cpstext.setText('CPS: ' + this.cps);
                        rupbg();

                    } else {
                        upgradetext.setTint(0xff0000);
                        this.sound.play('broke');
                    }
                })
                
                upgradetext.on('pointerout', () => {clearTint(upgradetext);bp = false});
                upgradetext.on('pointerup', () => {clearTint(upgradetext);bp = false});

                let boundup = upgradetext.getBounds();
                const upbg = this.add.graphics();
                upbg.fillStyle(0x000000, 1);
                upbg.setInteractive();
                upbg.setDepth(9998);
                const rupbg = () => {
                    boundup = upgradetext.getBounds();
                    upbg.fillRect(
                    boundup.x -padding,
                    boundup.y -padding,
                    boundup.width + padding * 2,
                    boundup.height + padding * 2
                )}
                rupbg();
                
              

                upbg.on("pointerdown",()=>{
                    if (this.pound>upgrade.cost-1 && bp === false) {
                        bp = true
                        upgradetext.setTint(0x90ee90);
                        this.pound -= upgrade.cost;
                        this.poundtext('#ff0000');
                        this.sound.play('coin');
                        upgrade.cost = Math.round(1.2*upgrade.cost);
                        upgrade.amount += 1;
                        this.cps += upgrade.cps;
                        upgradetext.setText(`${upgrade.amount} - ${upgrade.name} - £${upgrade.cost}`);
                        this.cpstext.setText('CPS: ' + this.cps);
                        rupbg();

                    } else {
                        upgradetext.setTint(0xff0000);
                        this.sound.play('broke');
                    }
                })
                
                upbg.on('pointerout', () => {clearTint(upgradetext);bp = false});
                upbg.on('pointerup', () => {clearTint(upgradetext);bp = false});
                const updup = () => {
                    upgrade.amount = 0;
                    upgrade.cost = upgrade.ogp;
                    upgradetext.setText(`${upgrade.amount} - ${upgrade.name} - £${upgrade.cost}`);
                    rupbg();
                };
                updups.push(updup);

            });
            //Fans

            //rebirth
            let bpr = false
            const rebirth = this.add.text(cam.width * 0.2, 530,`${this.rebirthcost} - Move into new studio`, {
                font: '18px Arial',
                fill: '#ffffff'
            }).setDepth(9999).setScale(2,2).setOrigin(0.5, 0).setInteractive();
            rebirth.on("pointerdown",()=>{
                if (this.pound>this.rebirthcost-1 && bpr===false) {
                    rebirth.setTint(0x90ee90);
                    bpr = true
                    this.pound -= this.clothprice; 
                    this.poundtext('#ff0000');
                    this.sound.play('coin');
                    //work
                    this.rebirthcost *= 2;
                    this.rebirths +=1;
                    this.multiplyer +=1;
                    this.pound = 0;

                    upgrades.forEach((upgrade,index) => {
                        upgrades[index].amount = 0;
                        updups[index]();         
                    });
                    
                    //end of work
                    rebirth.setText(`${this.rebirthcost} - Move into new studio`);
                    this.retxt.setText('Rebirths: ' + this.rebirths);
                    rclr();

                } else {
                    rebirth.setTint(0xff0000);
                    this.sound.play('broke');
                }
            })
                
            rebirth.on('pointerout', () => {clearTint(rebirth);bpr = false});
            rebirth.on('pointerup', () => {clearTint(rebirth);bpr = false});
            let boundupr = rebirth.getBounds();
            const rbg = this.add.graphics();
            rbg.fillStyle(0x000000, 1);
            rbg.setInteractive();

            const rclr = () => {
                boundupr = rebirth.getBounds();
                rbg.fillRect(
                boundupr.x -padding,
                boundupr.y -padding,
                boundupr.width + padding * 2,
                boundupr.height + padding * 2
            )}
            rclr();
                
              

            rbg.on("pointerdown",()=>{
                 if (this.pound>this.rebirthcost-1 && bpr===false) {
                    rebirth.setTint(0x90ee90);
                    bpr = true
                    this.pound -= this.clothprice; 
                    this.poundtext('#ff0000');
                    this.sound.play('coin');
                    //work
                    this.rebirthcost *= 2;
                    this.rebirths +=1;
                    this.multiplyer +=1;
                    this.pound = 0;
                    upgrades.forEach((upgrade,index) => {
                        this.cps = 0;
                        updups[index]();
                    });
                    
                    //end of work
                    rebirth.setText(`${this.rebirthcost} - Move into new studio`);  
                    this.retxt.setText('Rebirths: ' + this.rebirths);
                    rclr();

                } else {
                    rebirth.setTint(0xff0000);
                    this.sound.play('broke');
                }
            })
                
            rbg.on('pointerout', () => {clearTint(rebirth);brl = false});
            rbg.on('pointerup', () => {clearTint(rebirth);bpr = false});

            //Shirt
            const shirt = this.add.sprite(cam.centerX,cam.centerY, 'shirt'
            ).setInteractive().setScale(0.13,0.13).setDepth(0);
            shirt.preFX.addPixelate(3);
            shirt.on('pointerdown', (pointer) =>
            {
                shirt.setTint(0x0000ff);
                this.tweens.add({
                    targets: shirt,
                    scale: 0.13,
                    duration: 60,
                    ease: 'Back.Out',
                    yoyo: true
                });
                this.pound += this.cpc * this.multiplyer;
                this.poundtext('#00ff00');
                this.sound.play('coin');
                

            });
            shirt.on('pointerover', () => {
                this.tweens.add({
                    targets: shirt,
                    scale: 0.14,
                    duration: 60,
                    ease: 'Power2',
                });
            });
            shirt.on('pointerout', () => {
                shirt.setTint(this.basecolor);
                this.tweens.add({
                    targets: shirt,
                    scale: 0.13,
                    duration: 60,
                    ease: 'Power2',
                });
            });
            shirt.on('pointerup', () => {
                shirt.setTint(this.basecolor);
            });            
            //HATERS

            const spawn = () => {
                let spawnran = cam.centerX * Phaser.Math.FloatBetween(0, 3);
                let sizeran = Phaser.Math.FloatBetween(0.9,3);
                let posranX = Phaser.Math.FloatBetween(0.55, 1.55);
                let posranY = Phaser.Math.FloatBetween(0.4, 1.3);
                let speedran = Phaser.Math.Between(1000, 5000);
                let dead = false;
                let hpran = Phaser.Math.Between(0, 3) *(this.difficulty*0.2);
                let HATE = this.add.sprite(spawnran,cam.centerY*2, 'hate'
                ).setInteractive().setDepth(99999).setScale(sizeran/40,sizeran/40)
                const damageenemy = () => {
                    hpran -= this.cpc;
                    HATE.setTint(0x0000ff);
                    if (hpran <1 ) {
                        if (dead===true) {return};
                        dead = true;
                        this.pound += this.cpc*100*this.multiplyer;
                        this.poundtext('#00ff00');
                        this.sound.play('coin');
                        this.totalhater -= 1
                        this.time.delayedCall(125, () => {
                             dienmy.forEach((die,index) => {
                                dienmy[index](myIndex);         
                            });
                            this.sound.play('DIE');
                            enemylist.splice(myIndex, 1);
                            HATE.destroy();
                            kill.remove();
                            move.remove();
                        }, [], this);
                    }
                };
                const enemyEntry = {
                    xenemy: cam.centerX*posranX,
                    yenemy: cam.centerY*posranY,
                    damage: damageenemy,
                    wait: speedran
                };
               
                enemylist.push(enemyEntry);
                let myIndex = enemylist.indexOf(enemyEntry);


                HATE.preFX.addPixelate(3);

                HATE.on('pointerdown', (pointer) => {

                    HATE.setTint(0x0000ff);
                    hpran -= this.cpc
                    if (hpran <1 ) {
                        this.pound += this.cpc*100*this.multiplyer;
                        this.poundtext('#00ff00');
                        this.sound.play('coin');
                        this.totalhater -= 1
                        this.time.delayedCall(125, () => {
                             dienmy.forEach((die,index) => {
                                dienmy[index](myIndex);         
                            });
                            this.sound.play('DIE');
                            enemylist.splice(myIndex, 1);
                            HATE.destroy();
                            kill.remove();
                            move.remove();
                        }, [], this);
                    }else {
                        this.sound.play('slap');
                    }
                    

                });

                HATE.on('pointerout', () => {HATE.clearTint()});
                HATE.on('pointerup', () => {HATE.clearTint()});
               
                
                let move = this.tweens.add({
                    targets: HATE,
                    x: cam.centerX*posranX,            
                    y: cam.centerY*posranY,             
                    duration: speedran,       
                    ease: 'Power2',
                    yoyo: false,           
                    loop: 0              
                });
                let kill = this.time.addEvent({
                    delay: speedran,      
                    loop: true,
                    callback: () => {
                        this.sound.play('BOO');
                        if (this.cps ===0)  {
                                this.pound -= 1
                                this.poundtext('#ff0000');
                            }else {
                                this.pound -= Math.round(this.cps*1.1);
                                this.poundtext('#ff0000');
                        }
                    }   
                });
               
            }

            this.time.addEvent({
                delay: 5000,      // 1000 ms = 1 second
                loop: true,
                callback: () => {
                    if (this.totalhater < 11) { //the second number +1 is the total
                        this.totalhaterlt += 1;
                        spawn();
                        this.totalhater += 1
                    }
                }   
            });

       
            //CPS
            this.time.addEvent({
                delay: 1000,      // 1000 ms = 1 second
                loop: true,
                callback: () => {
                    if (this.cps>0) {
                        this.pound += this.cps*this.multiplyer;
                        this.poundtext('#00ff00');
                        this.sound.play('coin');
                    }
                    
                }
            });

        }




    }
    const isMobile = window.innerWidth < 768;
    const config = {
        type: Phaser.AUTO,
        parent: 'game-container',
        
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width:1280,
            height:720,  
            
        },

        backgroundColor: '#FFFFFF',

        pixelArt: true,
        scene: Example
    };

    const game = new Phaser.Game(config);
