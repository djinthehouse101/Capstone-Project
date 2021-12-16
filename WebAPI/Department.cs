using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    /// Class is used to create a Department.
    ///
    /// Class is used to create the variables that will be used with the DepartmentController class.
    public class Department
    {
        public int DepartmentId { get; set; }

        public string DepartmentName { get; set; }
    }
}
