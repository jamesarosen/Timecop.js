describe('Timecop', function() {

  beforeEach(function() {
    Timecop.install();
  });

  afterEach(function() {
    Timecop.uninstall();
  });

  it('should exist', function() {
    expect(typeof(Timecop)).not.toEqual('undefined');
  });

  it('should have a public API', function() {
    expect(Timecop).toHaveFunction('travel');
    expect(Timecop).toHaveFunction('freeze');
    expect(Timecop).toHaveFunction('return');
    expect(Timecop).toHaveFunction('topOfStack');
    expect(Timecop).toHaveFunction('buildNativeDate');
  });

  describe('.travel', function() {

    beforeEach(function() {
      Timecop.travel(2008, 6, 5, 14, 30, 15, 450);
    });

    afterEach(function() {
      Timecop.return();
    });

    it('should leave time running', function() {
      var self = this;
      var date1 = new Date();
      setTimeout(function() {
        var date2 = new Date();
        expect(date2.getTime() - date1.getTime()).toBeGreaterThan(200);
        expect(date2.getTime() - date1.getTime()).toBeLessThan(400);
        self.timePassed = true;
      }, 300);
      waitsFor(function() { return self.timePassed; }, 'some time to have passed', 500);
    });

    it('should change the time of dates created without any arguments', function() {
      var date = new Date();
      expect(date.getFullYear()    ).toEqual(2008);
      expect(date.getMonth()       ).toEqual(6);
      expect(date.getDate()        ).toEqual(5);
      expect(date.getHours()       ).toEqual(14);
      expect(date.getMinutes()     ).toEqual(30);
      expect(date.getSeconds()     ).toEqual(15);
      expect(date.getMilliseconds()).toEqual(450);
    });

    it('should not change the dates created with arguments', function() {
      var date = new Date(1999, 8, 24);
      expect(date.getFullYear()).toEqual(1999);
      expect(date.getMonth()   ).toEqual(8);
      expect(date.getDate()    ).toEqual(24);
    });

  });

  describe('.freeze', function() {

    beforeEach(function() {
      Timecop.freeze(2008, 6, 5, 14, 30, 15, 450);
    });

    afterEach(function() {
      Timecop.return();
    });

    it('should stop time', function() {
      var self = this;
      var date1 = new Date();
      setTimeout(function() {
        var date2 = new Date();
        expect(date2).toBeCloseInTimeTo(date1, 1);
        self.timePassed = true;
      }, 300);
      waitsFor(function() { return self.timePassed; }, 'some time to have passed', 500);
    });

  });

});
