import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from "./consts";
// helper module to deal with character data

export function createCharacter() {
    return {
        attributes: ATTRIBUTE_LIST.reduce((acc, attribute) => {
            acc[attribute] = 9;
            return acc;
        } , {}),
        class: null,
        skills: SKILL_LIST.reduce((acc, {name}) => {
            acc[name] = 0;
            return acc;
        }, {}),
    };
}

export function doesAttributesFitClass(attributes, clsName) {
    const attributesReq = CLASS_LIST[clsName];
    return Object.keys(attributesReq).every((attribute) => {
        return attributes[attribute] >= attributesReq[attribute];
    });
}

export function notMeetRequirementForClass(className) {
    return `You are not eligible for this class, min requirements for ${className}: ${Object.keys(CLASS_LIST[className]).reduce((acc, attribute, index) => {
        return `${acc}${index === 0? '': ', '} ${attribute}: ${CLASS_LIST[className][attribute]} `;
    }, "")}`
}

export function calculateModifier(value) {
    return Math.floor((value - 10) / 2);
}

export function totalAvailSkillPoints(character) {
    return calculateModifier(character.attributes.Intelligence) * 4 + 10 - Object.values(character.skills).reduce((acc, skill) => {
        return parseInt(acc) + parseInt(skill);
    }, 0);
}

export function calculateSkillModifier(character, skill) {
    return calculateModifier(character.attributes[SKILL_LIST.find((s) => s.name === skill).attributeModifier]);
}