using System;
using System.Collections.Generic;

namespace OnlineHotel.Infra.Domain.Models
{
    public partial class Customer:Entity
    {
        public Customer(Guid id, string name, string email, DateTime birthdate)
        {
            Id = id;
            Name = name;
            Email = email;
            BirthDate = birthdate;
        }
        protected Customer(){

        }
        public string Name{get;set;}
        public string Email{get;set;}
        public DateTime BirthDate{get;set;}
    }
}