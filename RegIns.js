class RegIns {

  static puoEssereAggiunto = function(carattere) {
    if (carattere !== "=" &&
      carattere !== "CE") {
      if (RegIns.getEspressioneAttualeInfissa() === "") {
        if (RegIns.isMenoParentesiApertaNumero(carattere)) {
          return true;
        }
      } else {
        if (!RegIns.isParentesiOPunto(carattere)) {
          if (RegIns.puoEssereAggiuntoOperatoreNumero(carattere)) {
            return true;
          }
        }
        if (carattere === ")" &&
          Espressione.isNumero(RegIns.getUltimoCarattereEspressioneAttuale()) &&
          RegIns.getUltimoCarattereEspressioneAttuale() !== ".") {
          return true;
        }
        if (carattere === "(" && !Espressione.isNumero(RegIns.getUltimoCarattereEspressioneAttuale())) {
          return true;
        }
        if (carattere === ".") {
          if (RegIns.puoEssereAggiuntoPunto()) {
            return true;
          }
        }
      }
    } else {
      return false;
    }
  }

  static getUltimoCarattereEspressioneAttuale = function() {
    return memoria.espressioneAttuale.infissa[memoria.espressioneAttuale.infissa.length - 1];
  }

  static getEspressioneAttualeInfissa = function() {
    return memoria.espressioneAttuale.infissa;
  }

  static puoEssereAggiuntoOperatoreNumero = function(carattere) {
    if (RegIns.isNumero(carattere)) {
      return true;
    } else {
      if (!RegIns.isOperatore(RegIns.getUltimoCarattereEspressioneAttuale())) {
        return true
      }
    }
    return false;
  }

  static isNumero = function(carattere) {
    return carattere.match(/[\d]+/g);
  }

  static isOperatore = function(carattere) {
    return carattere.match(/[\^*/+\-]/g);
  }

  static puoEssereAggiuntoPunto = function() {
    espressione = RegIns.getEspressioneAttualeInfissa();
    if (RegIns.ultimoIndiceOperatore(espressione) > RegIns.ultimoIndicePunto(espressione)) {
      return true;
    }
  }

  static isParentesiOPunto = function(carattere) {
    if (carattere === ")" || carattere === "(" || carattere === ".") {
      return true;
    } else {
      return false;
    }
  }

  static isMenoParentesiApertaNumero = function(carattere) {
    if (carattere !== "." &&
      carattere !== ")" &&
      carattere !== "+" &&
      carattere !== "^" &&
      carattere !== "*" &&
      carattere !== "/") {
      return true;
    } else {
      return false;
    }
  }

  static ultimoIndiceOperatore = function(espressione) {
    var occorrenze = espressione.match(/[+\-*/^()]/g);
    var operatore;
    var ultimoIndice;
    if (occorrenze) {
      operatore = occorrenze[occorrenze.length - 1];
      ultimoIndice = espressione.lastIndexOf(operatore);
    } else {
      ultimoIndice = 1;
    }
    return ultimoIndice;
  }

  static ultimoIndicePunto = function(espressione) {
    var occorrenze = espressione.match(/[.]/g);
    var ultimoIndice;
    if (occorrenze) {
      ultimoIndice = espressione.lastIndexOf(".");
    } else {
      ultimoIndice = 0;
    }
    return ultimoIndice;
  }

}
