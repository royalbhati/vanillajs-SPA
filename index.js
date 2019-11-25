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
