:-consult('planeamento_frota - 2.pl').

inicializa:-write('Numero de novas Geracoes: '),read(NG),
    (retract(geracoes(_));true), asserta(geracoes(NG)),
    write('Dimensao da Populacao: '),read(DP),
    (retract(populacao(_));true), asserta(populacao(DP)), %population size
    write('Tamanho de Genes: '),read(TamGenes),
    (retract(entregas(_));true), asserta(entregas(TamGenes)),
    write('Probabilidade de Cruzamento (%):'), read(P1), % crossover probability
    PC is P1/100,
    (retract(prob_cruzamento(_));true), asserta(prob_cruzamento(PC)),
    write('Probabilidade de Mutacao (%):'), read(P2), %mutation probability
    PM is P2/100,
    (retract(prob_mutacao(_));true), asserta(prob_mutacao(PM)).

gera:- %generate
    inicializa,
    gera_populacao(Pop),
    write('Pop='),write(Pop),nl,
    avalia_populacao(Pop,PopAv),
    write('PopAv='),write(PopAv),nl,
%    ordena_populacao(PopAv,PopOrd),
    count(PopAv,NAv),
    desordena_populacao(PopAv,NAv,PopDesOrd),
    geracoes(NG),
    gera_geracao(0,NG,PopDesOrd).


desordena_populacao([G],1,[G]):-!.

desordena_populacao(PopAv,NAv,[G|PopDesOrd]):-
    NumAv is NAv + 1, % para usar com random
    random(1,NumAv,N),
    retira(N,PopAv,G,NovaLista),
    NumAv1 is NAv-1,
    gera_individuo_aleatorio(NovaLista,NumAv1,PopDesOrd).


gera(ListaGenes,NumGeracoes,TamGenes,TamPop,ProbC,ProbM,Geracoes,MelhorCaminho):-  %inicializa,
    (retract(geracoes(_));true), asserta(geracoes(NumGeracoes)),
    (retract(entregas(_));true), asserta(entregas(TamGenes)),
    (retract(populacao(_));true), asserta(populacao(TamPop)),
    PC is ProbC/100,
    PM is ProbM/100,
    (retract(prob_cruzamento(_));true), asserta(prob_cruzamento(PC)),
    (retract(prob_mutacao(_));true), asserta(prob_mutacao(PM)),
    gera_populacao_1(Pop,ListaGenes),
    avalia_populacao(Pop,PopAv),
    count(PopAv,NAv),
%    ordena_populacao(PopAv,PopOrd),
    desordena_populacao(PopAv,NAv,PopDesOrd),
    gera_geracao_1(0,NumGeracoes,PopDesOrd,Geracoes),
    avalia(ListaGenes,CC,eTruck01),
    melhor_cruzamento(Geracoes,ListaGenes,CC,MelhorCaminho,_).

gera_populacao(Pop):- %generate_population
    populacao(TamPop),
    gera_populacao(TamPop,TamPop,Pop).

gera_populacao_1(Pop,LI):- %generate_population
    populacao(TamPop),
    gera_populacao_1(TamPop,TamPop,LI,Pop).


gera_populacao(0,_,[]):-!. %generate_population

gera_populacao(TamPop,OpIndex,[Ind|Resto]):-
    TamPop1 is TamPop-1,
    OpIndex1 is OpIndex-1,
    gera_populacao(TamPop1,OpIndex1,Resto),
    gera_individuo(OpIndex,Ind),
    not(member(Ind,Resto)).

gera_populacao_1(0,_,_,[]):-!. %generate_population

gera_populacao_1(TamPop,OpIndex,LG,[Ind|Resto]):-
    TamPop1 is TamPop-1,
    OpIndex1 is OpIndex-1,
    gera_populacao_1(TamPop1,OpIndex1,LG,Resto),
    gera_individuo_1(OpIndex,LG,Ind),
    not(member(Ind,Resto)).

gera_populacao_1(TamPop,OpIndex,LG,Resto):-
    gera_populacao_1(TamPop,OpIndex,LG,Resto).


gera_individuo(OpIndex,Ind):- OpIndex =:= 1, planeamento_entrega_distancia(Ind,_).

gera_individuo(OpIndex,Ind):- OpIndex =:= 2, planeamento_entrega_massa(Ind,_).

gera_individuo(OpIndex,Ind):- OpIndex =:= 3, planeamento_entrega_massa_distancia(Ind,_).

gera_individuo(_,Ind):- encontrar_arm_ent(L),count(L,CL),gera_individuo_aleatorio(L,CL,Ind).

gera_individuo_aleatorio([G],1,[G]):-!.

gera_individuo_aleatorio(ListaEntregas,NumE,[G|Resto]):-
    NumEntr is NumE + 1, % para usar com random
    random(1,NumEntr,N),
    retira(N,ListaEntregas,G,NovaLista),
    NumE1 is NumE-1,
    gera_individuo_aleatorio(NovaLista,NumE1,Resto).

retira(1,[G|Resto],G,Resto).

retira(N,[G1|Resto],G,[G1|Resto1]):- N1 is N-1,
    retira(N1,Resto,G,Resto1).

gera_individuo_1(OpIndex,LG,Ind):- OpIndex =:= 1, planeamento_entrega_distancia_RLI(LG,Ind).

gera_individuo_1(OpIndex,LG,Ind):- OpIndex =:= 2, planeamento_entrega_massa_RLI(LG,Ind).

gera_individuo_1(OpIndex,LG,Ind):- OpIndex =:= 3, planeamento_entrega_massa_distancia_RLI(LG,Ind).

gera_individuo_1(_,LG,Ind):- count(LG,CLG),gera_individuo_aleatorio(LG,CLG,Ind).
% gera_individuo_1(_,LG,Ind):-
% planeamento_entrega_massa_distancia(Ind,_).

%inviduoAleatório(ListaGenes,Ind).

%retiraUltimo(1,_,[]):-!.

%retiraUltimo(Tam,[H|T],[H|T2]):-Tam1 is Tam-1,retiraUltimo(Tam1,T,T2).


%gera_individuo(_,_,Ind):- planeamento_entrega_massa_distancia(Ind,_,_).

avalia_populacao([],[]).

avalia_populacao([Ind|Resto],[Ind*V|Resto1]):-
    avalia(Ind,V,eTruck01),
    avalia_populacao(Resto,Resto1).


avalia(LIn,CC,CI):- armazem_inicial(I),transformar_lista_armazem([I|LIn],LF2),custo(CC,LF2,CI,LIn).


ordena_populacao(PopAv,PopAvOrd):-
    bsort(PopAv,PopAvOrd).

bsort([X],[X]):-!.

bsort([X|Xs],Ys):-
    bsort(Xs,Zs),
    btroca([X|Zs],Ys).

btroca([X],[X]):-!.

btroca([X*VX,Y*VY|L1],[Y*VY|L2]):-
    VX>VY,!,
    btroca([X*VX|L1],L2).
btroca([X|L1],[X|L2]):-btroca(L1,L2).

gera_geracao(G,G,Pop):-!, %generate_generation
    write('Geração '), write(G), write(':'), nl, write(Pop), nl.
gera_geracao(N,G,Pop):-
    write('Geração '), write(N), write(':'), nl, write(Pop), nl,
    cruzamento(Pop,NPop1),
    mutacao(NPop1,NPop),
    avalia_populacao(NPop,NPopAv),
    ordena_populacao(NPopAv,NPopOrd),
    N1 is N+1,
    gera_geracao(N1,G,NPopOrd).

gera_geracao_1(_,_,Pop,[Pop]):-count(Pop,NP),NP==1.

gera_geracao_1(G,G,Pop,[Pop]):-!.

gera_geracao_1(N,G,Pop,[Pop|Geracoes]):-
    cruzamento(Pop,NPop1),
    mutacao(NPop1,NPop),
    avalia_populacao(NPop,NPopAv),
    ordena_populacao(NPopAv,NPopOrd),
    N1 is N+1,
    gera_geracao_1(N1,G,NPopOrd,Geracoes).



gerar_pontos_cruzamento(P1,P2):- gerar_pontos_cruzamento1(P1,P2). %generate crossover points

gerar_pontos_cruzamento1(P1,P2):-
    entregas(N),
    NTemp is N+1,
    random(1,NTemp,P11),
    random(1,NTemp,P21),
    P11\==P21,!,
    ((P11<P21,!,P1=P11,P2=P21);P1=P21,P2=P11).

gerar_pontos_cruzamento1(P1,P2):-
    gerar_pontos_cruzamento1(P1,P2).

cruzamento([ ],[ ]). %crossover

cruzamento([Ind*_],[Ind]).

cruzamento([Ind1*_,Ind2*_|Resto],[NInd1,NInd2|Resto1]):-
    gerar_pontos_cruzamento(P1,P2),
    prob_cruzamento(Pcruz),random(0.0,1.0,Pc),
    ((Pc =< Pcruz,!,
      cruzar(Ind1,Ind2,P1,P2,NInd1),
      cruzar(Ind2,Ind1,P1,P2,NInd2));
    (NInd1=Ind1,NInd2=Ind2)),
    cruzamento(Resto,Resto1).

cruzar(Ind1,Ind2,P1,P2,NInd11):-
    sublista(Ind1,P1,P2,Sub1),
    entregas(NumE),
    R is NumE-P2,
    rotate_right(Ind2,R,Ind21),
    elimina(Ind21,Sub1,Sub2),
    P3 is P2 + 1,
    insere(Sub2,Sub1,P3,NInd1),
    eliminah(NInd1,NInd11).

preencheh([ ],[ ]).

preencheh([_|R1],[h|R2]):-
    preencheh(R1,R2).

sublista(L1,I1,I2,L):-I1 < I2,!,
    sublista1(L1,I1,I2,L).

sublista(L1,I1,I2,L):-sublista1(L1,I2,I1,L).

sublista1([X|R1],1,1,[X|H]):-!, preencheh(R1,H).

sublista1([X|R1],1,N2,[X|R2]):-!,N3 is N2 - 1,
    sublista1(R1,1,N3,R2).

sublista1([_|R1],N1,N2,[h|R2]):-N3 is N1 - 1,
    N4 is N2 - 1,
    sublista1(R1,N3,N4,R2).

rotate_right(L,K,L1):- entregas(N),
    T is N - K,
    rr(T,L,L1).

rr(0,L,L):-!.

rr(N,[X|R],R2):- N1 is N - 1,
    append(R,[X],R1),
    rr(N1,R1,R2).

elimina([],_,[]):-!.

elimina([X|R1],L,[X|R2]):- not(member(X,L)),!,
    elimina(R1,L,R2).

insere([],L,_,L):-!.

insere([X|R],L,N,L2):-
    entregas(E),
    ((N>E,!,N1 is N mod E);N1 = N),
    insere1(X,N1,L,L1),
    N2 is N + 1,
    insere(R,L1,N2,L2).

insere1(X,1,L,[X|L]):-!.

insere1(X,N,[Y|L],[Y|L1]):-
    N1 is N-1,
    insere1(X,N1,L,L1).


eliminah([],[]).

eliminah([h|R1],R2):-!,
    eliminah(R1,R2).

eliminah([X|R1],[X|R2]):-
    eliminah(R1,R2).

mutacao([],[]). %mutation

mutacao([Ind|Rest],[NInd|Rest1]):-
    prob_mutacao(Pmut),
    random(0.0,1.0,Pm),
    ((Pm < Pmut,!,mutacao1(Ind,NInd));NInd = Ind),
    mutacao(Rest,Rest1).

mutacao1(Ind,NInd):-
    gerar_pontos_cruzamento(P1,P2),
    mutacao22(Ind,P1,P2,NInd).

mutacao22([G1|Ind],1,P2,[G2|NInd]):-
    !, P21 is P2-1,
    mutacao23(G1,P21,Ind,G2,NInd).

mutacao22([G|Ind],P1,P2,[G|NInd]):-
    P11 is P1-1, P21 is P2-1,
    mutacao22(Ind,P11,P21,NInd).

mutacao23(G1,1,[G2|Ind],G2,[G1|Ind]):-!.

mutacao23(G1,P,[G|Ind],G2,[G|NInd]):-
    P1 is P-1,
    mutacao23(G1,P1,Ind,G2,NInd).


melhor_cruzamento([],M,CM,M,CM):-!.

melhor_cruzamento([H|T],M,CM,RM,CRM):-escolher_das_geracoes(H,M,CM,RM1,CM1),melhor_cruzamento(T,RM1,CM1,RM,CRM).


escolher_das_geracoes([],M,CM,M,CM):-!.

escolher_das_geracoes([H*V|T],_,CM,R,CR):- V<CM, escolher_das_geracoes(T,H,V,R,CR).

escolher_das_geracoes([_*_|T],M,CM,R,CR):- escolher_das_geracoes(T,M,CM,R,CR).

