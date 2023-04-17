import Card from "@/components/Card"
import getTodos from "@/components/getTodos"
import Loading from "@/components/Loading"
import { todoType } from "@/types/todoType"
import { useQuery } from "@tanstack/react-query"


export default function Home() {
  const { data, isLoading } = useQuery({ queryKey: ['todos'], queryFn: getTodos })
 
  return (
    <div className="container mx-auto">
      <h1 className="mt-5 text-center text-5xl">Todo List</h1>
      <div className="grid grid-cols-4 gap-4 mt-12 ">
        {isLoading ? <Loading /> : data.map((todo: todoType) => <Card {...todo} key={todo.id} />
        )}
      </div>
    </div>
  )
}