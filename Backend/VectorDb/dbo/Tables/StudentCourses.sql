CREATE TABLE [dbo].[StudentCourses] (
    [StudentId] INT NOT NULL,
    [CourseId]  INT NOT NULL,
    CONSTRAINT [PK_StudentCourses] PRIMARY KEY CLUSTERED ([StudentId] ASC, [CourseId] ASC),
    CONSTRAINT [FK_StudentCourses_Course] FOREIGN KEY ([CourseId]) REFERENCES [dbo].[Course] ([Id]),
    CONSTRAINT [FK_StudentCourses_Student] FOREIGN KEY ([StudentId]) REFERENCES [dbo].[Student] ([Id])
);

