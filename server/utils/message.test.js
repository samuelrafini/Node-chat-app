let expect = require('expect');
let {generateMessage, generateLocationMessage} = require('./message');

describe('generate', () => {
    it('Should generate correct message object', () => {
        let from = 'Jen'
        let text = 'Hi this is a test'
        let message = generateMessage(from, text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, text});
    })
})

describe('generateLocationMessage', () => {
    it('Should generate correct location object', () => {
        let from = 'Sam' 
        let latitude = 1;
        let longitude = 2;
        let url = 'https://www.google.com/maps?q=1,2'
        let message = generateLocationMessage(from, latitude, longitude);

        expect(message.url).toBe(url);
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, url});
    })
})
