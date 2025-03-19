'use strict'
const game = new Phaser.Game(900, 900, Phaser.AUTO, 'game-canvas', { preload, create, update })
let pl1, cr, map, vrag, num = 0, rot, bl, vragove, bullets, bg, vra, broqch = 0, player, bam, opa, meteori, boo, broqch2, text, boom
let score = 0
let scoreText
let lastShotTime = 0
const shotCooldown = 1000;
let shootKey
let bgm
let volume= 1
let shooting
let rblxboom
let bra 
let wave1t
let wave2t
let vrags = true
let textove
let w2textove
let broqchwave = 0
let textove2
let wave2p = true
let pakbroqchwave = 0
let textove3
let broqch3 = 0
let wavevove = true
let text4
let ggwin
let winText
let winbroqch
let hasPlayedWinAudio = false
const style = { font: "20px 'Press Start 2P'", fill: "#ffffff", stroke: "#000000", strokeThickness: 4, align: "center", fontWeight: 'bold' }


function preload() {
    game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js')
    game.load.image("map", "assets/background-maparcade.png")
    game.load.image("bl", "assets/bullet.png")
    game.load.image("vrag", "assets/meteorite.png")
    game.load.image("pl1", "assets/ship (2).png")
    game.load.spritesheet("boom", "assets/explosion.896x896.7x7.png", 896/7, 896/7)
    game.load.spritesheet("boompak", "assets/explosion.320x320.5x5.png", 320/5, 320/5)
    game.load.audio("background", "assets/bgm.mp3")
    game.load.audio("shooter", "assets/shoot.mp3")
    game.load.audio("ggboom", "assets/nuke-bomb.mp3")
    game.load.audio("score+1", "assets/rblxboom.mp3")
    game.load.audio("win", "assets/gg.mp3")



   
}

function create() {
    bg = game.add.tileSprite(0, 0, game.width, game.height, "map")
    player = game.add.group()
    player.enableBody = true
    cr = game.input.keyboard.createCursorKeys();
    pl1 = player.create(game.width / 2, game.height * 3 / 4, "pl1")
    game.physics.arcade.enable(pl1)
    pl1.scale.setTo(0.7)
    pl1.anchor.setTo(0.5)
    pl1.body.collideWorldBounds = true

    shootKey=game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    vragove = game.add.group()
    vragove.enableBody = true
    bullets = game.add.group()
    bullets.enableBody = true
    boo = game.add.group()

    WebFont.load({
        google: { families: ['Press Start 2P'] }, active: function () {}
    });

    scoreText = game.add.text(700, 20, "Score: 0", { font: "20px 'Press Start 2P'", fill: "#fff" })
    scoreText.fixedToCamera = true

    let somevalue = 0.2
    let volume= somevalue || 2
    bgm = game.add.audio('background')
    bgm.loop = true
    bgm.volume = volume
    bgm.play()
    vragSpawn()

}
function update() {
    game.camera.follow(pl1)
    if (cr.left.isDown) {
        pl1.x -= 10
    } else if (cr.right.isDown) {
        pl1.x += 10
    }
    bg.tilePosition.y += 30
    if (shootKey.isDown) {
        bullet()
    }
    game.physics.arcade.collide(bullets, vragove, die)
    game.physics.arcade.collide(player, vragove, gg)

    
    broqcha()

}

function vragSpawn() {
    if (pl1.alive && score<2) {
        textove = game.add.text(10, 10, "Stage 1", style)

        vrag = vragove.create(0, 0, "vrag")
        game.physics.arcade.enable(vrag)
        vrag.body.velocity.y += 600
        vrag.x = game.rnd.realInRange(0+vrag.width/2, 900-vrag.width/2)
        vrag.y = 0
        vrag.scale.setTo(0.7)
        vrag.anchor.setTo(0.5)
        
    }
            }
    function wave2(){
            if (pl1.alive && score >= 2) {
                vrag = vragove.create(0, 0, "vrag")
                game.physics.arcade.enable(vrag)
                vrag.body.velocity.y += 700
                vrag.body.velocity.x += 200
                vrag.x = game.rnd.realInRange(-900 + vrag.width, 900 - vrag.width)
                vrag.y = 0
                vrag.scale.setTo(0.7)
                vrag.anchor.setTo(0.5)
            }
        }
        function wave3(){
            if (pl1.alive && score >= 4) {
                vrag = vragove.create(0, 0, "vrag")
                game.physics.arcade.enable(vrag)
                vrag.body.velocity.y += 700
                vrag.body.velocity.x += 200
                vrag.x = game.rnd.realInRange(-900 + vrag.width, 900 - vrag.width)
                vrag.y = 0
                vrag.scale.setTo(0.7)
                vrag.anchor.setTo(0.5)
            }
        }
        function wave3pak(){
            if (pl1.alive && score >= 4) {
                vrag = vragove.create(0, 0, "vrag")
                game.physics.arcade.enable(vrag)
                vrag.body.velocity.y += 700
                vrag.body.velocity.x -= 200
                vrag.x = game.rnd.realInRange(0 - vrag.width, 1800 - vrag.width)
                vrag.y = 0
                vrag.scale.setTo(0.7)
                vrag.anchor.setTo(0.5)
            }
        }


function die(_bl, _vrag) {
    const explosionX = _vrag.x
    const explosionY = _vrag.y
    _vrag.kill()
    _bl.kill()
    explosia(explosionX, explosionY)
    score += 1
    scoreText.text = "Score: " + score
    bra = game.add.audio('score+1')
        bra.volume = volume
        bra.play()
}

function bullet() {
    const currentTime = game.time.now
    if (pl1.alive && (currentTime - lastShotTime) >=shotCooldown) {
        bl = bullets.create(pl1.x, pl1.y, "bl")
        game.physics.arcade.enable(bl)
        bl.scale.setTo(1.5)
        bl.anchor.setTo(0.5)
        bl.body.velocity.y -= 600;
        lastShotTime = currentTime
        if(bl.y<=-20){
            bl.kill()
        }

        
        shooting = game.add.audio('shooter')
        shooting.volume = volume-0.5
        shooting.play()
    }
}

function explosia(x, y) {
    const boom = game.add.sprite(x, y, 'boom')
    boom.animations.add('explode', [], 20, false)
    boom.animations.play('explode')
    boom.events.onAnimationComplete.add(() => boom.destroy())
}

function broqcha() {
    broqch++

    if (vrags && broqch >= 10 && pl1.alive) { 
        vragSpawn();
        broqch = 0;
    }

    if (broqch >= 5 && pl1.alive && score >= 2 && wave2p) {
        textove2 = game.add.text(10, 10, "Stage 2", style)
        textove.kill()
        broqchwave++
        vrags = false
        console.log(broqchwave)
        if(broqchwave>=200){
wave2()
   broqch = 0;
      
        }
    }
    broqch3++
    if(broqch3 >= 8 && pl1.alive && score >= 4 && wavevove){
        broqchwave = 0
        broqchwave--
        textove3 = game.add.text(10, 10, "Stage 3: FINAL STAGE", style)
        textove2.kill()
        pakbroqchwave++
        wave2p = false
        console.log(pakbroqchwave)
        if(pakbroqchwave>=200){
wave3()
wave3pak()
   broqch3 = 0;
    }
}
if(score >=6 && pl1.alive){
    wavevove = false
    pakbroqchwave=0
    pakbroqchwave--
    wining()
}
}


function bambam() {
    const playerX = pl1.x
    const playerY = pl1.y
    const boom = game.add.sprite(playerX, playerY, 'boompak')
    boom.animations.add('explode', [], 30, false)
    boom.animations.play('explode')
    boom.events.onAnimationComplete.add(() => boom.destroy())
    boom.scale.setTo(10)
    boom.anchor.setTo(0.5)
}

function gg(_vrag) {
    pl1.kill()
    _vrag.kill()
    bambam()
    bullets.kill()
    bgm.stop()

    scoreText.text = "Score: " + score
    rblxboom = game.add.audio('ggboom')
    rblxboom.volume = 3
    rblxboom.play()

    text = game.add.text(game.width / 2, game.height / 2, "GAME OVER :(", style)
    text.anchor.set(0.5)
    text.scale.set(2)
    
    const restartText = game.add.text(
        game.camera.x + game.camera.width / 2,
        game.camera.y + game.camera.height / 2 + 80,
        "CLICK R TO RESTART",
        Object.assign({}, style, { fontSize: '14px' })
    );
    restartText.anchor.set(0.5);
    restartText.fixedToCamera = true;
    
    const restartKey = game.input.keyboard.addKey(Phaser.Keyboard.R);
    restartKey.onDown.addOnce(() => {
        game.state.restart()
        score = 0;
        vrags = true
        wave2p = true
        broqchwave = 0
        rblxboom.stop()
        pakbroqchwave=0
        winbroqch=0
        broqch3 = 0
        wavevove = true
    })
}
    function wining(){
        winbroqch++
    if(winbroqch>=50 && !hasPlayedWinAudio && pl1.alive){
        bgm.stop()
        textove3.kill()
    ggwin = game.add.audio('win')
    ggwin.volume = 1
    ggwin.play()
    hasPlayedWinAudio = true
    

    text4 = game.add.text(game.width / 2, game.height / 2, "GG", style)
    text4.anchor.set(0.5)
    text4.scale.set(2)
    
    const winText = game.add.text(
        game.camera.x + game.camera.width / 2,
        game.camera.y + game.camera.height / 2 + 80,
        "CLICK R TO RESTART",
        Object.assign({}, style, { fontSize: '14px' })
    );
    winText.anchor.set(0.5);
    winText.fixedToCamera = true;
    
    const Key = game.input.keyboard.addKey(Phaser.Keyboard.R);
    Key.onDown.addOnce(() => {
        game.state.restart()
        score = 0;
        vrags = true
        wave2p = true
        broqchwave = 0
        ggwin.stop()
        pakbroqchwave=0
        pakbroqchwave++
        broqch3 = 0
        wavevove = true
        winbroqch=0

    })
}
    }

