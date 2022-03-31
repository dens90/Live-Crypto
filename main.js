
let tableBody = document.getElementById("tab-body");

fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=20&page=1&sparkline=false", {cache: "no-cache"})
  .then((response) => response.json())
  .then((data) => {
    this.criptoInfo = data;
    return this.criptoInfo;
  })
  .then((coinMap) => {
    let cripto = coinMap.map((coin) => {
      let tr = document.createElement("tr");
      tableBody.appendChild(tr);
      tr.innerHTML = `<td>
        <div class="name-value coin-container">
            <img class="coin-image" src="${coin.image}">
            <p class="coin-name">${coin.name}</p>
            <p class="coin-abbrName">${coin.symbol}</p>
        </div>
    </td>
    <td><p class="price coin-name">${coin.current_price} €</p></td>
    <td><p class="value-item coin-name">${coin.ath_change_percentage} %</p></td>
    <td><p class="value-item coin-name">${coin.high_24h} €</p></td>
    <td><p class="value-item coin-name">${coin.market_cap} €</p></td>
    <td><p class="value-item coin-name">${coin.total_supply} €</p></td>
    `;
    });
  });
