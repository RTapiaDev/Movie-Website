const left_btn = document.getElementsByClassName("bi-chevron-left")[0];
const right_btn = document.getElementsByClassName("bi-chevron-right")[0];
const cards = document.getElementsByClassName("cards")[0];

left_btn.addEventListener("click", () => {
  cards.scrollLeft -= 140;
});
right_btn.addEventListener("click", () => {
  cards.scrollLeft += 140;
});

const json_url = "movie.json";

fetch(json_url)
  .then((Response) => Response.json())
  .then((data) => {
    data.forEach((ele, i) => {
      let { name, imdb, date, sposter, bposter, genre, url } = ele;
      let card = document.createElement("a");
      card.classList.add("card");
      card.href = url;
      card.innerHTML = `
        <img src="${sposter}" alt="${name}" class="poster">
            <div class="rest-card">
              <img src="${bposter}" alt="">
              <div class="cont">
                <h4>${name}</h4>
                <div class="sub">
                  <p>${genre}, ${date}</p>
                  <h3><span>IMDB</span><i class="bi bi-star-fill"></i> ${imdb}</h3>
                </div>
              </div>
            </div>
        `;
      cards.appendChild(card);
    });
    document.getElementById("title").innerText = data[0].name;
    document.getElementById("gen").innerText = data[0].genre;
  });
