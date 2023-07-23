namespace Booking.API.Models
{
    public partial class BookingsInfo
    {
        public override string ToString()
        {
            return $"Booking for {NoOfGuests} Guests\r\nHotel: {HotelName}, Room: {RoomNo} \r\nFrom {CheckIn} till {CheckOut} \r\nTotal price: {TotalFee}";
        }

        public override bool Equals(object obj)
        {
            if(obj == null && GetType() != obj.GetType())
            {
                return false;
            }
            BookingsInfo other = obj as BookingsInfo;

            return (other.NoOfGuests.Equals(NoOfGuests) && other.CheckIn.Equals(CheckIn) && other.CheckOut.Equals(CheckOut) && other.TotalFee.Equals(TotalFee) && other.RoomNo == RoomNo);
        }

        public override int GetHashCode()
        {
            int hash = 5;
            hash = 43*hash+(NoOfGuests);
            hash = 43*hash+(CheckIn==null?CheckIn.GetHashCode():0);
            hash = 43*hash+(CheckOut==null?CheckOut.GetHashCode():0);
            hash = 43*hash+Convert.ToInt32(TotalFee);
            hash = 43*hash+Convert.ToInt32(RoomNo);
            hash = 43*hash +(HotelName!=null?HotelName.GetHashCode():0);
            return hash;
        }
    }
}