import {Alert, Button, Card, CardBody, CardHeader, CardTitle, Table} from 'reactstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import '../../assets/scss/home.scss'
import {faPen, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons"
import React, {useEffect, useState} from "react"
import axios from 'axios'
import {Link} from "react-router-dom"
import PharmacyService from "../../services/pharmacyService"


const Pharmacie = () => {
    const [pharmacies, setPharmacies] = useState([])
    const [showAlert, setShowAlert] = useState(false)


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
            const response = await axios.get('http://localhost:8037/api/pharmacies/')
            setPharmacies(response.data)
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetch_pharmacies()
    }, [])


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
                                        <th scope='col' className='text-nowrap'></th>
                                        <th scope='col' className='text-nowrap'>nom</th>
                                        <th scope='col' className='text-nowrap'>Address</th>
                                        <th scope='col' className='text-nowrap'>Altitude</th>
                                        <th scope='col' className='text-nowrap'>Longitude</th>
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
                                            <td className='text-nowrap'>{item?.altitude}</td>
                                            <td className='text-nowrap'>{item?.longitude}</td>
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
