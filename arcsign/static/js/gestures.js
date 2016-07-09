var gestureStarted = false;

var Gestures = {
  'me': {
    hand: function(hand) {
      var d1 = hand.indexFinger.distal.direction();
      if (d1[2] > 0.8 && !hand.pinky.extended && gestureArmed) {
        window.console.log('ME');
      }
    }
  },
  'hungry': {
    hand: function(hand) [
      if (hand.grabStrength >  0.25 && hand.palmVelocity[1] < -100 && gestureArmed) {
        window.console.log('hungry');
      }
    }
  'thirsty': {
    hand: function(hand) [
      if (hand.grabStrength > 0.20 && hand.palmVelocity[1] < -100 && gestureArmed) {
        gestureStarted;
      }
    }
  }
}
