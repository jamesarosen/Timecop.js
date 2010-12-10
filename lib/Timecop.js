var Timecop = (function(){

  // save the native Date implementation:
  var NativeDate = window.Date;

  // the stack of Timecop.MockDates.
  var timeStack = [];

  timeStack.peek = function() {
    if (this.length > 0) {
      return this[this.length - 1];
    } else {
      return null;
    }
  };

  return {
    // for debugging:
    timeStack: timeStack,

    // Travel to the given Date.
    travel: function() {
      timeStack.push(new NativeDate(arguments));
    },

    return: function() {
      timeStack.pop();
    },

    topOfStack: function() {
      return timeStack.peek();
    },

    // The native Date implementation.
    NativeDate: NativeDate
  };

})();
