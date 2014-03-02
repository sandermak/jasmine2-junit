describe('plain suite', function() {
  it('succeeding test in plain suite', function() {
    expect(1).toBe(1);
  });

  it('failing test in plain suite', function() {
    expect(1).toBe(2);
  });

  it('failing test with one succeeding and two failing expectations in plain suite', function() {
    expect(1).toBe(1);
    expect(1).toBe(2);
    expect(1).toBe(2);
  });

  xit('skipped test in plain suite', function() {
    expect(1).toBe(2);
  });
});

describe('second suite (has one nested suite)', function() {
  it('first test, toplevel second suite', function() {
    expect(1).toBe(1);
  });

  it('second test, toplevel second suite', function() {
    expect(1).toBe(1);
  });

  describe('nested suite in second suite', function() {
    it('third test, nested suite in second suite', function() {
      expect(1).toBe(1);
    });
  });
});