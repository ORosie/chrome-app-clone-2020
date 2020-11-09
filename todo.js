const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");
//class name가져올때 점!! 잘 찍자

const TODOS_LS = "toDos";

let toDos = [];



function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos. filter(function(todo){
        return toDo.id !== pasrseInt(li.id);
        //li.id 가 string이라서 숫자로 바꿔줘야함. toDo.id는 숫자.
    });

    toDos = cleanToDos
    saveToDos();

}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
  //JSON.stringify는 자바스크립트 object를 string으로 바꿔준다.
}

function paintToDo(text) {
  const li = document.createElement("li");
  // list 말고 이름이 뭐가 되든 상관없음.
  const delBtn = document.createElement("button");
  delBtn.innerText = "❌";
  //이모티콘 넣는 단축키 cmd+control+spacebar
  delBtn.addEventListener("click", deleteToDo);
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  span.innerText = text;

  toDoList.appendChild(li);
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId;
  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);

  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function(toDo) {
      paintToDo(toDo.text);
    });
    //forEach는 array에 담겨있는 것들을 각각에 한번씩 함수를 실행시켜줌
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
