using System.Threading.Tasks;
using System.Collections.Generic;
using ArmazemApi.Domain.Shared;
using ArmazemApi.Domain.Entregas;
using ArmazemApi.Domain.Armazens;
using System;
using NUnit.Framework;
using Moq;

namespace Tests.Domain.Entregas{
    public class EntregaServiceTest{
        private EntregaService _entregaService;
        private Mock<IUnitOfWork> _unitOfWorkMock;
        private Mock<IEntregaRepository> _iEntregaRepositoryMock;
        private List<EntregaDto> _entregaDto;
        private List<Entrega> _entregas = new List<Entrega>();

        [SetUp]
        public void Setup(){
            _entregas= new List<Entrega>();
            _entregaDto=new List<EntregaDto>();
            double testMassa = 10; 
            double testMassa2 = 11;
            int testTempoColocarEntrega = 20;
            int testTempoColocarEntrega2 = 21;
            int testTempoRetirarEntrega = 20;
            int testTempoRetirarEntrega2 = 21;
            string testData = "20220920";
            string testData2 = "20220820";
            string testArmazemId = "M01";
            string testArmazemId2 = "M02";
            Guid id = new Guid("11111111-2222-3333-4444-555555555555");
            Guid id2 = new Guid("11111111-6666-3333-4444-555555555555");
            DataEntrega data = new DataEntrega(new DateTime(Int32.Parse(testData.Substring(0,4)),Int32.Parse(testData.Substring(4,2)),Int32.Parse(testData.Substring(6,2))));
            DataEntrega data2 = new DataEntrega(new DateTime(Int32.Parse(testData2.Substring(0,4)),Int32.Parse(testData2.Substring(4,2)),Int32.Parse(testData2.Substring(6,2))));

            List<Entrega> resultList1=new List<Entrega>();
            List<Entrega> resultList2=new List<Entrega>();

            this._entregas.Add(new Entrega(testData, testMassa, testTempoColocarEntrega, testTempoRetirarEntrega, testArmazemId));
            this._entregas.Add(new Entrega(testData2, testMassa2, testTempoColocarEntrega2, testTempoRetirarEntrega2, testArmazemId2));
            resultList1.Add(this._entregas.ElementAt(0));
            resultList2.Add(this._entregas.ElementAt(1));

            this._entregaDto.Add(new EntregaDto(id, _entregas.ElementAt(0).DataEntrega,_entregas.ElementAt(0).MassaEntrega,_entregas.ElementAt(0).TempoColocarEntrega,_entregas.ElementAt(0).TempoRetirarEntrega,_entregas.ElementAt(0).ArmazemID));
            this._entregaDto.Add(new EntregaDto(id2, _entregas.ElementAt(1).DataEntrega,_entregas.ElementAt(1).MassaEntrega,_entregas.ElementAt(1).TempoColocarEntrega,_entregas.ElementAt(1).TempoRetirarEntrega,_entregas.ElementAt(1).ArmazemID));
            
            this._unitOfWorkMock = new Mock<IUnitOfWork>();
            this._iEntregaRepositoryMock=new Mock<IEntregaRepository>();

            this._unitOfWorkMock.Setup(a => a.CommitAsync());
            this._iEntregaRepositoryMock.Setup(x=> x.AddAsync(It.IsAny<Entrega>()));
            this._iEntregaRepositoryMock.Setup(x=> x.GetAllAsync());
            this._iEntregaRepositoryMock.Setup(x=> x.GetByIdAsync(It.IsAny<EntregaId>()));
            this._iEntregaRepositoryMock.Setup(x=> x.GetByDataAsync(It.IsAny<String>()));

            this._entregaService = new EntregaService(this._unitOfWorkMock.Object, this._iEntregaRepositoryMock.Object);

            this._iEntregaRepositoryMock.Setup(x => x.GetByIdAsync(new EntregaId(id))).Returns(Task.FromResult(this._entregas.ElementAt(0)));

            this._iEntregaRepositoryMock.Setup(x => x.GetByIdAsync(new EntregaId(id2))).Returns(Task.FromResult(this._entregas.ElementAt(1)));

            this._iEntregaRepositoryMock.Setup(x => x.GetByDataAsync(testData)).Returns(Task.FromResult(resultList1));

            this._iEntregaRepositoryMock.Setup(x => x.GetByDataAsync(testData2)).Returns(Task.FromResult(resultList2));

            this._iEntregaRepositoryMock.Setup(x => x.GetAllAsync()).Returns(Task.FromResult(this._entregas));

            this._iEntregaRepositoryMock.Setup(x => x.AddAsync(this._entregas.ElementAt(0))).Returns(Task.FromResult(this._entregas.ElementAt(0)));

            this._iEntregaRepositoryMock.Setup(x => x.AddAsync(this._entregas.ElementAt(1))).Returns(Task.FromResult(this._entregas.ElementAt(1)));

            this._entregaService = new EntregaService(this._unitOfWorkMock.Object,this._iEntregaRepositoryMock.Object); 
        }
        
        // [Test]

        // public void GetAddAsync(){
        //     string testData = "20220920";
        //     string testData2 = "20220820";
        //     DataEntrega data = new DataEntrega(new DateTime(2022,09,20));/*new DataEntrega(new DateTime(Int32.Parse(testData.Substring(0,4)),Int32.Parse(testData.Substring(4,2)),Int32.Parse(testData.Substring(6,2))));*/

        //     CriarEntregaDto cdto = new CriarEntregaDto(data, new MassaEntrega(this._entregaDto.ElementAt(0).MassaEntrega), new TempoColocarEntrega(this._entregaDto.ElementAt(0).TempoColocarEntrega), new TempoRetirarEntrega(this._entregaDto.ElementAt(0).TempoRetirarEntrega), new ArmazemId(this._entregaDto.ElementAt(0).ArmazemId));
            
        //     DataEntrega data2 = new DataEntrega(new DateTime(2022,08,20));/*new DataEntrega(new DateTime(Int32.Parse(testData2.Substring(0,4)),Int32.Parse(testData2.Substring(4,2)),Int32.Parse(testData2.Substring(6,2))));*/

        //     CriarEntregaDto cdto2 = new CriarEntregaDto(data2, new MassaEntrega(this._entregaDto.ElementAt(1).MassaEntrega), new TempoColocarEntrega(this._entregaDto.ElementAt(1).TempoColocarEntrega), new TempoRetirarEntrega(this._entregaDto.ElementAt(1).TempoRetirarEntrega), new ArmazemId(this._entregaDto.ElementAt(1).ArmazemId));
            
        //     var result = this._entregaService.AddAsync(cdto);
        //     this._iEntregaRepositoryMock.Verify(t => t.AddAsync(It.IsAny<Entrega>()), Times.Never());

        //     Assert.AreEqual(this._entregaDto.ElementAt(0).TempoColocarEntrega, result.Result.TempoColocarEntrega);

        //     result = this._entregaService.AddAsync(cdto2);

        //     this._iEntregaRepositoryMock.Verify(t => t.AddAsync(It.IsAny<Entrega>()), Times.Never());

        //     Assert.AreEqual(this._entregaDto.ElementAt(1).TempoColocarEntrega, result.Result.TempoColocarEntrega);

        // }

        [Test]

        public void GetByDataAsyncTest(){

            var result = this._entregaService.GetByDataAsync("20220920");

            this._iEntregaRepositoryMock.Verify(t => t.GetByDataAsync("20220920"), Times.AtLeastOnce());

            Assert.AreEqual(result.Result.ElementAt(0).DataEntrega,this._entregaDto.ElementAt(0).DataEntrega);

            result = this._entregaService.GetByDataAsync("20220820");

            this._iEntregaRepositoryMock.Verify(t => t.GetByDataAsync("20220820"), Times.AtLeastOnce());

            Assert.AreEqual(result.Result.ElementAt(0).DataEntrega,this._entregaDto.ElementAt(1).DataEntrega);

        }

        [Test]

        public void GetAllAsyncTest(){

            var result = this._entregaService.GetAllAsync();

            this._iEntregaRepositoryMock.Verify(t => t.GetAllAsync(), Times.AtLeastOnce());

            //O resultado tem 2 instancias

            Assert.AreEqual(result.Result.Count,2);

            Assert.AreEqual(result.Result.ElementAt(0).DataEntrega,this._entregaDto.ElementAt(0).DataEntrega);

            Assert.AreEqual(result.Result.ElementAt(1).DataEntrega,this._entregaDto.ElementAt(1).DataEntrega);

        }

         [Test]

        public void GetByIdAsyncTest(){

            var result = this._entregaService.GetByIdAsync(new EntregaId("11111111-2222-3333-4444-555555555555"));

            this._iEntregaRepositoryMock.Verify(t => t.GetByIdAsync(new EntregaId("11111111-2222-3333-4444-555555555555")), Times.AtLeastOnce());

            Assert.AreEqual(result.Result.DataEntrega,this._entregaDto.ElementAt(0).DataEntrega);

            result = this._entregaService.GetByIdAsync(new EntregaId("11111111-6666-3333-4444-555555555555"));

            this._iEntregaRepositoryMock.Verify(t => t.GetByIdAsync(new EntregaId("11111111-6666-3333-4444-555555555555")), Times.AtLeastOnce());

            Assert.AreEqual(result.Result.DataEntrega,this._entregaDto.ElementAt(1).DataEntrega);

        }
    }
}

