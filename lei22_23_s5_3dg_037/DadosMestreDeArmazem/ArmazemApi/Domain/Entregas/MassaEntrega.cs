using System;
using ArmazemApi.Domain.Shared;
namespace ArmazemApi.Domain.Entregas
{
    public class MassaEntrega : ValueObject
    {
        /*
            * Atributo massa do tipo double
        */
        public double Massa { get; private set; }
        /*
            * Construtor apenas com a massa
        */
        public MassaEntrega(double massa)
        {
            AlterarMassa(massa);
        }
        /*
            * Construtor vazio
        */
        public MassaEntrega()
        {

        }
        /*
            * Metodo que altera a massa se esta for superior a 0
        */
        public Boolean AlterarMassa(double massa){

            if(massa < 0)
                throw new BusinessRuleValidationException("Todas as entregas necessitam de uma massa positiva.");
            
            this.Massa=massa;

            return  true;
        }

        protected override IEnumerable<object> GetEqualityComponents()
        {
            yield return Massa;
        }
        /*
            * Metodo que retorna a massa
        */
        public double MassaDeEntrega()
        {
            return Massa;
        }
        /*
            * ToString
        */
        public override string ToString()
        {
            return Massa.ToString();
        }

    }

}