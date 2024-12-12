using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Optic.Application.Infrastructure.Sqlite.Migrations
{
    /// <inheritdoc />
    public partial class AddFieldAbreviationAndCreateDataDI : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Abbreviation",
                table: "IdentificationTypes",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "IdentificationTypes",
                columns: new[] { "Id", "Abbreviation", "Name", "Orden" },
                values: new object[,]
                {
                    { 1, "CC", "Cédula de ciudadanía", 1 },
                    { 2, "TI", "Tarjeta de Identidad", 2 },
                    { 3, "CE", "Cédula de extranjería", 3 },
                    { 4, "PA", "Pasaporte", 4 },
                    { 5, "RC", "Registro Civil de Nacimiento", 5 },
                    { 6, "PEP", "Permiso Especial de Permanencia", 6 },
                    { 7, "OO", "Otro", 7 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "IdentificationTypes",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "IdentificationTypes",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "IdentificationTypes",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "IdentificationTypes",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "IdentificationTypes",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "IdentificationTypes",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "IdentificationTypes",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DropColumn(
                name: "Abbreviation",
                table: "IdentificationTypes");
        }
    }
}
