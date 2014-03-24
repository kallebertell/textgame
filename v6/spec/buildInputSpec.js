describe("buildInput", function() {
  var input;

  beforeEach(function () {
    input = tg.buildInput(' aA bb  cC');
  });


  it("should remove whitespace and transform to lowercase", function() {
    expect(input()).toBe('aa bb cc');
  });

  it("should return first token", function() {
    expect(input(0)).toBe('aa');
  });

  it("should return first and second token", function() {
    expect(input(0,1)).toBe('aa bb');
  });

  it("should return second and third", function() {
    expect(input(1,2)).toBe('bb cc');
  });


  describe("contains", function() {

    it("should find substring", function() {
        expect(input.contains("bb c")).toBeTruthy();
    });

    it("should not find substrings", function() {
        expect(input.contains("b b c")).toBeFalsy();
    });

    it("should find a matching substring of many", function() {
        expect(input.contains("xx", "yy", "bb cc")).toBeTruthy();
    });
  });

});
