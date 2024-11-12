using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Optic.Application.Infrastructure.Sqlite.Migrations
{
    /// <inheritdoc />
    public partial class uniqueIndexField : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Clients_IdentificationNumber",
                table: "Clients",
                column: "IdentificationNumber",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Businesses_CompanyName",
                table: "Businesses",
                column: "CompanyName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Businesses_Nit",
                table: "Businesses",
                column: "Nit",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Users_Email",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Clients_IdentificationNumber",
                table: "Clients");

            migrationBuilder.DropIndex(
                name: "IX_Businesses_CompanyName",
                table: "Businesses");

            migrationBuilder.DropIndex(
                name: "IX_Businesses_Nit",
                table: "Businesses");
        }
    }
}
