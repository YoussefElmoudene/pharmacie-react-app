import '../../assets/scss/home.scss'
import React, {useEffect, useState} from "react"
import {Button, Card, CardBody, CardHeader, CardTitle, Col, FormFeedback, FormGroup, Input, Label} from 'reactstrap'
import {zone} from "../../models/models"
import ZoneService from "../../services/zoneService"
import {get_villes} from "../../services/vlleService"

const CreateZone = () => {
    const [formData, setFormData] = useState(zone)
    const [errors, setErrors] = useState({})
    const [villes, setvilles] = useState([])


    useEffect(async () => {
        get_villes().then(response => {
            console.log(response.data)
            setvilles(response.data)
        }, error => {
            console.error(error)
        })
    }, [])
    const handleChange = (event) => {
        const name = event.target.name
        let value = event.target.value
        if (event.target.name === 'ville') {
            value = villes.filter(z => z.id === Number(value))[0]
        }
        console.log(value)
        setFormData((prevFormData) => ({
            ...prevFormData, [name]: value
        }))
        setErrors((prevErrors) => ({
            ...prevErrors, [name]: ''
        }))
    }


    const validateForm = (data) => {
        const errors = {}
        if (data.nom === null) {
            errors.nom = 'Please enter a valid value'
        }
        return errors
    }

    const handleSubmit = async (event) => {
        const validationErrors = validateForm(formData)
        if (Object.keys(validationErrors).length === 0) {
            formData.ville.zones = null
            // Form is valid, perform submission logic
            console.log(formData)
            ZoneService.save(formData).then(response => {
                console.info(response)
                setFormData(zone)
            }, error => {
                console.error(error)
            })

            // ... perform submission logic
            // setFormData(pharmacy)
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
                        <CardTitle tag='h4'>create zone</CardTitle>
                    </CardHeader>
                    <CardBody>

                        <FormGroup row>
                            <Label sm='3' for='nom'>
                                Name
                            </Label>
                            <Col sm='9'>
                                <Input invalid={errors?.nom}
                                       value={formData.nom}
                                       onChange={handleChange}
                                       type='text'
                                       name='nom' id='nom'
                                       placeholder='Name..'/>
                                <FormFeedback>
                                    {errors?.nom}
                                </FormFeedback>
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label sm='3' for='grade'>
                                Select city
                            </Label>
                            <Col sm='9'>
                                <Input invalid={errors?.ville}
                                       onChange={handleChange}
                                       type='select'
                                       name='ville' id='ville'
                                       placeholder='ville..'>
                                    {villes.map((item, index) => (<option value={item.id}>{item?.nom}</option>))}

                                </Input>
                                <FormFeedback>
                                    {errors?.ville}
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
                    </CardBody>
                </Card>
            </div>
        </div>
    </div>)
}

export default CreateZone