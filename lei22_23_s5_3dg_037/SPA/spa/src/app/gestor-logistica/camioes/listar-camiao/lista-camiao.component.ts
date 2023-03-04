import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common'
import { Title } from '@angular/platform-browser';
import { CamiaoService,Camiao } from '../criar-camiao/camiao_service';
import { HttpClient } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { repeatWhen } from 'rxjs';

@Component({
    selector: 'app-camiao-lista',
    templateUrl: './lista-camiao.component.html',
    styleUrls: ['./lista-camiao.component.css'],
    providers: [CamiaoService]
  })
export class ListaCamiao implements OnInit{
  camioes: Camiao[];
camiao: any;

displayedColumns = ['matricula', 'tara', 'capacidadeCarga', 'cargaBaterias', 'autonomia', 'tempoCarregamento','ativo'];
  dataSource: MatTableDataSource<Camiao>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ativo: boolean;

  constructor(private router: Router, private title:Title,private camiaoService: CamiaoService, private http: HttpClient){
  this.camioes=[];
  }

  ngOnInit(): void{
    this.title.setTitle('Listar Camiões');
    this.buscarCamioes();
    this.http.get<Camiao[]>('http://localhost:3000/api/camioes/').subscribe(dataCamioes => {
      this.dataSource = new MatTableDataSource(dataCamioes);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  goToGestorMenuListarCamiao() :void {
    this.router.navigate(['menu-gestor-logistica']);
  }

  updateAtivo(row: any) {
    // Make a PUT request to the server to update the 'ativo' attribute of the row in the database
    console.log(row.id)
    console.log(row.ativo)
    this.http.put('http://localhost:3000/api/camioes/' + row.id, { 
    matricula: row.matricula,  
    tara: row.tara,
    capacidadeCarga: row.capacidadeCarga,
    cargaBaterias: row.cargaBaterias,
    autonomia: row.autonomia,
    tempoCarregamento: row.tempoCarregamento,
    ativo: !row.ativo }).subscribe(() => {
    
    // Update the 'ativo' value in the UI
      
    row.ativo = !row.ativo;
    });
  }

  buscarCamioes(){
    this.camiaoService.getCamioes().subscribe({
      next: (data: Camiao) => this.camioes=this.camioes.concat(data)
    });
    console.log(this.camioes.length);
  }

}