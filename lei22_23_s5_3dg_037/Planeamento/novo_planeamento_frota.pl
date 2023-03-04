%carateristicasCam(<nome_camiao>,<tara>,<capacidade_carga>,<carga_total_baterias>,<autonomia>,<t_recarr_bat_20a80>).

:-consult('entregas.pl').
:-consult('novo_planeamento.pl').

listaCamioes(LC):-findall(Camiao,carateristicasCam(Camiao,_,_,_,_,_),LC).


atribuir_lotes(LC,NG,ProbC,ProbM,Geracoes,MCS):- atribuir_lotes(LF,LC),atribuir_lotes_1(LF,NG,ProbC,ProbM,Geracoes,MCS).

atribuir_lotes_1([],_,_,_,_,[]):-!.
atribuir_lotes_1([P|LF],NG,ProbC,ProbM,[Geracoes1|Geracoes],[C|MC]):-separar_lista(P,H,T),tamanho(T,TamG),gera(T,NG,TamG,TamG,ProbC,ProbM,Geracoes1,CR),C = [H|CR],atribuir_lotes_1(LF,NG,ProbC,ProbM,Geracoes,MC).

separar_lista([H|T],H,T).

tamanho([],0).
tamanho([_|T],N):-tamanho(T,N1), N is N1+1.

atribuir_lotes(LF,LC):- listaEntregas(LE),tamanho(LE,NE),tamanho(LC,NC),M is round(NE/NC),atribuir_lotes1(LF,LC,LE,M).

atribuir_lotes1([],[],_,_):-!.

atribuir_lotes1([L|LF],[C|LC],ListaEntregas,M):- atribuir_lote(C,L,ListaEntregas,M),removerEntregasSelecionadas(L,ListaEntregas,LSE),atribuir_lotes1(LF,LC,LSE,M).

removerEntregasSelecionadas(_,[],[]):-!.
removerEntregasSelecionadas(L,[H|LE],[H|LF]):-not(member(H,L)),removerEntregasSelecionadas(L,LE,LF).

removerEntregasSelecionadas(L,[_|LE],LF):-removerEntregasSelecionadas(L,LE,LF).

atribuir_lote(IdCamiao,[IdCamiao|RestoEntregas],ListaInicial,M):- carateristicasCam(IdCamiao,_,Carga,_,_,_),atribuir_lote1(ListaInicial,RestoEntregas, Carga,M).

listaEntregas(LE):- findall(Entrega,entrega(Entrega,_,_,_,_,_),LE).

atribuir_lote1([],[],_,_):-!.

atribuir_lote1(_,[],0,_):-!.

atribuir_lote1(_,[],_,M):-M<0.999,!.

atribuir_lote1([H|ListaInicial],[H|ListaEntregas], CargaCamiao,M):- M1 is M-1,entrega(H,_,Massa,_,_,_),Massa=<CargaCamiao,Carga1 is CargaCamiao-Massa, atribuir_lote1(ListaInicial,ListaEntregas,Carga1,M1).

atribuir_lote1([_|ListaInicial],ListaEntregas,CargaCamiao,M):-atribuir_lote1(ListaInicial, ListaEntregas,CargaCamiao,M).

%verfica_
