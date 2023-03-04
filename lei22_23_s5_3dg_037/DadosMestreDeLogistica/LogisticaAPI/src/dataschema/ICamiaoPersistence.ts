/* eslint-disable prettier/prettier */
export interface ICamiaoPersistence {
    domainId: string;
    matricula: string;
    tara: number;
    capacidadeCarga: number;
    cargaBaterias: number;
    autonomia:number; 
    tempoCarregamento: number;
    ativo?: boolean
    }