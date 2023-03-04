using ArmazemApi.Domain.Shared;
using System.Text.RegularExpressions;

namespace ArmazemApi.Domain.Armazens{
    public class Armazem : Entity<ArmazemId>, IAggregateRoot {
        /**
        * A designação do armazem.
        */
        public String Designacao {get;private set;}

        /**
        * As coordenadas do armazem.
        */
        public Coordenadas Coordenadas {get; private set;}

        /**
        * O atual endereço do armazem.
        */
        public Endereco Endereco{get; private set;}

        /**
        * Verifica se o armazem é ativo ou não.
        */
        public bool Ativo{get;private set;}

        private static String ID_POR_OMISSAO="M00";
        private static String ENDERECO_POR_OMISSAO="M,P,4465-106";
        private static double COORDENADAS_POR_OMISSAO=0.0;

        private static Boolean ATIVO_POR_OMISSAO=false;
        protected Armazem():base(new ArmazemId(ID_POR_OMISSAO)){}

        public Armazem(String designacao, double longitude, double latitude, double altitude, String endereco, String armazemId, bool ativo):base(new ArmazemId(armazemId)){
            AlterarDesignacao(designacao);
            AlterarCoordenadas(new Coordenadas(longitude,latitude,altitude));
            AlterarEndereco(new Endereco(endereco));
            AlterarAtivo(ativo);
        }

        public Boolean AlterarDesignacao(String designacao){
            if(designacao==null){
                throw new BusinessRuleValidationException("A designação não pode ser nula.");
            }

            String format= "^([a-zA-Z0-9 ]){1,50}$";

            if(!Regex.IsMatch(designacao,format)){
                throw new BusinessRuleValidationException("A designação é inválida");
            }

            this.Designacao=designacao;
            return true;
        }

        public Boolean AlterarEndereco(Endereco endereco){
            this.Endereco=endereco;
            return true;
        }

        public Boolean AlterarAtivo(bool ativo){
            this.Ativo=ativo;
            return true;
        }

        public Boolean AlterarCoordenadas(Coordenadas coordenadas){
            this.Coordenadas=coordenadas;
            return true;
        }

        public Boolean MarcarComoInativo(){
            return AlterarAtivo(false);
        }
    }

}