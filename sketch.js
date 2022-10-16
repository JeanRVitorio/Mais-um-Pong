// variáveis da bolinha
let xBolinha = 250;
let yBolinha = 200;
let dBolinha = 15;
let raio = dBolinha / 2;

// variáveis de velocidade
let velocXbolinha = 7;
let velocYbolinha = 7;

// variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let compRaquete = 10;
let altRaquete = 100;

// variáveis da raquete oponente

let xRaqueteOponente = 485;
let yRaqueteOponente = 150;
let velocXOponente;
let velocYOponente;

let colidiu = false;

// variável para oponente errar

let chanceDeErrar = 0;

// placar

let meusPontos = 0;
let pontosOponente = 0;

// sons

let raquetada;
let ponto;
let trilha;

function preload() {
    trilha = loadSound("trilha.mp3");
    ponto = loadSound("ponto.mp3");
    raquetada = loadSound("raquetada.mp3");
}

function setup() {
    createCanvas(500, 400);
    trilha.loop();
}

function draw() {
    background(0);
    mostraBolinha();
    movimentaBolinha();
    verificacaoBorda();
    mostraRaquete(xRaquete, yRaquete);
    movimRaquete();
    verificColisaoRaquete();
    mostraRaquete(xRaqueteOponente, yRaqueteOponente);
    movimRaqueteOponente();
    calculaChanceDeErrar();
    verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
    incluiPlacar();
    marcaPonto();
    bolinhaNaoFicaPresa();
}

function mostraBolinha() {
    circle(xBolinha, yBolinha, dBolinha);
}

function movimentaBolinha() {
    xBolinha += velocXbolinha;
    yBolinha += velocYbolinha;
}

function verificacaoBorda() {
    if (xBolinha + raio > width || xBolinha - raio < 0) {
        velocXbolinha *= -1;
    }

    if (yBolinha + raio > height || yBolinha - raio < 0) {
        velocYbolinha *= -1;
    }
    }

function mostraRaquete(x, y) {
    rect(x, y, compRaquete, altRaquete);
}

function movimRaquete() {
    if (keyIsDown(UP_ARROW)) {
        yRaquete -= 10;
    }
    if (keyIsDown(DOWN_ARROW)) {
        yRaquete += 10;
    }
}

function verificColisaoRaquete() {
    if (xBolinha - raio < xRaquete + compRaquete &&
        yBolinha - raio < yRaquete + altRaquete &&
        yBolinha + raio > yRaquete){
        velocXbolinha *= -1;
        raquetada.play();
    }
}

/*function movimRaqueteOponente(){
  if (keyIsDown(87)){
    yRaqueteOponente -= 10;
  }
  if (keyIsDown(83)){
    yRaqueteOponente += 10;
  }
}*/

function movimRaqueteOponente() {
    velocYOponente = yBolinha - yRaqueteOponente - compRaquete / 2 - 30;
    yRaqueteOponente += velocYOponente + chanceDeErrar;
    calculaChanceDeErrar();
}

function calculaChanceDeErrar() {
    if (pontosOponente >= meusPontos) {
        chanceDeErrar += 1;
        if (chanceDeErrar >= 39) {
        chanceDeErrar = 40;
        }
    } else {
        chanceDeErrar -= 1;
        if (chanceDeErrar <= 35) {
        chanceDeErrar = 35;
        }
    }
}
/*function movimRaqueteOponente(){
  velocYOponente = yBolinha - yRaqueteOponente - compRaquete / 2 + 5;
  yRaqueteOponente += velocYOponente
}*/

function verificaColisaoRaquete(x, y) {
    colidiu = collideRectCircle(x, y, compRaquete, altRaquete, xBolinha, yBolinha, raio);
    if (colidiu) {
        velocXbolinha *= -1;
        raquetada.play();
    }
}

function incluiPlacar() {
    stroke(255);
    textAlign(CENTER);
    textSize(16);
    fill(color(255, 140, 0));
    rect(150, 10, 40, 20);
    fill(255);
    text(meusPontos, 170, 26);
    fill(color(255, 140, 0));
    rect(350, 10, 40, 20);
    fill(255);
    text(pontosOponente, 370, 26);
}

function marcaPonto() {
    if (xBolinha > 490) {
        meusPontos += 1;
        ponto.play();
    }
    if (xBolinha < 10) {
        pontosOponente += 1;
        ponto.play();
    }
}

function bolinhaNaoFicaPresa() {
    if (xBolinha + raio < 0) {
        console.log("bolinha ficou presa");
        xBolinha = 300;
    }
}
