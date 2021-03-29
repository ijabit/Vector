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
        public async Task<IEnumerable<Course>> Get()
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                var allCourses = (await connection.QueryAsync<Course>("SELECT Id, Name, Content FROM Course")).ToList();
                return allCourses;
            }
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<Course> GetById(int id)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                var course = await connection.QueryFirstAsync<Course>($"SELECT Id, Name, Content FROM Course WHERE Id = {id}");
                return course;
            }
        }
    }
}
