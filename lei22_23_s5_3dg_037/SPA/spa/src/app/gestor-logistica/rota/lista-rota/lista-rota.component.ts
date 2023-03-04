import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RotaService, Rota } from '../criar-rota/rota.service';
import { Title } from '@angular/platform-browser';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-rota-lista',
  templateUrl: './lista-rota.component.html',
  providers: [RotaService],
  styleUrls: ['./lista-rota.component.css'],
})

export class ListaRota implements OnInit {
  rotas: Rota[];
  displayedColumns = ['id', 'idArmazemOrigem', 'idArmazemDestino', 'distancia', 'energiaGasta', 'tempoMaximo', 'tempoExtra'];
  dataSource: MatTableDataSource<Rota>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  // @ViewChild(MatSort, { static: false}) sort: MatSort;

  constructor(private router: Router, private rotaService: RotaService, private title: Title, private http: HttpClient) {
    this.rotas = [];
  }

  ngOnInit(): void {
    this.title.setTitle('Listar Rotas');
    this.buscarRotas();
    this.http.get<Rota[]>('http://localhost:3000/api/rotas').subscribe(dataRota => {
      for (var j in dataRota) {
        dataRota[j].id = '0' + j;
      }
      this.dataSource = new MatTableDataSource(dataRota);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    //this.dataSource = new MatTableDataSource(this.rotas);
  }

  // ngAfterViewInit() {
  //   this.dataSource.sort = this.sort;
  // }


  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  goToGestorMenuListarRota(): void {
    this.router.navigate(['menu-gestor-logistica']);
  }

  buscarRotas() {
    this.rotaService.getRotas().subscribe({
      next: (data: Rota) => this.rotas = this.rotas.concat(data)
    });
    console.log(this.rotas.length);
    //this.dataSource = new MatTableDataSource(this.rotas);
  }
}
