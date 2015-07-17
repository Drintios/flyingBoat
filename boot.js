 
var boot = {
    preload: function(){ 
        game.load.image("gametitle","assets/portada.png");
        game.load.image("play","assets/play.png");
    },
    create: function(){
        this.gameTitle = this.game.add.sprite(0, 0, 'gametitle');
        this.gameTitle.scale.set(0.63, 0.67);
        this.playButton = this.game.add.button(137, 480,"play",this.playTheGame,this);
        this.playButton.scale.set(0.5, 0.5);

        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.minWidth = 400;
        this.scale.minHeight = 630;
        this.scale.maxWidth = 980;
        this.scale.maxHeight = 1543;
        game.scale.refresh();
        
    },
    playTheGame: function(){
      this.game.state.start('main');
    }
}