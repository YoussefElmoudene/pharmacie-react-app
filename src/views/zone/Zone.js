import {Alert, Button, Card, CardBody, CardHeader, CardTitle, Col, FormGroup, Input, Table} from 'reactstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPen, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons"
import React, {useEffect, useState} from "react"
import '../../assets/scss/home.scss'
import {Link} from "react-router-dom"
import ZoneService from "../../services/zoneService"

const Zone = () => {
    const [zones, setZones] = useState([])
    const [showAlert, setShowAlert] = useState(false)


    function getZones() {
        ZoneService.getAll().then(response => {
            console.log(response)
            setZones(response)
        })
    }

    useEffect(() => {
        getZones()
    }, [])

    const filterZones = (inputValue) => {
        if (inputValue.trim() === '') {
            getZones()
        }
        const filteredZones = zones.filter((zone) => zone.nom.toLowerCase().includes(inputValue.toLowerCase()) || zone.id.toString().includes(inputValue.toLowerCase()) || zone.ville.toLowerCase().includes(inputValue.toLowerCase()))
        setZones(filteredZones)
    }

    const deleteById = (id) => {
        alert(id)
        ZoneService.remove(id).then(response => {
            console.info(response.data)
            for (let i = 0; i < zones.length; i++) {
                if (zones[i].id === Number(id)) {
                    zones.splice(i, 1)
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


    return (<div>
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
                            <CardTitle>Zones
                            </CardTitle>

                            <FormGroup row>
                                <Col sm='12'>
                                    <Input
                                        onChange={e => filterZones(e.target.value)}
                                        type='text'
                                        name='search' id='search'
                                        placeholder='search..'/>
                                </Col>
                            </FormGroup>

                            <Link to="/create-zone">
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
                                        ID
                                    </th>
                                    <th scope='col' className='text-nowrap'>
                                        name
                                    </th>
                                    <th scope='col' className='text-nowrap'>
                                        city
                                    </th>

                                    <th scope='col' className='text-nowrap'>
                                        Action
                                    </th>

                                </tr>
                                </thead>
                                <tbody>
                                {zones.map((item, index) => (<tr key={index}>
                                    <td className='text-nowrap icon'>{item.id}</td>
                                    <td className='text-nowrap icon'>{item.nom}</td>
                                    <td className='text-nowrap icon'>{item.ville}</td>
                                    <td className="text-nowrap">
                                        <Button
                                            className="m-1"
                                            color="warning"
                                            size="sm">
                                            <FontAwesomeIcon icon={faPen}/>
                                        </Button>

                                        <Button
                                            onClick={e => deleteById(item.id)}
                                            className="m-1"
                                            color="danger"
                                            size="sm">
                                            <FontAwesomeIcon icon={faTrash}/>
                                        </Button>

                                    </td>
                                </tr>))}
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>

                </div>

            </div>
        </div>
    </div>)
}

export default Zone
