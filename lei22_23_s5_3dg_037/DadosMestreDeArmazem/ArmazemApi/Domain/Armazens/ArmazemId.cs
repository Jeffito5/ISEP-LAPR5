using ArmazemApi.Domain.Shared;
using Newtonsoft.Json;
using System;

namespace ArmazemApi.Domain.Armazens{
    public class ArmazemId : EntityId{
        private static String FORMAT= "^[a-zA-Z][a-zA-Z0-9]{2}$";
        public ArmazemId(Object id) : base(id,FORMAT){
        }

        [JsonConstructor]
        public ArmazemId(Guid value) : base(value)
        {
        }

        override
        protected  Object createFromString(String text){
            return text;
        }
        override
        public String AsString(){
            return (String) base.Value;
        }

        
        public Guid AsGuid(){
            return (Guid) base.ObjValue;
        }
    }
}