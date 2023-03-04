import * as THREE from "three";
import { OrbitControls } from "../three.js-master/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "../three.js-master/examples/jsm/loaders/GLTFLoader.js";

// api url dos armazéns
const api_url1 =
    "https://localhost:7097/api/Armazem/";

// api url das rotas
const api_url2 =
    "http://localhost:3000/api/rotas";

// variáveis auxiliares para guardar os dados que vão sair da base de dados
var data;
var data2;
var formattedArrayArmazens;
var formattedArrayRotas;

// função async para receber os dados da api dos armazéns
async function getAPIcSharp() {

    // guardar a resposta
    const response = await fetch(api_url1);

    // guardar a informação em JSON
    data = await response.json();

    var array1 = data.map(i => [i.id, i.designacao, ((100 / (8.7613 - 8.2451)) * (i.longitude - 8.2451) + (-50)).toFixed(4), ((100 / (42.1115 - 40.8387)) * (i.latitude - 40.8387) + (-50)).toFixed(4), ((50 / 800) * i.altitude).toFixed(4)]);

    return array1;
};

// função async para receber os dados da api das rotas
async function getAPINode(url2, array2) {

    // guardar a resposta
    const response = await fetch(url2);

    // guardar a informação em JSON
    data2 = await response.json();

    var array2 = data2.map(i => [i.idArmazemOrigem, i.idArmazemDestino]);
    return array2;
}

formattedArrayArmazens = await getAPIcSharp(api_url1, formattedArrayArmazens);
formattedArrayRotas = await getAPINode(api_url2, formattedArrayRotas);

// criar o renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

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
const light = new THREE.AmbientLight(0xffffff); // soft white light
scene.add(light);
// coordenadas do armazém de matosinhos para colocar o camião a partir de lá
let truckX;
let truckY;
let truckZ;

// atribuir os valores às variáveis criadas acima para o armazém de matosinhos
for (var i in formattedArrayArmazens) {
    if (formattedArrayArmazens[i][1] == 'Matosinhos') {
        truckX = Number(formattedArrayArmazens[i][2]);
        truckY = Number(formattedArrayArmazens[i][4]);
        truckZ = Number(formattedArrayArmazens[i][3]);
    }
}

// constante da altura da personagem
const altura_personagem = 0.005;
// load do camião
loader2.load(
    // resource URL
    './models/truck1.glb',
    // called when the resource is loaded
    function (gltf) {

        gltf.scene.scale.set(altura_personagem, altura_personagem, altura_personagem);
        gltf.scene.position.x = truckX;
        gltf.scene.position.y = truckY + 0.75;
        gltf.scene.position.z = truckZ;
        scene.add(gltf.scene);

        gltf.animations // Array<THREE.AnimationClip>
        gltf.scene // THREE.Scene
        gltf.scenes // Array<THREE.Scene>
        gltf.cameras // Array<THREE.Camera>
        gltf.asset // Object

    }
    // loading and error function
)

// infinitesimo para "subir" a rotunda
const infinitesimo = 0.1;
// constante para calcular o raio do círculo
const k_circulo = 2.4;
// maior das larguras dos arcos que convergem/divergem nesse/desse nó
// assume-se que todos os arcos têm a mesma largura
const wi = 1.5;
// cálculo do raio que simula a estrada da rotunda
const ri1 = (k_circulo * wi) / 2;
// cálculo do raio que simula um jardim na rotunda
const ri2 = ((k_circulo * wi) / 2) - 1;
// constante para calcular o comprimento do elemento de ligação
const k_ligacao = 1.5;
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
    criaElementoDeLigacao(ri1, k_ligacao, wij, xPartida, zPartida, yPartida, xChegada, zChegada, yChegada, orientation);
}

// criação da textura como um cubo com 6 imagens para cada face
const loader3 = new THREE.CubeTextureLoader();
const texture2 = loader3.load([
    './images/arid2_ft.jpg',
    './images/arid2_bk.jpg',
    './images/arid2_up.jpg',
    './images/arid2_dn.jpg',
    './images/arid2_rt.jpg',
    './images/arid2_lf.jpg',
]);
scene.background = texture2;

renderer.setAnimationLoop(animate);

function animate() {
    orbit.update();
    renderer.render(scene, camera);
}

function criaCirculos(indice) {
    // material e geometria para o círculo maior que representa a estrada
    const geometry2 = new THREE.CircleGeometry(ri1, 50);
    const material2 = new THREE.MeshBasicMaterial({ color: 0x909090 });
    //material e geometria para o círculo menor que representa o jardim
    const geometry3 = new THREE.CircleGeometry(ri2, 50);
    const material3 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    material2.side = THREE.DoubleSide;
    material3.side = THREE.DoubleSide;
    const circle = new THREE.Mesh(geometry2, material2);
    const circle1 = new THREE.Mesh(geometry3, material3);
    // posição dos círculos mediante as coordenadas dos armazéns criadas
    let x = Number(formattedArrayArmazens[indice][2]);
    let y = Number(formattedArrayArmazens[indice][3]);
    let z = Number(formattedArrayArmazens[indice][4]);
    circle.position.set(x, z + infinitesimo, y);
    circle1.position.set(x, z + 2 * infinitesimo, y);
    circle.rotateX(-0.5 * Math.PI);
    scene.add(circle);
    circle1.rotateX(-0.5 * Math.PI);
    scene.add(circle1);

    // load do armazém
    // Load a glTF resource
    loader2.load(
        // resource URL
        './models/warehouse.glb',
        // called when the resource is loaded
        function (gltf) {

            gltf.scene.scale.set(0.0003, 0.0003, 0.0003);
            gltf.scene.position.x = x;
            gltf.scene.position.y = z + 4;
            gltf.scene.position.z = y + 3;
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

// função que cria o elemento de ligação bem como a estrada
function criaElementoDeLigacao(raio_rotunda, constante_ligacao, largura, ligacaoX1, ligacaoY1, ligacaoZ1, ligacaoX2, ligacaoY2, ligacaoZ2, orientacao) {
    let comprimento = raio_rotunda * constante_ligacao;
    // se colocássemos o elemento de ligação com as coordenadas da localização ele iria ficar por baixo do círculo
    // mas como duas "pontas" do retângulo de um lado e outro do círculo. Assim, para se subtrair essa ponta de modo
    // a que o início do retângulo fique no centro do círculo subtraiu-se o comprimento total do elemento de ligação
    // pelo diâmetro do círculo. Ou seja, ficamos com a soma das duas "pontas". Para ficar no centro basta somar o valor de
    // comprimento de uma das pontas, daí a divisão por 2
    let aux = (comprimento - 2 * raio_rotunda) / 2;
    // criação da geometria e material para os elementos de ligação
    const geometryElementoLigacao = new THREE.BoxGeometry(comprimento, 0, largura);
    const materialElementoLigacao = new THREE.MeshBasicMaterial({ color: 0xa9a9a9 });
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

    // coordenadas do ponto médio entre os 2 círculos para se colocar lá a estrada
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
    const materialElementoLigacao2 = new THREE.MeshBasicMaterial({ color: 0x696969 });
    const elemento_de_ligacao3 = new THREE.Mesh(geometryElementoLigacao2, materialElementoLigacao2);
    // rotates para ficarem a tocar nos elementos de ligação
    elemento_de_ligacao3.rotateY(orientacao);
    elemento_de_ligacao3.rotateZ(inclinacao);
    elemento_de_ligacao3.position.set(ligacaoX3, ligacaoY3, ligacaoZ3);
    scene.add(elemento_de_ligacao3);
}