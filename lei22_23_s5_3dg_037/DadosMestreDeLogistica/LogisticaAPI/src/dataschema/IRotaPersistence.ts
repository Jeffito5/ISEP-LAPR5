export interface IRotaPersistence {
    domainId: string;
	idArmazemOrigem: string;
    idArmazemDestino: string;
    distancia: number;
    energiaGasta: number;
    tempoMaximo: number;
    tempoExtra: number;
}