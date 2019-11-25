const gei = id => {
  return document.getElementById(id);
};

const clsContains = (el, cls) => {
  return el.classList.contains(cls);
};

const VALID_TABS = ["ibx", "spam", "trash"];
const getSiblings = el => {
  let siblings = [];
  let curr = el.parentNode.firstChild.nextSibling;
  while (curr) {
    if (curr.nodeType == 1 && curr !== el) {
      siblings.push(curr);
    }
    curr = curr.nextSibling;
  }
  return siblings;
};
const applySelected = (el, siblings) => {
  el.classList.add("selected");
  if (siblings) {
    for (let x of siblings) {
      if (clsContains(x, "selected")) {
        x.classList.remove("selected");
      }
    }
  }
};
const SideBar = {
  render: () => {
    return `<div class="compose ptr">Compose</div>
        <hr />
        <div id="sidebar-btn">
          <div value="ibx" id="inbox" class="ptr   ">Inbox</div>
          <div value="spam" class="ptr">Spam</div>
          <div value="trash" class="ptr">Trash</div>
        </div>`;
  },
  after_render: () => {
    const selection = gei("sidebar-btn");
    const defaultChoice = gei("inbox");
    applySelected(defaultChoice);
    selection.addEventListener("click", e => {
      const val = e.target.getAttribute("value");
      const selectedElem = e.target;
      const siblings = getSiblings(selectedElem);
      if (VALID_TABS.indexOf(val) !== -1) applySelected(selectedElem, siblings);
      window.location = window.location.origin + "/Email/index.html#/" + val;
    });
    return;
  },
  unmount: () => {
    selection.removeEventListener("click");
  }
};

export default SideBar;
