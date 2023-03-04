import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Armazem, ArmazemService } from '../criar-armazem/armazem.service';
import { Title } from '@angular/platform-browser';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { HttpClient } from '@angular/common/http';
// import { data } from 'cypress/types/jquery';

@Component({
  selector: 'app-armazem-lista',
  templateUrl: './lista-armazem.component.html',
  providers: [ArmazemService, Title],
  styleUrls: ['./lista-armazem.component.css'],
})
export class ListaArmazem implements OnInit {
  armazens: Armazem[];
  armazens2: Armazem[];
  displayedColumns = ['id', 'designacao', 'endereco', 'longitude', 'latitude', 'altitude', 'ativo'];
  dataSource: MatTableDataSource<Armazem>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router, private armazemService: ArmazemService, private http: HttpClient, private title: Title) {
    this.armazens = [];
    this.armazens2 = [];
  }

  ngOnInit(): void {
    this.title.setTitle('Listar Armazéns');
    this.buscarArmazens();
    let input = document.getElementById("inputDesignacao");
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
    }
    this.http.get<Armazem[]>('https://localhost:7097/api/Armazem/').subscribe(dataArmazens => {
      var result = Object.keys(dataArmazens).map((key) => [dataArmazens[key].id, dataArmazens[key].designacao, dataArmazens[key].endereco, dataArmazens[key].longitude, dataArmazens[key].latitude, dataArmazens[key].altitude, dataArmazens[key].ativo]);
      const array: any[] = [];

      var length = result[0].length;
      for (var i = 0; i < result.length; i++) {
        array[i] = [];
        for (var j = 0; j < length - 1; j++) {
          array[i][j] = result[i][j];
        }
        if (result[i][length - 1]) {
          array[i][length - 1] = 'Ativo';
        } else {
          array[i][length - 1] = 'Inativo';
        }
      }

      var finalArray = array.map(x => ({ 
        id: x[0], 
        designacao: x[1],
        endereco: x[2],
        longitude: x[3],
        latitude: x[4],
        altitude: x[5],
        ativo: x[6]
      }));

      this.dataSource = new MatTableDataSource(dataArmazens);
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

  buscarArmazens() {
    this.armazens = [];
    this.armazemService.getArmazens().subscribe({
      next: (data: Armazem) => this.armazens = this.armazens.concat(data)
    });
    console.log(this.armazens.length);
  }

  atualizarAtivo(armazem: Armazem) {
    let op = "desinibir";
    if (armazem.ativo)
      op = "inibir";

    if (window.confirm("Queres realmente " + op + " o Armazem de Id: " + armazem.id + "?")) {
      let a = (!armazem.ativo);
      try {
        this.armazemService.atualizaAtividadeArmazem(armazem).subscribe(res => {
          if (res.status == 200) {
            if (a) {
              window.alert("O armazem desinibido com sucesso.");
              armazem.ativo = (!armazem.ativo);
            } else {
              window.alert("O armazem inibido com sucesso.");
              armazem.ativo = (!armazem.ativo);
            }
          } else {
            window.alert("Não possivel realizar a ação.");
          }
        });
      } catch (err) {
        window.alert("Não possivel realizar a ação.");
      }
    }
  }

  buscarArmazensPorDesignacaoOuID(designacao: string) {
    this.armazens = [];
    this.armazemService.getArmazemPorDesignacaoOuId(designacao).subscribe({
      next: (data: Armazem) => this.armazens = this.armazens.concat(data)
    });
    //console.log(this.armazens.length);
  }

  goToGestorMenuListarArmazem(): void {
    this.router.navigate(['menu-gestor-armazem']);
  }

  presentData(id: string): void {
    console.log(id + " was pressed.");
  }

  showHideInput(x: any) {
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
      this.buscarArmazens();
    }
  }
}