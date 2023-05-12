import {Home, Mail} from 'react-feather'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faBuilding, faPlusCircle, faPrescriptionBottle} from "@fortawesome/free-solid-svg-icons"

export default [
    {
        id: 'home',
        title: 'Home',
        icon: <Home size={20}/>,
        navLink: '/home'
    },
    {
        id: 'cities',
        title: 'Villes',
        icon: <FontAwesomeIcon icon={faBuilding} size={20}/>,
        navLink: '/cities'
    },
    {
        id: 'pharmacies',
        title: 'Pharmacies',
        icon: <FontAwesomeIcon icon={faPlusCircle} size={20} />,
        navLink: '/pharmacies'
    },
    {
        id: 'secondPage',
        title: 'Second Page',
        icon: <Mail size={20}/>,
        navLink: '/second-page'
    }
]
