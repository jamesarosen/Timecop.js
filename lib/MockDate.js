// A mock Date implementation.
Timecop.MockDate = function() {
  if (arguments.length > 0) {
    this._specifiedDate = new Timecop.NativeDate(arguments);
  } else if (Timecop.topOfStack()) {
    this._specifiedDate = Timecop.topOfStack();
  } else {
    this._specifiedDate = new Timecop.NativeDate();
  }
};

Timecop.MockDate.prototype = {
  getDate:            function() { return this._specifiedDate.getDate(); },
  getDay:             function() { return this._specifiedDate.getDay(); },
  getFullYear:        function() { return this._specifiedDate.getFullYear(); },
  getHours:           function() { return this._specifiedDate.getHours(); },
  getMilliseconds:    function() { return this._specifiedDate.getMilliseconds(); },
  getMinutes:         function() { return this._specifiedDate.getMinutes(); },
  getMonth:           function() { return this._specifiedDate.getMonth(); },
  getSeconds:         function() { return this._specifiedDate.getSeconds(); },
  getTime:            function() { return this._specifiedDate.getTime(); },
  getTimezoneOffset:  function() { return this._specifiedDate.getTimezoneOffset(); },
  getUTCDate:         function() { return this._specifiedDate.getUTCDate(); },
  getUTCDay:          function() { return this._specifiedDate.getUTCDay(); },
  getUTCFullYear:     function() { return this._specifiedDate.getUTCFullYear(); },
  getUTCHours:        function() { return this._specifiedDate.getUTCHours(); },
  getUTCMilliseconds: function() { return this._specifiedDate.getUTCMilliseconds(); },
  getUTCMinutes:      function() { return this._specifiedDate.getUTCMinutes(); },
  getUTCMonth:        function() { return this._specifiedDate.getUTCMonth(); },
  getUTCSeconds:      function() { return this._specifiedDate.getUTCSeconds(); },
  getYear:            function() { return this._specifiedDate.getYear(); }

  // 'toDateString', 'toGMTString',
  // 'toISOString', 'toJSON', 'toLocaleDateString', 'toLocaleString',
  // 'toLocaleTimeString', 'toTimeString', 'toUTCString'
};

window.Date = Timecop.MockDate;
