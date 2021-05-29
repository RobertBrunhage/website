---
title: React Crash Course - using TypeScript, Tailwind & Testing
description: Learning React has some huge upsides, you will work with one of the most popular programming languages which is JavaScript and in this one we will use TypeScript, which is a superset of that!
image: /assets/images/react_crash_course_thumbnail.webp
youtube: Rvz5OM4JHw8
github: https://github.com/Robert-Brunhage-Organization/react-crash-course
author: Robert Brunhage
date: 05-29-2021
---

Learning React has some **huge** upsides, you will work with one of the most popular programming languages which is JavaScript and in this one we will use **TypeScript**, which is a superset of that!

Here is how it will look

![Alt Text](https://firebasestorage.googleapis.com/v0/b/krossa-prod.appspot.com/o/e3IUXc1BFZTlvvaqD8xjvHlIy2q1%2Farticles%2Fg1blkbrFKFxEqvt8s3Cz%2Ftodo%20react.gif?alt=media&token=75cfdd16-936e-45e3-a076-f9c42bff43f8)

## Setup

We are going to use **4 main tools** which is how we are going to build our website and in this case going to be a todo site

- React
- TypeScript
- Tailwind
- React Testing Library

To create a site we are going to use `yarn` but `npm` also works, it's up to you! To create a site execute the following command and switch out `todo-in-react` with the name you want for the project.

`yarn create react-app todo-in-react --template typescript`

This will give use the default React project but we are going to change it up a bit.

First delete everything in the `App.tsx` file and add a title so what you have left is

```js
import React from "react";

function App() {
  return (
    <div>
      <h1>Todo site</h1>
    </div>
  );
}

export default App;
```

Now delete the `App.css` as we are going to use `TailwindCSS` instead. I recommend just following the steps on the tailwind setup guide [Tailwind installation guide](https://tailwindcss.com/docs/guides/create-react-app)

To also get the icons later make sure to run `yarn add @heroicons/react` which is the package that will have all the icons we want.

## Creating the site

Navigate to `App.tsx` and let's start with 2 things

First we are going to handle some kind of state which is the actual "Todos", this we are going to do with something called `useState`. This will let us add items as well as remove them. Add the following to the top of the `App` function.

`const [todos, setTodos] = useState<string[]>([]);`

This will give us first the actual state which is `todos` and it will also give us the function to update the list of todos with `setTodos`. The todos we are going to make it quite **simple** by representing it with a list of strings!

We are also going to make the title to be centered horizontally with some spacing from the top.

```js
function App() {
  const [todos, setTodos] = useState<string[]>([]);

  return (
    <div className="w-screen h-screen flex flex-col items-center space-y-8 pt-40">
      <h1 className="text-4xl font-medium">Todo List</h1>
    </div>
  );
}
```

As you can see in the code here we have made the parent div take the **FULL** width and height of the screen as well as we are using `flex` to center it horizontally and make all the children be vertically aligned. We also added something called `space-y-8` and `pt-40` which is just that all children for the div will have vertical spacing between them and that the parent div has padding on the top.

## Input and Button

```js
function App() {
	const [todos, setTodos] = useState<string[]>([]);
	const nameRef = useRef<HTMLInputElement>(null);

const addTodo = () => {
	const name = nameRef.current?.value ?? "";
	if (name === "") return;
	setTodos([...todos, name]);
	if (nameRef.current) {
		nameRef.current.value = "";
	}
};

return (
	<div className="w-screen h-screen flex flex-col items-center space-y-8 pt-40">
		<h1 className="text-4xl font-medium">Todo List</h1>
		<div className="flex space-x-2">
			<input
				data-testid="todo-input"
				ref={nameRef}
				type="text"
			/>
			<button onClick={() => addTodo()}>Add todo</button>
		</div>
	</div>
	);
}
```

You will see some new things here, the first is going to be something called `useRef`. `useRef` is used to manipulate the element that the `nameRef` is attached to, and this case the input. With this we will able to get the value that is written in it as well as being able to clear the input when we press the button. We also added a `data-testid` and this is later going to be used in our **test to actually find the element**.

The `addTodo` function is quite simple. First we get the value from the `input` and make sure it's either the value or a empty string, this way we don't have to handle `null` cases. `setTodos([...todos, name]);` will just take the previous todos and add the next todo that we wrote in the `input`. The last step is just clearing the `input` so we can easily write our next todo.

### Add styling

To add some styling it's quite simple take a look at the following code

```js
const nameRef = useRef < HTMLInputElement > null;

const addTodo = () => {
  const name = nameRef.current?.value ?? "";
  if (name === "") return;
  setTodos([...todos, name]);
  if (nameRef.current) {
    nameRef.current.value = "";
  }
};
```

```js
<div className="flex space-x-2">
  <input
    data-testid="todo-input"
    className="border rounded py-2 px-4"
    ref={nameRef}
    type="text"
  />
  <button
    className="bg-indigo-500 py-2 px-4 rounded text-white hover:bg-indigo-700"
    onClick={() => addTodo()}
  >
    Add todo
  </button>
</div>
```

For the `input` we just made sure that it had a border as well as being rounded with some padding.

For the `button` we did a bit more, by adding a color to make it use the `indigo` color, where 500 represents the how dark or light the color will be. Add some padding like we did with the `input`, make it rounded with white text inside and when we hover the button it will have a darker `indigo` color.

It should look something like this now.

![image of title, input and button](https://firebasestorage.googleapis.com/v0/b/krossa-prod.appspot.com/o/e3IUXc1BFZTlvvaqD8xjvHlIy2q1%2Farticles%2Fg1blkbrFKFxEqvt8s3Cz%2Ftodo-react-styles.png?alt=media&token=3dac919a-48aa-4de6-ac96-34b3fe83fd85)

## Showing Todos

This is the most satisfying part which is shownig the todos in a list.

```js
{
  todos.map((value, index) => {
    return (
      <div key={index}>
        <p>{value}</p>
      </div>
    );
  });
}
```

We take the todos and `map` over them, make sure to also include that we want the `index` as we are going to use that for the key in the `div`. This is to make every div unique so React knows which item is going to be updated.

Make sure when you are running code together with the HTML that you wrap it in curly brackets `{}`.

### Add styling and a delete button

```js
const removeTodo = (index: number) => {
  const updatedTodos = [...todos];
  updatedTodos.splice(index, 1);
  setTodos(updatedTodos);
};
```

```js
{
  todos.map((value, index) => {
    return (
      <div key={index} className="flex justify-between w-80">
        <p>{value}</p>
        <TrashIcon
          data-testid={`delete-${value}`}
          className="w-6 h-6 text-gray-400 cursor-pointer hover:text-gray-700"
          onClick={() => removeTodo(index)}
        ></TrashIcon>
      </div>
    );
  });
}
```

The **parent div** makes sure that our text and delete button for each todo is horizontally aligned.

the `TrashIcon` comes from [heroicons](https://github.com/tailwindlabs/heroicons) that we installed. Here we make sure that it has a `data-testid` once again so we are able to click on it during tests.

For the styling we just make it a specific height and width as well as changing the color to gray 400 and adding a hover to change the color to gray 700.

Now for the **delete functionality** we make a copy of the todo list, use `splice` on the copy to delete an item from a specific `index` and only select **1** item that is going to be deleted. Then we just call `setTodos` with the new copy of the list with that specific item deleted.

## Persistence

We also need to make sure that when we refresh the window that the todos are actually saved and shown again, and to do this we use `localStorage` and `useEffect`!

First add a constant variable at the top of the file `export const TODO_KEY = "TODOS";` this is for `localStorage` as well as our tests.

To save an item it's rather simple and we can do it with the following code

```js
useEffect(() => {
  localStorage.setItem(TODO_KEY, JSON.stringify(todos));
}, [todos]);
```

`useEffect` will be called **before** the first render of the page is you have an empty bracket `[]`. We also have added `[todos]` in that which means that our `useEffect` will be called before the first render and **everytime** we update our `todos` state. We then use `localStorage` to add an item with the key we created and also make sure to `stringify` the `todos` as `localStorage` requires us to do that.

For retrieving the items is also quite simple, take a look!

```js
useEffect(() => {
  const jsonTodos = localStorage.getItem(TODO_KEY);
  if (jsonTodos) setTodos(JSON.parse(jsonTodos));
}, []);
```

This will run **once** before the first render **ONLY**. It gets the todos from `localStorage` with the key we used before. After we do that we just need to check if they actually exist (is not null) and then we call `setTodos` with our todos (just make sure we parse them first as we stringified them before).

## Testing

Navigate to the `App.test.tsx` file and start with the first test.

```js
test("Given saved todos When App is loaded Then show those", () => {
  localStorage.setItem(TODO_KEY, JSON.stringify(["hello", "youtube"]));
  render(<App />);
  const linkElement = screen.getByText("hello");
  expect(linkElement).toBeInTheDocument();
});
```

Here we just make sure that our todos are shown if we have some todos in `localStorage`.

Start by setting a value in `localStorage` with the key we have created.

we then `render` our `App` which is the page we want to test.

We find the element which has the name of "hello" and then check if it's in the document.

### The next test we are going to add a todo.

```js
test("Given saved todos When adding another todo Then show saved and new todo", () => {
  localStorage.setItem(TODO_KEY, JSON.stringify(["hello"]));
  render(<App />);

  const inputElement = screen.getByTestId("todo-input");
  const buttonElement = screen.getByText("Add todo");

  fireEvent.change(inputElement, { target: { value: "youtube" } });
  fireEvent.click(buttonElement);

  const linkElement = screen.getByText("youtube");
  expect(linkElement).toBeInTheDocument();
});
```

We make sure we have a todo called "hello" then we make sure to find the `input` and `button`. after that we use `fireEvent` which can be used to simulate actions such as adding a value to the `input` or clicking the `button`.

We write in "youtube" in the `input` and then click the `button` and in the end we verify that "youtube" is indeed in the page.

### The last test we test deleting a todo

```js
test("Given saved todos When deleting specific todo Then remaining todo", () => {
  localStorage.setItem(TODO_KEY, JSON.stringify(["hello", "youtube"]));
  render(<App />);
  const deleteIcon = screen.getByTestId("delete-youtube");

  const linkElement = screen.getByText("youtube");
  fireEvent.click(deleteIcon);

  expect(linkElement).not.toBeInTheDocument();
});
```

Same as before but we look for the `delete icon`, click it and verify that it's **NOT** in the document!

## Finished Code

**App.tsx**

```js
import React, { useEffect, useRef, useState } from "react";
import { TrashIcon } from "@heroicons/react/outline";
export const TODO_KEY = "TODOS";

function App() {
  const [todos, setTodos] = useState<string[]>([]);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const jsonTodos = localStorage.getItem(TODO_KEY);
    if (jsonTodos) setTodos(JSON.parse(jsonTodos));
  }, []);

  useEffect(() => {
    localStorage.setItem(TODO_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    const name = nameRef.current?.value ?? "";
    if (name === "") return;
    setTodos([...todos, name]);
    if (nameRef.current) {
      nameRef.current.value = "";
    }
  };

  const removeTodo = (index: number) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center space-y-8 pt-40">
      <h1 className="text-4xl font-medium">Todo List</h1>
      <div className="flex space-x-2">
        <input
          data-testid="todo-input"
          className="border rounded py-2 px-4"
          ref={nameRef}
          type="text"
        />
        <button
          className="bg-indigo-500 py-2 px-4 rounded text-white hover:bg-indigo-700"
          onClick={() => addTodo()}
        >
          Add todo
        </button>
      </div>
      {todos.map((value, index) => {
        return (
          <div key={index} className="flex justify-between w-80">
            <p>{value}</p>
            <TrashIcon
              data-testid={`delete-${value}`}
              className="w-6 h-6 text-gray-400 cursor-pointer hover:text-gray-700"
              onClick={() => removeTodo(index)}
            ></TrashIcon>
          </div>
        );
      })}
    </div>
  );
}

export default App;
```

**App.test.tsx**

```js
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App, { TODO_KEY } from "./App";

test("Given saved todos When App is loaded Then show those", () => {
  localStorage.setItem(TODO_KEY, JSON.stringify(["hello", "youtube"]));
  render(<App />);
  const linkElement = screen.getByText("hello");
  expect(linkElement).toBeInTheDocument();
});

test("Given saved todos When adding another todo Then show saved and new todo", () => {
  localStorage.setItem(TODO_KEY, JSON.stringify(["hello"]));
  render(<App />);

  const inputElement = screen.getByTestId("todo-input");
  const buttonElement = screen.getByText("Add todo");

  fireEvent.change(inputElement, { target: { value: "youtube" } });
  fireEvent.click(buttonElement);

  const linkElement = screen.getByText("youtube");
  expect(linkElement).toBeInTheDocument();
});

test("Given saved todos When deleting specific todo Then remaining todo", () => {
  localStorage.setItem(TODO_KEY, JSON.stringify(["hello", "youtube"]));
  render(<App />);
  const deleteIcon = screen.getByTestId("delete-youtube");

  const linkElement = screen.getByText("youtube");
  fireEvent.click(deleteIcon);

  expect(linkElement).not.toBeInTheDocument();
});
```

### Summary

Using Tailwind, Typescript and React together is a **moster for productivity** and especially if we add testing to make sure that we are confident in our code.

If you want to see how this looks with components click the code button at the top to get to GitHub, one there you can switch branch and look at the code!

There is only so much I can do in this short format but hope you enjoyed it!
