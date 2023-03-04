using ArmazemApi.Domain.Shared;

namespace ArmazemApi.Domain.Armazens{
    public class Coordenadas : ValueObject {
        public double Longitude{get; private set;}
        public double Latitude{get;private set;}
        
        public double Altitude{get; private set;}

        public Coordenadas(double longitude,double latitude, double altitude){
            SetLatitude(latitude);
            SetLongitude(longitude);
            SetAltitude(altitude);
        }

        protected Coordenadas(){}

        public Boolean SetLongitude(double longitude){

            if(longitude<-180||longitude>180)
                throw new BusinessRuleValidationException("O valor de longitude deve estar entre -180 e 180");

            this.Longitude=longitude;

            return  true;
        }

        public Boolean SetLatitude(double latitude){


            if(latitude<-90||latitude>90)
                throw new BusinessRuleValidationException("O valor de latitude deve estar entre -90 e 90");

            this.Latitude=latitude;

            return  true;
        }

        protected override IEnumerable<object> GetEqualityComponents()
        {
            yield return Longitude+Latitude+Altitude;
        }

        public Boolean SetAltitude(double altitude){
            this.Altitude=altitude;
            return  true;
        }

        public String AsString(){
            return "Longitude: "+this.Longitude+"º N \nLatitude: "+this.Latitude+"º W\nAltitude: "+this.Altitude;
        }

        public override bool Equals(object obj)
        {
            var data = obj as Coordenadas;

            if (data == null)
                return false;
            
            return (this.Longitude==data.Longitude)?(this.Latitude==data.Latitude)?(this.Altitude==data.Altitude):false:false;
        }
    }
}