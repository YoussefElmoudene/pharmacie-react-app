import '../../assets/scss/home.scss'
import React, {useEffect, useState} from "react"
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Col,
    Form,
    FormFeedback,
    FormGroup,
    Input,
    Label
} from 'reactstrap'
import {pharmacy} from "../../models/models"
import PharmacyService from "../../services/pharmacyService"
import ZoneService from "../../services/zoneService"

const CreatePharmacie = () => {
    const [formData, setFormData] = useState(pharmacy)
    const [errors, setErrors] = useState({})
    const [image, setImage] = useState(null)
    const [zone, setZone] = useState(null)
    const [zones, setZones] = useState([])


    useEffect(async () => {
        try {
            const response = await ZoneService.getAll()
            console.log(response)
            setZones(response)
        } catch (error) {
            // Handle the error
            console.error(error)
        }
    }, [])

    const handleChange = (event) => {
        const name = event.target.name
        let value = event.target.value
        if (event.target.type === 'file') {
            const file = event.target.files[0]
            const reader = new FileReader()
            reader.onload = (e) => {
                value = e.target.result
                setImage(value)
            }
            reader.readAsDataURL(file)
        } else if (event.target.type === 'select-one') {
            value = zones.filter(z => z.id === Number(value))[0]
        }
        console.log(value)
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }))
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: ''
        }))
    }


    const validateForm = (data) => {
        const errors = {}

        if (data.altitude === 0) {
            errors.altitude = 'Please enter a valid value'
        }


        if (data.longitude === 0) {
            errors.longitude = 'Please enter a valid value'
        }


        if (data.zone === null) {
            errors.zone = 'Please enter a valid value'
        }


        if (data.address === null) {
            errors.address = 'Please enter a valid value'
        }


        if (data.name === null) {
            errors.name = 'Please enter a valid value'
        }

        return errors
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        formData.image = image
        formData.zone.ville = null
        formData.zone.pharmacies = null
        console.log(formData)
        const validationErrors = validateForm(formData)
        if (Object.keys(validationErrors).length === 0) {
            // Form is valid, perform submission logic
            console.log(formData)
            try {
                const response = await PharmacyService.save(formData)
                console.info(response)
                setFormData(pharmacy)
                // Handle the response data or update the component state
            } catch (error) {
                // Handle the error
                console.error(error)
            }

            // ... perform submission logic
            setErrors({})
        } else {
            // Form is invalid, update error state
            setErrors(validationErrors)
        }
    }

    return (<div className="container">
        <div className="row">
            <div className=" col-md-12">
                <Card>
                    <CardHeader>
                        <CardTitle tag='h4'>create pharmacy</CardTitle>
                    </CardHeader>

                    <CardBody>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup row>
                                <Label sm='3' for='name'>
                                    Select zone
                                </Label>
                                <Col sm='9'>
                                    <Input invalid={errors?.zone}
                                           onChange={handleChange}
                                           type='select'
                                           name='zone' id='zone'
                                           placeholder='zone..'>
                                        {zones.map((item, index) => (
                                            <option value={item.id}>{item?.ville} - {item?.nom}</option>
                                        ))}

                                    </Input>
                                    <FormFeedback>
                                        {errors?.zone}
                                    </FormFeedback>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label sm='3' for='name'>
                                    Name
                                </Label>
                                <Col sm='9'>
                                    <Input invalid={errors?.name}
                                           value={formData.name}
                                           onChange={handleChange}
                                           type='text'
                                           name='name' id='name'
                                           placeholder='Name..'/>
                                    <FormFeedback>
                                        {errors?.name}
                                    </FormFeedback>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label sm='3' for='address'>
                                    Address
                                </Label>
                                <Col sm='9'>
                                    <Input
                                        invalid={errors?.address}
                                        value={formData.address}
                                        onChange={handleChange}
                                        type='text' name='address' id='address' placeholder='Address'/>
                                    <FormFeedback>
                                        {errors?.address}
                                    </FormFeedback>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label sm='3' for='image'>
                                    image
                                </Label>
                                <Col sm='9'>
                                    <Input className="input__file"
                                           accept="image/*"
                                           invalid={errors?.image}
                                           onChange={handleChange}
                                           type='file' name='image' id='image'
                                           placeholder='image'/>

                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label sm='3' for='altitude'>
                                    altitude
                                </Label>
                                <Col sm='9'>
                                    <Input
                                        invalid={errors?.altitude}
                                        value={formData.altitude}
                                        onChange={handleChange}
                                        type='number' name='altitude' id='altitude' placeholder='altitude'/>
                                    <FormFeedback>
                                        {errors?.altitude}
                                    </FormFeedback>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label sm='3' for='longitude'>
                                    longitude
                                </Label>
                                <Col sm='9'>
                                    <Input invalid={errors?.longitude}
                                           value={formData.longitude}
                                           onChange={handleChange}
                                           type='number' name='longitude' id='longitude' placeholder='Longitude'/>
                                    <FormFeedback>
                                        {errors?.longitude}
                                    </FormFeedback>
                                </Col>
                            </FormGroup>


                            <FormGroup className='mb-0' row>
                                <Col className='d-flex' md={{size: 9, offset: 3}}>
                                    <Button.Ripple className='mr-1' color='primary' type='submit'
                                                   onClick={handleSubmit}>
                                        Submit
                                    </Button.Ripple>
                                    <Button.Ripple outline
                                                   onClick={e => e.preventDefault()}
                                                   color='secondary' type='reset'>
                                        Reset
                                    </Button.Ripple>
                                </Col>
                            </FormGroup>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        </div>
    </div>)
}

export default CreatePharmacie