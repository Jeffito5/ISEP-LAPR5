using ArmazemApi.Domain.Shared;
using System.Text.Json.Serialization;//TODO Veja irmão

namespace ArmazemApi.Domain.Entregas
{
    public class EntregaId : EntityId
    {   
        /*
            * Construtor com o parametro value da EntregaId
        */
        [JsonConstructor]
        public EntregaId(Guid value) : base(value)
        {
        }
        /*
            * Construtor com o parametro value da EntregaId
        */
        public EntregaId(String value) : base(value)
        {
        }
        /*
            * Construtor vazio da EntregaId
        */
        protected EntregaId() : base("")
        {
        }
        /*
            * Metodo para criar um Guid a partir da string
        */
        override
        protected Object createFromString(String text){
            return new Guid(text);
        }
        /*
            * Metodo para retornar uma string a partir de um Guid
        */
        override
        public String AsString(){
            Guid obj = (Guid) base.ObjValue;
            return obj.ToString();
        }
        /*
            * Metodo para retornar um Guid
        */
        public Guid AsGuid(){
            return (Guid) base.ObjValue;
        }
    }
}