/* eslint-disable prettier/prettier */
export interface IRotaDTO {
    id: string;
    idArmazemOrigem: string;
    idArmazemDestino: string;
    distancia: number;
    energiaGasta: number;
    tempoMaximo: number;
    tempoExtra: number;
}