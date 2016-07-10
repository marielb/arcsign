$(function(){

  // Question Model
  // ----------

  var Question = Backbone.Model.extend({
    GESTURE_TYPE: 'gesture',
    TEXT_TYPE: 'text',

    // Default attributes for the todo item.
    defaults: function() {
      return {
        answerList: [],
        answered: false,
        userAnswer: '',
      };
    },

    initialize: function() {
      this.answerList = this.get('answer').split(' ');
    },

    recordAnswer: function() {
      var self = this;
      self.gestureArmed = true;
      Leap.loop({background: true}, {
        frame: function(frame) {
          if (frame.hands.length == 2 && frame.hands[0].palmVelocity[2] > 200 && frame.hands[1].palmVelocity[2] > 200 && self.gestureArmed) {
            self.gestureTrigger('want');
          } else if (frame.hands.length == 1) {
            hand = frame.hands[0];
            var d1 = hand.indexFinger.distal.direction();
            if (hand.palmVelocity[1] < -300 && hand.grabStrength > 0.1 && self.gestureArmed) {
              console.log(' velocity[1]: ' + hand.palmVelocity[1] + ' grabStrength: ' + hand.grabStrength +' ' + self.gestureArmed);
              self.gestureTrigger('hungry');
            }
            if (hand.palmVelocity[2] > 300 && d1[2] > 0.25 && self.gestureArmed) {
              console.log('velocity[2]: ' + hand.palmVelocity[2] + ' fingerDirection: ' + d1[2] + ' ' + self.gestureArmed);
              self.gestureTrigger('me');
            }
            if (hand.palmVelocity[2] < -300 && d1[2] < -0.25 && self.gestureArmed) {
              console.log('velocity[2]: ' + hand.palmVelocity[2] + ' fingerDirection: ' + d1[2] + ' ' + self.gestureArmed);
              self.gestureTrigger('you');
            }
          }
        }
      })
    },

    gestureTrigger: function(name) {
      this.gestureArmed = false;
      console.log('gestureTrigger: ' + name);

      if (name == this.answerList[0]) {
        this.answerList.shift();
        this.set('userAnswer', this.get('userAnswer') + name + ' ');
        if (this.answerList.length == 0) {
          this.set('answered', true);
        }
      }

      var self = this;
      setTimeout(function() { self.gestureArmed = true; }, 1000);
    }
  });

  // Question Collection
  // ---------------

  var Questions = Backbone.Collection.extend({
    model: Question,
    url: '/static/js/lesson.json',
    localStorage: new Backbone.LocalStorage('lesson-backbone'),

    currentQuestion: 0,

    refreshFromServer: function() {
      return Backbone.ajaxSync('read', this);
    },

    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },

    getQuestion: function() {
      return this.at(this.currentQuestion);
    },

    destroy: function() {
      this.currentQuestion += 1;

      var model;
      while (model = this.first()) {
        model.destroy();
      }
    }
  });

  var Lesson = new Questions;

  // Question View
  // --------------

  var QuestionView = Backbone.View.extend({

    tagName:  'div',

    template: _.template($('#question-template').html()),

    events: {
      // "click .submit"   : "evaluateAnswer"
    },

    initialize: function() {
      this.model.recordAnswer();
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    clear: function() {
      this.model.destroy();
    }

  });

  // ArcsignView
  // ---------------

  var ArcsignView = Backbone.View.extend({

    el: $(document),

    events: {
      'click #start-over': 'reset',
      'click #next-question': 'loadNextQuestion',
      'keyup': 'keyAction'
    },

    initialize: function() {
      this.listenTo(Lesson, 'reset', this.render);
      var view = this;
      Lesson.fetch({
        success: function(collection) {
          if (collection.length == 0) {
            view.reset();
          }
          view.render();
        }
      });
    },

    reset: function() {
      Lesson.destroy();
      Lesson.refreshFromServer().done(
        function(data) {
          Lesson.reset(data);
          Lesson.each(function(model) {
              model.save();
          });
        }
      );
    },

    render: function() {
      var question = Lesson.getQuestion();
      var view = new QuestionView({model: question});
      this.$("#question-box").html(view.render().el);
    },

    loadNextQuestion: function() {
      if (Lesson.currentQuestion < Lesson.length - 1) {
        Lesson.currentQuestion += 1;
        this.render();
      }
    },


    keyAction: function(e) {
      var code = e.keyCode || e.which;
      if (code == 32) { 
          this.loadNextQuestion();
      }
    }
  });

  var Arcsign = new ArcsignView;

});