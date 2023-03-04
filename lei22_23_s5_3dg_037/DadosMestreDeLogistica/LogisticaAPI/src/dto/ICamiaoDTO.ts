/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Autonomia } from "../domain/Camioes/Autonomia";
import { CapacidadeCarga } from "../domain/Camioes/CapacidadeCarga";
import { CargaBaterias } from "../domain/Camioes/CargaBaterias";
import { Tara } from "../domain/Camioes/Tara";
import { TempoCarregamento } from "../domain/Camioes/TempoCarregamento";

/* eslint-disable prettier/prettier */
export interface ICamiaoDTO {
  id: string;
  matricula:string;
  tara: number;
  capacidadeCarga: number;
  cargaBaterias: number;
  autonomia:number;
  tempoCarregamento: number;
  ativo?: boolean;
  }