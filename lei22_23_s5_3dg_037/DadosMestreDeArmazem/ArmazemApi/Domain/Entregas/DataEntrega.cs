using ArmazemApi.Domain.Shared;
using System;
using System.Globalization;

namespace ArmazemApi.Domain.Entregas
{
    public class DataEntrega : ValueObject
    {
        /*
            * Valor da data
        */
        public DateTime Value { get; private set; }

        //public string _Date { get; private set; }

        /*
            * Construtor com a data
        */
        public DataEntrega(DateTime data /*string date*/)
        {
            this.Value = data;
            //this._Date = date;
        }

        /*
            * Construtor vazio
        */
        public DataEntrega()
        {

        }

        /*
            * Metodo que retorna a data
        */
        public DateTime dataEntrega()
        {
            return Value;
        }

        public override bool Equals(object obj)
        {
            var data = obj as DataEntrega;

            if (data == null)
                return false;
            
            return this.Value.Equals(data.Value);
        }

        protected override IEnumerable<object> GetEqualityComponents()
        {
            yield return Value;
        }

        /*
            * ToString
        */
        public override string ToString()
        {
            //return _Date;
            return Value.ToString("d", DateTimeFormatInfo.InvariantInfo);
        }

    }

}