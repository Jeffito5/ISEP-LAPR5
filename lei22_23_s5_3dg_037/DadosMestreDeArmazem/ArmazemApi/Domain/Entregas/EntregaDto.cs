using Newtonsoft.Json;
using ArmazemApi.Domain.Armazens;
using ArmazemApi.Domain.Entregas;

namespace ArmazemApi.Domain.Entregas
{
    public class EntregaDto
    {
        /*
            * Id da EntregaDto
        */
        public Guid Id { get; set; }
        /*
            * DataEntrega da EntregaDto
        */
        public String DataEntrega { get;  set; }
        /*
            * MassaEntrega da EntregaDto
        */
        public double MassaEntrega { get;  set; }
        /*
            * TempoColocarEntrega da EntregaDto
        */
        public int TempoColocarEntrega { get;  set; }
        /*
            * TempoRetirarEntrega da EntregaDto
        */
        public int TempoRetirarEntrega { get;  set; }
        /*
            * ArmazemId da EntregaDto
        */
        public String ArmazemId { get;  set; }
        /*
            * Construtor com todos os atributos da EntregaDto
        */
        [JsonConstructor]
        public EntregaDto(Guid Id, DataEntrega dataEntrega, MassaEntrega massaEntrega, TempoColocarEntrega tempoColocarEntrega, TempoRetirarEntrega tempoRetirarEntrega, ArmazemId armazemId)
        {
            this.Id = Id;
            this.DataEntrega = dataEntrega.ToString();
            this.MassaEntrega = massaEntrega.Massa;
            this.TempoColocarEntrega = tempoColocarEntrega.tempoColocarEntrega;
            this.TempoRetirarEntrega = tempoRetirarEntrega.tempoRetirarEntrega;
            this.ArmazemId = armazemId.AsString();
        }
        /*
            * Construtor vazio
        */
        public EntregaDto(){

        }
    }
}