var Timecop = (function(){

  var slice = Array.prototype.slice;

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
    // Have Timecop intercept calls to new Date()
    // so you can time travel.
    install: function() {
      window.Date = Timecop.MockDate;
    },

    // Have Timecop no longer intercept calls to new Date().
    uninstall: function() {
      window.Date = Timecop.NativeDate;
    },

    // The native Date implementation.
    NativeDate: NativeDate,

    // Travel to the given Date.
    // @return the new Date.
    travel: function() {
      var d = new Timecop.NativeDate(slice.call(arguments));
      timeStack.push(d);
      return d;
    },

    // Pop one level off the stack.
    return: function() {
      timeStack.pop();
    },

    // @return [Native Date] the current travelled-to time, if any
    topOfStack: function() {
      return timeStack.peek();
    }
  };

})();
