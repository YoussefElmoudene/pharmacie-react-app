const pharmacy = {
    name: 'test',
    address: 'test',
    image: '',
    zone: null,
    altitude: 13130,
    longitude: 31230
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