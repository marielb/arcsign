
var Gestures = {
  'me': {
    hand: function(hand) {
      var gestureArmed = true;
      var d1 = hand.indexFinger.distal.direction();
      if (d1[2] > 0.8 && gestureArmed) {
        window.console.log('ME');
      }
    }
  }
}
