using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Optic.Application.Infrastructure.Sqlite.Migrations
{
    /// <inheritdoc />
    public partial class AddSettingBrandAndCategories : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CategoryProduct",
                columns: table => new
                {
                    CategoriesId = table.Column<int>(type: "INTEGER", nullable: false),
                    ProductsId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CategoryProduct", x => new { x.CategoriesId, x.ProductsId });
                    table.ForeignKey(
                        name: "FK_CategoryProduct_Categories_CategoriesId",
                        column: x => x.CategoriesId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CategoryProduct_Products_ProductsId",
                        column: x => x.ProductsId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.UpdateData(
                table: "Settings",
                keyColumn: "Id",
                keyValue: 1,
                column: "Value",
                value: "[{\"Id\":1,\"Name\":\"Masculino\"},{\"Id\":2,\"Name\":\"Femenino\"}]");

            migrationBuilder.InsertData(
                table: "Settings",
                columns: new[] { "Id", "Description", "Name", "Value" },
                values: new object[,]
                {
                    { 3, "Lista de marcas", "LIST_BRAND", "[{\"Id\":1,\"Name\":\"Ray-Ban\"},{\"Id\":2,\"Name\":\"Oakley\"},{\"Id\":3,\"Name\":\"Incooptics\"},{\"Id\":4,\"Name\":\"Ópticas GMO\"},{\"Id\":5,\"Name\":\"Guess\"},{\"Id\":6,\"Name\":\"Silhouette\"},{\"Id\":7,\"Name\":\"Gucci\"},{\"Id\":8,\"Name\":\"Calvin Klein\"},{\"Id\":9,\"Name\":\"Tommy Hilfiger\"},{\"Id\":10,\"Name\":\"Carrera\"}]" },
                    { 4, "Habilitar código de barras", "ENABLED_BARCODE", "false" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_CategoryProduct_ProductsId",
                table: "CategoryProduct",
                column: "ProductsId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CategoryProduct");

            migrationBuilder.DeleteData(
                table: "Settings",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Settings",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.UpdateData(
                table: "Settings",
                keyColumn: "Id",
                keyValue: 1,
                column: "Value",
                value: "{Id:1,Name:Masculino},{Id:2,Name:Femenino}");
        }
    }
}
