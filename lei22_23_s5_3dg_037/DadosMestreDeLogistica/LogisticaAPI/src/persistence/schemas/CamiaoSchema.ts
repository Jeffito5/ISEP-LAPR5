/* eslint-disable prettier/prettier */
 /* eslint-disable prettier/prettier */
 import mongoose from 'mongoose';
 import { ICamiaoPersistence } from '../../dataschema/ICamiaoPersistence';
 const Camiao = new mongoose.Schema(
   {
     domainId: { 
       type: String,
       unique: true
     },

    
     matricula:{
      type: String,
      required:[true, 'Insira a matricula do camião'],
      index:true,
     },
     
     tara: {
       type: Number,
       required: [true, 'Insira a tara do camião'],
       index: true,
     },

     capacidadeCarga: {
       type: Number,
       required: [true, 'Insira a capacidade de carga do camião'],
       index: true,
     },

     cargaBaterias: {
       type: Number,
        required: [true, 'Insira a capacidade de carga maxima das baterias do camião'],
       index: true,
     },

    autonomia: {
       type: Number,
       required: [true, 'Insira o valor da autonomia do camião'],
       index: true,
     },

     tempoCarregamento: {
       type: Number,
       required: [true, 'Insira o tempo de carregamento do camião'],
       index: true,
     },  
     
     ativo: {
      type: Boolean,
      required: [true, 'Insira o valor  do camião'],
      index: true,
    },
   },  
   { timestamps: true },
 );

 export default mongoose.model<ICamiaoPersistence & mongoose.Document>('Camiao', Camiao);
