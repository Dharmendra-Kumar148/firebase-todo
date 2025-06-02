import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc
} from "firebase/firestore";

import { db } from "./firebase";

const todosRef = collection(db, "todos");

export const fetchTodos= async ()=> {
    const snapshot = await getDocs(todosRef);
    return snapshot.docs.map((doc)=>({id:doc.id, ...doc.data()}));
};

export const addTodoToFirestore = async (todo) => {
  const docRef = await addDoc(todosRef, todo);
  return { ...todo, id: docRef.id };
};

export const updateTodoInFirestore = async (todo)=>{
    const docRef = doc(db, "todos", String(todo.id));
    await updateDoc(docRef, {title: todo.title, completed:todo.completed})
};

export const deleteTodoFromFirestore = async (id)=> {
    const docRef = doc(db,"todos",String(id));
    await deleteDoc(docRef);
};