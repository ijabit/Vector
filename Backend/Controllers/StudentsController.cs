using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using VectorSolution.Models;

namespace VectorSolution.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StudentsController : ControllerBase
    {
        private string connectionString;

        public StudentsController(IOptions<ConnectionStringConfig> connectionConfig)
        {
            connectionString = connectionConfig?.Value?.LocalDb;
        }

        [HttpGet]
        public async Task<IEnumerable<Student>> Get()
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                var allStudents = (await connection.QueryAsync<Student>("SELECT Id, FirstName, MiddleName, LastName, EmailAddress FROM Student")).ToList();
                return allStudents;
            }
        }

        [HttpPost]
        public async Task<Student> CreateStudent(Student newStudent)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                var values = new
                {
                    firstName = newStudent.FirstName,
                    middleName = newStudent.MiddleName,
                    lastName = newStudent.LastName,
                    emailAddress = newStudent.EmailAddress
                };
                var parameters = new DynamicParameters();
                parameters.AddDynamicParams(values);
                parameters.Add("id", dbType: System.Data.DbType.Int32, direction: System.Data.ParameterDirection.Output);

                var results = await connection.QueryAsync("CreateStudent", parameters, commandType: System.Data.CommandType.StoredProcedure);
                var newId = parameters.Get<int>("id");

                var createdStudent = await connection.QueryFirstAsync<Student>($"SELECT Id, FirstName, MiddleName, LastName, EmailAddress FROM Student WHERE Id = {newId}");
                return createdStudent;
            }
        }

        [HttpPut]
        public async Task<Student> UpdateStudent(Student studentToUpdate)
        {
            var sql = $"UPDATE Student SET FirstName = @FirstName, MiddleName = @MiddleName, LastName = @LastName, EmailAddress = @EmailAddress WHERE Id = {studentToUpdate.Id}";
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Execute(sql, studentToUpdate);

                var updatedStudent = await connection.QueryFirstAsync<Student>($"SELECT Id, FirstName, MiddleName, LastName, EmailAddress FROM Student WHERE Id = {studentToUpdate.Id}");
                return updatedStudent;
            }
        }
    }
}