using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Optic.Application.Infrastructure.Sqlite.Migrations
{
    /// <inheritdoc />
    public partial class DiagnosisDescriptionAndData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FormulaDiagnosis_Diagnosis_DiagnosisId",
                table: "FormulaDiagnosis");

            migrationBuilder.DropForeignKey(
                name: "FK_FormulaDiagnosis_Formulas_FormulaId",
                table: "FormulaDiagnosis");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FormulaDiagnosis",
                table: "FormulaDiagnosis");

            migrationBuilder.DropIndex(
                name: "IX_FormulaDiagnosis_DiagnosisId",
                table: "FormulaDiagnosis");

            migrationBuilder.DropIndex(
                name: "IX_FormulaDiagnosis_FormulaId",
                table: "FormulaDiagnosis");

            migrationBuilder.DropColumn(
                name: "DiagnosisId",
                table: "FormulaDiagnosis");

            migrationBuilder.DropColumn(
                name: "FormulaId",
                table: "FormulaDiagnosis");

            migrationBuilder.RenameTable(
                name: "FormulaDiagnosis",
                newName: "FormulasDiagnosis");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Diagnosis",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "FormulasDiagnosis",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER")
                .OldAnnotation("Sqlite:Autoincrement", true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_FormulasDiagnosis",
                table: "FormulasDiagnosis",
                column: "Id");

            migrationBuilder.InsertData(
                table: "Diagnosis",
                columns: new[] { "Id", "Description", "Name" },
                values: new object[,]
                {
                    { 1, "OD, se refiere al ojo derecho. Esf (Esfera), Indica la potencia de la lente para corregir la miopía (valores negativos) o la hipermetropía (valores positivos)", "OD_ESF" },
                    { 2, " OI, se refiere al ojo izquierdo. Esf (Esfera), Indica la potencia de la lente para corregir la miopía (valores negativos) o la hipermetropía (valores positivos)", "OI_ESF" },
                    { 3, "OD, se refiere al ojo derecho. Cil (Cilindro), Indica el poder de la lente para corregir el astigmatismo", "OD_CIL" },
                    { 4, "OI, se refiere al ojo izquierdo. Cil (Cilindro), Indica el poder de la lente para corregir el astigmatismo", "OI_CIL" },
                    { 5, "OD, se refiere al ojo derecho. Eje (Eje), Es el ángulo en grados que define la orientación del cilindro para corregir el astigmatismo", "OD_EJE" },
                    { 6, "OI, se refiere al ojo izquierdo. Eje (Eje), Es el ángulo en grados que define la orientación del cilindro para corregir el astigmatismo", "OI_EJE" },
                    { 7, "ADD (Adición), Se refiere a la potencia adicional que se añade en la parte inferior de los lentes para corregir la presbicia, o dificultad para ver de cerca.", "ADD" },
                    { 8, "Podría referirse al color del lente, si tiene un tinte específico para reducir el brillo o mejorar el contraste.", "COLOR" },
                    { 9, "Indica si las lentes tienen protección contra los rayos ultravioleta (UV)", "UV" },
                    { 10, "Indica si las lentes tienen protección contra los rayos visibles infrarrojos (VDT)", "VDT" },
                    { 11, "Indica si las lentes tienen algún tipo de relajación visual o filtro especial para reducir la fatiga ocular", "RLX" },
                    { 12, "Distancia Pupilar, Es la distancia entre la entrada del ojo y la salida del mismo, en milímetros", "DP" },
                    { 13, "Este campo podría hacer referencia a la altura bifocal o algún otro ajuste específico de las lentes", "AB" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Diagnosis_Name",
                table: "Diagnosis",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_FormulasDiagnosis_IdDiagnostico",
                table: "FormulasDiagnosis",
                column: "IdDiagnostico");

            migrationBuilder.CreateIndex(
                name: "IX_FormulasDiagnosis_IdFormula",
                table: "FormulasDiagnosis",
                column: "IdFormula");

            migrationBuilder.AddForeignKey(
                name: "FK_FormulasDiagnosis_Diagnosis_IdDiagnostico",
                table: "FormulasDiagnosis",
                column: "IdDiagnostico",
                principalTable: "Diagnosis",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_FormulasDiagnosis_Formulas_IdFormula",
                table: "FormulasDiagnosis",
                column: "IdFormula",
                principalTable: "Formulas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FormulasDiagnosis_Diagnosis_IdDiagnostico",
                table: "FormulasDiagnosis");

            migrationBuilder.DropForeignKey(
                name: "FK_FormulasDiagnosis_Formulas_IdFormula",
                table: "FormulasDiagnosis");

            migrationBuilder.DropIndex(
                name: "IX_Diagnosis_Name",
                table: "Diagnosis");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FormulasDiagnosis",
                table: "FormulasDiagnosis");

            migrationBuilder.DropIndex(
                name: "IX_FormulasDiagnosis_IdDiagnostico",
                table: "FormulasDiagnosis");

            migrationBuilder.DropIndex(
                name: "IX_FormulasDiagnosis_IdFormula",
                table: "FormulasDiagnosis");

            migrationBuilder.DeleteData(
                table: "Diagnosis",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Diagnosis",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Diagnosis",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Diagnosis",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Diagnosis",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Diagnosis",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Diagnosis",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Diagnosis",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Diagnosis",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Diagnosis",
                keyColumn: "Id",
                keyValue: 10);

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

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Diagnosis");

            migrationBuilder.RenameTable(
                name: "FormulasDiagnosis",
                newName: "FormulaDiagnosis");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "FormulaDiagnosis",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER")
                .Annotation("Sqlite:Autoincrement", true);

            migrationBuilder.AddColumn<int>(
                name: "DiagnosisId",
                table: "FormulaDiagnosis",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "FormulaId",
                table: "FormulaDiagnosis",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_FormulaDiagnosis",
                table: "FormulaDiagnosis",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_FormulaDiagnosis_DiagnosisId",
                table: "FormulaDiagnosis",
                column: "DiagnosisId");

            migrationBuilder.CreateIndex(
                name: "IX_FormulaDiagnosis_FormulaId",
                table: "FormulaDiagnosis",
                column: "FormulaId");

            migrationBuilder.AddForeignKey(
                name: "FK_FormulaDiagnosis_Diagnosis_DiagnosisId",
                table: "FormulaDiagnosis",
                column: "DiagnosisId",
                principalTable: "Diagnosis",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_FormulaDiagnosis_Formulas_FormulaId",
                table: "FormulaDiagnosis",
                column: "FormulaId",
                principalTable: "Formulas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
