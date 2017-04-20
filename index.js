$().ready(function(){
  
  var BeatBox = function(beat, top, left) {
    this.beat = beat;
    this.$node = $(`<div class="beat-box ${this.beat}"></div>`);

    var screenPosition = {
      top: top + 'px',
      left: left + 'px'
    };

    this.$node.css(screenPosition);

    var beatSound = `<audio loop id="${this.beat}-sound" src="${this.beat}.mp3"> </audio>`;

    this.$node.append(beatSound);
  }

  BeatBox.prototype.constructore = BeatBox;


  BeatBox.prototype.startAnimate = function() {
    console.log('animated!', this.$node);
    this.$node.toggleClass(this.beat + '-animate')
  }

  BeatBox.prototype.stopAnimate = function() {
    console.log('stop animate.', this.$node);
    this.$node.toggleClass(this.beat + '-animate')
  }

  BeatBox.prototype.playBeat = function() {
    
    $(this.$node).find('#' + this.beat + "-sound")[0].play();
    console.log('playing beat!');
  }

  BeatBox.prototype.pauseBeat = function() {
    $(this.$node).find('#' + this.beat + "-sound")[0].pause();
    console.log('paused beat.');
  }

  $('#beat-select').on('change', function() {

    var beat = $("#beat-select").val();
    var screenY = Math.random() * ($('body').height() - 100);
    var screenX = Math.random() * ($('body').width() - 100);
    var beatBox = new BeatBox(beat, screenY, screenX);

    $('body').append(beatBox.$node);

    
    beatBox.$node.on('mouseover', beatBox.playBeat.bind(beatBox));
    beatBox.$node.on('mouseover', beatBox.startAnimate.bind(beatBox));

    beatBox.$node.on('mouseout', beatBox.pauseBeat.bind(beatBox));
    beatBox.$node.on('mouseout', beatBox.stopAnimate.bind(beatBox));
    
  });
});
