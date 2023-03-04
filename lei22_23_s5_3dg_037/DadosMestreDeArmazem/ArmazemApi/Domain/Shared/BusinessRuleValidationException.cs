//using System;

namespace ArmazemApi.Domain.Shared
{
    public class BusinessRuleValidationException : Exception
    {
        public String Details { get; }

        public BusinessRuleValidationException(string message) : base(message)
        {
            
        }

        public BusinessRuleValidationException(string message, string details) : base(message)
        {
            this.Details = details;
        }
    }
}