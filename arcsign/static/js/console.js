// var output_rad = document.getElementById('output_rad'),
//   output_deg = document.getElementById('output_deg'),
//   progress = document.getElementById('progress');
//   hand_obj = document.getElementById('hand_object');

var output_thumb = document.getElementById('output_thumb');
  output_indexFinger = document.getElementById('output_indexFinger');
  output_middleFinger = document.getElementById('output_middleFinger');
  output_ringFinger = document.getElementById('output_ringFinger');
  output_pinky = document.getElementById('output_pinky');

var output = {
  thumb: document.getElementById('output_thumb'),
  indexFinger: document.getElementById('output_indexFinger'),
  middleFinger: document.getElementById('output_middleFinger'),
  ringFinger: document.getElementById('output_ringFinger'),
  pinky: document.getElementById('output_pinky'),
  grabStrength: document.getElementById('output_grabStrength'),
  palmNormal: document.getElementById('output_palmNormal'),
  palmPosition: document.getElementById('output_palmPosition'),
  palmVelocity: document.getElementById('output_palmVelocity')
};


window.TO_DEG = 180 / Math.PI;

var fingerNames = ['thumb', 'indexFinger', 'middleFinger', 'ringFinger', 'pinky'];
var handProperties = ['grabStrength', 'palmNormal', 'palmPosition', 'palmVelocity']

function gestureTrigger(name) {
  gestureArmed = false;
  window.console.log('Gesture Triggered: ' + name);
  setTimeout(function() {gestureArmed = true;}, 3000);
}

function displayVector(v) {
  return 'X:' + v[0] + ' Y:' + v[1] + ' Z:' + v[2];
}

var gestureArmed = true;
// Set up the controller:
Leap.loop({background: true}, {
  hand: function(hand){
    _.forEach(fingerNames, function(finger) {
      dir = hand[finger].distal.direction();
      output[finger].innerHTML = " extended: " + hand[finger].extended + " " + displayVector(dir);
    });
    _.forEach(handProperties, function(property) {
      prop = hand[property];
      if (Array.isArray(prop)) {
        output[property].innerHTML = displayVector(prop);
      } else {
        output[property].innerHTML = prop.toPrecision(2);
      }
    });

    if (hand.grabStrength >  0.2 && hand.palmVelocity[1] < -100 &&  hand.palmNormal[2] > 0.75 &&  hand.pinky.extended && gestureArmed) {
      gestureTrigger('hungry');
      window.console.log(hand);
    }
    if (hand.indexFinger.distal.direction()[2] > 0.8 && !(hand.pinky.extended || hand.ringFinger.extended) && gestureArmed) {
      window.console.log(hand);
      gestureTrigger('me');
    }
  }
}
         );

