import React, {Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import { AddEmployee } from './AddEmployee';
import { EditEmployee } from './EditEmployee';

/**
 * This class is used to handle the creation of the Employee page
 */
export class Employee extends Component
{
    /**
     * Used to construct the Employee class.
     * @param {*} props holds the database data.
     */
    constructor(props)
    {
        super(props);
        this.state={emps:[], addModalShow:false, editModalShow:false}
    }

    /**
    * This method is used to refresh the datbase and give it new data.
    */
    refreshList(){
        fetch(process.env.REACT_APP_API+'employee').then(response=>response.json()).then(data=>{this.setState({emps:data});});
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
     * Used to delete an employee from the database.
     * @param {int} empid holds the employee id.
     */
    deleteEmp(empid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'employee/'+empid,
            {
                method:'DELETE',
                headers:
                {
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
    
        }
    }

    /**
     * Used to create the Employee webpage.
     * @returns the rendered employee modal.
     */
    render()
    {
        const {emps, empid, empname, depmt, photofilename, doj}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Employee Id</th>
                            <th>Employee Name</th>
                            <th>Department</th>
                            <th>Date of Joining</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emps.map(emp=>
                            <tr key={emp.EmployeeId}>
                                <td>{emp.EmployeeId}</td>
                                <td>{emp.EmployeeName}</td>
                                <td>{emp.Department}</td>
                                <td>{emp.DateOfJoining}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                            onClick={()=>this.setState({editModalShow:true,
                                            empid:emp.EmployeeId,empname:emp.EmployeeName, depmt:emp.Department,
                                            photofilename:emp.PhotoFileName, doj:emp.DateOfJoining})}>
                                                Edit
                                        </Button>

                                        <Button className="mr-2" variant="danger"
                                            onClick={()=>this.deleteEmp(emp.EmployeeId)}>
                                                Delete
                                        </Button>

                                        <EditEmployee show ={this.state.editModalShow}
                                        onHide={editModalClose}
                                        empid={empid}
                                        empname={empname}
                                        depmt={depmt}
                                        photofilename={photofilename}
                                        doj={doj}/>
                                    </ButtonToolbar>
                                </td>
                            </tr>)}
                    </tbody>
                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                        Add Employee
                    </Button>
                    <AddEmployee show={this.state.addModalShow}
                    onHide={addModalClose}/>
</ButtonToolbar>
            </div>
        )
    }
}