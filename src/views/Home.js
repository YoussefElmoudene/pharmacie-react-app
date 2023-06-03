import {Breadcrumb, BreadcrumbItem, Button, Card, CardBody, CardHeader, CardTitle, Table} from 'reactstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import '../assets/scss/home.scss'
import {
    faChevronDown,
    faHouseMedical,
    faMap,
    faMapMarker, faMapMarkerAlt,
    faMapPin,
    faPlus,
    faTrash
} from "@fortawesome/free-solid-svg-icons"
import React, {useEffect, useState} from "react"
import axios from 'axios'
import {Link} from "react-router-dom"


const Home = () => {
    const [selectedCity, setSelectedCity] = useState(null)
    const [selectedZone, setSelectedZone] = useState(null)
    const URL = 'https://pharmacymanagementback-production.up.railway.app'
    const [isVisible, setIsVisible] = useState(false)
    const [cities, setCities] = useState([])
    const [pharmacies, setPharmacies] = useState([])
    const fetch_cities = async () => {
        try {
            const response = await axios.get(`${URL}/api/villes/`)
            console.log(response.data)
            setCities(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    const fetch_pharmacies = async () => {
        try {
            const response = await axios.get(`${URL}/api/pharmacies/`)
            setPharmacies(response.data)
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        console.log('i am in useEffect')
        fetch_cities()
        fetch_pharmacies()
    }, [])

    const show__Details = (city, isVisible, display, id) => {
        setSelectedCity(city?.nom)
        setIsVisible(isVisible)
        document.getElementById(id).style.display = display
    }


    function get_zone_pharmacies(zone) {
        setSelectedZone(zone?.nom)
        console.log(zone)
        setPharmacies(zone?.pharmacies)
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-sm-12">
                        <Card>
                            <CardHeader>
                                <CardTitle>Villes
                                </CardTitle>
                                <Link to="/create-city">
                                    <Button
                                        color="primary">
                                        <FontAwesomeIcon className="mr-1" icon={faPlus}/>
                                        NEW
                                    </Button>
                                </Link>
                            </CardHeader>
                            <CardBody>
                                <Table className="responsive" responsive>
                                    <thead>
                                    <tr>
                                        <th scope='col' className='text-nowrap'>

                                        </th>

                                        <th scope='col' className='text-nowrap'>
                                            Ville
                                        </th>

                                        <th scope='col' className='text-nowrap'>
                                            Action
                                        </th>


                                    </tr>
                                    </thead>
                                    <tbody>

                                    {cities.map((item, index) => (
                                        <React.Fragment key={index}>
                                            <tr>
                                                <td className='text-nowrap icon'>

                                                    {isVisible ? (
                                                        <FontAwesomeIcon
                                                            onClick={e => show__Details(item, false, 'none', item?.id)}
                                                            icon={faChevronDown}/>
                                                    ) : (
                                                        <FontAwesomeIcon
                                                            onClick={e => show__Details(item, true, 'table-row', item?.id)}
                                                            icon={faChevronDown}/>
                                                    )
                                                    }
                                                </td>
                                                <td className='text-nowrap'>{item?.id}</td>
                                                <td className='text-nowrap'>{item?.nom}</td>

                                            </tr>

                                            <tr id={item?.id} className="ville__details">
                                                <td colSpan="3">
                                                    <Table className="table-light" size="sm">
                                                        <thead>
                                                        <tr>
                                                            <th>
                                                                nom de zone
                                                            </th>

                                                            <th>
                                                                Action
                                                            </th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {item?.zones.map((zone, zone__index) => (
                                                            <tr key={zone__index}>
                                                                <th scope="row">
                                                                    {zone?.nom}
                                                                </th>
                                                                <td>
                                                                    <Link to="/create-zone">
                                                                        <Button
                                                                            className="m-1"
                                                                            color="primary"
                                                                            size="sm">
                                                                            <FontAwesomeIcon icon={faPlus}/>
                                                                        </Button>
                                                                    </Link>


                                                                    <Button
                                                                        className="m-1"
                                                                        color="danger"
                                                                        size="sm">
                                                                        <FontAwesomeIcon icon={faTrash}/>
                                                                    </Button>

                                                                    <Button
                                                                        className="m-1"
                                                                        color="info"
                                                                        onClick={e => get_zone_pharmacies(zone)}
                                                                        size="sm">
                                                                        <FontAwesomeIcon icon={faHouseMedical}/>
                                                                    </Button>

                                                                </td>

                                                            </tr>
                                                        ))}
                                                        </tbody>
                                                    </Table>
                                                </td>
                                            </tr>

                                        </React.Fragment>
                                    ))}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    <Breadcrumb>
                                        <BreadcrumbItem>
                                            Pharmacies
                                        </BreadcrumbItem>

                                        {selectedCity !== null ? (
                                            <BreadcrumbItem>
                                                <strong>{selectedCity}</strong>
                                            </BreadcrumbItem>
                                        ) : null
                                        }

                                        {selectedZone !== null ? (
                                            <BreadcrumbItem active>
                                                <strong className="active">{selectedZone}</strong>
                                            </BreadcrumbItem>
                                        ) : null
                                        }


                                    </Breadcrumb>

                                </CardTitle>
                                <Link to="/create-pharmacy">
                                    <Button
                                        color="primary">
                                        <FontAwesomeIcon className="mr-1" icon={faPlus}/>
                                        NEW
                                    </Button>
                                </Link>
                            </CardHeader>
                            <CardBody>
                                <Table className="responsive" responsive>
                                    <thead>
                                    <tr>
                                        <th scope='col' className='text-nowrap'>nom</th>
                                        <th scope='col' className='text-nowrap'>Address</th>
                                        <th scope='col' className='text-nowrap'>details</th>
                                    </tr>
                                    </thead>
                                    <tbody>

                                    {pharmacies.map((item, index) => (
                                        <tr key={index}>
                                            <td className='text-nowrap'>{item?.name}</td>
                                            <td className='text-nowrap'>{item?.address}</td>
                                            <td className='text-nowrap'>
                                                <Link to={`/pharmacy/${item.id}`}>
                                                    <Button
                                                        color="warning">
                                                        <FontAwesomeIcon className="mr-1" icon={faMapMarkerAlt}/>
                                                    </Button>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
