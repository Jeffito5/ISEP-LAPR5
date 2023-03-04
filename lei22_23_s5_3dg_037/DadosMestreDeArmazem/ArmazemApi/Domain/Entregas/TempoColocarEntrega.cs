using System;
using ArmazemApi.Domain.Shared;
namespace ArmazemApi.Domain.Entregas
{
    public class TempoColocarEntrega : ValueObject
    {
        /*
            * Atributo tempo de colocar a entrega
        */
        public int tempoColocarEntrega { get; private set; }
        /*
            * Constutor com o tempo de colocar a entrega
        */
        public TempoColocarEntrega(int tempoColocarEntrega)
        {
            AlterarTempoColocarEntrega(tempoColocarEntrega);
        }
        /*
            * Constutor vazio
        */
        public TempoColocarEntrega()
        {

        }
        /*
            * Metodo que altera o tempo de colocar a entrega se este for superior a 0
        */
        public Boolean AlterarTempoColocarEntrega(int tempoColocarEntrega2){

            if(tempoColocarEntrega2 < 0)
                throw new BusinessRuleValidationException("Todas as entregas necessitam de tempo de colocação positivo.");

            this.tempoColocarEntrega=tempoColocarEntrega2;

            return  true;
        }

        protected override IEnumerable<object> GetEqualityComponents()
        {
            yield return tempoColocarEntrega;
        }
        /*
            * Metodo que retorna o tempo de colocar a entrega 
        */
        public int TempoDeColocarEntrega()
        {
            return tempoColocarEntrega;
        }
        /*
            * ToString
        */
        public override string ToString()
        {
            return tempoColocarEntrega.ToString();
        }

    }

}