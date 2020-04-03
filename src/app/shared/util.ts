import { Character } from './object/character';

export function setCharacter(response): Character {
    // Cria um objeto
    let character: Character = new Character();

    // Usando a desestruturação para pegar as propriedas
    const { id, attributes, relationships } = response;    
    const { name, description, image } = attributes;

    // Seta os dados do objeto
    character.id = id;
    character.name = name;
    character.description = `${description.substring(0, 180)}...`;
    character.image = image.original;
    character.media = relationships.mediaCharacters.links.related;

    return character;
}