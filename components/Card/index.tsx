import { todoType } from "@/types/todoType"
import { memo, useEffect } from "react"
import EditModal from "@/components/EditModal"
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid"




function Card(props: todoType) {
    return (
        <div className="shadow-sm shadow-slate-300 p-4 bg-slate-950 text-white  rounded-lg">
            <div className="text-center ">
                <span className=" inline-flex items-center justify-center w-7 h-7 text-xs font-bold text-white shadow shadow-slate-400 rounded-full -top-2 -right-2 ">
                    {props.id}
                </span>
            </div>
            <p className="mt-4">title:{props.title}</p>
            <label htmlFor="completed">completed : </label>
            {props.completed ? <CheckCircleIcon className="w-7 h-7 inline text-green-500" /> : <XCircleIcon className="w-7 h-7 inline text-red-500" />}
            <EditModal {...props} />
        </div>
    )
}

export default memo(Card)