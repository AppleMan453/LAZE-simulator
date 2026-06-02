    class Example extends Phaser.Scene {

        preload () {
            this.load.image('shirt', 'assets/shirt.png');
            this.load.image('hate', 'assets/HATE.png');
            this.load.image('BGM1', 'assets/garage.png');
            this.load.audio("coin","assets/COIN.mp3")
            this.load.audio("broke","assets/broke.mp3")
            this.load.audio("BOO","assets/BOO.mp3")
            this.load.audio("DIE","assets/DIE.mp3")
            this.load.audio("slap","assets/Slap.mp3")



        }

        create () {
          
            //variables
            const cam = this.cameras.main;
            const clearTint = (upgrade) => upgrade.clearTint();
            this.clothprice = 100;
            this.firstbuy = true;
            this.cpc = 1;
            this.rebirthcost = 1000,
            this.rebirths = 0,
            this.difficulty = 1;
            this.multiplyer = 1;
            const updups = [];
            this.totalhater = 0;
            const shirtcolors = [0xff0000,0x00008b,0x800080,0xffff00,0x00ff00,0xffc0cb]
            this.basecolor = 0xffffff;
            const shirtcolor = () => {
                this.color = Phaser.Utils.Array.GetRandom(shirtcolors);

                console.log(this.color)
                shirt.setTint(this.color);
                console.log(shirt.tint)
                this.basecolor = this.color;

            };
            const upgrades = [
                { name: "Flynn worker",cost: 10,cps: 2,amount:0,ogp: 10 },
                { name: "AI classmates",cost: 30,cps: 5,amount:0,ogp: 30},
                { name: "Catch James",cost: 60,cps: 10,amount:0,ogp: 60},
                { name: "FACTORY",cost: 100,cps: 20,amount:0,ogp: 100},
                { name: "Company",cost: 1000,cps:100,amount:0,ogp: 1000},
                { name: "Boss Eli",cost: 10000,cps: 2000,amount:0,ogp: 10000},
                { name: "JACK CEO",cost: 100000, cps: 500,amount:0,ogp: 100000},


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
            //money count
            this.scoreText = this.add.text( cam.width *0.15 , 30, '£: ' + this.pound, {
                font: '24px Arial',
                fill: '#ffffff'
            }).setDepth(9999).setScale(2,2).setOrigin(0.5, 0);
            this.scoreText.setFontSize(24);
            //cps text
            this.cpstext = this.add.text( cam.width * 0.15 , 130, 'CPS: ' + this.cps, {
                font: '24px Aial',
                fill: '#ffffff'
            }).setDepth(9999).setScale(2,2).setOrigin(0.5, 0);
            //cpc
            this.cpctext = this.add.text( cam.width * 0.15 , 230, 'CPC: ' + this.cpc, {
                font: '24px Aial',
                fill: '#ffffff'
            }).setDepth(9999).setScale(2,2).setOrigin(0.5, 0);
            //rebirths
            this.retxt = this.add.text( cam.width * 0.15 , 330, 'Rebirths: ' + this.rebirths, {
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
            const clotheup = this.add.text(cam.width * 0.2, 500,`${this.clothprice} - Buy new shirt`, {
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
                    if (this.firstbuy === true) {
                        if (this.cpc === 1){
                            shirt.preFX.addColorMatrix().brightness(10);
                        }
                        this.cpc += 1
                        if (this.cpc === 3){
                            this.firstbuy = false;
                        }
                    } else {
                        this.cpc =  Math.round(1.2*this.cpc);
                    }
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
                    if (this.firstbuy === true) {
                        if (this.cpc === 1){
                            shirt.preFX.addColorMatrix().brightness(10);
                        }
                        this.cpc += 1
                        if (this.cpc === 3){
                            this.firstbuy = false;
                        }
                    } else {
                        this.cpc =  Math.round(1.2*this.cpc);
                    }
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
            //rebirth
            let bpr = false
            const rebirth = this.add.text(cam.width * 0.2, 600,`${this.rebirthcost} - Move into new studio`, {
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
            const shirt = this.add.sprite(cam.centerX,cam.centerY, 'shirt').setInteractive().setScale(3,3).setDepth(0)

            shirt.on('pointerdown', (pointer) =>
            {

                shirt.setTint(0x0000ff);
                this.pound += this.cpc * this.multiplyer;
                this.poundtext('#00ff00');
                this.sound.play('coin');
                

            });

            shirt.on('pointerout', () => {shirt.setTint(this.basecolor)});
            shirt.on('pointerup', () => {shirt.setTint(this.basecolor)});
            //HATERS

            const spawn = () => {
                let spawnran = cam.centerX * Phaser.Math.FloatBetween(0, 3);
                let sizeran = Phaser.Math.FloatBetween(0.5, 3);
                let posranX = Phaser.Math.FloatBetween(0.55, 1.55);
                let posranY = Phaser.Math.FloatBetween(0.4, 1.3);
                let speedran = Phaser.Math.Between(1000, 5000);
                let hpran = Phaser.Math.Between(0, 3) *(this.difficulty*0.5);
                let HATE = this.add.sprite(spawnran,cam.centerY*2, 'hate').setInteractive().setDepth(99999).setScale(sizeran,sizeran);

                HATE.on('pointerdown', (pointer) => {

                    HATE.setTint(0xff0000);
                    hpran -= this.cpc
                    if (hpran <1 ) {
                        this.pound += this.cpc*100*this.multiplyer;
                        this.poundtext('#00ff00');
                        this.sound.play('coin');
                        this.totalhater -= 1
                        this.time.delayedCall(125, () => {
                            this.sound.play('DIE');
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
                delay: 7000,      // 1000 ms = 1 second
                loop: true,
                callback: () => {
                    if (this.totalhater < 9) { //the second number +1 is the total
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
