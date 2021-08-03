class Pulsantiera {
  constructor() {
    this.pulsantiera = document.querySelector("#tastiera");
    this.attivaPulsantiera();
  }

  attivaPulsantiera = () => {
    this.pulsantiera.addEventListener("click", this.impostaPulsanti);
  }

  impostaPulsanti = (e) => {
    if (e.target !== e.currentTarget) {
      var valorePulsante = e.target.value;
      if (valorePulsante !== "=" && valorePulsante !== "CE" && valorePulsante !== "(" && valorePulsante !== ")") {
        memoria.aggiornaMemoriaEdEspressioneAttuale(valorePulsante);
        display.mostraEspressione(memoria.espressioneAttuale.infissa);
      } else {
        if (valorePulsante === "(" && isNaN(memoria.espressioneAttuale.infissa[memoria.espressioneAttuale.infissa.length - 1])) {
          memoria.aggiornaMemoriaEdEspressioneAttuale(valorePulsante);
          display.mostraEspressione(memoria.espressioneAttuale.infissa);
        }
        if (valorePulsante === ")" && Espressione.isNumero(memoria.espressioneAttuale.infissa[memoria.espressioneAttuale.infissa.length - 1])) {
          memoria.aggiornaMemoriaEdEspressioneAttuale(valorePulsante);
          display.mostraEspressione(memoria.espressioneAttuale.infissa);
        }
        if (valorePulsante === "CE") {
          memoria.ricavaMemoriaPrecedente();
          display.mostraEspressione(memoria.espressioneAttuale.infissa);
          display.mostraRisultato("");
        }
        if (valorePulsante === "=") {
          memoria.aggiornaMemoriaEdEspressioneAttuale(valorePulsante);
          memoria.espressioneAttuale.generaPostfissa();
          calcolatrice.calcola(memoria.espressioneAttuale.postfissa);
          display.mostraEspressione(memoria.espressioneAttuale.infissa);
          display.mostraRisultato(calcolatrice.risultato);
          this.pulsantiera.removeEventListener("click", this.impostaPulsanti);
          var cancellaUltimo = document.querySelector(".cancella_ultimo");
          cancellaUltimo.addEventListener("click", this.attivaPulsantiera);
        }
      }
    }
    e.stopPropagation();
  };
}
