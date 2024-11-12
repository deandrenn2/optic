using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Optic.Application.Infrastructure.Sqlite.Migrations
{
    /// <inheritdoc />
    public partial class AbbreviationField : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Abbreviation",
                table: "Businesses",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Abbreviation",
                table: "Businesses");
        }
    }
}
