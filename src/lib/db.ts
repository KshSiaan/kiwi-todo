import {Dexie,EntityTable} from "dexie";

interface Todo {
  id: number
  name: string
  completed: boolean,
  createdAt: Date,
  completedAt?: Date,
  
}


export const db = new Dexie("kiwi-todo") as Dexie & {
    todos: EntityTable<Todo, "id">
}

db.version(1).stores({
    todos: "++id, name,completed,createdAt,completedAt",
});
export type {Todo}
export default db;