using ArmazemApi.Domain.Shared;
namespace ArmazemApi.Domain.Armazens{
    public class Endereco : IValueObject {
        public String Rua{get; private set;}
        public String Localidade{get; private set;}
        public String CodigoPostal{get; private set;}
        public Endereco(String endereco){
            String[] info=endereco.Split(",");
            if(info.Length!=3)
                throw new BusinessRuleValidationException("O formato do endereço não suportado.");
            this.Rua=info[0];
            this.Localidade=info[2];
            this.CodigoPostal=info[1];

        }

        public override bool Equals(object obj)
        {
            var data = obj as Endereco;

            if (data == null)
                return false;
            
            return (this.Rua==data.Rua)?(this.CodigoPostal==data.CodigoPostal)?(this.Localidade==data.Localidade):false:false;
        }

        protected Endereco(){}

        public String AsString(){
            return Rua+", "+CodigoPostal+", "+Localidade;
        }
    }
}