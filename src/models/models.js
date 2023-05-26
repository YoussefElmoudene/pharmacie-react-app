const pharmacy = {
    name: null,
    address: null,
    image: '',
    zone: null,
    altitude: null,
    longitude: null
}
const ville = {
    name: null
}
const zone = {
    nom: null,
    ville: null
}

const garde = {
    pharmacie: null,
    grade: null,
    datedebut: null,
    datefin: null
}
const newGardepharmacie = {
    pharmacieGardePK: {
        pharmacie: null, // Set the values according to your requirements
        grade: null,
        datedebut: null,
        datefin: null
    },
    grade: null,
    pharmacie: null
}

export {pharmacy, ville, zone, garde, newGardepharmacie}