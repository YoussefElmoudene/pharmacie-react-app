import '../../assets/scss/home.scss'
import React, {useState} from "react"
import {Button, Card, CardBody, CardHeader, CardTitle, Col, FormFeedback, FormGroup, Input, Label} from 'reactstrap'
import {pharmacy, ville} from "../../models/models"
import {save_ville} from "../../services/vlleService"

const CreateVille = () => {
    const [formData, setFormData] = useState(ville)
    const [errors, setErrors] = useState({})


    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
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
            // Form is valid, perform submission logic
            console.log(formData)
            save_ville(formData).then(response => {
                console.info(response.data)
                setFormData(ville)
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
                        <CardTitle tag='h4'>create city</CardTitle>
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

export default CreateVille