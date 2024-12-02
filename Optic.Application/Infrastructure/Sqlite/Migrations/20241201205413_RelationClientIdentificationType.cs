using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Optic.Application.Infrastructure.Sqlite.Migrations
{
    /// <inheritdoc />
    public partial class RelationClientIdentificationType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Clients_IdentificationTypeId",
                table: "Clients",
                column: "IdentificationTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Clients_IdentificationTypes_IdentificationTypeId",
                table: "Clients",
                column: "IdentificationTypeId",
                principalTable: "IdentificationTypes",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Clients_IdentificationTypes_IdentificationTypeId",
                table: "Clients");

            migrationBuilder.DropIndex(
                name: "IX_Clients_IdentificationTypeId",
                table: "Clients");
        }
    }
}
