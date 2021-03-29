using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using VectorSolution.Models;

namespace VectorSolution.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoursesController : ControllerBase
    {
        private string connectionString;

        public CoursesController(IOptions<ConnectionStringConfig> connectionConfig)
        {
            connectionString = connectionConfig?.Value?.LocalDb;
        }

        [HttpGet]
        public async Task<IEnumerable<Student>> Get()
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                var allStudents = (await connection.QueryAsync<Student>("SELECT Id, Name, Content FROM Course")).ToList();
                return allStudents;
            }
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<Student> GetById(int id)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                var student = await connection.QueryFirstAsync<Student>($"SELECT Id, Name, Content FROM Course WHERE Id = {id}");
                return student;
            }
        }
    }
}
