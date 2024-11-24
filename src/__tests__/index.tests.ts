import { creerUneClasseAvecReflexion } from '../index';

describe('creerUneClasseAvecReflexion', () => {
    const envDepart = process.env;

    beforeEach(() => {
        process.env = { ...envDepart };
        delete process.env.NOM_DE_CLASSE;
    });

    afterAll(() => {
        process.env = envDepart;
    });

    test('erreur lorsque pas de nom de classe', () => {
        expect(() => {
            creerUneClasseAvecReflexion();
        }).toThrow('var env NOM_DE_CLASSE manquant');
    });

    test('créer une classe avec le nom défini dans les var .env', () => {
        delete process.env.NOM_DE_CLASSE;
        let nom: string = 'ClasseTest';
        process.env.NOM_DE_CLASSE = 'ClasseTest';

        const nouvelleClasse = creerUneClasseAvecReflexion();
        const instance = new nouvelleClasse();

        expect(nouvelleClasse.name).toBe(nom);
        expect(instance).toBeInstanceOf(nouvelleClasse);
        expect(instance.date).toBeInstanceOf(Date);
    });

    test('avoir une propriété date qui est une instance de Date', () => {
        process.env.NOM_DE_CLASSE = 'ClasseTestDate';
        
        const nouvelleClasse = creerUneClasseAvecReflexion();
        const instance = new nouvelleClasse();
        
        expect(instance.date).toBeInstanceOf(Date);
        const maintenant = new Date();
        expect(maintenant.getTime() - instance.date.getTime()).toBeLessThan(3000);
    });

    test('doit avoir instances uniques avec des dates différentes', async () => {
        process.env.NOM_DE_CLASSE = 'ClasseTest';
        const ClasseCreee = creerUneClasseAvecReflexion();
        
        const instance1 = new ClasseCreee();
        await new Promise(resolve => setTimeout(resolve, 1000));
        const instance2 = new ClasseCreee();
        
        expect(instance1.date).not.toEqual(instance2.date);
        expect(instance2.date.getTime()).toBeGreaterThan(instance1.date.getTime());
    });
});