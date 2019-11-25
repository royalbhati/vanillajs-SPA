import List from "./views/pages/List.js";
import Info from "./views/pages/display.js";
import Sidebar from "./views/components/Sidebar.js";
import NavBar from "./views/components/NavBar.js";
import ErrorPage from "./views/pages/error.js";
import Utils from "./Utils/Utils.js";

const gei = id => {
  return document.getElementById(id);
};

const routes = {
  "/": List,
  "/:id": Info,
  "/:page/:id": Info,
  "/ibx": List,
  "/spam": List,
  "/trash": List
};

const getData = async () => {
  return await (await fetch("res.json")).json();
};

const storeLocally = async () => {
  const data = await getData();
  let spam = [];
  let ibx = [];
  data.map(el => {
    if (el.label && el.label === "spam") {
      spam.push(el);
    } else {
      ibx.push(el);
    }
  });
  localStorage.setItem("spam", JSON.stringify(spam));
  localStorage.setItem("ibx", JSON.stringify(ibx));
};
const router = async () => {
  const content = gei("content");
  let req = Utils.parseRequestedURL();
  let parsedUrl =
    (req.resource ? "/" + req.resource : "/") +
    (req.id ? "/:id" : "") +
    (req.verb ? "/verb" : "");
  let page = routes[parsedUrl] ? routes[parsedUrl] : ErrorPage;
  content.innerHTML = await page.render(parsedUrl);
  await page.after_render();
};

const onLoadOnly = () => {
  const Side = gei("sidebar");
  const Nav = gei("header");
  Side.innerHTML = Sidebar.render();
  Sidebar.after_render();
  Nav.innerHTML = NavBar.render();
  NavBar.after_render();
};

window.addEventListener("load", router);
window.addEventListener("load", onLoadOnly);
window.addEventListener("load", storeLocally);
window.addEventListener("hashchange", router);

// const gei = id => {
//   return document.getElementById(id);
// };

// const qsa = val => {
//   return document.querySelectorAll(val);
// };

// const clsContains = (el, cls) => {
//   return el.classList.contains(cls);
// };
// const selection = gei("sidebar-btn");
// const content = gei("content");

// const showEmpty = () => {
//   content.innerHTML = `
//     <div>
//     No data Found
//     </div>

//     `;
// };
// const showData = () => {
//   const data = JSON.parse(localStorage.getItem("ibx"));
//   console.log("data", data);
//   data.forEach(el => {
//     const card = document.createElement("div");
//     card.classList.add("card");
//     card.innerHTML = `
//         <div class="name">${el.from}</div>
//           <div class="body">${el.body}</div>
//           <div class="time">${el.time}</div>
//         `;
//     content.appendChild(card);
//   });
//   selection.addEventListener("click", e => {
//     const val = e.target.getAttribute("value");
//     if (val === "spam") {
//       const data = JSON.parse(localStorage.getItem("spam"));
//       if (!data) showEmpty();
//       content.innerHTML = "";
//       console.log("content", content);
//       data.forEach(el => {
//         const card = document.createElement("div");
//         card.classList.add("card");
//         card.innerHTML = `
//         <div class="name">${el.from}</div>
//           <div class="body">${el.body}</div>
//           <div class="time">${el.time}</div>
//            <div style='color:red' class="icons ptr">&#10005;
//           </div>
//         `;
//         content.appendChild(card);
//       });
//     } else if (val === "ibx") {
//       content.innerHTML = "";
//       const data = JSON.parse(localStorage.getItem("ibx"));
//       if (!data) showEmpty();
//       data.forEach(el => {
//         const card = document.createElement("div");
//         card.classList.add("card");
//         card.innerHTML = `
//         <div class="name">${el.from}</div>
//           <div class="body">${el.body}</div>
//           <div class="time">${el.time}</div>
//         `;
//         content.appendChild(card);
//       });
//     } else {
//       const data = localStorage.getItem("trash");
//       if (!data) showEmpty();
//     }
//   });
// };

// const storeLocally = (spam, ibx) => {
//   localStorage.setItem("spam", JSON.stringify(spam));
//   localStorage.setItem("ibx", JSON.stringify(ibx));
//   showData();
// };
// fetch("res.json")
//   .then(response => response.json())
//   .then(json => {
//     let spam = [];
//     let ibx = [];
//     json.map(el => {
//       if (el.label && el.label === "spam") {
//         spam.push(el);
//       } else {
//         ibx.push(el);
//       }
//     });
//     storeLocally(spam, ibx);
//   });
