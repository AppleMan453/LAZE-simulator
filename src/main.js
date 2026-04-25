const isMobile = window.innerWidth < 768;

class Example extends Phaser.Scene {

    preload() {
        this.load.image('shirt', 'assets/shirt.png');
        this.load.audio('coin', 'assets/COIN.mp3');
        this.load.audio('broke', 'assets/broke.mp3');
    }

    create() {
        const W = this.scale.width;
        const H = this.scale.height;
        const scale = W / (isMobile ? 480 : 1280);
        const cam = this.cameras.main;
        const s = (n) => n * scale; // shorthand helper

        // state
        this.pound = 0;
        this.cps = 0;

        const upgrades = [
            { name: 'Flynn worker',   cost: 10,  cps: 2,  amount: 0 },
            { name: 'AI classmates',  cost: 30,  cps: 5,  amount: 0 },
            { name: 'Catch James',    cost: 60,  cps: 10, amount: 0 },
            { name: 'FACTORY',        cost: 100, cps: 20, amount: 0 },
        ];

        // helpers
        const clearTint = (obj) => obj.clearTint();
        const txt = (x, y, str, size, color = '#000000') =>
            this.add.text(x, y, str, { font: `${size}px Arial`, fill: color })
                .setDepth(9999).setOrigin(0.5, 0);

        // UI text
        this.title     = txt(cam.centerX,      0,         'LAZE SIMULATOR', 32).setScale(s(1.5));
        this.scoreText = txt(cam.width * 0.15, s(30),     '£: 0',           24).setScale(s(1.5));
        this.cpstext   = txt(cam.width * 0.15, s(100),    'CPS: 0',         24).setScale(s(1.5));

        this.poundtext = () => {
            this.scoreText.setText('£: ' + this.pound).setColor('#00ff00');
            this.time.delayedCall(200, () => this.scoreText.setColor('#000000'));
        };

        // shirt
        const shirt = this.add.sprite(cam.centerX, H * 0.28, 'shirt')
            .setInteractive().setDepth(0).setScale(s(2));
        shirt.on('pointerdown', () => { shirt.setTint(0x0000ff); this.pound++; this.poundtext(); this.sound.play('coin'); });
        shirt.on('pointerout',  () => shirt.clearTint());
        shirt.on('pointerup',   () => shirt.clearTint());

        // upgrades
        upgrades.forEach((upgrade, index) => {
            const y = H * 0.6 + s(index * 80);
            let bp = false;

            const upgradetext = this.add.text(cam.width * 0.82, y,
                `${upgrade.name} - £${upgrade.cost}`,
                { font: '20px Arial', fill: '#ffffff' }
            ).setInteractive().setDepth(9999).setScale(s(1.2)).setOrigin(0.5, 0.5);

            const upbg = this.add.graphics().setInteractive();

            const rupbg = () => {
                const b = upgradetext.getBounds();
                upbg.clear();
                upbg.fillStyle(0x000000, 1);
                upbg.fillRect(b.x - 5, b.y - 5, b.width + 10, b.height + 10);
            };
            rupbg();

            const buy = () => {
                if (this.pound >= upgrade.cost && !bp) {
                    bp = true;
                    upgradetext.setTint(0x90ee90);
                    this.pound -= upgrade.cost;
                    this.poundtext();
                    this.sound.play('coin');
                    upgrade.cost += 5;
                    upgrade.amount++;
                    this.cps += upgrade.cps;
                    upgradetext.setText(`${upgrade.amount} - ${upgrade.name} - £${upgrade.cost}`);
                    this.cpstext.setText('CPS: ' + this.cps);
                    rupbg();
                } else {
                    upgradetext.setTint(0xff0000);
                    this.sound.play('broke');
                }
            };

            const reset = (obj) => () => { clearTint(obj === 'text' ? upgradetext : upgradetext); bp = false; };

            upgradetext.on('pointerdown', buy);
            upgradetext.on('pointerout', () => { clearTint(upgradetext); bp = false; });
            upgradetext.on('pointerup',  () => { clearTint(upgradetext); bp = false; });

            upbg.on('pointerdown', buy);
            upbg.on('pointerout', () => { clearTint(upgradetext); bp = false; });
            upbg.on('pointerup',  () => { clearTint(upgradetext); bp = false; });
        });

        // CPS timer
        this.time.addEvent({
            delay: 1000, loop: true,
            callback: () => {
                if (this.cps > 0) {
                    this.pound += this.cps;
                    this.poundtext();
                    this.sound.play('coin');
                }
            }
        });

        // orientation
        this.scale.on('orientationchange', (orientation) => {
            this.scale.resize(
                orientation === Phaser.Scale.LANDSCAPE ? 854 : 480,
                orientation === Phaser.Scale.LANDSCAPE ? 480 : 854
            );
            this.scene.restart();
        });
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width:  isMobile ? 480  : 1280,
        height: isMobile ? 854  : 720,
    },
    backgroundColor: '#FFFFFF',
    pixelArt: true,
    scene: Example
};

const game = new Phaser.Game(config);
