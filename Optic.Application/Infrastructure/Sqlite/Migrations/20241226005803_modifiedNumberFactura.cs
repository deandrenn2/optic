using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Optic.Application.Infrastructure.Sqlite.Migrations
{
    /// <inheritdoc />
    public partial class modifiedNumberFactura : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FormulasDiagnosis");

            migrationBuilder.AlterColumn<int>(
                name: "Number",
                table: "Invoices",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.CreateTable(
                name: "FormulaDiagnosis",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Value = table.Column<string>(type: "TEXT", nullable: false),
                    IdDiagnostico = table.Column<int>(type: "INTEGER", nullable: false),
                    DiagnosisId = table.Column<int>(type: "INTEGER", nullable: false),
                    IdFormula = table.Column<int>(type: "INTEGER", nullable: false),
                    FormulaId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FormulaDiagnosis", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FormulaDiagnosis_Diagnosis_DiagnosisId",
                        column: x => x.DiagnosisId,
                        principalTable: "Diagnosis",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FormulaDiagnosis_Formulas_FormulaId",
                        column: x => x.FormulaId,
                        principalTable: "Formulas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FormulaDiagnosis_DiagnosisId",
                table: "FormulaDiagnosis",
                column: "DiagnosisId");

            migrationBuilder.CreateIndex(
                name: "IX_FormulaDiagnosis_FormulaId",
                table: "FormulaDiagnosis",
                column: "FormulaId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FormulaDiagnosis");

            migrationBuilder.AlterColumn<string>(
                name: "Number",
                table: "Invoices",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.CreateTable(
                name: "FormulasDiagnosis",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    DiagnosisId = table.Column<int>(type: "INTEGER", nullable: false),
                    FormulasId = table.Column<int>(type: "INTEGER", nullable: false),
                    IdDiagnostico = table.Column<int>(type: "INTEGER", nullable: false),
                    IdFormula = table.Column<int>(type: "INTEGER", nullable: false),
                    Value = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FormulasDiagnosis", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FormulasDiagnosis_Diagnosis_DiagnosisId",
                        column: x => x.DiagnosisId,
                        principalTable: "Diagnosis",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FormulasDiagnosis_Formulas_FormulasId",
                        column: x => x.FormulasId,
                        principalTable: "Formulas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FormulasDiagnosis_DiagnosisId",
                table: "FormulasDiagnosis",
                column: "DiagnosisId");

            migrationBuilder.CreateIndex(
                name: "IX_FormulasDiagnosis_FormulasId",
                table: "FormulasDiagnosis",
                column: "FormulasId");
        }
    }
}
