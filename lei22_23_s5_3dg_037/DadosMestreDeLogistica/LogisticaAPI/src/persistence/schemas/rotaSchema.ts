
import mongoose from 'mongoose';
import { IRotaPersistence } from '../../dataschema/IRotaPersistence';

const Rota = new mongoose.Schema(
  {
    domainId: { 
        type: String,
        unique: true
    },

    idArmazemOrigem: {
      type: String,
      //required: [true, 'Please enter warehouse origin'],
      index: true,
    },

    idArmazemDestino: {
      type: String,
      //required: [true, 'Please enter warehouse destination'],
      index: true,
    },

    distancia: {
      type: Number,
      //required: [true, 'Please enter warehouse destination'],
      index: true,
    },

    energiaGasta: {
        type: Number,
        //required: [true, 'Please enter warehouse destination'],
        index: true,
      },
    
    tempoMaximo: {
        type: Number,
        //required: [true, 'Please enter warehouse destination'],
        index: true,
    },

    tempoExtra: {
        type: Number,
        //required: [true, 'Please enter warehouse destination'],
        index: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model<IRotaPersistence & mongoose.Document>('Rota', Rota);
