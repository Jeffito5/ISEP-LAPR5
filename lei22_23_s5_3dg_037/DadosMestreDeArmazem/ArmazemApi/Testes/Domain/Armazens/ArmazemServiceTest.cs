using NUnit.Framework;
using System.Threading.Tasks;
using System.Collections.Generic;
using Moq;
using ArmazemApi.Domain.Armazens;
using ArmazemApi.Controllers;
using ArmazemApi.Domain.Shared;

namespace ArmazemApi.Testes.Domain.Armazens{
    public class ArmazemServiceTest{
        private ArmazemService _armazemService;
        private List<ArmazemDto> _armazemDto;
        private List<Armazem> _armazens= new List<Armazem>();
        private Mock<IUnitOfWork> _unitOfWorkMock;
        private Mock<IArmazemRepository> _iArmazemRepositoryMock;


        [SetUp]
        public void Setup(){
            _armazens= new List<Armazem>();
            _armazemDto=new List<ArmazemDto>();
            double longitude=2.0;
            double latitude=3.0;
            double altitude=5.0;
            String designacao1="Porto";
            String designacao2="Matosinhos";
            String endereco1="Rua Poro 452, 4465-122, Porto Portugal";
            String endereco2="Rua Mato 452, 4465-122, Porto Portugal";
            String id1="P00";
            String id2="P01";
            bool ativo=true;    
            List<Armazem> resultList1=new List<Armazem>();
            List<Armazem> resultList2=new List<Armazem>();

            this._armazens.Add(new Armazem(designacao1,longitude,latitude,altitude,endereco1,id1,ativo));
            this._armazens.Add(new Armazem(designacao2,longitude+4,latitude+5,altitude+6,endereco2,id2,ativo));
            resultList1.Add(this._armazens.ElementAt(0));
            resultList2.Add(this._armazens.ElementAt(1));

            this._armazemDto.Add(new ArmazemDto{Id=_armazens.ElementAt(0).Id.AsString(),Designacao=_armazens.ElementAt(0).Designacao,Longitude=_armazens.ElementAt(0).Coordenadas.Longitude,Latitude=_armazens.ElementAt(0).Coordenadas.Latitude,Altitude=_armazens.ElementAt(0).Coordenadas.Altitude,Endereco=_armazens.ElementAt(0).Endereco.AsString(),Ativo=_armazens.ElementAt(0).Ativo});

            this._armazemDto.Add(new ArmazemDto{Id=_armazens.ElementAt(1).Id.AsString(),Designacao=_armazens.ElementAt(1).Designacao,Longitude=_armazens.ElementAt(1).Coordenadas.Longitude,Latitude=_armazens.ElementAt(1).Coordenadas.Latitude,Altitude=_armazens.ElementAt(1).Coordenadas.Altitude,Endereco=_armazens.ElementAt(1).Endereco.AsString(),Ativo=_armazens.ElementAt(1).Ativo});
            
            this._unitOfWorkMock = new Mock<IUnitOfWork>();
            this._iArmazemRepositoryMock=new Mock<IArmazemRepository>();

            this._unitOfWorkMock.Setup(a => a.CommitAsync());
            this._iArmazemRepositoryMock.Setup(x=> x.AddAsync(It.IsAny<Armazem>()));
            this._iArmazemRepositoryMock.Setup(x=> x.GetAllAsync());
            this._iArmazemRepositoryMock.Setup(x=> x.GetByIdAsync(It.IsAny<ArmazemId>()));
            this._iArmazemRepositoryMock.Setup(x=> x.GetByDesignacaoAsync(It.IsAny<String>()));

            this._armazemService = new ArmazemService(this._unitOfWorkMock.Object, this._iArmazemRepositoryMock.Object);

            this._iArmazemRepositoryMock.Setup(x => x.GetByIdAsync(new ArmazemId(id1))).Returns(Task.FromResult(this._armazens.ElementAt(0)));

            this._iArmazemRepositoryMock.Setup(x => x.GetByIdAsync(new ArmazemId(id2))).Returns(Task.FromResult(this._armazens.ElementAt(1)));

            this._iArmazemRepositoryMock.Setup(x => x.GetByDesignacaoAsync(designacao1)).Returns(Task.FromResult(resultList1));

            this._iArmazemRepositoryMock.Setup(x => x.GetByDesignacaoAsync(designacao2)).Returns(Task.FromResult(resultList2));

            this._iArmazemRepositoryMock.Setup(x => x.GetAllAsync()).Returns(Task.FromResult(this._armazens));

            this._iArmazemRepositoryMock.Setup(x => x.AddAsync(this._armazens.ElementAt(0))).Returns(Task.FromResult(this._armazens.ElementAt(0)));

            this._iArmazemRepositoryMock.Setup(x => x.AddAsync(this._armazens.ElementAt(1))).Returns(Task.FromResult(this._armazens.ElementAt(1)));

            this._armazemService = new ArmazemService(this._unitOfWorkMock.Object,this._iArmazemRepositoryMock.Object); 
        }

        [Test]
        public void GetByIdAsyncTest(){
            var result = this._armazemService.GetByIdAsync(new ArmazemId("P00"));
            this._iArmazemRepositoryMock.Verify(t => t.GetByIdAsync(new ArmazemId("P00")), Times.AtLeastOnce());

            Assert.AreEqual(result.Result.Id,this._armazemDto.ElementAt(0).Id);

            result = this._armazemService.GetByIdAsync(new ArmazemId("P01"));
            this._iArmazemRepositoryMock.Verify(t => t.GetByIdAsync(new ArmazemId("P01")), Times.AtLeastOnce());

            Assert.AreEqual(result.Result.Id,this._armazemDto.ElementAt(1).Id);
        }

        [Test]
        public void GetAllAsyncTest(){
            var result = this._armazemService.GetAllAsync();
            this._iArmazemRepositoryMock.Verify(t => t.GetAllAsync(), Times.AtLeastOnce());

            //O resultado tem 2 instancias
            Assert.AreEqual(result.Result.Count,2);
            Assert.AreEqual(result.Result.ElementAt(0).Id,this._armazemDto.ElementAt(0).Id);
            Assert.AreEqual(result.Result.ElementAt(1).Id,this._armazemDto.ElementAt(1).Id);
        }

        [Test]
        public void GetByDesignacaoAsyncTest(){
            var result = this._armazemService.GetByDesignacaoAsync("Porto");
            this._iArmazemRepositoryMock.Verify(t => t.GetByDesignacaoAsync("Porto"), Times.AtLeastOnce());

            Assert.AreEqual(result.Result.ElementAt(0).Id,this._armazemDto.ElementAt(0).Id);

            result = this._armazemService.GetByDesignacaoAsync("Matosinhos");
            this._iArmazemRepositoryMock.Verify(t => t.GetByDesignacaoAsync("Matosinhos"), Times.AtLeastOnce());

            Assert.AreEqual(result.Result.ElementAt(0).Id,this._armazemDto.ElementAt(1).Id);
        }

        [Test]
        public void GetAddAsync(){
            var result = this._armazemService.AddAsync(this._armazemDto.ElementAt(0));
            this._iArmazemRepositoryMock.Verify(t => t.AddAsync(It.IsAny<Armazem>()), Times.AtLeastOnce());
            
            Assert.AreEqual(this._armazemDto.ElementAt(0).Id, result.Result.Id);

            result = this._armazemService.AddAsync(this._armazemDto.ElementAt(1));
            this._iArmazemRepositoryMock.Verify(t => t.AddAsync(It.IsAny<Armazem>()), Times.AtLeastOnce());
            
            Assert.AreEqual(this._armazemDto.ElementAt(1).Id, result.Result.Id);
        }
    }
}