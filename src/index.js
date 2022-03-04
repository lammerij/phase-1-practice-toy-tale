let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  getData();
  // postData();
  patchLikes();
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function getData() {
  fetch("http://localhost:3000/toys")
    .then((res) => res.json())
    .then((data) => renderToys(data));
}

function postData() {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: "Jessie",
      image:
        "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
      likes: 0,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function patchLikes() {
  fetch("http://localhost:3000/toys", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      likes: newNumberOfLikes,
    }),
  });
}

function renderToys(arrayOfToys) {
  const collection = document.getElementById("toy-collection");
  // console.log(collection);
  arrayOfToys.forEach((toy) => {
    console.log(toy);
    const item = document.createElement("div");
    // console.log(item);
    item.className = "card";
    collection.appendChild(item);
    const header = document.createElement("h2");
    header.innerHTML = toy.name;
    // console.log(toy.name);
    item.appendChild(header);
    const image = document.createElement("img");
    // console.log(image);
    image.className = "toy-avatar";
    image.src = toy.image;
    // console.log(image.src);
    item.appendChild(image);
    const like = document.createElement("p");
    console.log(like);
    like.innerHTML = toy.likes;
    item.appendChild(like);
    const button = document.createElement("button");
    button.className = "like-btn";
    button.innerText = "Like";
    button.setAttribute("id", toy.id);
    item.appendChild(button);
  });
}
