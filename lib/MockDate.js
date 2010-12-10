// A mock Date implementation.
Timecop.MockDate = function() {
  if (arguments.length > 0) {
    this._specifiedDate = new Timecop.NativeDate(arguments);
  }
};

Timecop.MockDate.prototype = {
  getDate:            function() { return this._implementation().getDate(); },
  getDay:             function() { return this._implementation().getDay(); },
  getFullYear:        function() { return this._implementation().getFullYear(); },
  getHours:           function() { return this._implementation().getHours(); },
  getMilliseconds:    function() { return this._implementation().getMilliseconds(); },
  getMinutes:         function() { return this._implementation().getMinutes(); },
  getMonth:           function() { return this._implementation().getMonth(); },
  getSeconds:         function() { return this._implementation().getSeconds(); },
  getTime:            function() { return this._implementation().getTime(); },
  getTimezoneOffset:  function() { return this._implementation().getTimezoneOffset(); },
  getUTCDate:         function() { return this._implementation().getUTCDate(); },
  getUTCDay:          function() { return this._implementation().getUTCDay(); },
  getUTCFullYear:     function() { return this._implementation().getUTCFullYear(); },
  getUTCHours:        function() { return this._implementation().getUTCHours(); },
  getUTCMilliseconds: function() { return this._implementation().getUTCMilliseconds(); },
  getUTCMinutes:      function() { return this._implementation().getUTCMinutes(); },
  getUTCMonth:        function() { return this._implementation().getUTCMonth(); },
  getUTCSeconds:      function() { return this._implementation().getUTCSeconds(); },
  getYear:            function() { return this._implementation().getYear(); },

  // 'toDateString', 'toGMTString',
  // 'toISOString', 'toJSON', 'toLocaleDateString', 'toLocaleString',
  // 'toLocaleTimeString', 'toTimeString', 'toUTCString'

  // @api private
  // If this date is specified (new Date(some params)), use the specified date;
  // if it is unspecified (new Date()) and there is an item on the Timecop
  // stack, use that; if neither, use a new unspecified Date.
  _implementation: function(property) {
    if (this._specifiedDate) {
      return this._specifiedDate;
    }
    if (Timecop.topOfStack()) {
      return Timecop.topOfStack();
    }
    return new Timecop.NativeDate();
  }
};

window.Date = Timecop.MockDate;
