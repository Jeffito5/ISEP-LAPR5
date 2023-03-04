using System;
using System.Collections.Generic;
using ArmazemApi.Domain.Armazens;
using ArmazemApi.Domain.Entregas;
using NUnit.Framework;
using Moq;

namespace Tests{

    public class CriarEntregaDtoTest{

        [Test]
        public void testSetParameters(){
            double testMassa = 10; 
            int testTempoColocarEntrega = 20;
            int testTempoRetirarEntrega = 20;
            string testData = "20220920";
            string testArmazemId = "M01";
            DataEntrega data = new DataEntrega(new DateTime(Int32.Parse(testData.Substring(0,4)),Int32.Parse(testData.Substring(4,2)),Int32.Parse(testData.Substring(6,2))));

            CriarEntregaDto cdto = new CriarEntregaDto(data, new MassaEntrega(testMassa), new TempoColocarEntrega(testTempoColocarEntrega), new TempoRetirarEntrega(testTempoRetirarEntrega), new ArmazemId(testArmazemId));
            
            Assert.AreEqual(cdto.MassaEntrega, testMassa);
            Assert.AreEqual(cdto.TempoColocarEntrega, testTempoColocarEntrega); 
            Assert.AreEqual(cdto.TempoRetirarEntrega, testTempoRetirarEntrega);
            Assert.AreNotEqual(cdto.DataEntrega, testData);
            Assert.AreEqual(cdto.ArmazemId, testArmazemId);

        }
    }
}