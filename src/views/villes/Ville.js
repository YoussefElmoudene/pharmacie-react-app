import {Button, Card, CardBody, CardHeader, CardTitle, Table} from 'reactstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChevronDown, faPen, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons"
import React, {useEffect, useState} from "react"
import {get_villes} from "../../services/vlleService"
import '../../assets/scss/home.scss'


const Home = () => {
    const [cities, setCities] = useState([])
    const [isVisible, setIsVisible] = useState(false)
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


    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <Card>
                            <CardHeader>
                                <CardTitle>Villes
                                </CardTitle>
                                <Button
                                    color="primary">
                                    <FontAwesomeIcon className="mr-1" icon={faPlus}/>
                                    NEW
                                </Button>
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

export default Home
