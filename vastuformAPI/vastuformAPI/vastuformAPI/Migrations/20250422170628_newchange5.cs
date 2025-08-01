using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace vastuformAPI.Migrations
{
    /// <inheritdoc />
    public partial class newchange5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TaskId",
                table: "TaskImages",
                newName: "VastuVisitId");

            migrationBuilder.RenameColumn(
                name: "ImagePathsJson",
                table: "TaskImages",
                newName: "ImagePath");

            migrationBuilder.CreateIndex(
                name: "IX_TaskImages_VastuVisitId",
                table: "TaskImages",
                column: "VastuVisitId");

            migrationBuilder.AddForeignKey(
                name: "FK_TaskImages_VastuVisits_VastuVisitId",
                table: "TaskImages",
                column: "VastuVisitId",
                principalTable: "VastuVisits",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TaskImages_VastuVisits_VastuVisitId",
                table: "TaskImages");

            migrationBuilder.DropIndex(
                name: "IX_TaskImages_VastuVisitId",
                table: "TaskImages");

            migrationBuilder.RenameColumn(
                name: "VastuVisitId",
                table: "TaskImages",
                newName: "TaskId");

            migrationBuilder.RenameColumn(
                name: "ImagePath",
                table: "TaskImages",
                newName: "ImagePathsJson");
        }
    }
}
