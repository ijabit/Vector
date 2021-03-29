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
    [Route("api/[controller]")]
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
            var sql = @"SELECT Student.Id, FirstName, MiddleName, LastName, EmailAddress, StudentCourses.CourseId, Course.Id, Course.Name, Course.Content
                        FROM Student
                        INNER JOIN StudentCourses on StudentCourses.StudentId = Student.Id
                        INNER JOIN Course on Course.Id = StudentCourses.CourseId";
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                var allStudents = (await connection.QueryAsync<Student, Course, Student>(sql, (student, course) =>
                {
                    student.Courses.Add(course);
                    return student;
                }, splitOn: "CourseId")).ToList();

                var allStudentsGrouped = allStudents.GroupBy(x => x.Id).Select(g =>
                {
                    var grouped = g.First();
                    grouped.Courses = g.Select(x => x.Courses.Single()).ToList();
                    return grouped;
                });

                return allStudentsGrouped;
            }
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<Student> GetById(int id)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                var student = await connection.QueryFirstAsync<Student>($"SELECT Id, FirstName, MiddleName, LastName, EmailAddress FROM Student WHERE Id = {id}");
                return student;
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

                await connection.QueryAsync("CreateStudent", parameters, commandType: System.Data.CommandType.StoredProcedure);
                var newId = parameters.Get<int>("id");

                var createdStudent = await connection.QueryFirstAsync<Student>($"SELECT Id, FirstName, MiddleName, LastName, EmailAddress FROM Student WHERE Id = {newId}");
                return createdStudent;
            }
        }

        [HttpPut]
        public async Task<Student> UpdateStudent(Student studentToUpdate)
        {
            var sql = $"UPDATE Student SET FirstName = @FirstName, MiddleName = @MiddleName, LastName = @LastName, EmailAddress = @EmailAddress WHERE Id = {studentToUpdate.Id}";
            var removeCourseAssignmentsSql = $"DELETE FROM StudentCourses WHERE StudentId = {studentToUpdate.Id}";
            var insertCourseAssignmentSql = $"INSERT INTO StudentCourses (StudentId, CourseId) VALUES (@StudentId, @CourseId)";
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                await connection.OpenAsync();

                using (var transaction = await connection.BeginTransactionAsync())
                {
                    await connection.ExecuteAsync(sql, studentToUpdate, transaction);
                    await connection.ExecuteAsync(removeCourseAssignmentsSql, transaction: transaction);
                    foreach (var assignedCourse in studentToUpdate.Courses)
                    {
                        var model = new
                        {
                            StudentId = studentToUpdate.Id,
                            CourseId = assignedCourse.Id
                        };
                        await connection.ExecuteScalarAsync(insertCourseAssignmentSql, model, transaction);
                    }
                    
                    transaction.Commit();
                }
                    

                var updatedStudent = await connection.QueryFirstAsync<Student>($"SELECT Id, FirstName, MiddleName, LastName, EmailAddress FROM Student WHERE Id = {studentToUpdate.Id}");
                return updatedStudent;
            }
        }
    }
}