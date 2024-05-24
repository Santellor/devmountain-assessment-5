import { Op } from 'sequelize';
import { Animal, Human } from './model.js';


//getAnimals method

    // const humans = await Human.findAll()

    // for (let human of humans)  {

    //     console.log(human.fname)

    //     const animals = await human.getAnimals()
        
    //     for (let animal of animals) {
    //         console.log(animal.name)
    //     }
    // }

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


let species = 'dog'

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

console.log(humans)