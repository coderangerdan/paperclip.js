// Generated by CoffeeScript 1.6.2
var Build, formatter, parser, path, walkr, watch_r, _,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

watch_r = require("watch_r");

walkr = require("walkr");

path = require("path");

_ = require("underscore");

parser = require("../translate/template/parser");

formatter = require("../translate/template/formatter");

/*
 Compiles node.js files
*/


Build = (function() {
  /*
  */
  function Build() {
    this._destFile = __bind(this._destFile, this);
    this._parseFile = __bind(this._parseFile, this);
  }

  /*
  */


  Build.prototype.start = function(options) {
    this.options = options != null ? options : {};
    _.defaults(options, {
      extension: "pc"
    });
    this._pretty = options.format;
    this._ext = options.extension;
    this._match = new RegExp("\\." + this._ext + "$");
    return this.parse(options);
  };

  /*
  */


  Build.prototype.parse = function(options) {
    var match,
      _this = this;

    match = this._match;
    this._input = this._fixInput(options.input);
    this._output = this._fixInput(options.output);
    if (options.watch) {
      return this._watch();
    } else {
      return walkr(this._input).filterFile(function(file, next) {
        return _this._parseFile(file.source, next);
      }).start(function() {});
    }
  };

  /*
  */


  Build.prototype._fixInput = function(input) {
    return path.resolve(input.replace(/^\./, process.cwd()).replace(/^~/, process.env.HOME));
  };

  /*
  */


  Build.prototype._watch = function() {
    var _this = this;

    return watch_r(this._input, function(err, monitor) {
      monitor.on("change", function(target) {
        return _this._parseFile(target.path);
      });
      monitor.on("file", function(target) {
        return _this._parseFile(target.path);
      });
      return monitor.on("remove", function(target) {
        var output;

        fs.unlink(output = _this._destFile(target.path));
        return console.log("rm", output);
      });
    });
  };

  /*
  */


  Build.prototype._parseFile = function(source, next) {
    var destination,
      _this = this;

    if (next == null) {
      next = (function() {});
    }
    if (!source.match(this._match)) {
      return next();
    }
    destination = this._destFile(source);
    return fs.readFile(source, "utf8", function(err, content) {
      var tpl;

      if (err != null) {
        return next(err);
      }
      tpl = parser.parse(content);
      if (_this._pretty) {
        tpl = formatter.format(tpl);
      }
      fs.writeFile(destination, tpl, "utf8", next);
      return console.log(source, "->", destination);
    });
  };

  /*
  */


  Build.prototype._destFile = function(source) {
    return source.replace(this._input, this._output).replace(this._match, "." + this._ext + ".js");
  };

  return Build;

})();

module.exports = Build;