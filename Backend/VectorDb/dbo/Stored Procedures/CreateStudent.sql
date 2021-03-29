-- =============================================
-- Author:		James Brown
-- Create date: Over the weekend
-- Description:	Create Student script
-- =============================================
CREATE PROCEDURE [dbo].[CreateStudent]
	@firstName varchar(50) = null,
	@middleName varchar(50) = null,
	@lastName varchar(50) = null,
	@emailAddress varchar(100) = null,
	@id int OUTPUT
AS
BEGIN
	SET NOCOUNT ON;

	INSERT INTO [dbo].[Student]
           ([FirstName]
           ,[MiddleName]
           ,[LastName]
           ,[EmailAddress])
     VALUES
           (@firstName, @middleName, @lastName, @emailAddress)

	SET @id = SCOPE_IDENTITY();

	RETURN @id

END