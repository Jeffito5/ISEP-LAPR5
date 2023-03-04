import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService, User } from '../user.service';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
// import { data } from 'cypress/types/jquery';
import config from '../../../config';
import { data } from 'cypress/types/jquery';


@Component({
    selector: 'app-utilizador-listar',
    templateUrl: './listar-utilizador-component.html',
    providers: [Title, UserService],
    styleUrls: ['./listar-utilizador-component.css'],
})

export class ListarUtilizador implements OnInit {
    users: User[] = [];
    error: any;
    userUrl = config.moduloLogistica.hostUser;
    displayedColumns = ['nome', 'email', 'dataNascimento', 'numeroTelefone', 'tipoUser', 'actions'];
    dataSource: MatTableDataSource<User>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private router: Router, private title: Title, private userService: UserService, private http: HttpClient) {
        this.users = [];
    }

    ngOnInit(): void {
        this.title.setTitle('Listar Utilizador');
        this.http.get<User[]>(this.userUrl).subscribe(dataUsers => {
            this.users = dataUsers;

            this.dataSource = new MatTableDataSource(this.users);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }

    cancelar(): void {
        this.router.navigate(['home-page']);
    }

    applyFilter(event: Event) {
        let filterValue = (event.target as HTMLInputElement).value;
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    goToGestorMenuAdmin(): void {
        this.router.navigate(['home-page']);
    }

    anonimizaDados(emailUser: string): void {
        this.userService.anonimizarUser(emailUser).subscribe();
        window.alert('O user foi anonimizado');
    }
}
