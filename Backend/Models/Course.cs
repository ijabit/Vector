using System.Collections.Generic;

public class Course
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Content { get; set; }
    public List<Student> Students { get; set; } = new List<Student>();
}