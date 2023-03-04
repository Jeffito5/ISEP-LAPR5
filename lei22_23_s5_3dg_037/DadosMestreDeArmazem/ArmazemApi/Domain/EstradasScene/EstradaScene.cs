using ArmazemApi.Domain.Shared;
using ArmazemApi.Domain.Armazens.DadosScene;
using ArmazemApi.Domain.Armazens;
using System.Text.RegularExpressions;

namespace ArmazemApi.Domain.EstradasScene{
    public class EstradaScene : Entity<EstradaSceneId>, IAggregateRoot {
        /**
        * A largura da estrada
        */
        public Double Largura{get; private set;}

        /**
        * A url para a textura da estrada.
        */
        public TexturaUrl EstradaUrl{get; private set;}

        /**
        * O primeiro armazém na estrada.
        */
        public ArmazemId Armazem1{get; private set;} 

        /**
        * O segundo armazém na estrada.
        */
        public ArmazemId Armazem2{get; private set;} 
        protected EstradaScene(){}

        public EstradaScene(double largura, string estradaUrl, string idArmazem1, string idArmazem2){
            this.Id = new EstradaSceneId(Guid.NewGuid());
            AlterarLarguraEstrada(largura);
            AlterarTexturaEstrada(estradaUrl);
            this.Armazem1 = new ArmazemId(idArmazem1);
            this.Armazem2 = new ArmazemId(idArmazem2);
        }
        public void AlterarTexturaEstrada(string url){
            this.EstradaUrl= new TexturaUrl(url);
        }

        public void AlterarLarguraEstrada(double largura){
            if(largura<=0)
                throw new BusinessRuleValidationException("A largura não pode ser nulo ou negativo.");
            
            this.Largura=largura;
        }
    }
}