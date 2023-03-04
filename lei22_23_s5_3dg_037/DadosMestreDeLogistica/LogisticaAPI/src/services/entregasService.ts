import { Service, Inject } from 'typedi';
import config from "../../config";


import { Result } from "../core/logic/Result";
import { IEntregaDTO } from '../dto/IEntregaDTO';
import IEntregasService from './IServices/IEntregasService';

var http = require('http');
const fs = require('fs');

@Service()
export default class EntregasService implements IEntregasService{
    getEntregaByDate(dataEntrega: string): Promise<Result<IEntregaDTO>> {
        var options = {
            host: 'http://localhost:7097/',
            path: 'api/Entregas/'+`${dataEntrega}`
        };

        http.request(options, this.callback).end();

        throw new Error('Method not implemented.');
    }

    callback = function(response) {
        var str = '';
      
        //another chunk of data has been received, so append it to `str`
        response.on('data', function (chunk) {
          str += chunk;
        });
      
        //the whole response has been received, so we just print it out here
        response.on('end', function () {
          console.log(str);
        });
    }

}
