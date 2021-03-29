CREATE TABLE [dbo].[Student] (
    [Id]           INT            IDENTITY (1, 1) NOT NULL,
    [FirstName]    NVARCHAR (50)  NOT NULL,
    [MiddleName]   NVARCHAR (50)  NULL,
    [LastName]     NVARCHAR (50)  NOT NULL,
    [EmailAddress] NVARCHAR (100) NOT NULL,
    CONSTRAINT [PK_Student] PRIMARY KEY CLUSTERED ([Id] ASC)
);

