import Chance from 'chance'
import Message from './messages/message';

const user1 = 'Sam'
const user2 = 'Agent'

const makeSingleMsg = () => {
    const chance = new Chance();
    const time = `${chance.date({ string: true })} ${chance.hour({ twentyfour: true })}:${chance.minute()}`
    return new Message(chance.android_id(), chance.pickone([chance.sentence(), chance.paragraph({sentences: 2 })]), chance.pickone([user1, user2]), time)
};

export const makeMessages = (num) => {
    let arr = [];
    for (let i = 0; i < num; i++) {
        arr.push(makeSingleMsg());
    }
    return arr;
}


