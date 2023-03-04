using NUnit.Framework;
using ArmazemApi.Domain.Entregas;
using System;
using ArmazemApi.Domain.Shared;

namespace Tests
{
    public class EntregaTest
    {
        [Test]
        public void testSetParameters(){
            double testMassa = 10; 
            int testTempoColocarEntrega = 20;
            int testTempoRetirarEntrega = 20;
            string testData = "20220920";
            string testArmazemId = "M01";
            DataEntrega data = new DataEntrega(new DateTime(Int32.Parse(testData.Substring(0,4)),Int32.Parse(testData.Substring(4,2)),Int32.Parse(testData.Substring(6,2))));

            Entrega e = new Entrega(testData, testMassa, testTempoColocarEntrega, testTempoRetirarEntrega, testArmazemId);

            Assert.AreEqual(e.MassaEntrega.Massa, testMassa);
            Assert.AreEqual(e.TempoColocarEntrega.tempoColocarEntrega, testTempoColocarEntrega);
            Assert.AreEqual(e.TempoRetirarEntrega.tempoRetirarEntrega, testTempoRetirarEntrega);
            Assert.AreNotEqual(e.DataEntrega.Value.ToString(), data);
            Assert.AreEqual(e.ArmazemID.AsString(), testArmazemId);

        }

        [Test]
        public void testAlterarMassaEntregaComValorInvalido(){
            double testMassa = -10; 
            int testTempoColocarEntrega = 20;
            int testTempoRetirarEntrega = 20;
            string testData = "20220920";
            string testArmazemId = "M01";
            DataEntrega data = new DataEntrega(new DateTime(Int32.Parse(testData.Substring(0,4)),Int32.Parse(testData.Substring(4,2)),Int32.Parse(testData.Substring(6,2))));

            var exception=Assert.Throws<BusinessRuleValidationException>(()=>new Entrega(testData, testMassa, testTempoColocarEntrega, testTempoRetirarEntrega, testArmazemId));

            }

        [Test]
        public void testAlterarTempoColocarEntregaComValorInvalido(){
            double testMassa = 10; 
            int testTempoColocarEntrega = -20;
            int testTempoRetirarEntrega = 20;
            string testData = "20220920";
            string testArmazemId = "M01";
            DataEntrega data = new DataEntrega(new DateTime(Int32.Parse(testData.Substring(0,4)),Int32.Parse(testData.Substring(4,2)),Int32.Parse(testData.Substring(6,2))));

            var exception=Assert.Throws<BusinessRuleValidationException>(()=>new Entrega(testData, testMassa, testTempoColocarEntrega, testTempoRetirarEntrega, testArmazemId));

        }

        [Test]
        public void testAlterarTempoRetirarEntregaComValorInvalido(){
            double testMassa = 10; 
            int testTempoColocarEntrega = 20;
            int testTempoRetirarEntrega = -20;
            string testData = "20220920";
            string testArmazemId = "M01";
            DataEntrega data = new DataEntrega(new DateTime(Int32.Parse(testData.Substring(0,4)),Int32.Parse(testData.Substring(4,2)),Int32.Parse(testData.Substring(6,2))));

            var exception=Assert.Throws<BusinessRuleValidationException>(()=>new Entrega(testData, testMassa, testTempoColocarEntrega, testTempoRetirarEntrega, testArmazemId));

        }
    }
}
