using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace VectorSolution.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StudentsController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<Student> Get()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new Student
            {
                FirstName = "test",
                MiddleName = "test",
                LastName = "test",
                EmailAddress = "test",
                Id = 1
            })
            .ToArray();
        }
    }
}
