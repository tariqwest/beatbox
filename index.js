$().ready(function() {
  window.beatBoxes = [];
  var BeatBox = function(beat, top, left) {
    this.beat = beat;
    this.color = this._randomColor();
    this.$node = $(`<div class="beat-box ${this.beat}"></div>`);

    var displayProperties = {
      'top': top + 'px',
      'left': left + 'px',
      'background-color': this.color
    };

    this.$node.css(displayProperties);

    var beatSound = `<audio loop id="${this.beat}-sound" src="${this.beat}.mp3"> </audio>`;

    this.$node.append(beatSound);
  }

  BeatBox.prototype.constructor = BeatBox;


  BeatBox.prototype._randomColor = function() {
    return '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
  }

  BeatBox.prototype.changeColor = function() {
    console.log('color changed!', this.$node);
    this.color = this._randomColor();
    this.$node.css('background-color', this.color);
  }

  BeatBox.prototype.startAnimate = function() {
    console.log('animated!', this.$node);
    this.$node.toggleClass(this.beat + '-animate');
  }

  BeatBox.prototype.stopAnimate = function() {
    console.log('stop animate.', this.$node);
    this.$node.toggleClass(this.beat + '-animate');
  }

  BeatBox.prototype.playBeat = function() {

    $(this.$node).find('#' + this.beat + "-sound")[0].play();
    console.log('playing beat!');
  }

  BeatBox.prototype.pauseBeat = function() {
    $(this.$node).find('#' + this.beat + "-sound")[0].pause();
    console.log('paused beat.');
  }

  $('button').on('click', function() {

    var beat = $(this).val();
    var screenY = (Math.random() * ($('body').height() - 200)) + 100;
    var screenX = (Math.random() * ($('body').width() - 100)) - 50;
    var beatBox = new BeatBox(beat, screenY, screenX);

    $('body').append(beatBox.$node);

    window.beatBoxes.push(beatBox);

    beatBox.$node.on('click', beatBox.changeColor.bind(beatBox));

    beatBox.$node.on('mouseover', beatBox.playBeat.bind(beatBox));
    beatBox.$node.on('mouseover', beatBox.startAnimate.bind(beatBox));

    beatBox.$node.on('mouseout', beatBox.pauseBeat.bind(beatBox));
    beatBox.$node.on('mouseout', beatBox.stopAnimate.bind(beatBox));

  });
});
