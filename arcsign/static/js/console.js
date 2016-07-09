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
  pinky: document.getElementById('output_pinky')
};


window.TO_DEG = 180 / Math.PI;

var fingerNames = ['thumb', 'indexFinger', 'middleFinger', 'ringFinger', 'pinky'];



// Set up the controller:
Leap.loop({background: true}, {
  hand: function(hand){
    _.forEach(fingerNames, function(finger) {
      dir = hand[finger].distal.direction();
      output[finger].innerHTML = 'X:' + dir[0] + ' Y:' + dir[1] + ' Z:' + dir[2];
    });
 }
});

