import { todoType } from "@/types/todoType";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, memo } from "react";
import editTodo from "../editTodo";
import {  PencilIcon } from '@heroicons/react/24/outline'


function EditModal({ id, title, completed, userId }: todoType) {
    const [showModal, setShowModal] = useState(false);
    const [titleState, setTitleState] = useState(title)
    const [status, setStatus] = useState(completed)
    const queryClient = useQueryClient()
    // Define a mutation
    const mutation = useMutation(() => editTodo({ title: titleState, completed: status, id: id }), {
        onSuccess: () => {
            queryClient.setQueryData(['todos'], (prev: todoType[] | undefined) => {
                let result;
                if (prev) {
                    result = prev.map((todo: todoType) => {
                        if (todo.id === id) {
                            todo = { title: titleState, completed: status, id, userId }
                        }
                        return todo
                    })
                }
                return result
            })
        }
    })

    function saveChanges() {
        mutation.mutate()
        setShowModal(false)
    }

    return (
        <>
            <button
                className="px-3 py-2 shadow shadow-neutral-50 rounded-md mt-4  w-full"
                type="button"
                onClick={() => setShowModal(true)}
            >
                Edit <PencilIcon className="w-5 h-5 inline text-green-800" />
            </button>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-slate-950 outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl text-white font-semibold">
                                        Edit
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className=" text-white   block hover:text-white ">
                                            X
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="text-center mt-4">
                                    <span className=" inline-flex items-center justify-center w-10 h-10 text-xs font-bold text-white shadow shadow-slate-400 rounded-full -top-2 -right-2 ">
                                        {id}
                                    </span>
                                </div>
                                <div className="relative p-6 flex-auto">
                                    <label htmlFor="">title : </label>
                                    <input value={titleState} onChange={(e) => setTitleState(e.target.value)} type="text" className="text-white bg-slate-700 rounded-lg ml-2" />
                                </div>
                                <div className="relative p-6 flex-auto">
                                    <label htmlFor="">completed : </label>
                                    <input type="checkbox" checked={status} onChange={() => setStatus(!status)} />
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                    <button

                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={saveChanges}
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}

export default memo(EditModal)