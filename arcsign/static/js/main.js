$(function(){

  // Question Model
  // ----------

  var Question = Backbone.Model.extend({
    answerRecognized: function() {
      return;
    }
  });

  // Question Collection
  // ---------------

  var Questions = Backbone.Collection.extend({
    GESTURE_TYPE: 'gesture',
    TEXT_TYPE: 'text',

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

    el: $("#arcsign"),

    events: {
      'click #start-over': 'reset',
      'click #prev-question': 'loadPreviousQuestion',
      'click #next-question': 'loadNextQuestion',
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

    loadPreviousQuestion: function() {
      if (Lesson.currentQuestion > 0) {
        Lesson.currentQuestion -= 1;
        this.render();
      }
    },

    loadNextQuestion: function() {
      if (Lesson.currentQuestion < Lesson.length - 1) {
        Lesson.currentQuestion += 1;
        this.render();
      }
    }
  });

  var Arcsign = new ArcsignView;

});