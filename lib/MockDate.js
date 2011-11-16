// A mock Date implementation.
Timecop.MockDate = function() {
  if (arguments.length > 0 || !Timecop.topOfStack()) {
    this._underlyingDate = Timecop.buildNativeDate.apply(Timecop, Array.prototype.slice.apply(arguments));
  } else {
    this._underlyingDate = Timecop.topOfStack().date();
  }
};

Timecop.MockDate.parse = function(dateString) {
  return Timecop.NativeDate.parse(dateString);
};

Timecop.MockDate.prototype = {
  getDate:            function() { return this._underlyingDate.getDate(); },
  getDay:             function() { return this._underlyingDate.getDay(); },
  getFullYear:        function() { return this._underlyingDate.getFullYear(); },
  getHours:           function() { return this._underlyingDate.getHours(); },
  getMilliseconds:    function() { return this._underlyingDate.getMilliseconds(); },
  getMinutes:         function() { return this._underlyingDate.getMinutes(); },
  getMonth:           function() { return this._underlyingDate.getMonth(); },
  getSeconds:         function() { return this._underlyingDate.getSeconds(); },
  getTime:            function() { return this._underlyingDate.getTime(); },
  getTimezoneOffset:  function() { return this._underlyingDate.getTimezoneOffset(); },
  getUTCDate:         function() { return this._underlyingDate.getUTCDate(); },
  getUTCDay:          function() { return this._underlyingDate.getUTCDay(); },
  getUTCFullYear:     function() { return this._underlyingDate.getUTCFullYear(); },
  getUTCHours:        function() { return this._underlyingDate.getUTCHours(); },
  getUTCMilliseconds: function() { return this._underlyingDate.getUTCMilliseconds(); },
  getUTCMinutes:      function() { return this._underlyingDate.getUTCMinutes(); },
  getUTCMonth:        function() { return this._underlyingDate.getUTCMonth(); },
  getUTCSeconds:      function() { return this._underlyingDate.getUTCSeconds(); },
  getYear:            function() { return this._underlyingDate.getYear(); },
  toString:           function() { return this._underlyingDate.toString(); },
  valueOf:            function() { return this._underlyingDate.valueOf(); },
  setDate:            function(day) { return this._underlyingDate.setDate(day); },
  setHours:           function(hour, minute, second, millisecond) { return this._underlyingDate.setHours(hour, minute || 0, second || 0, millisecond || 0); },
  setMinutes:         function(minute, second, millisecond) { return this._underlyingDate.setMinutes(minute, second || 0, millisecond || 0); },
  setSeconds:         function(second, millisecond) { return this._underlyingDate.setSeconds(second, millisecond || 0); },
  setMilliseconds:    function(millisecond) { return this._underlyingDate.setMilliseconds(millisecond); }
};
