let input = document.querySelector(".first_todo");
let ul = document.querySelector("ul");

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
		p.classList.add("para");
		li.classList.add("li_styles");
		spanX.className = "remove_items";
		checkInput.checked = todo.isDone;
		spanX.innerHTML = "×";
		p.innerHTML = todo.text;
		li.append(checkInput, p, spanX);
		ul.append(li);
	});
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
