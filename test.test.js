const tagTracker = require('./index');

describe('Should return Correctly tagged paragraph', () => {
  it('Test for nested tags', () =>
    expect(
      tagTracker('The following text<C><B>is centred and in boldface</B></C>')
    ).toBe('Correctly tagged paragraph'));
  it('Test for nested tags', () =>
    expect(
      tagTracker(
        '<B>This <g>is <B>boldface</B> in <<*> a</B> <\\6> <<d>sentence' // I added extra "\" due to The error: "only valid numeric escape in strict mode is '\0'"
      )
    ).toBe('Correctly tagged paragraph'));
  it('Test for 1 pair of tag', () =>
    expect(tagTracker('<C></C>')).toBe('Correctly tagged paragraph'));
  it('Test for non nested tags', () =>
    expect(tagTracker('<C>Hello</C><B>World</B>')).toBe(
      'Correctly tagged paragraph'
    ));
});

describe('Should return incorrectly tagged paragraph', () => {
  it('Test for incorrect closing tag', () =>
    expect(
      tagTracker(
        '<B><C> This should be centred and in boldface, but the tags are wrongly nested </B></C>'
      )
    ).toBe('Expected </C> found </B>'));

  it('Test missing opening tag', () =>
    expect(
      tagTracker(
        '<B>This should be in boldface, but there is an extra closing tag</B></C>'
      )
    ).toBe('Expected # found </C>'));
  it('Test missing opening tag', () =>
    expect(tagTracker('No opening tags</B></C>')).toBe(
      'Expected # found </B>'
    ));

  it('Test missing closing tag', () =>
    expect(
      tagTracker(
        '<B><C>This should be centred and in boldface, but there is a missing closing tag</C>'
      )
    ).toBe('Expected </B> found #'));

  it('Test missing closing tag', () =>
    expect(tagTracker('<C><B>no closing tag')).toBe('Expected </B> found #'));
});

describe('Should return Invalid input', () => {
  expect(tagTracker(456)).toBe('Invalid input');
  expect(tagTracker(true)).toBe('Invalid input');
});
