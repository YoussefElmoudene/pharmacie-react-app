import {Button, Card, CardBody, CardHeader, CardTitle, Table} from 'reactstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import '../../assets/scss/home.scss'
import {faPlus} from "@fortawesome/free-solid-svg-icons"
import React, {useEffect, useState} from "react"
import axios from 'axios'


const Pharmacie = () => {
    const [pharmacies, setPharmacies] = useState([])


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
                    <div className=" col-md-12">
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    <strong>Pharmacies</strong>
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
                                        <th scope='col' className='text-nowrap'>ID</th>
                                        <th scope='col' className='text-nowrap'>nom</th>
                                        <th scope='col' className='text-nowrap'>Address</th>
                                        <th scope='col' className='text-nowrap'>Altitude</th>
                                        <th scope='col' className='text-nowrap'>Longitude</th>

                                    </tr>
                                    </thead>
                                    <tbody>

                                    {pharmacies.map((item, index) => (
                                        <tr key={index}>
                                            <td className='text-nowrap'>{item?.id}</td>
                                            <td className='text-nowrap'>{item?.name}</td>
                                            <td className='text-nowrap'>{item?.address}</td>
                                            <td className='text-nowrap'>{item?.altitude}</td>
                                            <td className='text-nowrap'>{item?.longitude}</td>
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
