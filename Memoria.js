class Memoria {
  constructor(primaEspressioneAttuale) {
    this.espressioneAttuale = JSON.parse(JSON.stringify(primaEspressioneAttuale));
    this.stackMemorie = [];
  }

  aggiornaMemoriaEdEspressioneAttuale = function(nuovoCarattere) {
    this.stackMemorie.push(this.espressioneAttuale);
    let nuovaEspressioneInfissa = this.espressioneAttuale.infissa + nuovoCarattere
    this.espressioneAttuale = new Espressione(nuovaEspressioneInfissa);
    }

  ricavaMemoriaPrecedente = function() {
    if (this.stackMemorie.length > 0) {
      this.espressioneAttuale = this.stackMemorie.pop();
    }
  }

}
