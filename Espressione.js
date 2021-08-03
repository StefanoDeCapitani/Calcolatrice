class Espressione {
  constructor(espressione) {
    this.infissa = JSON.parse(JSON.stringify(espressione));
    this.stack = [];
    this.postfissa = [];
  }

  generaPostfissa = function() {
    if (Espressione.isEquilibrata(this.infissa)) {
      var infissa = JSON.parse(JSON.stringify(this.infissa));
      var espressione = infissa.split("");
      while (espressione[0] !== "=" && espressione.length > 0) {
        if (Espressione.isNumero(espressione[0])) {
          espressione = this.gestisciNumero(espressione);
        }
        if (espressione.length > 0 && Espressione.isOperatore(espressione[0])) {
          espressione = this.gestisciOperatore(espressione);
        }
      }
      while (this.stack.length > 0) {
        this.postfissa.push(this.stack.splice(this.stack.length - 1, 1).join());
      }
    } else {
      this.postfissa = undefined;
    }
  }

  gestisciNumero = function(espressioneConNumeroIniziale) {
    let espressione = espressioneConNumeroIniziale;
    let numero = "";
    while (espressione.length > 0 && Espressione.isNumero(espressione[0])) {
      numero += espressione.splice(0, 1);
    }
    this.postfissa.push(parseFloat(numero));
    return espressione;
  }

  gestisciOperatore = function(espressioneConOperatoreIniziale) {
    let espressione = espressioneConOperatoreIniziale;
    while (espressione.length > 0 && Espressione.isOperatore(espressione[0])) {
      if (espressione.length > 0 && Espressione.isOperatore(espressione[0])) {
        espressione = this.gestisciParentesiChiusa(espressione);
      }
      if (espressione.length > 0 && Espressione.isOperatore(espressione[0])) {
        espressione = this.gestisciParentesiAperta(espressione);
      }
      if (espressione.length > 0 && Espressione.isOperatore(espressione[0])) {
        espressione = this.gestisciOperatoreConPrecedenza(espressione);
      }
      if (espressione.length > 0 && Espressione.isOperatore(espressione[0])) {
        espressione = this.gestisciOperatoreSenzaPrecedenza(espressione);
      }
      if (this.stack.length === 0 && espressione.length > 0 && Espressione.isOperatore(espressione[0])) {
        this.stack.push(espressione.splice(0, 1).join());
      }
    }
    return espressione;
  }

  gestisciOperatoreSenzaPrecedenza = function(espressioneInfissa) {
    let espressione = espressioneInfissa;
    if (this.stack.length > 0 && !Espressione.haPrecedenza(espressione[0], this.ultimoInStack())) {
      if (!Espressione.isParentesiAperta(espressione[0])) {
        while (this.stack.length > 0 && !Espressione.haPrecedenza(espressione[0], this.ultimoInStack())) {
          this.postfissa.push(this.stack.splice(this.stack.length - 1, 1).join());
        }
        this.stack.push(espressione.splice(0, 1).join());
      }
    }
    return espressione;
  }

  gestisciOperatoreConPrecedenza = function(espressioneInfissa) {
    let espressione = espressioneInfissa;
    if (this.stack.length > 0 && Espressione.haPrecedenza(espressione[0], this.ultimoInStack())) {
      this.stack.push(espressione.splice(0, 1).join());
    }
    return espressione;
  }

  gestisciParentesiChiusa = function(espressioneInfissa) {
    let espressione = espressioneInfissa;
    while (espressione.length > 0 && Espressione.isParentesiChiusa(espressione[0])) {
      while (this.stack.length > 0 && !Espressione.isParentesiAperta(this.ultimoInStack())) {
        this.postfissa.push(this.stack.splice(this.stack.length - 1, 1).join());
      }
      this.stack.splice(this.stack.length - 1, 1);
      espressione.splice(0, 1);
    }
    return espressione;
  }

  gestisciParentesiAperta = function(espressioneInfissa) {
    let espressione = espressioneInfissa;
    if (Espressione.isParentesiAperta(espressione[0])) {
      this.stack.push(espressione.splice(0, 1).join());
    }
    return espressione;
  }

  static haPrecedenza = function(operatore, operatoreDiConfronto) {
    return Espressione.gradoDiPrecedenza(operatore) > Espressione.gradoDiPrecedenza(operatoreDiConfronto);
  }

  static gradoDiPrecedenza = function(operatore) {
    let grado;
    if (operatore === "^") {
      grado = 3;
    }
    if (operatore === "*" || operatore === "/") {
      grado = 2;
    }
    if (operatore === "+" || operatore === "-") {
      grado = 1;
    }
    if (operatore === "(" || !operatore) {
      grado = 0;
    }
    return grado;
  }

  static isEquilibrata(espressione) {
    let isEquilibrata;
    if (espressione.match(/[(]/g)) {
      if ((espressione.match(/[)]/g))) {
        if (espressione.match(/[(]/g).length === espressione.match(/[)]/g).length) {
          isEquilibrata = true;
        } else {
          if (espressione.match(/[(]/g).length !== espressione.match(/[)]/g).length) {
            isEquilibrata = false
          }
        }
      } else {
        isEquilibrata = false;
      }
    } else {
      if ((espressione.match(/[)]/g))) {
        isEquilibrata = false;
      } else {
        isEquilibrata = true;
      }
    }
    return isEquilibrata;
  }

  static isNumero = function(carattere) {
    return carattere.match(/[\d.]/);
  }

  static isOperatore = function(carattere) {
    return carattere.match(/[\^*/+\-()]/);
  }

  static isParentesiAperta = function(carattere) {
    return carattere.match(/[(]/);
  }

  static isParentesiChiusa = function(carattere) {
    return carattere.match(/[)]/);
  }

  ultimoInStack = function() {
    return this.stack[this.stack.length - 1];
  }
}
