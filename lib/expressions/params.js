// Generated by CoffeeScript 1.6.2
(function() {
  var CollectionExpression, Evaluator, ParamsExpression, _ref, _ref1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  CollectionExpression = require("./collection");

  Evaluator = (function(_super) {
    __extends(Evaluator, _super);

    function Evaluator() {
      _ref = Evaluator.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Evaluator.prototype.toString = function() {
      var buffer;

      buffer = this.items.map(function(item) {
        return item.toString();
      });
      return ["(", buffer.join(","), ")"].join("");
    };

    return Evaluator;

  })(CollectionExpression.Evaluator);

  ParamsExpression = (function(_super) {
    __extends(ParamsExpression, _super);

    function ParamsExpression() {
      _ref1 = ParamsExpression.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    ParamsExpression.prototype._type = "params";

    ParamsExpression.prototype.evaluate = function(context) {
      return new Evaluator(this, context);
    };

    return ParamsExpression;

  })(CollectionExpression);

  module.exports = ParamsExpression;

}).call(this);