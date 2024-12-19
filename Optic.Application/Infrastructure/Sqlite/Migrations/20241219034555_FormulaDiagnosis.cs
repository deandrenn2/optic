using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Optic.Application.Infrastructure.Sqlite.Migrations
{
    /// <inheritdoc />
    public partial class FormulaDiagnosis : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InvoiceDetail_Invoices_IdInvoice",
                table: "InvoiceDetail");

            migrationBuilder.DropForeignKey(
                name: "FK_InvoiceDetail_Products_ProductId",
                table: "InvoiceDetail");

            migrationBuilder.DropTable(
                name: "FormulasDiagnosticos");

            migrationBuilder.DropPrimaryKey(
                name: "PK_InvoiceDetail",
                table: "InvoiceDetail");

            migrationBuilder.RenameTable(
                name: "InvoiceDetail",
                newName: "InvoiceDetails");

            migrationBuilder.RenameIndex(
                name: "IX_InvoiceDetail_ProductId",
                table: "InvoiceDetails",
                newName: "IX_InvoiceDetails_ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_InvoiceDetail_IdInvoice",
                table: "InvoiceDetails",
                newName: "IX_InvoiceDetails_IdInvoice");

            migrationBuilder.AddPrimaryKey(
                name: "PK_InvoiceDetails",
                table: "InvoiceDetails",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "FormulasDiagnosis",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Value = table.Column<string>(type: "TEXT", nullable: false),
                    IdDiagnostico = table.Column<int>(type: "INTEGER", nullable: false),
                    IdFormula = table.Column<int>(type: "INTEGER", nullable: false),
                    DiagnosisId = table.Column<int>(type: "INTEGER", nullable: false),
                    FormulasId = table.Column<int>(type: "INTEGER", nullable: false)
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

            migrationBuilder.AddForeignKey(
                name: "FK_InvoiceDetails_Invoices_IdInvoice",
                table: "InvoiceDetails",
                column: "IdInvoice",
                principalTable: "Invoices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_InvoiceDetails_Products_ProductId",
                table: "InvoiceDetails",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InvoiceDetails_Invoices_IdInvoice",
                table: "InvoiceDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_InvoiceDetails_Products_ProductId",
                table: "InvoiceDetails");

            migrationBuilder.DropTable(
                name: "FormulasDiagnosis");

            migrationBuilder.DropPrimaryKey(
                name: "PK_InvoiceDetails",
                table: "InvoiceDetails");

            migrationBuilder.RenameTable(
                name: "InvoiceDetails",
                newName: "InvoiceDetail");

            migrationBuilder.RenameIndex(
                name: "IX_InvoiceDetails_ProductId",
                table: "InvoiceDetail",
                newName: "IX_InvoiceDetail_ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_InvoiceDetails_IdInvoice",
                table: "InvoiceDetail",
                newName: "IX_InvoiceDetail_IdInvoice");

            migrationBuilder.AddPrimaryKey(
                name: "PK_InvoiceDetail",
                table: "InvoiceDetail",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "FormulasDiagnosticos",
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
                    table.PrimaryKey("PK_FormulasDiagnosticos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FormulasDiagnosticos_Diagnosis_DiagnosisId",
                        column: x => x.DiagnosisId,
                        principalTable: "Diagnosis",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FormulasDiagnosticos_Formulas_FormulasId",
                        column: x => x.FormulasId,
                        principalTable: "Formulas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FormulasDiagnosticos_DiagnosisId",
                table: "FormulasDiagnosticos",
                column: "DiagnosisId");

            migrationBuilder.CreateIndex(
                name: "IX_FormulasDiagnosticos_FormulasId",
                table: "FormulasDiagnosticos",
                column: "FormulasId");

            migrationBuilder.AddForeignKey(
                name: "FK_InvoiceDetail_Invoices_IdInvoice",
                table: "InvoiceDetail",
                column: "IdInvoice",
                principalTable: "Invoices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_InvoiceDetail_Products_ProductId",
                table: "InvoiceDetail",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
