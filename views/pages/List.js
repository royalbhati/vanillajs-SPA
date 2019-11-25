let ListDisplay = {
  render: async url => {
    const val = url.split("/")[1];
    let data;
    if (val === "spam") {
      data = JSON.parse(localStorage.getItem("spam"));
    } else if (val === "ibx") {
      data = JSON.parse(localStorage.getItem("ibx"));
    } else if (val === "trash") {
      data = [];
    } else {
      return (window.location =
        window.location.origin + "/Email/index.html#/ibx");
    }
    return data.length > 0
      ? data.map(el => {
          return `<div class="card ptr">
            <div class="name">${el.from}</div>
            <div class="body">${el.body}</div>
            <div class="time">${el.time}</div>
            <div style='color:red' class="icons ptr">&#10005;</div>
        </div>
`;
        })
      : ` <div style="margin:100px">No Data Found</div>`;
  },
  after_render: () => {},
  umount: () => {}
};

export default ListDisplay;
