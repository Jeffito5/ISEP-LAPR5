%idArmazem(<local>,<codigo>)

%entrega(<idEntrega>,<data>,<massaEntrefa>,<armazemEntrega>,<tempoColoc>,<tempoRet>)

%carateristicasCam(<nome_camiao>,<tara>,<capacidade_carga>,<carga_total_baterias>,<autonomia>,<t_recarr_bat_20a80>).

%dadosCam_t_e_ta(<nome_camiao>,<cidade_origem>,<cidade_destino>,<tempo>,<energia>,<tempo_adicional>).


%heuristica para encontrar solu��es r�pidas
%encontrar os ids do armazens

%:-use_module(library(http/http_json)).
:-consult('entregas.pl').
:-consult('factos_camiao.pl').
:-consult('dados_camiao.pl').
:-consult('armazem.pl').


encontrar_arm_ent(L):- findall(X,entrega(_,_,_,X,_,_),L).
encontrar_m_id_ent(LM,ID):-findall(M,entrega(_,_,M,ID,_,_),LM).

planeamento_entrega_distancia(LF,CC,CI):-encontrar_arm_ent(LI), armazem_inicial(I),planeamento_entrega_distancia1(LI,I,LF1), LF = [I|LF1],custo(CC,LF,CI).

planeamento_entrega_distancia1([],_,[I]):- armazem_inicial(I).
planeamento_entrega_distancia1(LI,I,[P|LF]):- prox_entrega(LI,P,I), remover_l(LI,P,LE),planeamento_entrega_distancia1(LE,P,LF).

planeamento_entrega_massa(LF,CC,CI):-encontrar_arm_ent(LI), armazem_inicial(I),planeamento_entrega_massa1(LI,I,LF1), LF = [I|LF1],custo(CC,LF,CI).

planeamento_entrega_massa1([],_,[I]):- armazem_inicial(I).
planeamento_entrega_massa1(LI,I,[P|LF]):- prox_entrega1(LI,P,I), remover_l(LI,P,LE),planeamento_entrega_massa1(LE,P,LF).


planeamento_entrega_massa_distancia(LF,CC,CI):-encontrar_arm_ent(LI), armazem_inicial(I), planeamento_entrega_massa_distancia1(LI,I,LF1,0), LF = [I|LF1],custo(CC,LF,CI).

planeamento_entrega_massa_distancia1([],_,[I],_):- armazem_inicial(I).

planeamento_entrega_massa_distancia1(LI,I,[P|LF],0):-prox_entrega1(LI,P,I), remover_l(LI,P,LE),planeamento_entrega_massa_distancia1(LE,P,LF,1).

planeamento_entrega_massa_distancia1(LI,I,[P|LF],1):-prox_entrega(LI,P,I), remover_l(LI,P,LE),planeamento_entrega_massa_distancia1(LE,P,LF,0).


prox_entrega([],5,_).
%um tempo exagerado
prox_entrega(L,P,I):- menor_tempo(L,P,I).

prox_entrega1([],5,_).
%prox_entrega1(L,P,_):- count(L,T), T==1, P is 5.
%um tempo exagerado
prox_entrega1(L,P,I):- maior_massa(L,P,I).


%dadosCam_t_e_ta(<nome_camiao>,<cidade_origem>,<cidade_destino>,<tempo>,<energia>,<tempo_adicional>).


%heuriticas por menor tempo
menor_tempo(L,P,I):-menor_tempo1(L,P,_,I,10000).

menor_tempo1([],P,Pf,_,_):- P = Pf.
menor_tempo1([X|L],Pf,_,I,T):- dadosCam_t_e_ta(_,I,X,T1,_,_), T1<T,menor_tempo1(L,Pf,X,I,T1).

menor_tempo1([_|L],Pf,P,I,T):-menor_tempo1(L,Pf,P,I,T).

count([],0).
count([_|T], N) :- count(T, N1), N is N1+1.


%heuristica por maior massa
maior_massa(L,P,I):-maior_massa1(L,P,_,I,0).

maior_massa1([],P,Pf,_,_):- P = Pf.
maior_massa1([X|L],Pf,_,I,M):- entrega(_,_,LM,X,_,_) , M<LM, maior_massa1(L,Pf,X,I,LM).

maior_massa1([_|L],Pf,P,I,M):- maior_massa1(L,Pf,P,I,M).


%c�digo para remo��o um elemento da lista
remover_l([],_,[]).
remover_l([X|T],X,T):-!.
remover_l([H|T],X,[H|L]):- remover_l(T,X,L).

total_massa([],0).
total_massa([X|L],TM):- total_massa(L,TM1),TM is TM1+X.


%dadosCam_t_e_ta(<nome_camiao>,<cidade_origem>,<cidade_destino>,<tempo>,<energia>,<tempo_adicional>).

%carateristicasCam(<nome_camiao>,<tara>,<capacidade_carga>,<carga_total_baterias>,<autonomia>,<t_recarr_bat_20a80>).
dadosCamiao(CI,TB,TC,CM,PT,AC):-carateristicasCam(CI,PT,CM,TB,AC,TC).


%entrega(<idEntrega>,<data>,<massaEntrefa>,<armazemEntrega>,<tempoColoc>,<tempoRet>)

totalPeso(TPC,CID,TPE):-findall(P,entrega(_,_,P,_,_,_),TP1),dadosCamiao(CID,_,_,CM,PT,_),soma_peso([PT|TP1],TPE),TPC is PT+CM.
soma_peso([],0).
soma_peso([H|T],TP):-soma_peso(T,TP1),TP is TP1+H.


custo(CC,LF,CI):- totalPeso(TPC,CI,TPE),dadosCamiao(CI,EneTotal,_,_,_,_),armazem_inicial(AI),custo1(LF,TPC,TPE,CC,CI,AI,EneTotal).
%
%%dadosCam_t_e_ta(<nome_camiao>,<cidade_origem>,<cidade_destino>,<tempo>,<energia>,<tempo_adicional>).

distancia_min(CI,A1,A2,Tem,Ene,TempoAd):-dadosCam_t_e_ta(CI,A1,A2,Tem,Ene,TempoAd);dadosCam_t_e_ta(CI,A2,A1,Tem,Ene,TempoAd).

custo1([A1,A2|T],TP,TPA,CC,CI,AI,EneAtual):-A2\==AI,entrega(_,_,Me,A2,_,Tr),TPA1 is TPA-Me,distancia_min(CI,A1,A2,Tem,Ene1,TempoAd),Ene is Ene1*(TPA/TP),calcula_proximo_tempo(CI,Tr,TR,EneAtual,Ene,TempoAd,EneDestino),custo1([A2|T],TP,TPA1,CC1,CI,AI,EneDestino),CC is TR+CC1+Tem*(TPA1/TP).


custo1([A1,A2|_],TP,TPA,CC,CI,_,EneAtual):- distancia_min(CI,A1,A2,Tem,Ene1,TempoAd),Ene is Ene1*(TPA/TP),calcula_proximo_tempo(CI,0,TR,EneAtual,Ene,TempoAd,_),CC is Tem*(TPA/TP)+TR.
%custo1([C1,C2|T], PA, PT, TP):-.

calcula_proximo_tempo(CI,Tr,TR,EneAtual,Ene,_,EneDestino):-carateristicasCam(CI,_,_,EneTotal,_,_),EneDestino is EneAtual-Ene,DifEn is EneDestino/EneTotal, DifEn>=0.2,TR is Tr.

calcula_proximo_tempo(CI,_,TR,EneAtual,Ene,_,EneDestino):-carateristicasCam(CI,_,_,EneTotal,_,TemCar), Oitenta_EneTo is (EneTotal*8)/10, Oitenta_EneTo>Ene, EneDestino is Oitenta_EneTo - Ene,Vinte_EneTo is (EneTotal*2)/10,TR is TemCar*((Oitenta_EneTo-EneAtual)/(Oitenta_EneTo-Vinte_EneTo)).

calcula_proximo_tempo(CI,_,TR,_,_,TempoAd,EneDestino):- carateristicasCam(CI,_,_,EneTotal,_,_), EneDestino is (EneTotal*2)/10, TR is TempoAd.


encontrar_id_armazem(L):- findall(X,entrega(_,_,_,X,_,_),L).
todos_os_caminhos(LLP):-encontrar_id_armazem(L),findall(['M05'|LP],(permutation(L,L1),append(L1,['M05'],LP)),LLP).


encontrar_o_melhor_caminho(C,E,TSol):-get_time(Ti), todos_os_caminhos(LLP), encontrar_o_melhor_caminho1(L,LLP), menorValor(L,C), encontrarPosicao(L,C,P), nth0(P,LLP,E), get_time(Tf), TSol is Tf-Ti.

encontrar_o_melhor_caminho1([],[]).
encontrar_o_melhor_caminho1([CC|L],[H|T]):-custo(CC,H,eTruck01), encontrar_o_melhor_caminho1(L,T).

menorValor([X],X):-!.
menorValor([H|T],M):-menorValor(T, M1), ((H < M1, M is H); M is M1).

encontrarPosicao([Element|_], Element, 0):- !.
encontrarPosicao([_|Tail], Element, Index):-encontrarPosicao(Tail, Element, Index1),!,Index is Index1+1.
