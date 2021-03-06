import React, {Component} from 'react';
import {Modal,Button,Row,Col,Form} from 'react-bootstrap'

/**
 * This class is used to handle the the edit department function.
 */
export class EditDepartment extends Component
{

    /**
     * Used to construct the EditDepartment class.
     * @param {*} props holds the database data.
     */
    constructor(props)
    {
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    /**
     * This method is used to handle the department being edited.
     * @param {*} event holds query event taking place.
     */
    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'department',
        {
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(
                {
                DepartmentId:event.target.DepartmentId.value,
                DepartmentName:event.target.DepartmentName.value
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Failed');
        })
    }

    /**
     * Used to create the EditDepartment Modal.
     * @returns The rendered EditDepartment features.
     */
    render()
    {
        return (
            <div className="container">
                <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header clooseButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                       Edit Department
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="DepartmentId">
                                    <Form.Label>DepartmentId</Form.Label>
                                    <Form.Control type="text" name="DepartmentId" required
                                    disabled
                                    defaultValue={this.props.depid}
                                    placeholder="DepartmentId"/>
                                </Form.Group>

                                <Form.Group controlId="DepartmentName">
                                    <Form.Label>DepartmentName</Form.Label>
                                    <Form.Control type="text" name="DepartmentName" required
                                    defaultValue={this.props.depname}
                                    placeholder="DepartmentName"/>
                                </Form.Group>

                                <Form.Group>
                                    <Button variant="primary" type="submit">
                                        Update Department
                                    </Button>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="danger" onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>

            </Modal>
        </div>
        )
    }
}