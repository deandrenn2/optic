using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Optic.Application.Infrastructure.Sqlite.Migrations
{
    /// <inheritdoc />
    public partial class AddSettingEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "IdentificationTypes",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER")
                .OldAnnotation("Sqlite:Autoincrement", true);

            migrationBuilder.CreateTable(
                name: "Settings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: false),
                    Value = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Settings", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SettingsUsers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false),
                    IdSetting = table.Column<int>(type: "INTEGER", nullable: false),
                    IdUser = table.Column<int>(type: "INTEGER", nullable: false),
                    Value = table.Column<string>(type: "TEXT", nullable: false),
                    UserId = table.Column<int>(type: "INTEGER", nullable: false),
                    SettingId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SettingsUsers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SettingsUsers_Settings_SettingId",
                        column: x => x.SettingId,
                        principalTable: "Settings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SettingsUsers_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SettingsUsers_SettingId",
                table: "SettingsUsers",
                column: "SettingId");

            migrationBuilder.CreateIndex(
                name: "IX_SettingsUsers_UserId",
                table: "SettingsUsers",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SettingsUsers");

            migrationBuilder.DropTable(
                name: "Settings");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "IdentificationTypes",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER")
                .Annotation("Sqlite:Autoincrement", true);
        }
    }
}
