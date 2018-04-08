var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it ('should generate correct message object', () => {

    var from = 'Jen';
    var text = 'Some message';
    var message = generateMessage(from, text);

    expect(typeof(message.createAt)).toBe('number');
    expect(message).toMatchObject({from, text});
    // store res in variable
    //assert from match
    //assert text match
    // asert createat is number
  });
});

describe('generateLocationMessage', ()=> {
  it ('should generate correct location object', () => {
      var from = 'Deb';
      var latitue = 15;
      var longitude = 19;
      var url = 'http://www.google.com/maps?q=15,19';

      var message = generateLocationMessage(from, latitue, longitude);

      expect(typeof message.createAt).toBe('number');
      expect(message).toMatchObject({from, url});

  });
});
