class Display {
  constructor() {
    this.containerDisplay = document.querySelector("#display");
    this.riquadroEspressione = document.querySelector("#espressione");
    this.riquadroRisultato = document.querySelector("#risultato");
  }

  mostraEspressione = function(espressioneDaMostrare) {
    var espressione = espressioneDaMostrare.replace(/[/]/g, "÷");
    espressione = espressione.replace(/[*]/g, "x");
    this.riquadroEspressione.innerHTML = espressione;
    this.sistemaFontSize(this.riquadroEspressione);
  }

  mostraRisultato = function(risultato) {
    if (risultato === "parentesi mancanti") {
      this.riquadroRisultato.innerHTML = risultato;
      this.sistemaFontSize(this.riquadroRisultato);
    } else {
      if (isNaN(risultato)) {
        this.riquadroRisultato.innerHTML = "error";
      } else {
        this.riquadroRisultato.innerHTML = risultato;
        this.sistemaFontSize(this.riquadroRisultato);
      }
    }
  }

  sistemaFontSize = function(elemento) {
    var displayPadding = window.getComputedStyle(this.containerDisplay).getPropertyValue("padding");
    displayPadding = displayPadding.replace("px", "");
    var containerWidth = this.containerDisplay.offsetWidth - (displayPadding * 2);
    var fontSizeCorretto;
    if (elemento.getAttribute("id") === "espressione") {
      fontSizeCorretto = 3;
    }
    if (elemento.getAttribute("id") === "risultato") {
      fontSizeCorretto = 6;
    }
    elemento.style.fontSize = `${fontSizeCorretto}rem`;
    while (elemento.offsetWidth > containerWidth) {
      fontSizeCorretto -= 0.1;
      elemento.style.fontSize = `${fontSizeCorretto}rem`;
    }
  }
}
