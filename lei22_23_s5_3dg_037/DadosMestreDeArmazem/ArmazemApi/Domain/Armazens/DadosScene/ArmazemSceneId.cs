using ArmazemApi.Domain.Shared;
using Newtonsoft.Json;
using System;

namespace ArmazemApi.Domain.Armazens.DadosScene{
    public class ArmazemSceneId : EntityId{
        public ArmazemSceneId(Object id) : base(id){
        }

        [JsonConstructor]
        public ArmazemSceneId(Guid value) : base(value)
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