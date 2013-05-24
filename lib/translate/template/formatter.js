// Generated by CoffeeScript 1.6.2
var Formatter, jsp, pro, uglify;

uglify = require("uglify-js");

jsp = uglify.parser;

pro = uglify.uglify;

/*
  Beautifies javascript
*/


Formatter = (function() {
  function Formatter() {}

  /*
  */


  Formatter.prototype.format = function(source) {
    var ast;

    ast = jsp.parse(String(source).replace(/\.push\(\'\'\)/g, "").replace(/\.html\(\'\'\)/g, ""));
    return source = pro.gen_code(ast, {
      beautify: true
    });
  };

  return Formatter;

})();

module.exports = new Formatter();