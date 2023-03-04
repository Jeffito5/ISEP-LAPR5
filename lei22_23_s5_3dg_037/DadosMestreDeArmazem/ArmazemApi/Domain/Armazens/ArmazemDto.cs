//using System;

namespace ArmazemApi.Domain.Armazens{

    public class ArmazemDto {

        public String Id{get; set;} 
        public String Designacao {get; set;}

        /**
        */
        public double Latitude {get; set;}
        public double Longitude {get; set;}
        public double Altitude {get; set;}

        public String Endereco{get; set;}

        /**
        */
        public bool Ativo{get; set;}

    }
}