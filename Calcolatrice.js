class Calcolatrice {
  constructor() {
    this.stack = [];
    this.risultato;
  }

  calcola = function(espressioneDaCalcolare) {
    try {
      let espressione = JSON.parse(JSON.stringify(espressioneDaCalcolare));
      let risultato = "";
      while (espressione.length > 0) {
        while (espressione.length > 0 && Espressione.isNumero(espressione[0].toString())) {
            this.stack.push(espressione.splice(0, 1).join());
        }
        while (espressione.length > 0 && this.stack.length > 0 && Espressione.isOperatore(espressione[0].toString())) {
          this.effettuaOperazione(espressione.splice(0, 1).join());
        }
      }
      risultato = this.stack.splice(0, 1).join();
      this.risultato = risultato;
      return risultato;
    } catch {
      console.error("parentesi mancanti");
      this.risultato = "parentesi mancanti";
    }
  }

  effettuaOperazione = function(operatore) {
    let risultato;
    let operandoB = parseFloat(this.stack.splice(this.stack.length - 1, 1));
    let operandoA = parseFloat(this.stack.splice(this.stack.length - 1, 1));
    if (operatore === "^") {
      risultato = 1;
      for (let i = 0; i < operandoB; i++) {
        risultato *= operandoA;
      }
    }
    if (operatore === "*") {
      risultato = operandoA * operandoB;
    }
    if (operatore === "/") {
      risultato = operandoA / operandoB;
    }
    if (operatore === "+") {
      risultato = operandoA + operandoB;
    }
    if (operatore === "-") {
      risultato = operandoA - operandoB;
    }
    this.stack.push(risultato);
  }
}
