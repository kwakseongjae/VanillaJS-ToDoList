const toDoForm = document.querySelector(".toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDos = document.querySelector(".toDos");
const done = document.querySelector(".done");

let toDoList = [];
const toDoListKey = "toDoList";

const loadToDoList = () => {
  // toDoList를 저장할 때 JSON.stringify 를 이용하였으므로
  // 불러올 때는 JSON.parse을 이용해서 불러온다.
  const loadedToDoList = localStorage.getItem(toDoListKey);
  if (loadedToDoList) {
    const parsedToDoList = JSON.parse(loadedToDoList);
    for (let toDo of parsedToDoList) {
      // const text = toDo.text;
      const { text } = toDo;
      setToDo(text);
      saveToDo(text);
    }
  }
};

const saveToDoList = () => {
  localStorage.setItem(toDoListKey, JSON.stringify(toDoList));
};

const setToDo = (toDo) => {
  // li태그, span태그, button 태그를 만든다.
  // 삭제 버튼에는 클릭을 감지하는 이벤트 리스너를 추가한다.
  // 삭제 버튼을 클릭하면 해당하는 toDo와 삭제 버튼을 모두 지워야 하므로,
  // list 태그 자체를 지우면 된다.
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  delBtn.innerText = "X";
  span.innerHTML = toDo;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = toDoList.length + 1;
  toDos.appendChild(li);
  span.addEventListener("click", toggle);
  delBtn.addEventListener("click", delToDo);
};

const saveToDo = (toDo) => {
  // 입력한 toDo로 newItem을 생성한다.
  // 기존 배열에 넣어주고, 그 배열을 local storage에 저장한다.
  // JSON.stringify 메서드를 사용해서 객체를 JSON 문자열로 변환해서 저장해야 한다.
  const newItem = {
    text: toDo,
    id: toDoList.length + 1,
  };
  toDoList.push(newItem);
  saveToDoList();
};


const delToDo = (e) => {
  // parentNode메서드로 해당 HTML 태그의 부모 태그를 반환한다.
  // removeChild 를 이용해서 부모 태그에서 자식 태그를 지운다.
  // toDo.id의 데이터 타입은 number지만, li.id의 데이터 타입은 string이기 때문에
  // Number메소드를 사용하여 형변환을 진행한다.
  // 삭제 버튼을 누를 때 마다, 바뀐 배열로 local storage의 데이터를 갱신

  const { target: button } = e;
  const li = button.parentNode;
  toDos.removeChild(li);

  toDoList = toDoList.filter((toDo) => toDo.id !== Number(li.id));
  saveToDoList();
};

const toggle = (e) => {
  const { target: button } = e;
  const li = button.parentNode;
  if (toDos === li.parentElement) {
    toDos.removeChild(li);
    done.appendChild(li);
  } else {
    toDos.appendChild(li);
    done.removeChild(li);
  }
};

const createToDo = (e) => {
  if (!toDoInput.value) {
    alert("내용을 입력해 주세요!");
  } else {
    // form이 submit될 때 페이지가 새로고침되는 기본 동작을 막는다.
    // input에 입력된 값을 변수 toDo로 선언해서, setToDo 함수와 savdTodo 함수에 전달한다.
    // 실행 완료 후 input을 초기화한다.
    e.preventDefault();
    const toDo = toDoInput.value;
    setToDo(toDo);
    saveToDo(toDo);
    toDoInput.value = "";
  }
};

const allClearList = (e) => {
  if (confirm("정말 삭제하시겠습니까?")) {
    //전체 삭제
    toDos.innerText = "";
    localStorage.removeItem(toDoListKey);
  } else {
    //취소메시지가 false(no)일때
    return ; //삭제 취소
  }
};

const init = () => {
  // loadToDoList 함수를 실행해서 local Storage에 ToDo가 존재하는지 확인한다.
  // submit 이벤트가 발생하면 CallBack으로 createToDo 함수 호출한다.
  loadToDoList();

  toDoForm.addEventListener("submit", createToDo);
  addToDo_btn.addEventListener("click", createToDo);
};

init();
