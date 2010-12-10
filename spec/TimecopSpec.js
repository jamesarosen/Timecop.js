describe('Timecop', function() {

  it('should exist', function() {
    expect(typeof(Timecop)).not.toEqual('undefined');
  });

  it('should have a public API', function() {
    expect(Timecop).toHaveFunction('travel');
    expect(Timecop).toHaveFunction('return');
    expect(Timecop).toHaveFunction('topOfStack');
  });

  describe('#travel', function() {

    beforeEach(function() {
      Timecop.travel(2008, 6, 5, 14, 30, 15, 450);
    });

    afterEach(function() {
      Timecop.return();
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

    it('should not change the time dates created with arguments', function() {
      var date = new Date(1999, 8, 24);
      expect(date.getFullYear()).toEqual(1999);
      expect(date.getMonth()   ).toEqual(8);
      expect(date.getDate()    ).toEqual(24);
    });

  });

  describe('a date created without arguments while time-travelling', function() {
    var date;

    beforeEach(function() {
      Timecop.travel(2008, 6, 5, 14, 30, 15, 450);
      date = new Date();
    });

    it('should remember its "now" after we return to the present', function() {
      Timecop.return();
      expect(date.getFullYear()).toEqual(2008);
    });
  })

});
