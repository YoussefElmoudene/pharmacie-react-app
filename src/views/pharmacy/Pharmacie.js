import {Alert, Button, Card, CardBody, CardHeader, CardTitle, Col, FormGroup, Input, Label, Table} from 'reactstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import '../../assets/scss/home.scss'
import {faMapMarkerAlt, faPen, faPlus, faSearch, faTrash} from "@fortawesome/free-solid-svg-icons"
import React, {useEffect, useState} from "react"
import axios from 'axios'
import {Link} from "react-router-dom"
import PharmacyService from "../../services/pharmacyService"
import {get_villes} from "../../services/vlleService"
import ZoneService from "../../services/zoneService"
import GardeService from "../../services/gardeService"


const Pharmacie = () => {
    const [pharmacies, setPharmacies] = useState([])
    const [villes, setvilles] = useState([])
    const [zones, setzones] = useState([])
    const [showAlert, setShowAlert] = useState(false)
    const [formData, setFormData] = useState(null)


    const handleChange = (event) => {
        const name = event.target.name
        let value = event.target.value
        if (event.target.name === 'ville') {
            value = villes.filter(z => z.id === Number(value))[0]
            setzones(value.zones)
        } else if (event.target.name === 'zone') {
            value = zones.filter(z => z.id === Number(value))[0]
        }
        console.log(value)
        setFormData((prevFormData) => ({
            ...prevFormData, [name]: value
        }))
    }

    const deleteById = (id) => {
        alert(id)
        PharmacyService.remove(id).then(response => {
            console.info(response.data)
            for (let i = 0; i < pharmacies.length; i++) {
                if (pharmacies[i].id === Number(id)) {
                    pharmacies.splice(i, 1)
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

    const fetch_pharmacies = async () => {
        try {
            const response = await axios.get('https://pharmacymanagementback-production.up.railway.app/api/pharmacies/')
            setPharmacies(response.data)
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetch_pharmacies()
        get_villes().then(response => {
            console.info(response.data)
            setvilles(response.data)
        })
        ZoneService.getAll().then(response => {
            setzones(response)
        })
    }, [])


    function searchPharmacy() {
        if (!formData?.zone || !formData?.ville) {
            fetch_pharmacies()
        } else {
            console.log(formData)
            GardeService.findPharmacieByNomVilleAndZone(formData.zone.nom, formData.ville.nom).then(response => {
                console.log(response)
                setPharmacies(response)
            }, error => {
                console.error(error)
            })
        }
        if (formData?.zone && formData?.datedebut) {
            GardeService.find_disponible_pharmacy(formData.zone.id, formData.datedebut).then(response => {
                console.log(response)
                setPharmacies(response)
            }, error => {
                console.error(error)
            })
        }

        setFormData(null)
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
                    <div className=" col-md-12">
                        <Card>
                            <CardHeader>
                                <CardTitle>Pharmacies
                                </CardTitle>

                                <FormGroup row>
                                    <Col sm='12'>
                                        <Input
                                            onChange={handleChange}
                                            type='select'
                                            name='ville' id='ville'
                                            placeholder='ville..'>
                                            <option selected value={null}>select ville</option>
                                            {villes.map((item, index) => (
                                                <option value={item.id}>{item?.nom}</option>))}

                                        </Input>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Col sm='12'>
                                        <Input
                                            onChange={handleChange}
                                            type='select'
                                            name='zone' id='zone'
                                            placeholder='zone..'>
                                            <option selected value={null}>select zone</option>
                                            {zones.map((item, index) => (
                                                <option value={item.id}>{item?.nom}</option>))}
                                        </Input>
                                    </Col>
                                </FormGroup>


                                <FormGroup row>
                                    <Label sm='3' for='datefin'>
                                        date
                                    </Label>
                                    <Col sm='9'>
                                        <Input
                                            onChange={handleChange}
                                            type='date'
                                            name='datedebut' id='datedebut'
                                            placeholder='date debut..'/>
                                    </Col>
                                </FormGroup>

                                <Button
                                    className="m-1"
                                    onClick={e => searchPharmacy()}
                                    size="sm"
                                    color="info">
                                    <FontAwesomeIcon className="mr-1" icon={faSearch}/>
                                </Button>

                                <Link to="/create-pharmacy">
                                    <Button
                                        color="primary">
                                        <FontAwesomeIcon className="mr-1" icon={faPlus}/>
                                    </Button>
                                </Link>

                            </CardHeader>
                            <CardBody>
                                <Table className="responsive" responsive>
                                    <thead>
                                    <tr>
                                        <th scope='col' className='text-nowrap'></th>
                                        <th scope='col' className='text-nowrap'>nom</th>
                                        <th scope='col' className='text-nowrap'>Address</th>
                                        <th scope='col' className='text-nowrap'>action</th>

                                    </tr>
                                    </thead>
                                    <tbody>

                                    {pharmacies.map((item, index) => (
                                        <tr key={index}>
                                            <td className='text-nowrap'>
                                                <img src={item?.image} alt="not found" className="img__phar"/>
                                            </td>
                                            <td className='text-nowrap'>{item?.name}</td>
                                            <td className='text-nowrap'>{item?.address}</td>
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

                                                <Link to={`/pharmacy/${item.id}`}>
                                                    <Button
                                                        className="m-1"
                                                        size="sm"
                                                        color="primary">
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

export default Pharmacie
