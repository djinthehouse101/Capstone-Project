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
using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    /// This class is used to create the controller for the Employee portion of the database.
    ///
    /// This class is used to create the different method that will allow changes to made to the employee portion of the database.
    public class EmployeeController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        /// <summary>
        /// This constructor is used to create the EmployeeController within other classes.
        /// </summary>
        /// <param name="configuration">Used to hold the configurations</param>
        /// <param name="env">Used to gain access to folder for photos</param>
        public EmployeeController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        /// <summary>
        /// This is the function used to return the values from the employee table
        /// </summary>
        /// <returns>Returns employee table query</returns>
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                            select EmployeeId, EmployeeName, Department,
                            convert(varchar(10),DateOfJoining,120) as DateOfJoining,
                            PhotoFileName
                            from dbo.Employee
                            ";
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
        /// This method is used to data into the employee table.
        /// </summary>
        /// <param name="emp">Used to hold the data on the employee table</param>
        /// <returns>String that states the insert has worked succesfully</returns>
        [HttpPost]
        public JsonResult Post(Employee emp)
        {
            string query = @"
                            insert into dbo.Employee 
                            (EmployeeName,Department,DateOfJoining,PhotoFileName)
                            values
                            (
                            '" + emp.EmployeeName + @"'
                            ,'" + emp.Department + @"'
                            ,'" + emp.DateOfJoining + @"'
                            ,'" + emp.PhotoFileName + @"'
                            )
                            ";
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
        /// This method is used to replace data within the employee table.
        /// </summary>
        /// <param name="emp">Used to hold the data on the employee table</param>
        /// <returns>String that states the update has worked succesfully</returns>
        [HttpPut]
        public JsonResult Put(Employee emp)
        {
            string query = @"
                            update dbo.Employee set 
                            EmployeeName = '" + emp.EmployeeName + @"'
                            ,Department = '" + emp.Department + @"'
                            ,DateOfJoining = '" + emp.DateOfJoining + @"'
                            where EmployeeId = " + emp.EmployeeId + @"";
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
        /// This method is used to delete data from the employee table.
        /// </summary>
        /// <param name="emp">Used to hold the employee id being deleted</param>
        /// <returns>String that states the delete has worked succesfully</returns>
        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                            delete from dbo.Employee 

                            where EmployeeId = " + id + @"";
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

        /// <summary>
        /// This method is used to save a photo to the files folder for later reference.
        /// </summary>
        /// <returns>Returns file name if possible else returns standard stock photo</returns>
        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/Photos/" + filename;

                using(var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }

                return new JsonResult(filename);
            }
            catch (Exception)
            {
                return new JsonResult("anonymous.png");
            }
        }

        /// <summary>
        /// This is the function used to return all the department names
        /// </summary>
        /// <returns>Returns department names query</returns>
        [Route("GetAllDepartmentNames")]
        public JsonResult GetAllDepartmentNames()
        {
            string query = @"
                            select DepartmentName from dbo.Department
                            ";
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
    }
}
