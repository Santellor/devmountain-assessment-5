import { Op } from 'sequelize';
import { Animal, Human } from './model.js';

// Get the human with the primary key 2
export const query1 = await Human.findOne({ 
    where: {humanId: 2}
});

// Get the first animal whose species is "fish"
export const query2 = await Animal.findOne({
    where: {species: 'fish'}
});

// Get all animals belonging to the human with primary key 5
export const query3 = await Animal.findAll({
    where: {humanId: 5}
});

// Get all animals born in a year greater than (but not equal to) 2015.
export const query4 = await Animal.findAll({
    where: {
        birthYear: {[Op.gt]:[2015]}
    }
});

// Get all the humans with first names that start with "J"
export const query5 = await Human.findAll({ 
    where : {
        fname: {[Op.startsWith]:['J']}
    }
});

// Get all the animals who don't have a birth year
export const query6 = await Animal.findAll({
    where: {
        birthYear: {[Op.is]:null}
    }
});

// Get all the animals with species "fish" OR "rabbit"
export const query7 = await Animal.findAll({
    where: {
        species: {
            [Op.or]: [
                {[Op.eq]:'fish'}, 
                {[Op.eq]:'rabbit'}
            ]
        }
    }
});

// Get all the humans who DON'T have an email address that contains "gmail"
export const query8 = await Human.findAll({ 
    where : { 
            [Op.not]: [
                {email: {[Op.substring]:['gmail']}}
            ]
    }
});

// Continue reading the instructions before you move on!

// Print a directory of humans and their animals
export async function printHumansAndAnimals() {

    const humans = await Human.findAll()
    
    for (let human of humans)  {

        console.log(human.fname)

        const animals = await human.getAnimals()

        for (let animal of animals) {
            console.log(animal.name)
        }
    }

// did it with include as well
    // const humans = await Human.findAll({
    //     include: {
    //         model: Animal
    //     }
    // })
    
    // for (let human of humans)  {
    
    //     console.log(human.fname)
    
    //     const animals = human.animals
        
    //     for (let animal of animals) {
    //         console.log(animal.name)
    //     }
    // }

}

// Return a Set containing the full names of all humans
// with animals of the given species.
export async function getHumansByAnimalSpecies(species) {

const humans = new Set()

//working with people
    //who own pets
        //of a species we must search for

    const owners = await Human.findAll({
        include: {
            model: Animal
        }
    })

//if people's pet species === species we are searching for
    // add person to set
    for (let owner of owners) {
        let ownerPets = owner.animals
            for (let pet of ownerPets) {
                if (pet.species === species) {
                    humans.add(`${owner.fname} ${owner.lname}`)
                } 
            }
    }    
     return humans
}
