
import mongoose from 'mongoose';
import { IUserPersistence } from '../../dataschema/IUserPersistence';


const User = new mongoose.Schema(
  {
    domainId: {
      type: String,
      unique: true
    },

    nome: {
      type: String,
      index: true,
    },

    email: {
      type: String,
      index: true,
    },

    password: {
      type: String,
    },

    dataNascimento: {
      type: String,
      index: true,
    },

    numeroTelefone: {
      type: Number,
      index: true,
    },

    tipoUser: {
      type: String,
      index: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model<IUserPersistence & mongoose.Document>('User', User);
