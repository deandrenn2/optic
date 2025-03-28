using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Optic.Application.Infrastructure.Sqlite.Migrations
{
    /// <inheritdoc />
    public partial class documentTypeInInvoice : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PurchaseDetail_Products_ProductId",
                table: "PurchaseDetail");

            migrationBuilder.DropForeignKey(
                name: "FK_PurchaseDetail_Purchases_IdPurchase",
                table: "PurchaseDetail");

            migrationBuilder.DropForeignKey(
                name: "FK_PurchasePayment_Purchases_IdPurchase",
                table: "PurchasePayment");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PurchasePayment",
                table: "PurchasePayment");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PurchaseDetail",
                table: "PurchaseDetail");

            migrationBuilder.RenameTable(
                name: "PurchasePayment",
                newName: "PurchasePayments");

            migrationBuilder.RenameTable(
                name: "PurchaseDetail",
                newName: "PurchaseDetails");

            migrationBuilder.RenameIndex(
                name: "IX_PurchasePayment_IdPurchase",
                table: "PurchasePayments",
                newName: "IX_PurchasePayments_IdPurchase");

            migrationBuilder.RenameIndex(
                name: "IX_PurchaseDetail_ProductId",
                table: "PurchaseDetails",
                newName: "IX_PurchaseDetails_ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_PurchaseDetail_IdPurchase",
                table: "PurchaseDetails",
                newName: "IX_PurchaseDetails_IdPurchase");

            migrationBuilder.AddColumn<string>(
                name: "DocumentType",
                table: "Invoices",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PurchasePayments",
                table: "PurchasePayments",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PurchaseDetails",
                table: "PurchaseDetails",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PurchaseDetails_Products_ProductId",
                table: "PurchaseDetails",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PurchaseDetails_Purchases_IdPurchase",
                table: "PurchaseDetails",
                column: "IdPurchase",
                principalTable: "Purchases",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PurchasePayments_Purchases_IdPurchase",
                table: "PurchasePayments",
                column: "IdPurchase",
                principalTable: "Purchases",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PurchaseDetails_Products_ProductId",
                table: "PurchaseDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_PurchaseDetails_Purchases_IdPurchase",
                table: "PurchaseDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_PurchasePayments_Purchases_IdPurchase",
                table: "PurchasePayments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PurchasePayments",
                table: "PurchasePayments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PurchaseDetails",
                table: "PurchaseDetails");

            migrationBuilder.DropColumn(
                name: "DocumentType",
                table: "Invoices");

            migrationBuilder.RenameTable(
                name: "PurchasePayments",
                newName: "PurchasePayment");

            migrationBuilder.RenameTable(
                name: "PurchaseDetails",
                newName: "PurchaseDetail");

            migrationBuilder.RenameIndex(
                name: "IX_PurchasePayments_IdPurchase",
                table: "PurchasePayment",
                newName: "IX_PurchasePayment_IdPurchase");

            migrationBuilder.RenameIndex(
                name: "IX_PurchaseDetails_ProductId",
                table: "PurchaseDetail",
                newName: "IX_PurchaseDetail_ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_PurchaseDetails_IdPurchase",
                table: "PurchaseDetail",
                newName: "IX_PurchaseDetail_IdPurchase");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PurchasePayment",
                table: "PurchasePayment",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PurchaseDetail",
                table: "PurchaseDetail",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PurchaseDetail_Products_ProductId",
                table: "PurchaseDetail",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PurchaseDetail_Purchases_IdPurchase",
                table: "PurchaseDetail",
                column: "IdPurchase",
                principalTable: "Purchases",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PurchasePayment_Purchases_IdPurchase",
                table: "PurchasePayment",
                column: "IdPurchase",
                principalTable: "Purchases",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
