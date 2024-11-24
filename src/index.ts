import * as dotenv from 'dotenv';
dotenv.config();

export function creerUneClasseAvecReflexion() {
    const nomClasse = process.env.NOM_DE_CLASSE;
    
    if (!nomClasse) {
        throw new Error('var env NOM_DE_CLASSE manquant');
    }

    return new Function(`
        return class ${nomClasse} {
            constructor() {
                this.date = new Date();
            }
        }
    `)();
}

const classeAvecReflexion = creerUneClasseAvecReflexion();
const instance = new classeAvecReflexion();
console.log(classeAvecReflexion.name);
console.log(instance.date);