    class Example extends Phaser.Scene {

        preload () {
            this.load.image('shirt', 'assets/shirt.png');
            this.load.audio("coin","assets/COIN.mp3")
            this.load.audio("broke","assets/broke.mp3")

        }

        create () {
            const cam = this.cameras.main;
            
            const shirt = this.add.sprite(cam.centerX,cam.centerY, 'shirt').setInteractive();
            shirt.setScale(2,2)
            //orientation
            this.scale.on('orientationchange', (orientation) => {
                if (orientation === Phaser.Scale.LANDSCAPE) {
                } else {
                }
            });
            this.pound = 0;
            this.up1 = 10;
            this.up2 = 30;     
            const padding = -50;
            this.cps = 0;
        
            this.poundtext = () => {
                this.scoreText.setText('£: ' + this.pound);
            };
            

            this.scoreText = this.add.text( cam.width * 0.07 , 50, '£: ' + this.pound, {
                font: '32px Arial',
                fill: '#000000'
            }).setDepth(9999); this.scoreText.setScale(2,2); this.scoreText.setOrigin(0.5, 0);
            this.scoreText.setFontSize(24);
            this.cpstext = this.add.text( cam.width * 0.1 , 150, 'CPS: ' + this.cps, {
                font: '32px Arial',
                fill: '#000000'
            }).setDepth(9999); this.cpstext.setScale(2,2); this.cpstext.setOrigin(0.5, 0);
            this.cpstext.setFontSize(24);


            this.title = this.add.text(this.cameras.main.centerX, 0, 'LAZE SIMULATOR', {
                font: '32px Arial',
                fill: '#000000'
            }).setDepth(9999); this.title.setScale(2,2); this.title.setOrigin(0.5, 0)

        

            
            this.upgrade1 = this.add.text(cam.width * 0.85, 100, 'Flynn Labour - £' + this.up1, {
                font: '32px Arial',
                fill: '#ffffff'
            }).setDepth(9999); this.upgrade1.setScale(1.2,1.2); this.upgrade1.setOrigin(0.5, 0);
            const boundsup1 = this.upgrade1.getBounds();
            const up1bg = this.add.graphics();
            up1bg.fillStyle(0x000000, 1);
            this.upgrade1.setFontSize(20);


            up1bg.fillRect(
                boundsup1.x -padding,
                boundsup1.y -padding,
                boundsup1.width + padding * 2,
                boundsup1.height + padding * 2
            );
            this.upgrade1.setInteractive();
            //upgrade 1
            this.upgrade1.on('pointerdown', (pointer) =>
            {
                if (this.pound>this.up1-1) {
                    this.upgrade1.setTint(0x096a09);
                    this.pound -= this.up1;
                    this.poundtext();
                    this.sound.play('coin');
                    this.up1 += 5
                    this.cps+=2
                    this.upgrade1.setText("Flynn Labour - £" + this.up1);
                    this.cpstext.setText('CPS: ' + this.cps);

                } else {
                    this.upgrade1.setTint(0xff0000);
                    this.sound.play('broke');
                }
            
                

            });

            this.upgrade1.on('pointerout', (pointer) =>
            {

                this.upgrade1.clearTint();

            });

            this.upgrade1.on('pointerup', (pointer) =>
            {

                this.upgrade1.clearTint();
            });
            //upgrade 2
            this.upgrade2 = this.add.text(cam.width * 0.85, 200, 'AI classmates - £' + this.up2, {
                font: '32px Arial',
                fill: '#ffffff'
            }).setDepth(9999); this.upgrade2.setScale(1.2,1.2); this.upgrade2.setOrigin(0.5, 0);
            const boundsup2 = this.upgrade2.getBounds();
            const up2bg = this.add.graphics();
            up2bg.fillStyle(0x000000, 1);
            this.upgrade2.setFontSize(20);


            up2bg.fillRect(
                boundsup2.x -padding,
                boundsup2.y -padding,
                boundsup2.width + padding * 2,
                boundsup2.height + padding * 2
            );
            this.upgrade2.setInteractive();
            this.upgrade2.on('pointerdown', (pointer) =>
            {
                if (this.pound>this.up2-1) {
                    this.upgrade2.setTint(0x096a09);
                    this.pound -= this.up2;
                    this.poundtext();
                    this.sound.play('coin');
                    this.up2 += 10
                    this.cps+=7
                    this.upgrade2.setText('AI classmates - £' + this.up2);
                    this.cpstext.setText('CPS: ' + this.cps);

                } else {
                    this.upgrade2.setTint(0xff0000);
                    this.sound.play('broke');
                }
            
                

            });

            this.upgrade2.on('pointerout', (pointer) =>
            {

                this.upgrade2.clearTint();

            });

            this.upgrade2.on('pointerup', (pointer) =>
            {

                this.upgrade2.clearTint();
            });
            //Shirt
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

            //£ps
            this.time.addEvent({
                delay: 1000,      // 1000 ms = 1 second
                loop: true,
                callback: () => {
                    this.pound += this.cps;
                    this.poundtext();
                    if (this.cps>0) {
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
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: isMobile ? 854 : 1280,
            height: isMobile ? 4800 : 720,  
            
        },

        backgroundColor: '#FFFFFF',

        pixelArt: true,
        scene: Example
    };

    const game = new Phaser.Game(config);
