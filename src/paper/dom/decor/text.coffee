Template = require "../../template"

class Decorator

  constructor: (@data, @element) ->
    @_template = new Template @element.nodeValue
    @_renderer = @_template.render @data

  init: () ->
    @_renderer.bind("text").to @_change
    
  _change: (value) =>
    @element.nodeValue = value

  
  @test: (element) -> !!~element.nodeValue.indexOf "{{"


module.exports = Decorator