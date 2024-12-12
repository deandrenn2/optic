using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Optic.Application.Infrastructure.Sqlite.Migrations
{
    /// <inheritdoc />
    public partial class AddRelateProductSupplier : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "IdSupplier",
                table: "Products",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Products_IdSupplier",
                table: "Products",
                column: "IdSupplier");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Suppliers_IdSupplier",
                table: "Products",
                column: "IdSupplier",
                principalTable: "Suppliers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_Suppliers_IdSupplier",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Products_IdSupplier",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "IdSupplier",
                table: "Products");
        }
    }
}
