using System;
using ArmazemApi.Domain.Shared;

namespace ArmazemApi.Domain.Entregas
{
    public class TempoRetirarEntrega : ValueObject
    {
        /*
            * Atributo tempo de retirar a entrega
        */
        public int tempoRetirarEntrega { get; private set; }
        /*
            * Constutor com o tempo de retirar a entrega
        */
        public TempoRetirarEntrega(int tempoRetirarEntrega)
        {
            AlterarRetirarColocarEntrega(tempoRetirarEntrega);
        }
        /*
            * Constutor vazio
        */
        public TempoRetirarEntrega()
        {

        }
        /*
            * Metodo que altera o tempo de retirar a entrega se este for superior a 0
        */
        public Boolean AlterarRetirarColocarEntrega(int tempoRetirarEntrega2){

            if(tempoRetirarEntrega2 < 0)
                throw new BusinessRuleValidationException("Todas as entregas necessitam de tempo de retirada positivo.");

            this.tempoRetirarEntrega=tempoRetirarEntrega2;

            return  true;
        }

        protected override IEnumerable<object> GetEqualityComponents()
        {
            yield return tempoRetirarEntrega;
        }
        /*
            * Metodo que retorna o tempo de retirar a entrega 
        */
        public int TempoDeRetirarEntrega()
        {
            return tempoRetirarEntrega;
        }
        /*
            * ToString
        */
        public override string ToString()
        {
            return tempoRetirarEntrega.ToString();
        }

    }

}