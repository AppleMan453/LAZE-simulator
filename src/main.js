class Example extends Phaser.Scene {

    preload () {
        this.load.image('shirt', 'assets/shirt.png');
        this.load.audio("coin","assets/COIN.mp3");
        this.load.audio("broke","assets/broke.mp3");
    }

    create () {

        // ----------------- VALUES -----------------
        this.pound = 0;
        this.cps = 0;

        this.upgrades = [
            { name: "Flynn Labour", cost: 10, cps: 2 },
            { name: "AI classmates", cost: 30, cps: 7 }
        ];

        // ----------------- PLAYER -----------------
        const shirt = this.add.sprite(
            this.scale.width * 0.4,
            this.scale.height * 0.5,
            'shirt'
        ).setInteractive().setScale(3);

        shirt.on('pointerdown', () => {
            shirt.setTint(0x0000ff);
            this.pound++;
            this.updateMoney();
            this.sound.play('coin');
        });

        shirt.on('pointerup', () => shirt.clearTint());
        shirt.on('pointerout', () => shirt.clearTint());

        // ----------------- UI TEXT -----------------
        this.scoreText = this.add.text(
            this.scale.width * 0.05,
            this.scale.height * 0.02,
            '£: 0',
            { font: '32px Arial', fill: '#000' }
        ).setDepth(9999);

        this.title = this.add.text(
            this.scale.width * 0.5,
            0,
            'LAZE SIMULATOR',
            { font: '32px Arial', fill: '#000' }
        ).setOrigin(0.5, 0);

        // ----------------- UPGRADES -----------------
        const uiX = this.scale.width * 0.78;
        const startY = this.scale.height * 0.2;
        const spacing = this.scale.height * 0.12;

        this.upgradeTexts = this.upgrades.map((u, i) => {
            const text = this.add.text(
                uiX,
                startY + i * spacing,
                `${u.name} - £${u.cost}`,
                { font: '32px Arial', fill: '#fff' }
            ).setOrigin(0.5, 0).setInteractive().setDepth(9999);

            text.on('pointerdown', () => this.buyUpgrade(u, text));

            text.on('pointerup', () => text.clearTint());
            text.on('pointerout', () => text.clearTint());

            return text;
        });

        // ----------------- CPS TIMER -----------------
        this.time.addEvent({
            delay: 1000,
            loop: true,
            callback: () => {
                this.pound += this.cps;
                this.updateMoney();
                if (this.cps > 0) this.sound.play('coin');
            }
        });
    }

    // ----------------- LOGIC -----------------

    buyUpgrade(upgrade, text) {
        if (this.pound >= upgrade.cost) {
            this.pound -= upgrade.cost;
            this.cps += upgrade.cps;

            upgrade.cost = Math.floor(upgrade.cost * 1.5);

            text.setText(`${upgrade.name} - £${upgrade.cost}`);
            this.sound.play('coin');

            this.updateMoney();
        } else {
            text.setTint(0xff0000);
            this.sound.play('broke');
        }
    }

    updateMoney() {
        this.scoreText.setText('£: ' + this.pound);
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: window.innerWidth,
    height: window.innerHeight,

    backgroundColor: '#FFFFFF',

    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },

    scene: Example
};

const game = new Phaser.Game(config);
