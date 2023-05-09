import React, { useState } from "react";
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from "./consts";
import { calculateModifier, calculateSkillModifier, doesAttributesFitClass, totalAvailSkillPoints } from "./Character";

const containerStyle = {
    display: 'flex',
    padding: '10px',
    justifyContent: 'space-evenly',
}



const subContainerStyle = {
    border: '1px solid white',
    padding: '10px',
    margin: '10px',
    borderRadius: '5px',
}
    

export default function CharacterBuild({
    initCharacter = null,
    onChange = () => { },
}) {
    const [character, setCharacter] = useState(initCharacter);
    const [showClassReq, setShowClassReq] = useState(null);

    const updateAttribute = (attribute, value) => {
        setCharacter({
            ...character,
            attributes: {
                ...character.attributes,
                [attribute]: value,
            },
        });
        onChange(character);
    };

    const updateSkillPoints = (skillName, value) => {
        setCharacter({
            ...character,
            skills: {
                ...character.skills,
                [skillName]: value,
            },
        });
        onChange(character);
    };

    const updateClass = (clsName, value) => {
        setCharacter({
            ...character,
            class: clsName,
        });
        onChange(character);
    };
    
    return (
        <div >
            <h1>Character Builder</h1>
            <div style={containerStyle}>
                <div id="attributes" style={subContainerStyle}>
                    <h2>Attributes</h2>
                    <div id="attribute-list">
                        {ATTRIBUTE_LIST.map((attribute) => {
                            const attrValue = character.attributes[attribute]
                            return (
                                <div key={attribute}>
                                    <label>{attribute}</label>
                                    <input 
                                        type="number" 
                                        value={attrValue} 
                                        onChange={(e) => updateAttribute(attribute, e.target.value)}
                                    />
                                    <label>(Modifier: {calculateModifier(attrValue)})</label>
                                </div>
                            );
                        
                        })}
                    </div>
                </div>
                <div id="classes" style={subContainerStyle}>
                    <h2>Classes</h2>
                    <div id="class-list">
                        {
                            Object.keys(CLASS_LIST).map((clsName) => {
                                const isEligible = doesAttributesFitClass(character.attributes, clsName);
                                return (
                                    <div key={clsName}>
                                        <label 
                                            style={{
                                                color: isEligible ? 'green' : 'gray',
                                            }}
                                            onClick={!isEligible ? () => {
                                                setShowClassReq(clsName);
                                            }: null}
                                        >{clsName}</label>
                                        <input type="radio" value={clsName} disabled={!isEligible} checked={character.class === clsName} onChange={(e) => updateClass(clsName, e.target.value)}/>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
                {showClassReq && (
                    <div id="class-requirements" style={subContainerStyle}>
                        <h2>Class Requirements</h2>
                        <div id="class-requirements-list">
                            {
                                Object.keys(CLASS_LIST[showClassReq]).map((req) => {
                                    return (
                                        <div key={req}>{req}: {CLASS_LIST[showClassReq][req]}</div>
                                    );
                                })
                            }
                            <button onClick={() => setShowClassReq(null)}>Close</button>
                        </div>
                    </div>
                )}
                <div id="skills" style={subContainerStyle}>
                    <h2>Skills</h2>
                    <div>Total skill points: {totalAvailSkillPoints(character)}</div>
                    <div id="skill-list">
                        {
                            SKILL_LIST.map(({
                                name,
                                attributeModifier,
                            }) => {
                                const allocatedPoint = parseInt(character.skills[name] || 0);
                                const attributeModifierValue = parseInt(calculateSkillModifier(character, name));
                                return (
                                    <div key={name}>
                                        <label>{name} (Modifier {attributeModifier}: {attributeModifierValue})</label>
                                        <input 
                                            type="number" 
                                            value={allocatedPoint} 
                                            onChange={(e) => updateSkillPoints(name, e.target.value)}
                                        />
                                        <label>total: {allocatedPoint + attributeModifierValue}</label>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}