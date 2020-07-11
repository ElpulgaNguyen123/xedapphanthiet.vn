const searchlist = document.querySelector(".js-searchlist");
const searchlistItems = document.querySelector(".js-searchlist-item-wrapper");
const searchbox = document.querySelector(".js-searchbox");
const input = document.querySelector(".js-input");
const icon = document.querySelector(".js-searchbox-icon");

// Handle clear searchlist [ERROR]
// const clearSearchlist = document.querySelector("js-searchlist-header-clear");
// clearSearchlist.onclick = clearInnerHtml(".clearSearchlist");

input.onfocus = showSearchlist;
window.onclick = closeSearchlist; //[REVISAR: meterlo en un if searchlist active]

// Show search list
function showSearchlist() {
    searchlist.classList.add("searchlistVisible");
    searchbox.classList.add("searchbox-searchlistVisible");
}

// Close search list (click outside searchlist and searchbox)
function closeSearchlist(e) {
    if (!searchlist.contains(e.target) && !searchbox.contains(e.target)) {
        searchlist.classList.remove("searchlistVisible");
        searchbox.classList.remove("searchbox-searchlistVisible");
    }
}

// Clear innder HTML
function clearInnerHtml(query) {
    const element = document.querySelector(query);
    element.innerHTML = null;
}

// Recent users list
let users = [
    { name: "Lito Ming", user: "@LM2342314" },
    { name: "Dr Mühlberger", user: "@DR2342314" },
    { name: "Ana María Casanova", user: "@MC2342314" },
    { name: "Sofovich", user: "@Gerardo2342314" },
    { name: "Jorge Porcel Jr.", user: "@JpJ2342314" }
];

users.map(function (e) {
    searchlistItems.innerHTML = searchlistItems.innerHTML.concat(`
       <div class="searchlist-item">
          <div class="searchlist-item-pic">
            <img class="searchlist-item-pic-img" src="https://merriam-webster.com/assets/mw/images/article/art-wap-article-main/egg-3442-e1f6463624338504cd021bf23aef8441@1x.jpg">
          </div>
          <div class="searchlist-item-info">
            <div class="searchlist-item-info-name">${e.name}</div>
            <div class="searchlist-item-info-user">${e.user}</div>
          </div>
          <div class="searchlist-item-clear"><i class="fas fa-times"></i></div>
        </div>
  `);
});

// Filter search list
// function handleInput() {
//   const searchInput = document.querySelector(".js-input");
//   const searchlist = document.querySelector(".searchlist-item-wrapper");

//   const userElements = document.querySelectorAll(".searchlist-item-info-user");
//   let users = Array.from(userElements);

//   const nameElements = document.querySelectorAll(".searchlist-item-info-name");
//   let names = Array.from(nameElements);

//   users = users.map((i) => i.textContent);
//   names = names.map((i) => i.textContent);
//   const dict = Object.fromEntries(users.map((_, i) => [users[i], names[i]]));

//   let results = Object.keys(dict).filter((item) => {
//     if (
//       item.toLowerCase().includes(searchInput.value.toLowerCase()) ||
//       dict[item].toLowerCase().includes(searchInput.value.toLowerCase())
//     ) {
//       return true;
//     }
//   });
//   searchlist.innerHTML = "";
//   results.map((element) => {
//     searchlist.innerHTML = searchlist.innerHTML.concat(`
//        <div class="searchlist-item">
//           <div class="searchlist-item-pic">
//             <img class="searchlist-item-pic-img" src="https://merriam-webster.com/assets/mw/images/article/art-wap-article-main/egg-3442-e1f6463624338504cd021bf23aef8441@1x.jpg">
//           </div>
//           <div class="searchlist-item-info">
//             <div class="searchlist-item-info-name">${dict[element]}</div>
//             <div class="searchlist-item-info-user">${element}</div>
//           </div>
//           <div class="searchlist-item-clear"><i class="fas fa-times"></i></div>
//         </div>
// `);
//   });
// }

// tener un dict de items inicial y hacer el element.includes(search) sobre ese objeto, si lo hago sobre lo que traigo del html nunca recupero los que se van.