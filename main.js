let input = document.querySelector(".first_todo");
let ul = document.querySelector("ul");
let footer = document.querySelector(".footer");

const initialState = {
	todos: [],
	showCompleted: true
};

function reducer(state = initialState, action) {
	switch (action.type) {
		case "ADD_Todo": {
			const newTodo = {
				id: Date.now(),
				text: action.text,
				isDone: false
			};
			const newTodos = [...state.todos, newTodo];
			return { ...state, todos: newTodos };
		}
		case "Delete_Todo": {
			const newTodos = state.todos.filter(
				todo => !(todo.id == action.id)
			);
			return { ...state, todos: newTodos };
		}
		case "Toggle_Todo": {
			const newTodos = state.todos.map(todo =>
				todo.id === action.id ? { ...todo, isDone: !todo.isDone } : todo
			);
			return { ...state, todos: newTodos };
		}
	}
}
function viewTodo() {
	ul.innerHTML = "";
	const { todos } = store.getState();
	todos.forEach(todo => {
		let li = document.createElement("li");
		let p = document.createElement("p");
		let spanX = document.createElement("span");
		let checkInput = document.createElement("input");
		checkInput.type = "checkbox";
		checkInput.checked = todo.isDone;
		// const label = document.createElement("label");
		// tickImgBox = document.createElement("div");
		// tickImgBox.className = "tick_img_box";
		// img = document.createElement("img");
		// img.className = "tick";
		// img.src = "tick.png";
		// tickImgBox.appendChild(img);
		// label.appendChild(tickImgBox);
		// li.appendChild(label);
		p.classList.add("para");
		li.classList.add("li_styles");
		spanX.className = "remove_items";
		spanX.innerHTML = "×";
		spanX.addEventListener("click", () => {
			store.dispatch({
				type: "Delete_Todo",
				id: todo.id
			});
		});
		checkInput.addEventListener("click", () => {
			if (todo.isDone) p.style.textDecoration = "line-through";
			store.dispatch({
				type: "Toggle_Todo",
				id: todo.id,
				isDone: todo.isDone
			});
		});
		p.innerHTML = todo.text;
		// if (todo.isDone) {
		// 	img.src = "tick.png";
		// } else {
		// 	img.src = "";
		// }

		li.append(checkInput, p, spanX);
		ul.append(li);
	});
	if (todos.length >= 1) {
		footer.style.display = "block";
	} else {
		footer.style.display = "none";
	}
}

let store = Redux.createStore(reducer);
store.subscribe(viewTodo);

function ToggleTodo(id) {
	store.dispatch({
		type: "Toggle_Todo",
		id: id
	});
}

input.addEventListener("keyup", event => {
	if (event.keyCode === 13 && event.target.value.trim() !== "") {
		const text = event.target.value;
		store.dispatch({
			type: "ADD_Todo",
			text
		});
		event.target.value = "";
	}
});
