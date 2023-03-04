% Bibliotecas HTTP
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_parameters)).
%:- use_module(library(http/http_client)).

% Bibliotecas JSON
:- use_module(library(http/json_convert)).
:- use_module(library(http/http_json)).
:- use_module(library(http/json)).
:- use_module(library(http/http_cors)).
:- use_module(library(http/http_open)).

:- json_object armazem(id:integer,armazem:string).
:- json_object planeamentoRes(idCamiao:any,listaFinal:any,custoCaminho:any).

% Relação entre pedidos HTTP e predicados que os processam
:- http_handler('/processa_entregas', p_entregas, []).

:- http_handler('/processa_entregas_frota', p_entregas_ag, []).

:-set_setting(http:cors, [*]).

:- dynamic armazem_inicial/1.
%:- set_setting(http:cors, [*]).

% Criação de servidor HTTP em 'Port' que trata pedidos em JSON
server(Port):- http_server(http_dispatch, [port(Port)]).

close_server(Port):- retract(port(Port)),
    http_stop_server(Port,_).
%Faz consulta aos métodos para obtero planeamento de entregas.
:-consult('novo_planeamento_frota.pl').
:-consult('factos_camiao.pl').
:-consult('nome_ficheiros.pl').


p_entregas(Request):-http_parameters(Request,[ idCamiao(IdCamiao, []),
                              opIndex(OpIndex,[between(1,3)]),
                            dataEntrega(DataEntrega,[])]),
    atualizar_base_conhecimento(IdCamiao,DataEntrega),
    planeamento(LF,CC,OpIndex),
%    buscar_entregas(LF,LR),
    Ri= planeamentoRes(IdCamiao,LF,CC),
    prolog_to_json(Ri,JSONObject),
    reply_json(JSONObject,[json_object(dict)]).

p_entregas_ag(Request):-http_parameters(Request,[ dataEntrega(DataEntrega,[]),
                              nG(NG,[between(1,9000)]),
                              quantCamioes(QuantCamioes, [between(1,9000)]),
                              probC(ProbC,[between(0,100)]),
                              probM(ProbM,[between(0,100)])]),
    atualizar_base_conhecimento(IdCamiao,DataEntrega),
    buscar_lista_camioes(QuantCamioes,LC),
    atribuir_lotes(LC,NG,ProbC,ProbM,P,MC),
%    buscar_entregas(LF,LR),
    Ri= planeamentoRes(IdCamiao,MC,P),
    prolog_to_json(Ri,JSONObject),
    reply_json(JSONObject,[json_object(dict)]).


atualizar_base_conhecimento(IdCamiao,Data):- apagar_tudo(),buscar_todos_dados(IdCamiao,Data).

apagar_tudo():-apagarEntregas(),apagarCamiao().

buscar_todos_dados(IdCamiao,Data):- buscarCamiao(IdCamiao),
    buscarEntregas(Data).

%,buscarRotas(IdCamiao).

buscarCamiao(IdCamiao):-processarCamiao(Dados,IdCamiao),parse_camiao(Dados).

buscarEntregas(Data):- processarEntregas(Dados,Data), parse_entregas(Dados).

%buscarRotas(IdCamiao):-processarRotas(Dados),parse_rotas(Dados,IdCamiao).

%----------------------------------------------------------------:Camiao:-------------------------------------------------------------------------------------------
:- dynamic carateristicasCam/6.
camioes_url('http://localhost:3000/api/camioes/').
%
processarCamiao(Dados, Id):-
    camioes_url(URL1),
    string_concat(URL1,Id,URL),
    setup_call_cleanup(
        http_open(URL, In, [cert_verify_hook(cert_accept_any),request_header('Accept'='application/json')]),
        json_read_dict(In, Dados),
        close(In)
).

apagarCamiao():-
    retractall(carateristicasCam),
    retractall(armazem_inicial).
parse_camiao(Dados):- atom_string(IdCamiao,Dados.get(id)),assertz(carateristicasCam(IdCamiao,Dados.get(tara),Dados.get(capacidadeCarga),Dados.get(cargaBaterias),Dados.get(autonomia),Dados.get(tempoCarregamento))).

% --------------------------------------------------------------------------:Entregas:--------------------------------------------------------------------------
% ------------------------------------------------------------
%entrega(<idEntrega>,<data>,<massaEntrefa>,<armazemEntrega>,<tempoColoc>,<tempoRet>)
%
:- dynamic entrega/6.
entregas_url('https://localhost:7097/api/Entregas/').
armazem_inicial_url('https://localhost:7097/api/armazem/Matosinhos').
processarEntregas(Dados, Data):-
    entregas_url(URL1),
    string_concat(URL1,Data,URL),
    setup_call_cleanup(
        http_open(URL, In, [cert_verify_hook(cert_accept_any),request_header('Accept'='application/json')]),
        json_read_dict(In, Dados),
        close(In)
).

apagarEntregas():-
    retractall(entrega(_,_,_,_,_,_)).

processarArmazemInicial(Dados):-
    armazem_inicial_url(URL),
    setup_call_cleanup(
    http_open(URL, In, [cert_verify_hook(cert_accept_any),request_header('Accept'='application/json')]),
    json_read_dict(In, Dados),
    close(In)
).

parse_entregas([]):-processarArmazemInicial([Dados|_]),atom_string(IdArmazem,Dados.get(id)),assertz(armazem_inicial(IdArmazem)).
parse_entregas([H|T]):- atom_string(IdEntrega,H.get(id)),
    atom_string(DataEntrega,H.get(dataEntrega)),
    atom_string(ArmazemId,H.get(armazemId)),
    asserta(entrega(IdEntrega,DataEntrega,H.get(massaEntrega),ArmazemId,H.get(tempoColocarEntrega),H.get(tempoRetirarEntrega))),parse_entregas(T).


% -----------------------------------------------:Rotas:----------------------------------------

rotas_url('http://localhost:3000/api/rotas/').
processarRotas(Dados):-
    rotas_url(URL),
    setup_call_cleanup(
        http_open(URL, In, [cert_verify_hook(cert_accept_any),request_header('Accept'='application/json')]),
        json_read_dict(In, Dados),
        close(In)
).

apagarRotas():-
    retractall(dadosCam_t_e_ta).

parse_rotas([],_):-!.
parse_rotas([H|T],Id):-atom_string(IdCamiao,Id),atom_string(ArmOri,H.get(idArmazemOrigem)),atom_string(ArmDes,H.get(idArmazemDestino)),
    assertz(dadosCam_t_e_ta(IdCamiao,ArmOri,ArmDes,H.get(tempoMaximo),H.get(energiaGasta),H.get(tempoExtra))),
    parse_rotas(T,Id).


%-----------------------------------------------------------------------------------:Planeamento:------------------------------------------------------------
%
encontrar_camioes(LC):-findall(IdCamiao,carateristicasCam(IdCamiao,_,_,_,_,_),LC).

lista_n_camioes(_,[],[]):-!.
lista_n_camioes(0,_,[]):-!.

lista_n_camioes(N,[H|LC1],[H|LC]):-N1 is N-1,lista_n_camioes(N1,LC1,LC).


buscar_lista_camioes(QuantCamioes,LC):-encontrar_camioes(LC1),lista_n_camioes(QuantCamioes,LC1,LC).
planeamento(LF,CC,OpIndex):-OpIndex =:= 1,planeamento_entrega_distancia(LF,CC).

planeamento(LF,CC,OpIndex):-OpIndex =:= 2,planeamento_entrega_massa(LF,CC).

planeamento(LF,CC,OpIndex):-OpIndex =:= 3, planeamento_entrega_massa_distancia(LF,CC).



%planeamento(LF,CC,CI,_):- algotritmo_genetico(LF,CC,CI).
