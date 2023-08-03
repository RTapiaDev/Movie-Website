const left_btn = document.getElementsByClassName("bi-chevron-left")[0];
const right_btn = document.getElementsByClassName("bi-chevron-right")[0];
const cards = document.getElementsByClassName("cards")[0];
const search = document.getElementsByClassName("search")[0];
const search_input = document.getElementById("search_input");

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
    document.getElementById("date").innerText = data[0].date;
    document.getElementById(
      "rate"
    ).innerHTML = `<i class="bi bi-star-fill"></i> ${data[0].imdb}`;

    // search data load
    data.forEach((element) => {
      let { name, imdb, date, sposter, genre, url } = element;
      let card = document.createElement("a");
      card.classList.add("card");
      card.href = url;
      card.innerHTML = `
      <img src="${sposter}" alt="">
      <div class="cont">
          <h3>${name}</h3>
          <p>${genre}, ${date}, <span>IMDB</span><i class="bi bi-star-fill"></i> ${imdb}</p>
      </div>
        `;
      search.appendChild(card);
    });

    // search filter
    search_input.addEventListener("keyup", () => {
      let filter = search_input.value.toUpperCase();
      let a = search.getElementsByTagName("a");
      for (let i = 0; i < a.length; i++) {
        let b = a[i].getElementsByClassName("cont")[0];
        // console.log(a.textContent);
        let textValue = b.textContent || b.innerText;
        if (textValue.toUpperCase().indexOf(filter) > -1) {
          a[i].style.display = "flex";
          search.style.visibility = "visible";
          search.style.opacity = "1";
        } else {
          a[i].style.display = "none";
        }
        if (search_input.value == 0) {
          search.style.visibility = "hidden";
          search.style.opacity = "0";
        }
      }
    });

    let video = document.getElementsByTagName("video")[0];
    let play = document.getElementById("play");

    play.addEventListener("click", () => {
      if (video.paused) {
        video.play();
        play.innerHTML = `Pausa <i class="bi bi-pause-fill"></i>`;
      } else {
        play.innerHTML = `Ver <i class="bi bi-play-fill"></i>`;
        video.pause();
      }
    });

    let series = document.getElementById("series");
    let películas = document.getElementById("películas");

    series.addEventListener("click", () => {
      cards.innerHTML = "";

      let series_array = data.filter((ele) => {
        return ele.type === "series";
      });
      series_array.forEach((ele, i) => {
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
    });

    películas.addEventListener("click", () => {
      cards.innerHTML = "";

      let películas_array = data.filter((ele) => {
        return ele.type === "Película";
      });
      películas_array.forEach((ele, i) => {
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
    });
  });
