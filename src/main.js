class Example extends Phaser.Scene {

    preload () {
        this.load.image('shirt', 'assets/shirt.png');
        this.load.audio("coin","assets/COIN.mp3");
        this.load.audio("broke","assets/broke.mp3");
    }

    create () {

        const cam = this.cameras.main;

        // ---------------- CORE VALUES ----------------
        this.pound = 0;
        this.cps = 0;

        this.updateMoney = () =>
            this.scoreText.setText('£: ' + this.pound);

        // ---------------- PLAYER ----------------
        const shirt = this.add.sprite(
            cam.centerX,
            cam.centerY,
            'shirt'
        ).setInteractive().setScale(3);

        shirt.on('pointerdown', () => {
            this.pound++;
            this.updateMoney();
            this.sound.play('coin');
        });

        shirt.on('pointerup', () => shirt.clearTint());
        shirt.on('pointerout', () => shirt.clearTint());

        // ---------------- UI ----------------
        this.scoreText = this.add.text(20, 20, '£: 0', {
            font: '32px Arial',
            fill: '#000'
        });

        // ---------------- UPGRADES ----------------
        this.upgrades = [
            { name: "Flynn Labour", cost: 10, cps: 2 },
            { name: "AI classmates", cost: 30, cps: 7 }
        ];

        const startX = cam.width * 0.75;
        const startY = cam.height * 0.2;
        const spacing = cam.height * 0.12;

        this.upgrades.forEach((u, i) => {

            const text = this.add.text(
                startX,
                startY + i * spacing,
                `${u.name} - £${u.cost}`,
                { font: '32px Arial', fill: '#fff' }
            ).setInteractive().setDepth(9999);

            text.on('pointerdown', () => {

                if (this.pound >= u.cost) {

                    this.pound -= u.cost;
                    this.cps += u.cps;

                    u.cost = Math.floor(u.cost * 1.5);

                    text.setText(`${u.name} - £${u.cost}`);

                    this.sound.play('coin');
                    this.updateMoney();

                } else {
                    text.setTint(0xff0000);
                    this.sound.play('broke');
                }
            });

            text.on('pointerout', () => text.clearTint());
        });

        // ---------------- CPS ----------------
        this.time.addEvent({
            delay: 1000,
            loop: true,
            callback: () => {
                this.pound += this.cps;
                this.updateMoney();
            }
        });
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

new Phaser.Game(config);
