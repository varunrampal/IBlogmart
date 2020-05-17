using Microsoft.EntityFrameworkCore.Migrations;

namespace IBlogmart.api.Migrations
{
    public partial class Alter_Images_Subcategory_Tables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SubCategoryId",
                table: "Images",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "type",
                table: "Images",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Images_SubCategoryId",
                table: "Images",
                column: "SubCategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Images_SubCategories_SubCategoryId",
                table: "Images",
                column: "SubCategoryId",
                principalTable: "SubCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Images_SubCategories_SubCategoryId",
                table: "Images");

            migrationBuilder.DropIndex(
                name: "IX_Images_SubCategoryId",
                table: "Images");

            migrationBuilder.DropColumn(
                name: "SubCategoryId",
                table: "Images");

            migrationBuilder.DropColumn(
                name: "type",
                table: "Images");
        }
    }
}
