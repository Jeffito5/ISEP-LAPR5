namespace ArmazemApi.Domain.Exceptions{
    public class DesignacaoException : ArgumentException{
            public DesignacaoException():base("A desginção inválida."){
            }

            public DesignacaoException(String message):base(message){
            }
    }
}