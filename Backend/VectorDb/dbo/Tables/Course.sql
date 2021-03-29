CREATE TABLE [dbo].[Course] (
    [Id]      INT             IDENTITY (1, 1) NOT NULL,
    [Name]    NVARCHAR (50)   NOT NULL,
    [Content] NVARCHAR (4000) NOT NULL,
    CONSTRAINT [PK_Course] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Course_Course] FOREIGN KEY ([Id]) REFERENCES [dbo].[Course] ([Id])
);

