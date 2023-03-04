using ArmazemApi.Domain.Shared;
using Newtonsoft.Json;
using System;

namespace ArmazemApi.Domain.EstradasScene{
    public class EstradaSceneId : EntityId{
        public EstradaSceneId(Object id) : base(id){
        }

        [JsonConstructor]
        public EstradaSceneId(Guid value) : base(value)
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