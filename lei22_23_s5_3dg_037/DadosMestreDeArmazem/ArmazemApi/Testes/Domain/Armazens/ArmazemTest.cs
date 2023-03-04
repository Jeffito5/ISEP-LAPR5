//using Microsoft.VisualStudio.TestPlatform.TestExecutor;
using NUnit.Framework;
using ArmazemApi.Domain.Armazens;
using ArmazemApi.Domain.Shared;

namespace ArmazemApi.Testes.Domain.Armazens{
//    [TestClass]
    public class ArmazemTest{

        double longitude=2.0;
        double latitude=3.0;
        double altitude=5.0;
        String designacao="Porto";
        String endereco="Rua Poro 452, 4465-122, Porto Portugal";
        String id="P00";
        bool ativo=true;    
        [Test]
        public void ConstrutorArmazemTest(){
            var arm = new Armazem(designacao,longitude,latitude,altitude,endereco,id,ativo);

            Assert.AreEqual(arm.Coordenadas,new Coordenadas(longitude,latitude,altitude));
            Assert.AreEqual(arm.Endereco,new Endereco(endereco));
            Assert.AreEqual(arm.Designacao,designacao);
            Assert.IsTrue(arm.Ativo);
            Assert.AreEqual(arm.Id.AsString(),id);
        }

        [Test]
        public void MarcarComoInativoTest(){
            Armazem arm = new Armazem(designacao,longitude,latitude,altitude,endereco,id,ativo);
            Assert.IsTrue(arm.Ativo);
            arm.MarcarComoInativo();
            Assert.IsFalse(arm.Ativo);
        }

        [Test]
        public void TesteDeConstrutoresComParametrosInvalidos(){
            //Designação nula
            var exception=Assert.Throws<BusinessRuleValidationException>(()=>new Armazem(null,longitude,latitude,altitude,endereco,id,ativo));

            Assert.AreEqual(exception.Message,"A designação não pode ser nula.");

            //Designação com mais de 50 caracters
            exception=Assert.Throws<BusinessRuleValidationException>(()=>new Armazem("Testando a designação maior do que 50 carateres do armazem",longitude,latitude,altitude,endereco,id,ativo));

            Assert.AreEqual(exception.Message,"A designação é inválida");

            //O id sem numero e com 2 caracteres
            exception=Assert.Throws<BusinessRuleValidationException>(()=>new Armazem(designacao,longitude,latitude,altitude,endereco,"id",ativo));

            Assert.AreEqual(exception.Message,"O id introduzido é inválido");
            
            //O id nulo
            exception=Assert.Throws<BusinessRuleValidationException>(()=>new Armazem(designacao,longitude,latitude,altitude,endereco,null,ativo));

            Assert.AreEqual(exception.Message,"O id não pode ser nulo");


            //Coordenadas(longitude) fora dos limites
            exception=Assert.Throws<BusinessRuleValidationException>(()=>new Armazem(designacao,-183,latitude,altitude,endereco,id,ativo));

            Assert.AreEqual(exception.Message,"O valor de longitude deve estar entre -180 e 180");

            //Coordenadas(latitude) fora dos limites
            exception=Assert.Throws<BusinessRuleValidationException>(()=>new Armazem(designacao,longitude,-93,altitude,endereco,id,ativo));

            Assert.AreEqual(exception.Message,"O valor de latitude deve estar entre -90 e 90");

            //Endereco incompleto fora dos limites
            exception=Assert.Throws<BusinessRuleValidationException>(()=>new Armazem(designacao,longitude,latitude,altitude,"endereco, p",id,ativo));

            Assert.AreEqual(exception.Message,"O formato do endereço não suportado.");
        }
    }
}