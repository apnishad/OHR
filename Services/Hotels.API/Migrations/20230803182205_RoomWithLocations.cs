using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hotels.API.Migrations
{
    public partial class RoomWithLocations : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "RoomLocId",
                table: "Rooms",
                type: "nvarchar(max)",
                nullable: true);

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rooms_HotelAddress_RoomLocId1",
                table: "Rooms");

            migrationBuilder.DropIndex(
                name: "IX_Rooms_RoomLocId1",
                table: "Rooms");

            migrationBuilder.DropColumn(
                name: "RoomLocId",
                table: "Rooms");

            migrationBuilder.DropColumn(
                name: "RoomLocId1",
                table: "Rooms");
        }
    }
}
