using System;
using System.Collections.Generic;
using ArmazemApi.Domain.Armazens;
using ArmazemApi.Domain.Entregas;
using NUnit.Framework;
using Moq;

namespace Tests{

    public class EntregaDtoTest{
        [Test]
        public void testSetParameters(){
            double testMassa = 10; 
            int testTempoColocarEntrega = 20;
            int testTempoRetirarEntrega = 20;
            string testData = "20220920";
            string testArmazemId = "M01";
            DataEntrega data = new DataEntrega(new DateTime(Int32.Parse(testData.Substring(0,4)),Int32.Parse(testData.Substring(4,2)),Int32.Parse(testData.Substring(6,2))));

            EntregaDto dto = new EntregaDto(new Guid("11111111-2222-3333-4444-555555555555"), data, new MassaEntrega(testMassa), new TempoColocarEntrega(testTempoColocarEntrega), new TempoRetirarEntrega(testTempoRetirarEntrega), new ArmazemId(testArmazemId));

            Assert.AreEqual(dto.Id, new Guid("11111111-2222-3333-4444-555555555555"));
            Assert.AreEqual(dto.MassaEntrega, testMassa);
            Assert.AreEqual(dto.TempoColocarEntrega, testTempoColocarEntrega); 
            Assert.AreEqual(dto.TempoRetirarEntrega, testTempoRetirarEntrega);
            Assert.AreNotEqual(dto.DataEntrega, testData);
            Assert.AreEqual(dto.ArmazemId, testArmazemId);

        }
    
    }

}