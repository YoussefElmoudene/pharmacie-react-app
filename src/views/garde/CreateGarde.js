import '../../assets/scss/home.scss'
import React, {useEffect, useState} from "react"
import {Button, Card, CardBody, CardHeader, CardTitle, Col, FormFeedback, FormGroup, Input, Label} from 'reactstrap'
import {garde, newGardepharmacie} from "../../models/models"
import GardeService from "../../services/gardeService"
import PharmacyService from "../../services/pharmacyService"
import {get_gardes} from "../../services/vlleService"

const CreateGarde = () => {
    const [formData, setFormData] = useState(garde)
    const [gardePharmacy, setGardePharmacy] = useState(newGardepharmacie)
    const [errors, setErrors] = useState({})
    const [pharmacies, setPharmacies] = useState([])
    const [grades, setGrades] = useState([])

    useEffect(async () => {
        PharmacyService.getAll().then(response => {
            setPharmacies(response)
        })
        get_gardes().then(response => {
            console.log(response)
            setGrades(response.data)
        })
    }, [])

    const handleChange = (event) => {
        const name = event.target.name
        let value = event.target.value
        if (event.target.name === 'grade') {
            value = grades.filter(z => z.id === Number(value))[0]
        } else if (event.target.name === 'pharmacie') {
            value = pharmacies.filter(z => z.id === Number(value))[0]
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
        if (data.pharmacie === null) {
            errors.pharmacie = 'Please enter a valid value'
        }
        if (data.grade === null) {
            errors.grade = 'Please enter a valid value'
        }
        if (data.datedebut === null) {
            errors.datedebut = 'Please enter a valid value'
        }
        if (data.datefin === null) {
            errors.datefin = 'Please enter a valid value'
        }
        return errors
    }

    const handleSubmit = async (event) => {
        const validationErrors = validateForm(formData)
        if (Object.keys(validationErrors).length === 0) {
            gardePharmacy.grade = formData.grade
            gardePharmacy.pharmacie = formData.pharmacie
            gardePharmacy.pharmacie.zone = null
            gardePharmacy.pharmacieGardePK.datedebut = formData.datedebut
            gardePharmacy.pharmacieGardePK.datefin = formData.datefin
            gardePharmacy.pharmacieGardePK.grade = formData.grade.id
            gardePharmacy.pharmacieGardePK.pharmacie = formData.pharmacie.id
            // Form is valid, perform submission logic
            console.log(gardePharmacy)
            GardeService.save(gardePharmacy).then(response => {
                console.info(response)
                setFormData(garde)
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
                        <CardTitle tag='h4'>create garde for pharmacy</CardTitle>
                    </CardHeader>

                    <CardBody>
                        <FormGroup row>
                            <Label sm='3' for='pharmacie'>
                                Select pharmacy
                            </Label>
                            <Col sm='9'>
                                <Input invalid={errors?.pharmacie}
                                       onChange={handleChange}
                                       type='select'
                                       name='pharmacie' id='pharmacie'
                                       placeholder='zone..'>
                                    {pharmacies.map((item, index) => (<option value={item.id}>{item?.name}</option>))}
                                </Input>
                                <FormFeedback>
                                    {errors?.pharmacie}
                                </FormFeedback>
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label sm='3' for='grade'>
                                Select garde
                            </Label>
                            <Col sm='9'>
                                <Input invalid={errors?.grade}
                                       onChange={handleChange}
                                       type='select'
                                       name='grade' id='grade'
                                       placeholder='grade..'>
                                    {grades.map((item, index) => (<option value={item.id}>{item?.type}</option>))}

                                </Input>
                                <FormFeedback>
                                    {errors?.grade}
                                </FormFeedback>
                            </Col>
                        </FormGroup>


                        <FormGroup row>
                            <Label sm='3' for='datefin'>
                                date fin
                            </Label>
                            <Col sm='9'>
                                <Input invalid={errors?.datedebut}
                                       onChange={handleChange}
                                       valid={formData.datedebut}
                                       type='date'
                                       name='datedebut' id='datedebut'
                                       placeholder='date debut..'/>

                                <FormFeedback>
                                    {errors?.datedebut}
                                </FormFeedback>
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label sm='3' for='datefin'>
                                date fin
                            </Label>
                            <Col sm='9'>
                                <Input invalid={errors?.datefin}
                                       onChange={handleChange}
                                       valid={formData.datefin}
                                       type='date'
                                       name='datefin' id='datefin'
                                       placeholder='date fin..'/>

                                <FormFeedback>
                                    {errors?.datefin}
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

export default CreateGarde