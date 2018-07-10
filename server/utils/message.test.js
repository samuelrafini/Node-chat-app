let expect = require('expect');
let {generateMessage} = require('./message');

describe('generate', () => {
    it('Should generate correct message object', () => {
        let from = 'Jen'
        let text = 'Hi this is a test'
        let message = generateMessage(from, text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, text});
    })
})