using ArmazemApi.Domain.Shared;
using System;
using System.Text.RegularExpressions;

namespace ArmazemApi.Domain.Armazens.DadosScene{
    public class TexturaUrl : IValueObject{
        /**
        * A url da textura.
        */
        public string url{get; private set;}

        private string format=@"^.+( .)*\.glb$";
        private string URL_POR_OMISSAO="Não definido";
        protected TexturaUrl(){
            url=URL_POR_OMISSAO;
        }
        public TexturaUrl(string url){
            definirUrl(url);
        }

        public void definirUrl(string url){
            if(!validaUrl(url)){
                throw new BusinessRuleValidationException("O formato da url é inválido/não suportado.");
            }

            this.url=url;
        }

        public bool validaUrl(string url){
            if(!Regex.IsMatch(url,this.format))
                return false;
            return true;
        }
    }
}