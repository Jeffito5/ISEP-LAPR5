using Newtonsoft.Json;
using ArmazemApi.Domain.Armazens;

namespace ArmazemApi.Domain.Entregas
{
    public class CriarEntregaDto
    {
        /*
            * Instancia de DataEntrega do CriarEntregaDto
        */
        public String DataEntrega { get;  set; }
        /*
            * Instancia de MassaEntrega do CriarEntregaDto
        */
        public double MassaEntrega { get;  set; }
        /*
            * Instancia de TempoColocarEntrega do CriarEntregaDto
        */
        public int TempoColocarEntrega { get;  set; }
        /*
            * Instancia de TempoRetirarEntrega do CriarEntregaDto
        */
        public int TempoRetirarEntrega { get;  set; }
        /*
            * Instancia de ArmazemId do CriarEntregaDto
        */
        public String ArmazemId { get;  set; }

        /*
            * Construtor com todos os parametros do CriarEntregaDto
        */
        [JsonConstructor]
        public CriarEntregaDto(DataEntrega dataEntrega, MassaEntrega massaEntrega, TempoColocarEntrega tempoColocarEntrega, TempoRetirarEntrega tempoRetirarEntrega, ArmazemId armazemId)
        {
            this.DataEntrega = dataEntrega.ToString();
            this.MassaEntrega = massaEntrega.Massa;
            this.TempoColocarEntrega = tempoColocarEntrega.tempoColocarEntrega;
            this.TempoRetirarEntrega = tempoRetirarEntrega.tempoRetirarEntrega;
            this.ArmazemId = armazemId.AsString();
        }
        /*
            * Construtor vazio
        */
        public CriarEntregaDto(){
            
        }
    }
}