import { todoType } from "@/types/todoType";




export default async function editTodo({ id, title, completed }: todoType) {
  return await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      id,
      title,
      completed
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => json);
}
