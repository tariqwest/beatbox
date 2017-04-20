$().ready(function() {
  window.beatBoxes = [];
  var BeatBox = function(beat, top, left) {

    // Here we set the BeatBox's beat, color and position
    this.beat = beat;
    this.color = this._randomColor();

    // Based on this BeatBox's data, we set up a BeatBox DOM node 
    this.$node = $(`<div class="beat-box ${this.beat}"></div>`);

    // display properties for the BeatBox's DOM node as it will appear on screen
    var display = {
      'top': top + 'px',
      'left': left + 'px',
      'background-color': this.color
    };

    // sound element for playing the BeatBox's sound
    var sound = `<audio loop id="${this.beat}-sound" src="${this.beat}.mp3"> </audio>`;

    // add display properties  and sound to BeatBox DOM node
    this.$node.css(display);
    this.$node.append(sound);
  }

  // Here we setup some useful functions that will allow the BeatBox 
  // to update its data and its representation in the DOM
  BeatBox.prototype.constructor = BeatBox;

  BeatBox.prototype._randomColor = function() {
    return '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
  }

  BeatBox.prototype.changeColor = function() {
    this.color = this._randomColor();
    this.$node.css('background-color', this.color);
  }

  BeatBox.prototype.startAnimate = function() {
    this.$node.toggleClass(this.beat + '-animate');
  }

  BeatBox.prototype.stopAnimate = function() {
    this.$node.toggleClass(this.beat + '-animate');
  }

  BeatBox.prototype.playBeat = function() {
    $(this.$node).find('#' + this.beat + "-sound")[0].play();
  }

  BeatBox.prototype.pauseBeat = function() {
    $(this.$node).find('#' + this.beat + "-sound")[0].pause();
  }

  // Finally, we detect user input and create and/or update BeatBoxes
  $('button').on('click', function() {

    // create a new BeatBox based on user input, 
    // and some randomly generated inputs
    var beat = $(this).val();
    var screenY = (Math.random() * ($('body').height() - 200)) + 100;
    var screenX = (Math.random() * ($('body').width() - 100)) - 50;
    var beatBox = new BeatBox(beat, screenY, screenX);

    // add the BeatBox's DOM node to the DOM so it appears on screen
    $('body').append(beatBox.$node);

    window.beatBoxes.push(beatBox);

    // user initiated events that trigger changes to the BeatBox
    beatBox.$node.on('click', beatBox.changeColor.bind(beatBox));

    beatBox.$node.on('mouseover', beatBox.playBeat.bind(beatBox));
    beatBox.$node.on('mouseover', beatBox.startAnimate.bind(beatBox));

    beatBox.$node.on('mouseout', beatBox.pauseBeat.bind(beatBox));
    beatBox.$node.on('mouseout', beatBox.stopAnimate.bind(beatBox));

  });
});
