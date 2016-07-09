$(function(){

  // Question Model
  // ----------

  var Question = Backbone.Model.extend({
    type: null,

    answerRecognized: function() {
      return;
    }
  });

  // Question Collection
  // ---------------

  var Questions = Backbone.Collection.extend({
    model: Question,
    localStorage: new Backbone.LocalStorage("lesson-backbone"),

    nextQuestion: function() {
      // return this.next();
    }
  });

  var Lesson = new Questions;

  // Question View
  // --------------

  var QuestionView = Backbone.View.extend({

    tagName:  "div",

    template: _.template($('#question').html()),

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
    },

    initialize: function() {
      Lesson.fetch();
    },

    render: function() {
    }
  });

  var Arcsign = new ArcsignView;

});