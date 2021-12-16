import React, {Component} from 'react';
import {Table} from 'react-bootstrap';


import {Button,ButtonToolbar} from 'react-bootstrap';
import { AddDepartment } from './AddDepartment';
import { EditDepartment } from './EditDepartment';

/**
 * This class is used to handle the creation of the Department page
 */
export class Department extends Component
{
    /**
     * Used to construct the Department class.
     * @param {*} props holds the database data.
     */
    constructor(props){
        super(props);
        this.state={deps:[], addModalShow:false, editModalShow:false}
    }
    /**
    * This method is used to refresh the datbase and give it new information.
    */
    refreshList(){
        fetch(process.env.REACT_APP_API+'department')
        .then(response=>response.json())
        .then(data=>{
            this.setState({deps:data});
        });
    }

    /**
     * Used to mount the data from refresh list.
     */
    componentDidMount(){
        this.refreshList();
    }

    /**
     * Used to update the modal if the conent is updated.
     */
    componentDidUpdate(){
        this.refreshList();
    }

    /**
     * Used to delete a department from the database.
     * @param {int} depid holds the department id.
     */
    deleteDep(depid)
    {
        if(window.confirm('Are you sure?'))
        {
            fetch(process.env.REACT_APP_API+'department/'+depid,
            {
                method:'DELETE',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
    
        }
    }
    /**
     * Used to create the Department webpage.
     * @returns the rendered department modal.
     */
    render()
    {
        const {deps, depid, depname}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Department Id</th>
                            <th>Department Name</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deps.map(dep=>
                            <tr key={dep.DepartmentId}>
                                <td>{dep.DepartmentId}</td>
                                <td>{dep.DepartmentName}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                            onClick={()=>this.setState({editModalShow:true,
                                            depid:dep.DepartmentId,depname:dep.DepartmentName})}>
                                                Edit
                                        </Button>

                                        <Button className="mr-2" variant="danger"
                                            onClick={()=>this.deleteDep(dep.DepartmentId)}>
                                                Delete
                                        </Button>

                                        <EditDepartment show ={this.state.editModalShow}
                                        onHide={editModalClose}
                                        depid={depid}
                                        depname={depname}/>
                                    </ButtonToolbar>
                                </td>
                            </tr>)}
                    </tbody>
                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                        Add Department
                    </Button>
                    <AddDepartment show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}