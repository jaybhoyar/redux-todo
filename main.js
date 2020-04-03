let input = document.querySelector(".first_todo");
let ul = document.querySelector("ul");
let footer = document.querySelector(".footer");
let all_button = document.querySelector("#all_button");
let active_button = document.querySelector("#active_button");
let completed_button = document.querySelector("#completed_button");

function reducer(state = [], action) {
	switch (action.type) {
		case "ADD_Todo": {
			const newTodo = {
				id: Date.now(),
				text: action.text,
				isDone: false
			};
			state.push(newTodo);
			return state;
		}
		case "Delete_Todo": {
			return state.filter(todo => !(todo.id == action.id));
		}
		case "Toggle_Todo": {
			return state.map(todo =>
				todo.id === action.id ? { ...todo, isDone: !todo.isDone } : todo
			);
		}
		case "All_Todo": {
			return state;
		}
		case "Active_Todo": {
			const acTodos = state;
			console.log("State => ", state);
			var todos = acTodos.filter(t => !t.isDone);
			console.log("Todos => ", todos);
			return todos;
		}
		case "Completed_Todo": {
			const cTodos = state;
			console.log("State => ", state);
			var todos = cTodos.filter(t => t.isDone);
			console.log("Todos => ", todos);
			return todos;
		}
	}
}

function viewTodo() {
	ul.innerHTML = "";

	const todos = store.getState();
	todos.forEach(todo => {
		let li = document.createElement("li");
		let p = document.createElement("p");
		let spanX = document.createElement("span");
		let checkInput = document.createElement("input");
		checkInput.type = "checkbox";
		checkInput.checked = todo.isDone;
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

all_button.addEventListener("click", () => {
	active_button.style.border = "";
	completed_button.style.border = "";
	all_button.style.border = "0.5px solid rgba(175, 47, 47, 0.2)";
	store.dispatch({
		type: "All_Todo"
	});
});
completed_button.addEventListener("click", () => {
	all_button.style.border = "";
	active_button.style.border = "";
	completed_button.style.border = "0.5px solid rgba(175, 47, 47, 0.2)";
	store.dispatch({
		type: "Completed_Todo",
		state: store.getState()
	});
});
active_button.addEventListener("click", () => {
	all_button.style.border = "";
	completed_button.style.border = "";
	active_button.style.border = "0.5px solid rgba(175, 47, 47, 0.2)";
	store.dispatch({
		type: "Active_Todo",
		state: store.getState()
	});
});
