
using System.ComponentModel.DataAnnotations;

namespace Booking.API.Models
{
    public class BookingContraints
    {
        [Required, DataType(DataType.Date), Display(Name="Start date"), DisplayFormat(DataFormatString ="{0:dd/MM/yyyy}",ApplyFormatInEditMode=true)]
        public DateTime StartDate{get;set;}

        [Required, DataType(DataType.Date), Display(Name ="End date"),DisplayFormat(DataFormatString ="{0:dd/MM/yyyy}",ApplyFormatInEditMode =true)]
        public DateTime EndDate{get;set;}

        [Required, Display(Name="Maximum Price per night")]
        public Double MaxPricePerNight{get;set;}

        [Required, Display(Name ="Number of beds")]
        public int NbOfBeds{get;set;}

        [Required, Display(Name = "Smoking allowed")]
        public bool SmokingAllowed{get;set;}

        public override string ToString()
        {
            return $"Booking constraints:\r\nFrom {StartDate} till {EndDate}\r\n#beds: {NbOfBeds}\t{(SmokingAllowed?"Smoking":"Non-Smoking")}\r\nMax price: {MaxPricePerNight}";
        }

        public override bool Equals(object obj)
        {
            if(obj==null && GetType() != obj.GetType())
            {
                return false;
            }
            BookingContraints other = obj as BookingContraints;
            return (other.StartDate.Equals(StartDate) && other.EndDate.Equals(EndDate) && other.MaxPricePerNight.Equals(MaxPricePerNight) && other.NbOfBeds == NbOfBeds && other.SmokingAllowed == SmokingAllowed);
        }

        public override int GetHashCode()
        {
            int hash = 5;
            hash = 59*hash+(StartDate != null?StartDate.GetHashCode():0);
            hash = 59*hash+(EndDate != null?EndDate.GetHashCode():0);
            hash = 59*hash+Convert.ToInt32(MaxPricePerNight);
            hash = 59*hash+NbOfBeds;
            hash = 59*hash+Convert.ToInt32(SmokingAllowed);
            return hash;
        }
    }

    public class BookingException:ApplicationException
    {
        public BookingException(string msg):base(msg)
        {

        }
    }
}