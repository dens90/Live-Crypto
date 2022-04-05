async function getData() {
  try {
    const data = await fetch("https://dennis-marco.herokuapp.com/news");
    const result = await data.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}
getData().then((result) => {
  const valueObj = result.map((obj) => {
    const container = document.getElementById("container");
    let card = document.createElement("div");

    card.classList.add("card");
    card.innerHTML = `
    
        <div id="img-card" class="image-card"> 
            <img src="${obj.image}" alt="img">
       </div>
        <div id="title" class="title">
          <h1> ${obj.title}</h1>
        </div>
       <article id="article">
       <p> ${obj.article}
       </article>
        `;
    container.appendChild(card);
    console.log(container);
  });
});

let btn = document.getElementById("btn");
