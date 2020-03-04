import Chance from 'chance'
import {Message} from '../index';

const user1 = 'Sam'
const user2 = 'Agent'

const makeSingleMsg = () => {
    const chance = new Chance();
    const time = `${chance.date({ string: true })} ${chance.hour({ twentyfour: true })}:${chance.minute()}`
    return new Message(chance.android_id(), chance.pickone([chance.sentence(), chance.paragraph({sentences: 2 })]), chance.pickone([user1, user2]), time)
};
export const timeFormatter = (timeString) =>{
    try{
        const date = new Date(timeString)
        const time = date.toLocaleTimeString()
        const localeDate = date.toLocaleDateString()
        return `${localeDate} ${time}`
    }
    catch (e){
        return timeString
    }
}
export const addTextToMessageList = (text, messages =[]) =>{
    const newMsg = new Message(new Chance().android_id(), text, user2, new Date().toISOString())
    return [...messages, newMsg]
}
export const makeMessages = (num) => {
    let arr = [];
    for (let i = 0; i < num; i++) {
        arr.push(makeSingleMsg());
    }
    return arr;
}


