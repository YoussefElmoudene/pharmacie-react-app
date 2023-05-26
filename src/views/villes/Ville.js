import {Alert, Button, Card, CardBody, CardHeader, CardTitle, Table} from 'reactstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChevronDown, faPen, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons"
import React, {useEffect, useState} from "react"
import {delete_ville, get_villes} from "../../services/vlleService"
import '../../assets/scss/home.scss'
import {Link} from "react-router-dom"


const Ville = () => {
    const [cities, setCities] = useState([])
    const [isVisible, setIsVisible] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [selectedCity, setSelectedCity] = useState(null)


    useEffect(() => {
        get_villes().then(response => {
            console.info(response.data)
            setCities(response.data)
        })
    }, [])

    const show__Details = (city, isVisible, display, id) => {
        setSelectedCity(city?.nom)
        setIsVisible(isVisible)
        document.getElementById(id).style.display = display
    }
    const deleteById = (id) => {
        alert(id)
        delete_ville(id).then(response => {
            console.info(response.data)
            for (let i = 0; i < cities.length; i++) {
                if (cities[i].id === Number(id)) {
                    cities.splice(i, 1)
                    setShowAlert(true)
                    const timer = setInterval(() => {
                        setShowAlert(false)
                        clearInterval(timer)
                    }, 3000)
                }
            }
        }, error => {
            console.error(error)
        })
    }


    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <Alert isOpen={showAlert}>
                            alement supprimer avec success
                        </Alert>
                    </div>
                    <div className="col-md-12">
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
                                            ID
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
                                                <td className="text-nowrap">
                                                    <Button
                                                        className="m-1"
                                                        color="warning"
                                                        size="sm">
                                                        <FontAwesomeIcon icon={faPen}/>
                                                    </Button>

                                                    <Button
                                                        onClick={e => deleteById(item?.id)}
                                                        className="m-1"
                                                        color="danger"
                                                        size="sm">
                                                        <FontAwesomeIcon icon={faTrash}/>
                                                    </Button>

                                                </td>

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
                                                                    <Button
                                                                        className="m-1"
                                                                        color="primary"
                                                                        size="sm">
                                                                        <FontAwesomeIcon icon={faPlus}/>
                                                                    </Button>

                                                                    <Button
                                                                        className="m-1"
                                                                        color="danger"
                                                                        size="sm">
                                                                        <FontAwesomeIcon icon={faTrash}/>
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

                </div>
            </div>
        </div>
    )
}

export default Ville
