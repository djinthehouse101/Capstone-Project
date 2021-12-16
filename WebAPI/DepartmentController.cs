using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    /// Class is used to create a controller for Department
    ///
    /// Class is used to create the methods that will access and make different changes to the Department table.
    public class DepartmentController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        /// <summary>
        /// This constructor is used to create the DepartmentController within other classes.
        /// </summary>
        /// <param name="configuration">Used to hold the configurations</param>
        public DepartmentController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        /// <summary>
        /// This is the function used to return the values from the department table
        /// </summary>
        /// <returns>Returns department table query</returns>
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                            select DepartmentId, DepartmentName from dbo.Department";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        /// <summary>
        /// This method is used to data into the department table.
        /// </summary>
        /// <param name="dep">Used to hold the data on the department table</param>
        /// <returns>String that states the insert has worked succesfully</returns>
        [HttpPost]
        public JsonResult Post(Department dep)
        {
            string query = @"
                            insert into dbo.Department values
                            ('"+ dep.DepartmentName+@"')";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }

        /// <summary>
        /// This method is used to replace data within the department table.
        /// </summary>
        /// <param name="dep">Used to hold the data on the department table</param>
        /// <returns>String that states the update has worked succesfully</returns>
        [HttpPut]
        public JsonResult Put(Department dep)
        {
            string query = @"
                            update dbo.Department set 
                            DepartmentName = '" + dep.DepartmentName + @"'
                            where DepartmentId = " + dep.DepartmentId + @"";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Updated Successfully");
        }

        /// <summary>
        /// This method is used to delete data from the department table.
        /// </summary>
        /// <param name="id">Used to hold the department id being deleted</param>
        /// <returns>String that states the delete has worked succesfully</returns>
        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                            delete from dbo.Department 

                            where DepartmentId = " + id + @"";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Deleted Successfully");
        }
    }
}
