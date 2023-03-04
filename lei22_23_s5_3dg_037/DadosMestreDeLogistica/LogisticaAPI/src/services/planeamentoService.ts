import { Service, Inject } from 'typedi';
import { IPlaneamentoDTO } from '../dto/IPlaneamentoDTO';
import { IEntregaDTO } from '../dto/IEntregaDTO';
import IPlaneamentoService from './IServices/IPlaneamentoService';
import { ICamiaoDTO } from '../dto/ICamiaoDTO';
import { Result } from "../core/logic/Result";
import  config  from '../../config';
import ICamiaoService from './IServices/ICamiaoService';

var http = require('http');
//var fs = require('fs');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

@Service()
export default class PlaneamentoService implements IPlaneamentoService {
  response:IPlaneamentoDTO|undefined;
    constructor(){}

    async createPlaneamento(idCamiao:string,opIndex:string,dataEntrega:string): Promise<IPlaneamentoDTO>{
      var options = {
        host: config.planeamentoModuloUrl.host,
        port: config.planeamentoModuloUrl.port,
        path: config.planeamentoModuloUrl.path+'?'+config.planeamentoModuloUrl.camiaoParametro+`=${idCamiao}&`+config.planeamentoModuloUrl.servicoIndiceParametro+`=${opIndex}&`+config.planeamentoModuloUrl.dataEntregaParametro+`=${dataEntrega}`
      };

      let res=null;

      let promise = new Promise((resolve, reject) => {
        http.request(options, resp=> {
          let str = '';
          console.log('Response is '+resp.statusCode);
          //another chunk of data has been received, so append it to `str`
          resp.on('data', chunk => {
            str += chunk;
          });
        
          //the whole response has been received, so we just print it out here
          resp.on('end', () => {
            try{
              let resJSON=JSON.parse(str);
              resolve(resJSON);
            }catch(err){
              resolve(str);
            }
          });
        }).end().on( 'uncaughtException', err => {
            console.log("Error: "+ err.message+" "+ err.stack);
        });
      });

      let result = await promise;
      return result as IPlaneamentoDTO;
    }
}