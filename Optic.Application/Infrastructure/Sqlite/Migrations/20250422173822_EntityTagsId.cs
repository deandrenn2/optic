using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Optic.Application.Infrastructure.Sqlite.Migrations
{
    /// <inheritdoc />
    public partial class EntityTagsId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Diagnosis",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "Diagnosis",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "Diagnosis",
                keyColumn: "Id",
                keyValue: 13);

            migrationBuilder.UpdateData(
                table: "Diagnosis",
                keyColumn: "Id",
                keyValue: 8,
                columns: new[] { "Description", "Name" },
                values: new object[] { "Distancia Pupilar, Es la distancia entre la entrada del ojo y la salida del mismo, en milímetros", "DP" });

            migrationBuilder.UpdateData(
                table: "Diagnosis",
                keyColumn: "Id",
                keyValue: 9,
                columns: new[] { "Description", "Name" },
                values: new object[] { "Este campo podría hacer referencia a la altura bifocal o algún otro ajuste específico de las lentes", "AB" });

            migrationBuilder.UpdateData(
                table: "Diagnosis",
                keyColumn: "Id",
                keyValue: 10,
                columns: new[] { "Description", "Name" },
                values: new object[] { "Altura de montaje de la lente. La distancia vertical desde la parte inferior del armazón hasta el centro óptico o punto de enfoque de la lente, especialmente relevante en lentes progresivos o bifocales", "ALT" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Diagnosis",
                keyColumn: "Id",
                keyValue: 8,
                columns: new[] { "Description", "Name" },
                values: new object[] { "Podría referirse al color del lente, si tiene un tinte específico para reducir el brillo o mejorar el contraste.", "COLOR" });

            migrationBuilder.UpdateData(
                table: "Diagnosis",
                keyColumn: "Id",
                keyValue: 9,
                columns: new[] { "Description", "Name" },
                values: new object[] { "Indica si las lentes tienen protección contra los rayos ultravioleta (UV)", "UV" });

            migrationBuilder.UpdateData(
                table: "Diagnosis",
                keyColumn: "Id",
                keyValue: 10,
                columns: new[] { "Description", "Name" },
                values: new object[] { "Indica si las lentes tienen protección contra los rayos visibles infrarrojos (VDT)", "VDT" });

            migrationBuilder.InsertData(
                table: "Diagnosis",
                columns: new[] { "Id", "Description", "Name" },
                values: new object[,]
                {
                    { 11, "Indica si las lentes tienen algún tipo de relajación visual o filtro especial para reducir la fatiga ocular", "RLX" },
                    { 12, "Distancia Pupilar, Es la distancia entre la entrada del ojo y la salida del mismo, en milímetros", "DP" },
                    { 13, "Este campo podría hacer referencia a la altura bifocal o algún otro ajuste específico de las lentes", "AB" }
                });
        }
    }
}
