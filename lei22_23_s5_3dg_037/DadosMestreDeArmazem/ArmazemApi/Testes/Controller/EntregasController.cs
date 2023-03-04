using System;
using NUnit.Framework;
using ArmazemApi.Domain.Entregas;
using ArmazemApi.Infraestructure.Entregas;
using ArmazemApi.Controllers;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Moq;


// namespace Tests
// {
//     public class VehiclesControllerTest
//     {

//         private EntregasController _controller;

//         private Mock<IIntroductionRequestService> _introRequestServiceMock;

//         private IntroductionRequestDto _createdIntroRequestDto;

//         private CreatingIntroductionRequestDto _creatingIntroRequestDto;

//         private CreatingIntroductionRequestDto _invalidCreatingDto;


//         [SetUp]
//         public void Setup(){
//             this._introRequestServiceMock = new Mock<IIntroductionRequestService>();
//             List<string> taglist = new List<string>();
//             taglist.Add("C#");
//             taglist.Add("CSHARP");
//             taglist.Add("Torta de maça");
            
//             this._creatingIntroRequestDto = new CreatingIntroductionRequestDto("531fe55b-95a5-4be3-af52-112e5a78e7a7",
//                                             "531fe55b-95a5-4be3-af52-112e5a78e7a7","531fe55b-95a5-4be3-af52-112e5a78e7a7", "olaText", "olaText2",taglist,"33");
           

//             this._createdIntroRequestDto = new IntroductionRequestDto("ID-Teste-4345-6647", "AAA","Gabriel", "Alberto","Olá,gostaria de conhecer seu amigo","Olá, gostaria de te conhecer","33",taglist, "SENT");
//             this._invalidCreatingDto = new CreatingIntroductionRequestDto("id-invalid","id-invalid","id-invalid","olaText", "olaText2",taglist,"33");
//             this._introRequestServiceMock.Setup(t=> t.addAsync(It.IsAny<CreatingIntroductionRequestDto>())).Returns(Task.FromResult(_createdIntroRequestDto));
//             //this._introRequestServiceMock.Setup(t=> t.addAsync(It.Is<CreatingIntroductionRequestDto>(x => !x.Equals(_creatingIntroRequestDto)))).Throws(new BusinessRuleValidationException("Erro"));


//             //Buscar pedidos pendentes para ser aprovado/desaprovado Mock, casos found e not found
//             this._introRequestServiceMock.Setup(t => t.getAllPendingIntroductionRequestsFromUser(new Guid("531fe85b-95a5-1be9-af82-122e0a48e7a9")));
//             this._introRequestServiceMock.Setup(t => t.getAllPendingIntroductionRequestsFromUser(It.Is<Guid>( id => !id.Equals(new Guid("531fe85b-95a5-1be9-af82-122e0a48e7a9"))))).Throws(new BusinessRuleValidationException("Usuário não encontrado"));
            
//             //Buscar pedidos pendentes para ser aceito/rejeitado Mock, casos found e not found
//             this._introRequestServiceMock.Setup(t => t.getAllApprovedIntroductionRequestsFromUserPendingToBeAccepted(new Guid("531fe85b-95a5-1be9-af82-122e0a48e7a9")));
//             this._introRequestServiceMock.Setup(t => t.getAllApprovedIntroductionRequestsFromUserPendingToBeAccepted(It.Is<Guid>( id => !id.Equals(new Guid("531fe85b-95a5-1be9-af82-122e0a48e7a9"))))).Throws(new BusinessRuleValidationException("Usuário não encontrado"));


//             this._controller = new IntroductionRequestController(this._introRequestServiceMock.Object);
        
//         }
//         [Test]
//         public async Task Post_NormalParameters_Sucess(){
//             double testMassa = 10; 
//             int testTempoColocarEntrega = 20;
//             int testTempoRetirarEntrega = 20;
//             string testData = "20220920";
//             string testArmazemId = "M01";
//             DataEntrega data = new DataEntrega(new DateTime(Int32.Parse(testData.Substring(0,4)),Int32.Parse(testData.Substring(4,2)),Int32.Parse(testData.Substring(6,2))));

//             CriarEntregaDto cdto = new CriarEntregaDto(data, new MassaEntrega(testMassa), new TempoColocarEntrega(testTempoColocarEntrega), new TempoRetirarEntrega(testTempoRetirarEntrega), new ArmazemId(testArmazemId));

//             var mock = new Mock<EntregaService>();
//             mock.Setup(service => service.AddAsync(It.IsAny<CriarEntregaDto>())).Returns(Task.FromResult(cdto));
//             VehiclesController controller = new VehiclesController(mock.Object);

//             var result = await controller.Create(request);

//             mock.Verify(service => service.AddAsync(It.IsAny<VehicleDto>()), Times.AtLeastOnce());
//             ActionResult<VehicleDto> VehicleDto = VehicleMapper.toDTO(request);

//             Assert.IsInstanceOfType(result, typeof(ActionResult<VehicleDto>));
//         }

//         [Test]
//         public async Task GetAll_Sucess(){
//             var mock = new Mock<IVehicleService>();
//             VehiclesController controller = new VehiclesController(mock.Object);

//             var result = await controller.GetAll();

//             mock.Verify(service => service.GetAllAsync(), Times.AtLeastOnce());
//         }

//         [Test]
//         public async Task GetById_Sucess(){
//             Guid request = new Guid();

//             var mock = new Mock<IVehicleService>();
//             mock.Setup(service => service.GetByIdAsync(It.IsAny<VehicleId>()));
//             VehiclesController controller = new VehiclesController(mock.Object);

//             var result = await controller.GetGetById(request);

//             mock.Verify(service => service.GetByIdAsync(It.IsAny<VehicleId>()), Times.AtLeastOnce());
//         }
//     }
// }