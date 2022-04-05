// stabiliamo che la pagina iniziale sarà la pagina 1
let pageIndex = 1

let tableBody = document.getElementById("tab-body");
let loader = document.getElementById('loading')

// creiamo una funzione per richiamare l'animazione di caricamento
function loadingIndicator() {
  loader.classList.add('display')
  setTimeout(() => {
    loader.classList.remove('display')
  }, 4000)
}

// creiamo una funzione per nascondere l'icona di caricamento
function hideLoadingIndicator() {
  loader.classList.remove('display')
}

// ad ogni click del bottone, incrementiamo il valore della variabile pageIndex di 1
const loadMoreButton = document.getElementById("load-more");
loadMoreButton.addEventListener("click", () => {
  fetchData(pageIndex++)
});

function fetchData(pageIndexValue = 1) {
  // prima di fare il fetch chiamiamo l'animazione di caricamento
  loadingIndicator()
  // nel fetch la pagina sarà dinamicamente aggiornata tramite la variabile pageIndexValue
  fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=20&page=${pageIndexValue}&sparkline=false`, {
    cache: "no-cache"
  })
    .then((response) => response.json())
    .then((data) => {
      this.criptoInfo = data;
      return this.criptoInfo;
    })
    .then((coinMap) => {
      let cripto = coinMap.map((coin) => {
        // ora abbiamo ricevuto i dati, quindi possiamo nascondere di nuovo il caricamento
        hideLoadingIndicator()

        // se il dato è null lo trasformiamo in un testo più leggibile
        let getTotalSupply = coin.total_supply;
        let totSupply = getTotalSupply ? getTotalSupply + ' €' : "Non Definito"

        let tr = document.createElement("tr");
        tableBody.appendChild(tr);
        tr.innerHTML = `<td>
        <div class="name-value coin-container">
            <img class="coin-image" src="${coin.image}">
            <p class="coin-name">${coin.name}</p>
            <p class="coin-abbrName">${coin.symbol}</p>
        </div>
    </td>
    <td><p class="price coin-name"><b>${coin.current_price} €</b></p></td>
    <td><p class="value-item coin-name">${coin.ath_change_percentage} %</p></td>
    <td><p class="value-item coin-name">${coin.high_24h} €</p></td>
    <td><p class="value-item coin-name">${coin.market_cap} €</p></td>
    <td><p class="value-item coin-name">${totSupply}</p></td>
    `;
      });
    });
}

fetchData(pageIndex++)



