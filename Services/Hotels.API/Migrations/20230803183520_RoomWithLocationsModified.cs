using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hotels.API.Migrations
{
    public partial class RoomWithLocationsModified : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rooms_HotelAddress_RoomLocId1",
                table: "Rooms");

            migrationBuilder.DropIndex(
                name: "IX_Rooms_RoomLocId1",
                table: "Rooms");

            migrationBuilder.DropColumn(
                name: "RoomLocId1",
                table: "Rooms");

            migrationBuilder.AlterColumn<int>(
                name: "RoomLocId",
                table: "Rooms",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Rooms_RoomLocId",
                table: "Rooms",
                column: "RoomLocId");

            migrationBuilder.AddForeignKey(
                name: "FK_Rooms_HotelAddress_RoomLocId",
                table: "Rooms",
                column: "RoomLocId",
                principalTable: "HotelAddress",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rooms_HotelAddress_RoomLocId",
                table: "Rooms");

            migrationBuilder.DropIndex(
                name: "IX_Rooms_RoomLocId",
                table: "Rooms");

            migrationBuilder.AlterColumn<string>(
                name: "RoomLocId",
                table: "Rooms",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "RoomLocId1",
                table: "Rooms",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Rooms_RoomLocId1",
                table: "Rooms",
                column: "RoomLocId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Rooms_HotelAddress_RoomLocId1",
                table: "Rooms",
                column: "RoomLocId1",
                principalTable: "HotelAddress",
                principalColumn: "Id");
        }
    }
}
