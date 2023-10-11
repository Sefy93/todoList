const thema = document.querySelector("#theme");
const bgLight = document.querySelector(".bg-light");
const bgDark = document.querySelector(".bg-dark");
const body = document.querySelector("body");
const clear = document.querySelector("#clear");

/* --------------------mudar o tema----------------- */
thema.addEventListener("change", () => {
  let light = document.querySelectorAll(".light");
  let dark = document.querySelectorAll(".dark");
  if (thema.checked) {
    bgDark.style.opacity = "1";
    body.style.backgroundColor = "#161722";
    light.forEach((e) => {
      e.classList.add("dark");
      e.classList.remove("light");
    });
  } else {
    bgDark.style.opacity = "0";
    body.style.backgroundColor = "#e4e5f1";
    dark.forEach((e) => {
      e.classList.add("light");
      e.classList.remove("dark");
    });
  }
});
/* ----------------------------------------------------- */

/* --------------------------criar tarefas--------------- */

let listItens = [];

let list = document.querySelector(".list");
let text = document.querySelector("#taskName");
let btn = document.querySelector("#createTask");

function createNewTask() {
  if (text.value == "") {
    alert("Tarefa não pode ser vazia");
  } else if (listItens.length >= 15) {
    alert("Muitas tarefas, conclua algumas antes de inserir novas");
    text.value = "";
  } else {
    listItens.push(text.value);

    text.value = "";
    localStorage.setItem("task", JSON.stringify(listItens));

    showList(listItens);
    checkComplete();
    
  }
}

listItens = JSON.parse(localStorage.getItem("task") || "[]");

function showList(arr) {
  checkComplete();
  listItens = arr;

  list.innerHTML = "";
  for (let i = 0; i < listItens.length; i++) {
    list.innerHTML += `<li class="listItem light">
        <label>
            <input type="checkbox" class="checklist">
            <span>${listItens[i]}</span>
        </label>
            <span class="close"><img src="./src/images/icon-cross.svg" alt=""></span>
    </li>`;
  }

  remover();
  itensLeft();
}

document.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    createNewTask();
  }
});
btn.addEventListener("click", () => {
  createNewTask();
});
/* -------------------------------------------------- */

/* ------------------excluir tarefa------------------ */

function remover() {
  let remove = document.querySelectorAll(".close");
  remove.forEach((element, index) => {
    element.addEventListener("click", () => {
      listItens.splice(index, 1);
      localStorage.setItem("task", JSON.stringify(listItens));

      showList(listItens);
    });
  });
}
/* --------------------------------------------- */

/* -----------------limpar lista---------------- */
clear.addEventListener("click", clearChecked);

function clearChecked() {
  let check = document.querySelectorAll(".checklist");
  let arr = [];

  check.forEach((element, index) => {
    if (element.checked) {
      arr.push(listItens[index]);
    }
  });

  let arr3 = listItens.filter((x) => {
    return JSON.stringify(arr).indexOf(JSON.stringify(x)) < 0;
  });

  listItens = arr3;
  localStorage.setItem("task", JSON.stringify(listItens));

  showList(listItens);
}

/* ----------------------------------------------------- */

/* -------------------------------tarefas restantes ------------------ */
function itensLeft() {
  let left = document.querySelector("#left");
  let check = document.querySelectorAll(".checklist");
  let arr4 = [];

  check.forEach((element) => {
    element.addEventListener("click", () => {
      check.forEach((element, index) => {
        if (element.checked) {
          arr4.push(element);
        }
      });

      left.innerText = listItens.length - arr4.length;
      arr4 = [];
    });
  });

  left.innerText = listItens.length - arr4.length;
}

/* ---------------------------------selecionando itens------------------------- */
let all = document.querySelector("#all");
let active = document.querySelector("#active");
let completed = document.querySelector("#completed");
let itensChecked = [];
let itensUnchecked = [];
function checkComplete() {
  itensChecked = [];
  itensUnchecked = [];
  let check = document.querySelectorAll(".checklist");

  itemAll = listItens;

  check.forEach((element) => {
    if (element.checked) {
      itensChecked.push(element);
    } else if (!element.checked) {
      itensUnchecked.push(element);
    }
  });
}

completed.addEventListener("change", () => {
  checkComplete();
  itensUnchecked.forEach((e) => {
    console.log(e);
    e.parentNode.parentNode.style.display = "none";
  });

  itensChecked.forEach((e) => {
    e.parentNode.parentNode.style.display = "flex";
  });
});

active.addEventListener("change", () => {
  checkComplete();
  itensChecked.forEach((e) => {
    e.parentNode.parentNode.style.display = "none";
  });
  itensUnchecked.forEach((e) => {
    console.log(e);
    e.parentNode.parentNode.style.display = "flex";
  });
});

all.addEventListener("change", () => {
  checkComplete();

  checkAll();
});

showList(listItens);
checkComplete();

function checkAll() {
  itensChecked.forEach((e) => {
    e.parentNode.parentNode.style.display = "flex";
  });
  itensUnchecked.forEach((e) => {
    console.log(e);
    e.parentNode.parentNode.style.display = "flex";
  });
}

