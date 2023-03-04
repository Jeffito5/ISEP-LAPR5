import { ThresholdSeverity } from '@angular-devkit/build-angular/src/utils/bundle-calculator';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, TitleStrategy } from '@angular/router';
import { retry } from 'rxjs';
import { Entrega, EntregaService } from '../criar-entrega/entrega-service';
import { Armazem, ArmazemService } from '../criar-armazem/armazem.service';
import { HttpClient } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
// import { data } from 'cypress/types/jquery';
import config from '../../../../../config';

@Component({
  selector: 'app-armazem-lista',
  templateUrl: './lista-entrega-component.html',
  providers: [EntregaService, Title, ArmazemService],
  styleUrls: ['./lista-entrega-component.css'],
})

export class ListaEntrega implements OnInit {
  entregas: Entrega[];
  armazens: Armazem[] = [];
  entregas2: Entrega[];
  armazemUrl = config.moduloArmazem.hostArmazem;
  displayedColumns = ['id', 'dataEntrega', 'massaEntrega', 'tempoColocarEntrega', 'tempoRetirarEntrega', 'armazemId'];
  dataSource: MatTableDataSource<Entrega>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router, private entregaService: EntregaService, private http: HttpClient, private title: Title, private armazemService: ArmazemService) {
    this.entregas = [];
    this.armazens = [];
    this.entregas2 = [];
  }

  ngOnInit(): void {
    this.title.setTitle('Listar Entregas');
    this.buscarEntregas();
    let input = document.getElementById("idEntregaInput");
    let input2 = document.getElementById("dataEntregaInput");
    if (input != null) {
      let value = input.ariaValueMax?.toString;
      input.addEventListener("keypress", function (event) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
          // Cancel the default action, if needed
          event.preventDefault();
          // Trigger the button element with a click
          input?.click();
        }
      });
    } else if (input2 != null) {
      let value = input2.ariaValueMax?.toString;
      input2.addEventListener("keypress", function (event) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
          // Cancel the default action, if needed
          event.preventDefault();
          // Trigger the button element with a click
          input2?.click();
        }
      });
    }
    var arrayAux, arrayAux1;
    this.http.get<Entrega[]>('https://localhost:7097/api/Entregas/').subscribe(dataEntregas => {
      this.http.get<Armazem[]>(this.armazemUrl + 'Ativos/').subscribe(dataArmazens => {
        arrayAux = dataArmazens;
        for (var i in arrayAux) {
          this.armazens.push(arrayAux[i]);
        }

        arrayAux1 = dataEntregas;
        for (var i in arrayAux1) {
          for (var j in this.armazens) {
            if (arrayAux1[i].armazemId === this.armazens[j].id) {
              this.entregas2.push(arrayAux1[i]);
            }
          }
        }

        for(var j in this.entregas2){
          this.entregas2[j].id = '00' + j;
        }

        this.dataSource = new MatTableDataSource(this.entregas2);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    });
  }

  getArmazensAtivos() {
    var arrayAux1, arrayAux2;
    this.http.get<Armazem[]>(this.armazemUrl + 'Ativos/').subscribe(dataArmazens => {
      arrayAux1 = dataArmazens;
      for (var i in arrayAux1) {
        if (arrayAux1[i].id != "M05") {
          arrayAux2.push(arrayAux1[i]);
        }
      }
    });
    return arrayAux2;
  }

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  goToGestorMenuListarEntrega(): void {
    this.router.navigate(['menu-gestor-armazem']);
  }

  buscarEntregas() {
    this.entregas = [];
    this.entregaService.getEntregas().subscribe({
      next: (data: Entrega) => this.entregas = this.entregas.concat(data)
    });
  }

  getEntregaPorData(data: string) {
    data = data.replace(/-/g, '');
    this.entregas = [];
    this.entregaService.getEntregaPorDataOuArmazemId(data).subscribe({
      next: (data: Entrega) => this.entregas = this.entregas.concat(data)
    });
    console.log(this.entregas.length);
  }

  getEntregaPorArmazemId(data: string) {
    var data2 = data;
    console.log(data2);
    this.entregas = [];
    this.entregaService.getEntregaPorDataOuArmazemId(data2).subscribe({
      next: (data2: Entrega) => this.entregas = this.entregas.concat(data2)
    });
    console.log(this.entregas.length);
  }

  presentData(id: string): void {
    console.log(id + " was pressed.");
  }

  clickToAppear(x: any) {
    if (x.style.display == "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
      this.buscarEntregas();
    }
  }
}