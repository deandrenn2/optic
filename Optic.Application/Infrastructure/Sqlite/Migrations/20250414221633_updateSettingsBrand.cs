using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Optic.Application.Infrastructure.Sqlite.Migrations
{
    /// <inheritdoc />
    public partial class updateSettingsBrand : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Settings",
                keyColumn: "Id",
                keyValue: 3,
                column: "Value",
                value: "[{\"Id\":1,\"Name\":\"Valentin\"},{\"Id\":2,\"Name\":\"Mebixza\"},{\"Id\":3,\"Name\":\"VIVAIO\"},{\"Id\":4,\"Name\":\"OH\"},{\"Id\":5,\"Name\":\"Miratto\"},{\"Id\":6,\"Name\":\"Martinni\"},{\"Id\":7,\"Name\":\"CODE\"},{\"Id\":8,\"Name\":\"OKLEY\"},{\"Id\":9,\"Name\":\"OCHOYMEDIO\"},{\"Id\":10,\"Name\":\"⁠KIDS Miratto\"},{\"Id\":11,\"Name\":\"FREEGEN\"},{\"Id\":12,\"Name\":\"SOLUTER\"},{\"Id\":13,\"Name\":\"OPTI-FREE\"}]");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Settings",
                keyColumn: "Id",
                keyValue: 3,
                column: "Value",
                value: "[{\"Id\":1,\"Name\":\"Ray-Ban\"},{\"Id\":2,\"Name\":\"Oakley\"},{\"Id\":3,\"Name\":\"Incooptics\"},{\"Id\":4,\"Name\":\"Ópticas GMO\"},{\"Id\":5,\"Name\":\"Guess\"},{\"Id\":6,\"Name\":\"Silhouette\"},{\"Id\":7,\"Name\":\"Gucci\"},{\"Id\":8,\"Name\":\"Calvin Klein\"},{\"Id\":9,\"Name\":\"Tommy Hilfiger\"},{\"Id\":10,\"Name\":\"Carrera\"}]");
        }
    }
}
