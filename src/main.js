    class Example extends Phaser.Scene {

        preload () {
            this.load.image('shirt', 'assets/shirt.png');
            this.load.audio("coin","assets/COIN.mp3")
            this.load.audio("broke","assets/broke.mp3")

        }

        create () {
            //variables
            const cam = this.cameras.main;
            const clearTint = (upgrade) => upgrade.clearTint();
            const upgrades = [
                { name: "Flynn worker",cost: 10,cps: 2,amount:0 },
                { name: "AI classmates",cost: 30,cps: 5,amount:0},
                { name: "Catch James",cost: 60,cps: 10,amount:0},
                { name: "FACTORY",cost: 100,cps: 20,amount:0},


            ];
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
            this.poundtext = () => {
                this.scoreText.setColor('#00ff00');
                this.scoreText.setText('£: ' + this.pound);
                this.time.delayedCall(200, () => {
                    this.scoreText.setColor('#000000');
                });
            };
            //money count
            this.scoreText = this.add.text( cam.width *0.02,30, '£: ' + this.pound, {
                font: '24px Arial',
                fill: '#000000'
            }).setDepth(9999).setScale(2,2).setOrigin(0.5, 0);
            this.scoreText.setFontSize(24);
            //cps text
            this.cpstext = this.add.text( cam.width *0.02,130, 'CPS: ' + this.cps, {
                font: '24px Aial',
                fill: '#000000'
            }).setDepth(9999).setScale(2,2).setOrigin(0.5, 0);
            //title
            this.title = this.add.text(this.cameras.main.centerX, 0, 'LAZE SIMULATOR', {
                font: '32px Arial',
                fill: '#000000'
            }).setDepth(9999).setScale(2,2).setOrigin(0.5, 0)
            //upgrades
            upgrades.forEach((upgrade,index) => {
                //getting the y position
                const y = 100 + (index*80)
                let bp = false

                const upgradetext = this.add.text(cam.width*0.82,y,`${upgrade.name} - £${upgrade.cost}`,{
                    font: '20px Arial',
                    fill: '#ffffff'
                }).setInteractive().setDepth(9999).setScale(1.5,1.5).setOrigin(0.5, 0.5);

                upgradetext.on("pointerdown",()=>{
                    if (this.pound>upgrade.cost-1 && bp === false) {
                        bp = true
                        upgradetext.setTint(0x90ee90);
                        this.pound -= upgrade.cost; 
                        this.poundtext();
                        this.sound.play('coin');
                        upgrade.cost = Math.round(upgrade.cost*1.2);
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
                        this.poundtext();
                        this.sound.play('coin');
                        upgrade.cost += 5;
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

            });
            
            //Shirt 
            const shirt = this.add.sprite(cam.centerX,cam.centerY, 'shirt').setInteractive().setScale(2,2)setDepth(0)
            shirt.on('pointerdown', (pointer) =>
            {

                shirt.setTint(0x0000ff);
                this.pound += 1;
                this.poundtext();
                this.sound.play('coin');
                

            });

            shirt.on('pointerout', function (pointer)
            {

                shirt.clearTint();

            });

            shirt.on('pointerup', function (pointer)
            {

                shirt.clearTint();

            });
            //CPS
            this.time.addEvent({
                delay: 1000,      // 1000 ms = 1 second
                loop: true,
                callback: () => {
                    if (this.cps>0) {
                        this.pound += this.cps;
                        this.poundtext();
                        this.sound.play('coin');
                        console.log(this.pound);
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
            mode: Phaser.Scale.RESIZE,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: isMobile ? 854 : 1280,
            height: isMobile ? 480 : 720,  
            
        },

        backgroundColor: '#FFFFFF',

        pixelArt: true,
        scene: Example
    };

    const game = new Phaser.Game(config);
