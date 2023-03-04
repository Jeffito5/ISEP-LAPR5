using ArmazemApi.Domain.Shared;
using Newtonsoft.Json;
using ArmazemApi.Domain.Armazens;

namespace ArmazemApi.Domain.Entregas
{   
    public class Entrega : Entity<EntregaId>, IAggregateRoot
    {   
        /*
            * Atributo para verificar se a entrega esta ativa
        */
        public bool Active{ get;  private set; }
        /*
            * Atributo DataEntrega da Entrega
        */
        public DataEntrega DataEntrega { get;  set; }
        /*
            * Atributo MassaEntrega da Entrega
        */
        public MassaEntrega MassaEntrega { get;  set; }
        /*
            * Atributo TempoColocarEntrega da Entrega
        */
        public TempoColocarEntrega TempoColocarEntrega { get;  set; }
        /*
            * Atributo TempoRetirarEntrega da Entrega
        */
        public TempoRetirarEntrega TempoRetirarEntrega { get;  set; }
        /*
            * Atributo ArmazemID da Entrega
        */
        public ArmazemId ArmazemID { get;  set; }
        /*
            * Construtor vazio da Entrega
        */
        protected Entrega(){
            this.Active = true;
        }
        /*
            * Construtor com todos os parametros da Entrega
        */
        [JsonConstructor]
        public Entrega(string dataEntrega, double massaEntrega, int tempoColocarEntrega, int tempoRetirarEntrega, String armazemID){
            this.Id = new EntregaId(Guid.NewGuid());
            this.Active = true;
            // var dt = dataEntrega.Split('/');
            this.DataEntrega = new DataEntrega(new DateTime(Int32.Parse(dataEntrega.Substring(0,4)),Int32.Parse(dataEntrega.Substring(4,2)),Int32.Parse(dataEntrega.Substring(6,2))));
            AlterarMassaEntrega(massaEntrega);        
            AlterarTempoColocarEntrega(tempoColocarEntrega);
            AlterarTempoRetirarEntrega(tempoRetirarEntrega);
            this.ArmazemID = new ArmazemId(armazemID);
        }
        /*
            * Metodo para alterar a massa da entrega
        */
        public void AlterarMassaEntrega(double massaEntrega)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("Não é possível alterar a massa de entrega de uma entrega inativa.");
            this.MassaEntrega = new MassaEntrega(massaEntrega);
        }
        /*
            * Metodo para alterar o tempo de colocacao da entrega
        */
        public void AlterarTempoColocarEntrega(int tempoColocarEntrega)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("Não é possível alterar o tempo de colocar uma entrega de uma entrega inativa.");
            this.TempoColocarEntrega = new TempoColocarEntrega(tempoColocarEntrega);
        }
        /*
            * Metodo para alterar o tempo de retirar uma entrega
        */
        public void AlterarTempoRetirarEntrega(int tempoRetirarEntrega)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("Não é possível alterar o tempo de retirar uma entrega de uma entrega inativa.");
            this.TempoRetirarEntrega = new TempoRetirarEntrega(tempoRetirarEntrega);
        }
        /*
            * Metodo para marcar a flag como inativa
        */
        public void MarkAsInative()
        {
            this.Active = false;
        }
        /*
            * ToString
        */
        public override string ToString()
        {
            return "Entrega: " + "//atributo";
        }
    }
}