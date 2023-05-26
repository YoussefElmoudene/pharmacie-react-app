import {Alert, Button, Card, CardBody, CardHeader, CardTitle, Table} from 'reactstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPen, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons"
import React, {useEffect, useState} from "react"
import '../../assets/scss/home.scss'
import {Link} from "react-router-dom"
import GardeService from "../../services/gardeService"

const Garde = () => {
    const [gardes, setGardes] = useState([])
    const [showAlert, setShowAlert] = useState(false)

    useEffect(() => {
        GardeService.getAll().then(response => {
            console.log(response)
            setGardes(response)
        }, error => {
            console.error(error)
        })
    }, [])

    const deleteById = (item) => {
        alert(item)
        GardeService.remove(item).then(response => {
            // console.info(response.data)
            // for (let i = 0; i < gardes.length; i++) {
            //     if (gardes[i].id === Number(id)) {
            //         gardes.splice(i, 1)
            //         setShowAlert(true)
            //         const timer = setInterval(() => {
            //             setShowAlert(false)
            //             clearInterval(timer)
            //         }, 3000)
            //     }
            // }
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
                            <CardTitle>Gardes
                            </CardTitle>
                            <Link to="/create-garde">
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
                                        Pharmacy
                                    </th>

                                    <th scope='col' className='text-nowrap'>
                                        Garde
                                    </th>

                                    <th scope='col' className='text-nowrap'>
                                        start time
                                    </th>

                                    <th scope='col' className='text-nowrap'>
                                        end time
                                    </th>

                                    <th scope='col' className='text-nowrap'>
                                        Action
                                    </th>

                                </tr>
                                </thead>
                                <tbody>
                                {gardes.map((item, index) => (<tr key={index}>
                                    <td className='text-nowrap icon'>{item.pharmacie.name}</td>
                                    <td className='text-nowrap icon'>{item.grade.type}</td>
                                    <td className='text-nowrap icon'>{item.pharmacieGardePK.datedebut}</td>
                                    <td className='text-nowrap icon'>{item.pharmacieGardePK.datefin}</td>
                                    <td className="text-nowrap">
                                        <Button
                                            className="m-1"
                                            color="warning"
                                            size="sm">
                                            <FontAwesomeIcon icon={faPen}/>
                                        </Button>

                                        <Button
                                            onClick={e => deleteById(item.pharmacieGardePK)}
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

export default Garde
