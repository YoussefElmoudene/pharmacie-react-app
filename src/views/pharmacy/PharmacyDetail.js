import '../../assets/scss/home.scss'
import React, {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import {Card, CardBody, CardHeader, CardText, CardTitle, ListGroup, ListGroupItem} from "reactstrap"
import PharmacyService from "../../services/pharmacyService"
import {MapContainer, Marker, TileLayer} from "react-leaflet"

const firstPhar = {
    id: 1,
    name: "Pharmacie Jaouhara",
    address: " JXQJ+3PX, Place Bir Anzarane, Marrakech 40000",
    image: "data:image/jpeg;base64,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",
    altitude: 31.6377142,
    longitude: -8.0881762,
    zone: "geuliz"
}

const Pharmacie = () => {
    const [pharmacie, setPharmacie] = useState(firstPhar)
    const {id} = useParams()
    const zoom = 5


    useEffect(() => {
        PharmacyService.getById(id).then(response => {
            setPharmacie(response)
            console.log(response)
        }, error => {
            console.error(error)
        })

    }, [])


    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <Card
                            style={{
                                width: '100%'
                            }}
                        >
                            <img
                                alt="Card"
                                src={pharmacie?.image}
                            />
                            <CardBody>
                                <CardTitle tag="h5">
                                    {pharmacie?.name}
                                </CardTitle>
                                <CardText>
                                    {pharmacie?.address}
                                </CardText>
                            </CardBody>
                            <ListGroup flush>

                                <ListGroupItem>
                                    <strong className="lib__phar">{pharmacie?.zone}</strong>

                                </ListGroupItem>

                            </ListGroup>
                        </Card>
                    </div>

                    <div className="col-md-6">
                        <Card className='overflow-hidden'>
                            <CardHeader>
                                <CardTitle tag='h4'>Location</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <MapContainer center={[pharmacie?.altitude, pharmacie?.longitude]} zoom={zoom}
                                              className='leaflet-map'>
                                    <TileLayer
                                        attribution='&ampcopy <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                                        url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
                                    />
                                    <Marker position={[pharmacie?.altitude, pharmacie?.longitude]}/>
                                </MapContainer>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pharmacie
