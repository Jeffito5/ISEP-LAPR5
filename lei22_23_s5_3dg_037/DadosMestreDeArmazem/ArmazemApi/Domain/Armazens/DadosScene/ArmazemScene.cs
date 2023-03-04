using ArmazemApi.Domain.Shared;
using Microsoft.Build.Framework;

namespace ArmazemApi.Domain.Armazens.DadosScene{
    public class ArmazemScene:Entity<ArmazemSceneId>, IAggregateRoot{

        /**
        * O Id do armazém no qual está a ser representado.
        */
//        [Required]
        public ArmazemId ArmazemId{get;private set;}

        /**
        * Url da textura da rotunda.
        */
        public TexturaUrl RotundaUrl{get;private set;}

        /**
        * Url da textura da estrada.
        */
        public TexturaUrl EstradaUrl{get;private set;}

        /**
        * Url da textura do armazém.
        */
        public TexturaUrl TexturaArmazemUrl{get;private set;}

        protected ArmazemScene(){
            this.Id=new ArmazemSceneId(Guid.NewGuid());
        }
        public ArmazemScene(string ArmazemId, string RotundaUrl, string EstradaUrl, string TexturaArmazemUrl){
            this.Id=new ArmazemSceneId(Guid.NewGuid());
            this.ArmazemId=new ArmazemId(ArmazemId);
            alterarEstradaUrl(EstradaUrl);
            alterarRotundaUrl(RotundaUrl);
            alterarTexturaArmazemUrl(TexturaArmazemUrl);
        }

        public Boolean alterarRotundaUrl(string url){
            if(url==null)
                throw new BusinessRuleValidationException("A url é inválida ou não suportada.");

            this.RotundaUrl=new TexturaUrl(url);
            return true;
        }

        public Boolean alterarEstradaUrl(string url){
            if(url==null)
                throw new BusinessRuleValidationException("A url não pode ser nula.");

            this.EstradaUrl=new TexturaUrl(url);
            return true;
        }

        public Boolean alterarTexturaArmazemUrl(string url){
            if(url==null)
                throw new BusinessRuleValidationException("A url não pode ser nula.");

            this.TexturaArmazemUrl=new TexturaUrl(url);
            return true;
        }
    }
}