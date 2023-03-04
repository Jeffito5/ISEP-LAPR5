import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { ArmazemService, Armazem } from '../gestor-armazem/armazem/criar-armazem/armazem.service';
import { Rota } from '../gestor-logistica/rota/criar-rota/rota.service';
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { Location } from '@angular/common';
import { HostListener } from '@angular/core';
import { Box3Helper, Color, Mesh } from 'three';
import { retry } from 'rxjs';

@Component({
    selector: 'app-rede-3d',
    templateUrl: './rede-viaria-component.html',
    providers: [ArmazemService, Title],
    styleUrls: ['./rede-viaria-component.css'],
})

export class RedeViaria implements OnInit {
    error: any;
    armazens: Armazem[];
    rotas: Rota[];

    constructor(private location: Location, private router: Router, private title: Title, private http: HttpClient, private armazemService: ArmazemService) {
        this.armazens = [];
        this.rotas = [];
    }

    @HostListener('window:popstate', ['$event'])
    onPopState(event) {
        location.reload()
    }

    ngOnInit(): void {
        this.title.setTitle('Rede Viaria');
        this.build3D();
    }

    build3D() {
        this.armazens = [];
        this.rotas = [];
        this.http.get<Armazem[]>('https://localhost:7097/api/Armazem/').subscribe(dataArmazem => {
            this.armazens = dataArmazem;
            this.http.get<Rota[]>('http://localhost:3000/api/rotas').subscribe(dataRota => {
                this.http.get<Rota[]>('http://localhost:3000/api/rotas').subscribe(dataRota => {
                    this.rotas = dataRota;
                    var formattedArrayArmazens1 = this.armazens.map(i => [i.id, i.designacao, ((100 / (8.7613 - 8.2451)) * (i.longitude - 8.2451) + (-50)).toFixed(4), ((100 / (42.1115 - 40.8387)) * (i.latitude - 40.8387) + (-50)).toFixed(4), ((50 / 800) * i.altitude).toFixed(4), i.ativo]);
                    var formattedArrayRotas1 = this.rotas.map(i => [i.idArmazemOrigem, i.idArmazemDestino]);
                    var roadFromBD1 = '../assets/models/road_straight.glb';
                    var fontFromBD1 = "./assets/fonts/MousonyPersonalUse_Regular.json";
                    var whFromBD1 = '../assets/models/warehouse.glb'
                    var roundaboutFromBD1 = '../assets/models/roundabout.glb';
                    var img1FromDB1 = '../assets/images-rede-viaria/arid2_ft.jpg';
                    var img2FromDB1 = '../assets/images-rede-viaria/arid2_bk.jpg';
                    var img3FromDB1 = '../assets/images-rede-viaria/arid2_up.jpg';
                    var img4FromDB1 = '../assets/images-rede-viaria/arid2_dn.jpg';
                    var img5FromDB1 = '../assets/images-rede-viaria/arid2_rt.jpg';
                    var img6FromDB1 = '../assets/images-rede-viaria/arid2_lf.jpg';
                    var truckFromDB1 = '../assets/models/truck1.glb';
                    var largura1 = 1.5;
                    this.create3D(formattedArrayArmazens1, formattedArrayRotas1, roadFromBD1, fontFromBD1, whFromBD1, roundaboutFromBD1, img1FromDB1, img2FromDB1, img3FromDB1, img4FromDB1, img5FromDB1, img6FromDB1, truckFromDB1, largura1);
                });
            });
        });

    }

    create3D(formattedArrayArmazens, formattedArrayRotas, roadDB, fontBD, whBD, roundaboutBD, img1DB, img2DB, img3DB, img4DB, img5DB, img6DB, truckDB, larguraBD1) {
        var roadFromBD = roadDB;
        var fontFromBD = fontBD;
        var whFromBD = whBD;
        var roundaboutFromBD = roundaboutBD;
        var img1FromDB = img1DB;
        var img2FromDB = img2DB;
        var img3FromDB = img3DB;
        var img4FromDB = img4DB;
        var img5FromDB = img5DB;
        var img6FromDB = img6DB;
        var truckFromDB = truckDB;
        var larguraFromDB1 = larguraBD1;

        // criar o renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // criar a scene com cor no background
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x999999);

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        // câmera pan (botão direito), zoom (scroll) e orbit (botão esquerdo). O orbit controls traz por default o pan e o orbit a true
        const orbit = new OrbitControls(camera, renderer.domElement);
        // posição da câmera para se conseguir observar todos os componentes da cena
        camera.position.z = 50;
        const axesHelper = new THREE.AxesHelper(20)
        scene.add(axesHelper);

        // loader para os icons        
        const loader2 = new GLTFLoader();
        const light = new THREE.AmbientLight(0xffffff, 0.25); // soft white light

        scene.add(light);
        // coordenadas do armazém de matosinhos para colocar o camião a partir de lá
        let truckX;
        let truckY;
        let truckZ;
        let cotaAatualizar;

        // atribuir os valores às variáveis criadas acima para o armazém de matosinhos
        for (var i in formattedArrayArmazens) {
            if (formattedArrayArmazens[i][1] == 'Matosinhos') {
                truckX = Number(formattedArrayArmazens[i][2]);
                truckY = Number(formattedArrayArmazens[i][4]);
                truckZ = Number(formattedArrayArmazens[i][3]);
            }
        }

        var truck;
        var velocidade = 0.1;
        var direction = 0.0;
        var x = truckX;
        var y = truckY + 0.8;
        var z = truckZ - 1;
        // arrays para guardar as informações de todos os elementos
        const arrayInfoCirculos: any[] = [];
        const arrayInfoElementosDeLigacao: any[] = [];
        const arrayInfoEstradas: any[] = [];
        const auxArray: any[] = [];

        // luz direcional
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(50, 40, -30);
        directionalLight.target.position.set(0, 0, 0);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        directionalLight.shadow.camera.near = 15; // default
        directionalLight.shadow.camera.far = 90; // default
        directionalLight.shadow.camera.left = -75;
        directionalLight.shadow.camera.right = 65;
        directionalLight.shadow.camera.top = 50;
        directionalLight.shadow.camera.bottom = -25;
        scene.add(directionalLight);
        scene.updateMatrixWorld();

        // constante da altura da personagem
        const altura_personagem = 0.003;
        var altura_el, altura_rotunda;

        // load do camião
        loader2.load(
            // resource URL
            truckFromDB,
            // called when the resource is loaded
            function (gltf) {
                truck = gltf.scene;
                truck.scale.set(altura_personagem, altura_personagem, altura_personagem);
                truck.position.x = truckX;
                truck.position.y = truckY + 0.45;
                truck.position.z = truckZ - 1.15;

                gltf.scene.traverse(function (child) {
                    if (child instanceof THREE.Object3D) {
                        child.castShadow = true;
                        //child.receiveShadow = true;
                    }
                });

                gltf.animations // Array<THREE.AnimationClip>
                gltf.scene // THREE.Scene
                gltf.scenes // Array<THREE.Scene>
                gltf.cameras // Array<THREE.Camera>
                gltf.asset // Object

                scene.add(truck);

            }
            // loading and error function
        )

        // infinitesimo para "subir" a rotunda
        const infinitesimo = 0.1;
        // constante para calcular o raio do círculo
        const k_circulo = 3.4;
        // maior das larguras dos arcos que convergem/divergem nesse/desse nó
        // assume-se que todos os arcos têm a mesma largura
        const wi = larguraFromDB1;
        // cálculo do raio que simula a estrada da rotunda
        const ri1 = (k_circulo * wi) / 2;
        // cálculo do raio que simula um jardim na rotunda
        const ri2 = ((k_circulo * wi) / 2) - 1;
        // constante para calcular o comprimento do elemento de ligação
        const k_ligacao = 1.4;
        // largura (wij) do elemento de ligação
        const wij = 1.5;

        // ciclo for que vai criar os círculos
        for (let i = 0; i < formattedArrayArmazens.length; i++) {
            criaCirculos(i);
        }

        // coordenadas dos círculos que representam os armazéns de partida e chegada
        let xPartida;
        let xChegada;
        let yPartida;
        let yChegada;
        let zPartida;
        let zChegada;
        for (let i = 0; i < formattedArrayRotas.length; i++) {
            for (let j = 0; j < formattedArrayArmazens.length; j++) {
                if (formattedArrayRotas[i][0] == formattedArrayArmazens[j][0]) {
                    xPartida = Number(formattedArrayArmazens[j][2]);
                    yPartida = Number(formattedArrayArmazens[j][3]);
                    zPartida = Number(formattedArrayArmazens[j][4]);
                }
                if (formattedArrayRotas[i][1] == formattedArrayArmazens[j][0]) {
                    xChegada = Number(formattedArrayArmazens[j][2]);
                    yChegada = Number(formattedArrayArmazens[j][3]);
                    zChegada = Number(formattedArrayArmazens[j][4]);
                }
            }

            // cálculo da orientação da estrada
            var orientation = -Math.atan2((yChegada - yPartida), (xChegada - xPartida));
            criaElementoDeLigacao(ri1, k_ligacao, wij, xPartida, zPartida, yPartida, xChegada, zChegada, yChegada, orientation, i);
        }

        // criação da textura como um cubo com 6 imagens para cada face
        const loader3 = new THREE.CubeTextureLoader();
        const texture2 = loader3.load([
            img1FromDB,
            img2FromDB,
            img3FromDB,
            img4FromDB,
            img5FromDB,
            img6FromDB,
        ]);
        scene.background = texture2;

        renderer.setAnimationLoop(animate);
        var arrayConfirma: any[] = [];
        var arr: number[] = [];
        var index = 0;
        var arrAux: any[] = [];
        var flags: any[] = [];
        function animate() {
            orbit.update();
            renderer.render(scene, camera);
            var xCalc, yCalc, zCalc;
            //zCalc3 = truck.position.y - 0.1;
            document.onkeydown = function (e) {
                switch (e.keyCode) {
                    case 87: //w
                        xCalc = velocidade * Math.cos(direction);
                        yCalc = velocidade * Math.sin(direction);
                        zCalc = truck.position.y;

                        var yy = (Math.round(truck.position.y * 1000) / 1000).toFixed(3);
                        if (verificaPertencaDoPonto(truck.position.x + xCalc, truck.position.z - yCalc, yy) == 1) {
                            truck.position.x += xCalc;
                            truck.position.z -= yCalc;
                            truck.position.y = cotaAatualizar;
                        } else {
                            truck.position.x = truck.position.x;
                            truck.position.z = truck.position.z;
                            truck.position.y = truck.position.y;
                        }
                        break;
                    case 83: //s
                        xCalc = velocidade * Math.cos(direction);
                        yCalc = velocidade * Math.sin(direction);
                        zCalc = truck.position.y;
                        var yy2 = (Math.round(truck.position.y * 1000) / 1000).toFixed(3);
                        if (verificaPertencaDoPonto(truck.position.x - xCalc, truck.position.z + yCalc, yy2) == 1) {
                            truck.position.x -= xCalc;
                            truck.position.z += yCalc;
                            truck.position.y = cotaAatualizar;
                        } else {
                            truck.position.x = truck.position.x;
                            truck.position.z = truck.position.z;
                            truck.position.y = truck.position.y;
                        }
                        break;
                    case 65: //a
                        direction += 0.05;
                        break;
                    case 68: //d
                        direction -= 0.05;
                        break;
                }
                truck.rotation.set(0, direction, 0);
            };

        }

        function verificaPertencaDoPonto(truckAbcissaNova, truckOrdenadaNova, truckRotunda) {
            var calculoAuxParaELeEstrada, xAuxNova, yAuxNova, calculoAux, raioAux, raioJardim, pertencaXaux, pertencaYaux, pertencaXauxEL, pertencaYauxEL, pertencaXauxQuadrado, pertencaYauxQuadrado, orient, comp, larg, pertencaXauxES, pertencaYauxES, orient2, compArcoFinal, compArco, larg2, desnivel2, comp2;
            var flag = 0;
            xAuxNova = truckAbcissaNova;
            yAuxNova = truckOrdenadaNova;
            raioAux = Math.pow(arrayInfoCirculos[i][3], 1);
            raioJardim = Math.sqrt(arrayInfoCirculos[i][4]);
            // verificação se o camião pertence a um círculo
            for (let i = 0; i < arrayInfoCirculos.length; i++) {
                if (arrayInfoCirculos[i][1] + 0.45 == truckRotunda) {
                    pertencaXaux = xAuxNova - arrayInfoCirculos[i][0];
                    pertencaYaux = yAuxNova - arrayInfoCirculos[i][2];

                    if (pertencaXaux < 0) {
                        pertencaXaux = -(pertencaXaux);
                    }
                    if (pertencaYaux < 0) {
                        pertencaYaux = -(pertencaYaux);
                    }

                    pertencaXauxQuadrado = Math.pow(pertencaXaux, 2);
                    pertencaYauxQuadrado = Math.pow(pertencaYaux, 2);
                    calculoAux = pertencaXauxQuadrado + pertencaYauxQuadrado;

                    if (/*arrayInfoCirculos[i][1] + 0.45 == truckRotunda &&*/ calculoAux <= raioAux && calculoAux >= raioJardim) {
                        flag = 1;
                        // cotaAatualizar = arrayInfoCirculos[i][1] + altura_personagem / 2;
                        arrayConfirma.push(truckRotunda);
                        cotaAatualizar = truckRotunda;
                        flags.push(0);
                        return flag;
                    } else {
                        calculoAuxParaELeEstrada = calculoAux;
                    }
                }
            }

            if (flag == 0) {
                flag = verificaSePertenceAelementoLigacao(truckAbcissaNova, truckOrdenadaNova, calculoAuxParaELeEstrada, raioJardim, truckRotunda);
                if (flag == 1) {
                    return flag;
                }
            }

            if (flag == 0) {
                flag = verificaSePertenceAestrada(truckAbcissaNova, truckOrdenadaNova, calculoAuxParaELeEstrada, raioJardim, truckRotunda);
                if (flag == 1) {
                    return flag;
                }
            }

            return flag;
        }

        function verificaSePertenceAelementoLigacao(truckAbcissaNova1, truckOrdenadaNova1, calculoAuxCirculo, raioDoJardim, truckCotaAatualizar) {
            var index, orient, comp, larg, pertencaXauxEL, pertencaYauxEL, xAuxNova, yAuxNova;
            var flag = 0;
            xAuxNova = truckAbcissaNova1;
            yAuxNova = truckOrdenadaNova1;
            // verificação se o camião pertence a um elemento de ligação
            for (let j = 0; j < arrayInfoElementosDeLigacao.length; j++) {
                for (var g = 0; g < auxArray.length; g++) {
                    if (auxArray[g][2] == arrayInfoElementosDeLigacao[j][2]) {
                        index = j;
                    } else if (auxArray[g][11] == arrayInfoElementosDeLigacao[j][2]) {
                        index = j;
                    }

                    if (arrayInfoElementosDeLigacao[index][2] + 0.45 == arrayConfirma[arrayConfirma.length] || arrayInfoElementosDeLigacao[index][2] == arrayConfirma[arrayConfirma.length]) {
                        truckCotaAatualizar = arrayInfoElementosDeLigacao[index][2] + 0.45;
                    }

                    orient = arrayInfoElementosDeLigacao[index][3];
                    comp = arrayInfoElementosDeLigacao[index][4];
                    larg = arrayInfoElementosDeLigacao[index][5];

                    pertencaXauxEL = ((xAuxNova - arrayInfoElementosDeLigacao[index][0]) * Math.cos(-orient)) + ((yAuxNova - arrayInfoElementosDeLigacao[index][1]) * Math.sin(-orient));
                    pertencaYauxEL = ((yAuxNova - arrayInfoElementosDeLigacao[index][1]) * Math.cos(-orient)) - ((xAuxNova - arrayInfoElementosDeLigacao[index][0]) * Math.sin(-orient));

                    if (pertencaXauxEL < 0) {
                        pertencaXauxEL = -(pertencaXauxEL);
                    }

                    if (pertencaXauxEL >= 0 && pertencaXauxEL <= comp / 2 + arrayInfoElementosDeLigacao[index][6] / 2 && pertencaYauxEL >= -larg / 2.5 && pertencaYauxEL <= larg / 3 && calculoAuxCirculo >= raioDoJardim) {
                        flag = 1;
                        cotaAatualizar = (Math.round(truckCotaAatualizar * 1000) / 1000).toFixed(3);
                        flags.push(0);
                        return flag;
                    }
                }
            }

            return flag;
        }

        function verificaSePertenceAelementoLigacao2(truckRot, calculoAuxCirculo3, raioDoJardim3) {
            var xBack, zBack;
            if (flags.pop() == 1) {
                for (var j = 0; j < auxArray.length; j++) {
                    var aux = 0;
                    // se estiver mais perto da primeira rotunda então aux = 1 senão aux = 2
                    //if (Math.abs(auxArray[j][0] - truck.position.x) < Math.abs(auxArray[j][9] - truck.position.x)) {
                    // aux = 1;
                    // recuar
                    var calc = Math.abs(auxArray[j][2] - truckRot);
                    var calc2 = Math.abs(auxArray[j][0] - truck.position.x);
                    // avançar
                    var calcAux = Math.abs(auxArray[j][11] - truckRot);
                    var calcAux2 = Math.abs(auxArray[j][9] - truck.position.x);
                    if (calc < 1.5 /*&& calc2 < 1*/) {
                        xBack = auxArray[j][0];
                        zBack = auxArray[j][1];
                        truck.position.x = auxArray[j][0];
                        truck.position.z = auxArray[j][1];
                        truck.position.y = auxArray[j][2] + 0.45;
                        arrAux.push(1);
                    } else if (calcAux < 1.5 /*&& calcAux2 < 1*/) {
                        // xBack = auxArray[j][9];
                        // zBack = auxArray[j][10];
                        truck.position.x = auxArray[j][9];
                        truck.position.z = auxArray[j][10];
                        truck.position.y = auxArray[j][11] + 0.45;
                        arrAux.push(1);
                    }
                }
                for (var j = 0; j < arrayInfoCirculos.length; j++) {
                    if (truck.position.y == arrayInfoCirculos[j][1]) {
                        arrayConfirma.push(truck.position.y);
                    }
                }
            }
            return arrAux.pop();
        }

        function verificaSePertenceAestrada(truckAbcissaNova2, truckOrdenadaNova2, calculoAuxCirculo2, raioDoJardim2, truckDaRotunda) {
            var auxArray2, auxMini, orient2, compArcoFinal, compArco, larg2, desnivel2, comp2, pertencaXauxES, pertencaYauxES, xAuxNova, yAuxNova, xRotunda, yRotunda;
            var flag = 0;
            xAuxNova = truckAbcissaNova2;
            yAuxNova = truckOrdenadaNova2;
            var array: any[] = [];
            var otherFlag = 0;
            //verificação se o camião pertence a uma estrada

            for (var j = 0; j < auxArray.length; j++) {
                if (auxArray[j][2] + 0.45 == (Math.round(arrayConfirma[arrayConfirma.length - 1] * 1000) / 1000).toFixed(3)) {
                    xRotunda = auxArray[j][0];
                    yRotunda = auxArray[j][1];
                    orient2 = auxArray[j][3];
                    compArcoFinal = auxArray[j][4];
                    compArco = auxArray[j][5];
                    larg2 = auxArray[j][6];
                    desnivel2 = auxArray[j][7];
                    comp2 = auxArray[j][8];
                    auxMini = auxArray[j][12];
                    otherFlag = 1;
                } else if (auxArray[j][11] + 0.45 == (Math.round(arrayConfirma[arrayConfirma.length - 1] * 1000) / 1000).toFixed(3)) {
                    xRotunda = auxArray[j][9];
                    yRotunda = auxArray[j][10];
                    orient2 = auxArray[j][3];
                    compArcoFinal = auxArray[j][4];
                    compArco = auxArray[j][5];
                    larg2 = auxArray[j][6];
                    desnivel2 = auxArray[j][7];
                    comp2 = auxArray[j][8];
                    auxMini = auxArray[j][12];
                    otherFlag = 2;
                }

                array[0] = 0;
                array[1] = 0;
                array[2] = orient2;
                array[3] = compArcoFinal;
                array[4] = compArco;
                array[5] = larg2;
                array[6] = desnivel2;
                array[7] = comp2;
                array[8] = auxMini;

                if (otherFlag == 1) {
                    array[9] = auxArray[j][2];
                    pertencaXauxES = ((xAuxNova - xRotunda) * Math.cos(-array[2])) + ((yAuxNova - yRotunda) * Math.sin(-array[2]));
                    pertencaYauxES = ((yAuxNova - yRotunda) * Math.cos(-array[2])) - ((xAuxNova - xRotunda) * Math.sin(-array[2]));
                } else if (otherFlag == 2) {
                    array[9] = auxArray[j][11];
                    pertencaXauxES = ((xAuxNova - xRotunda) * Math.cos(array[2])) + ((yAuxNova - yRotunda) * Math.sin(array[2]));
                    pertencaYauxES = ((yAuxNova - yRotunda) * Math.cos(array[2])) - ((xAuxNova - xRotunda) * Math.sin(array[2]));
                }

                array[0] = pertencaXauxES;
                array[1] = pertencaYauxES;

                if (array[0] > array[7] / 4 && array[0] < array[7] + array[4] + 2.5 * array[8]) {
                    var menor = -array[5] / 2;
                    var maior = array[5] / 2;
                    if ((array[1] >= menor) && (array[1] <= maior)) {

                        while (index != 1) {
                            if (xRotunda == auxArray[j][0]) {
                                arr.push(1);
                            }
                            if (xRotunda == auxArray[j][9]) {
                                arr.push(2);
                            }
                            index++;
                        }

                        flag = 1;
                        var teste = (array[0] - array[7] / 4);
                        var teste2 = teste / array[4];
                        var teste3 = teste2 * array[6];
                        var altura = array[9] + teste3 + altura_personagem / 2;
                        cotaAatualizar = altura;
                        flags.push(1);
                        return flag;
                    }
                }
            }

            if (flag == 0) {
                verificaSePertenceAelementoLigacao2(truckDaRotunda, calculoAuxCirculo2, raioDoJardim2);
            }
            return flag;
        }

        function criaCirculos(indice) {
            // material e geometria para o círculo maior que representa a estrada
            const geometry2 = new THREE.CircleGeometry(ri1, 50);
            const material2 = new THREE.MeshStandardMaterial({ color: 0x909090 });
            //material e geometria para o círculo menor que representa o jardim
            //const geometry3 = new THREE.CircleGeometry(ri2, 50);
            //const material3 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
            material2.side = THREE.DoubleSide;
            //material3.side = THREE.DoubleSide;
            const circle = new THREE.Mesh(geometry2, material2);
            //const circle1 = new THREE.Mesh(geometry3, material3);
            // posição dos círculos mediante as coordenadas dos armazéns criadas
            let x = Number(formattedArrayArmazens[indice][2]);
            let y = Number(formattedArrayArmazens[indice][3]);
            let z = Number(formattedArrayArmazens[indice][4]);
            circle.position.set(x, z + infinitesimo, y);
            arrayInfoCirculos[indice] = [x, z, y, ri1 * 2 /*+ ri2/2*/, ri2];
            //circle1.position.set(x, z + 2 * infinitesimo, y);
            circle.rotateX(-0.5 * Math.PI);
            circle.receiveShadow = true;
            scene.add(circle);
            //circle1.rotateX(-0.5 * Math.PI);
            //scene.add(circle1);

            loader2.load(
                // resource URL
                roundaboutFromBD,
                // called when the resource is loaded
                function (gltf) {

                    gltf.scene.scale.set(0.035, 0.035, 0.035);
                    gltf.scene.position.x = x;
                    gltf.scene.position.y = z + 2 * infinitesimo;
                    gltf.scene.position.z = y;

                    gltf.scene.traverse(function (child) {
                        if (child instanceof THREE.Mesh) {
                            child.material.metalness = -5;
                            child.castShadow = true;
                            //child.receiveShadow = true;
                        }
                    });

                    scene.add(gltf.scene);

                    gltf.animations // Array<THREE.AnimationClip>
                    gltf.scene // THREE.Scene
                    gltf.scenes // Array<THREE.Scene>
                    gltf.cameras // Array<THREE.Camera>
                    gltf.asset // Object

                }
                // loading and error function
            )

            // load do armazém
            // Load a glTF resource
            loader2.load(
                // resource URL
                whFromBD,
                // called when the resource is loaded
                function (gltf) {

                    gltf.scene.scale.set(0.0003, 0.0003, 0.0003);
                    gltf.scene.position.x = x;
                    gltf.scene.position.y = z + 4;
                    gltf.scene.position.z = y + 3;

                    gltf.scene.traverse(function (child) {
                        if (child instanceof THREE.Object3D) {
                            child.castShadow = true;
                            //child.receiveShadow = true;
                        }
                    });

                    scene.add(gltf.scene);

                    gltf.animations // Array<THREE.AnimationClip>
                    gltf.scene // THREE.Scene
                    gltf.scenes // Array<THREE.Scene>
                    gltf.cameras // Array<THREE.Camera>
                    gltf.asset // Object

                }
                // loading and error function
            )

            // loader para colocar o nome do armazém em cima dele
            const fontLoader = new FontLoader();
            fontLoader.load(fontFromBD, (droidFont) => {
                var color;
                if (formattedArrayArmazens[indice][5]) {
                    color = 0x00A300;
                } else {
                    color = 0xFF0000;
                }
                const textGeometry = new TextGeometry(formattedArrayArmazens[indice][1], {
                    height: 0.05,
                    size: 0.25,
                    font: droidFont,
                });
                textGeometry.computeBoundingBox();
                textGeometry.center();
                const textMesh = new THREE.Mesh(textGeometry, [
                    new THREE.MeshPhongMaterial({ color: color })
                ]);
                textMesh.castShadow = true;
                textMesh.geometry.dispose();
                textMesh.geometry = textGeometry;
                var box = new THREE.BoxHelper(textMesh, 0xff0000);
                scene.add(box);
                textMesh.position.set(x, z + 5.5, y + 3.5);
                scene.add(textMesh);
            }
            );
        }

        // função que cria o elemento de ligação bem como a estrada
        function criaElementoDeLigacao(raio_rotunda, constante_ligacao, largura, ligacaoX1, ligacaoY1, ligacaoZ1, ligacaoX2, ligacaoY2, ligacaoZ2, orientacao, indice) {
            let comprimento = raio_rotunda * constante_ligacao;
            // se colocássemos o elemento de ligação com as coordenadas da localização ele iria ficar por baixo do círculo
            // mas como duas "pontas" do retângulo de um lado e outro do círculo. Assim, para se subtrair essa ponta de modo
            // a que o início do retângulo fique no centro do círculo subtraiu-se o comprimento total do elemento de ligação
            // pelo diâmetro do círculo. Ou seja, ficamos com a soma das duas "pontas". Para ficar no centro basta somar o valor de
            // comprimento de uma das pontas, daí a divisão por 2
            let aux = (comprimento - 2 * raio_rotunda) / 2;
            // criação da geometria e material para os elementos de ligação
            const geometryElementoLigacao = new THREE.BoxGeometry(comprimento, 0, largura);
            const materialElementoLigacao = new THREE.MeshStandardMaterial({ color: 0xa9a9a9 });
            // criação dos elementos de ligação que vão ficar apontados um para o outro
            const elemento_de_ligacao = new THREE.Mesh(geometryElementoLigacao, materialElementoLigacao);
            const elemento_de_ligacao2 = new THREE.Mesh(geometryElementoLigacao, materialElementoLigacao);
            // rotate nos elementos de ligação para ficarem virados um para o outro
            elemento_de_ligacao.rotateY(orientacao);
            elemento_de_ligacao2.rotateY(orientacao);
            // colocação dos elementos de ligação no centro do círculo
            elemento_de_ligacao.position.set(ligacaoX1, ligacaoY1, ligacaoZ1);
            elemento_de_ligacao2.position.set(ligacaoX2, ligacaoY2, ligacaoZ2);

            // translate dos elementos de ligação para ficarem com uma das pontas no centro do círculo
            elemento_de_ligacao.translateX(raio_rotunda + aux);
            elemento_de_ligacao2.translateX(- raio_rotunda - aux);
            scene.add(elemento_de_ligacao);
            scene.add(elemento_de_ligacao2);
            arrayInfoElementosDeLigacao[2 * indice] = [elemento_de_ligacao.position.x, elemento_de_ligacao.position.z, elemento_de_ligacao.position.y, orientacao, comprimento, largura, aux];
            arrayInfoElementosDeLigacao[2 * indice + 1] = [elemento_de_ligacao2.position.x, elemento_de_ligacao2.position.z, elemento_de_ligacao2.position.y, orientacao, comprimento, largura, aux];

            var array1 = [elemento_de_ligacao.position.x, elemento_de_ligacao.position.z, elemento_de_ligacao.position.y, orientacao, comprimento, largura, aux];
            var array2 = [elemento_de_ligacao2.position.x, elemento_de_ligacao2.position.z, elemento_de_ligacao2.position.y, orientacao, comprimento, largura, aux];

            // // coordenadas do ponto médio entre os 2 círculos para se colocar lá a estrada
            var ligacaoX3 = (ligacaoX1 + ligacaoX2) / 2;
            var ligacaoY3 = (ligacaoY1 + ligacaoY2) / 2;
            var ligacaoZ3 = (ligacaoZ1 + ligacaoZ2) / 2;
            // cálculos do comprimento da estrada (subtração com o tamanho dos elementos de ligação), inclinação e desnível
            var comprimentoArco = Math.sqrt(Math.pow((ligacaoX2 - ligacaoX1), 2) + Math.pow((ligacaoZ2 - ligacaoZ1), 2)) - 2 * comprimento;
            var desnivel = ligacaoY2 - ligacaoY1;
            var comprimentoFinal = Math.sqrt(Math.pow(comprimentoArco, 2) + Math.pow(desnivel, 2));
            var inclinacao = Math.atan(desnivel / comprimentoArco);
            // criação da geometria e material da estrada
            const geometryElementoLigacao2 = new THREE.BoxGeometry(comprimentoFinal, 0, largura);
            const materialElementoLigacao2 = new THREE.MeshStandardMaterial({ color: 0x696969 });
            const elemento_de_ligacao3 = new THREE.Mesh(geometryElementoLigacao2, materialElementoLigacao2);
            // rotates para ficarem a tocar nos elementos de ligação
            elemento_de_ligacao3.rotateY(orientacao);
            elemento_de_ligacao3.rotateZ(inclinacao);
            elemento_de_ligacao3.position.set(ligacaoX3, ligacaoY3, ligacaoZ3);
            scene.add(elemento_de_ligacao3);
            arrayInfoEstradas[indice] = [elemento_de_ligacao3.position.x, elemento_de_ligacao3.position.z, elemento_de_ligacao3.position.y, orientacao, comprimentoFinal, comprimentoArco, largura, desnivel, comprimento, ligacaoX1, ligacaoY1, ligacaoZ1, ligacaoX2, ligacaoY2, ligacaoZ2];
            auxArray[indice] = [elemento_de_ligacao.position.x, elemento_de_ligacao.position.z, elemento_de_ligacao.position.y, orientacao, comprimentoFinal, comprimentoArco, largura, desnivel, comprimento, elemento_de_ligacao2.position.x, elemento_de_ligacao2.position.z, elemento_de_ligacao2.position.y, aux];

            // load do armazém
            // Load a glTF resource
            loader2.load(
                // resource URL
                roadFromBD,
                // called when the resource is loaded
                function (gltf) {

                    gltf.scene.scale.set(largura / 45, 0.025, comprimentoFinal / 120);
                    gltf.scene.position.x = ligacaoX3;
                    gltf.scene.position.y = ligacaoY3 + 0.08;
                    gltf.scene.position.z = ligacaoZ3 + 0.1;
                    gltf.scene.rotateY(orientacao);
                    gltf.scene.rotateZ(inclinacao);
                    gltf.scene.rotateY(Math.PI / 2);
                    //gltf.scene.rotateZ(inclinacao);

                    scene.add(gltf.scene);

                    gltf.animations // Array<THREE.AnimationClip>
                    gltf.scene // THREE.Scene
                    gltf.scenes // Array<THREE.Scene>
                    gltf.cameras // Array<THREE.Camera>
                    gltf.asset // Object

                }
                // loading and error function
            )
        }

    }
}


