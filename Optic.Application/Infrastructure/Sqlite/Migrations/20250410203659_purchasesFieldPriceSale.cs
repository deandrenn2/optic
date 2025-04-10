using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Optic.Application.Infrastructure.Sqlite.Migrations
{
    /// <inheritdoc />
    public partial class purchasesFieldPriceSale : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "PriceSale",
                table: "PurchaseDetails",
                type: "TEXT",
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PriceSale",
                table: "PurchaseDetails");
        }
    }
}
