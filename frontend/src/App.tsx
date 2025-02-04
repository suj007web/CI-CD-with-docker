import { useEffect, useState } from "react"


interface Todo {
  id : number
  title: string
  description: string
  completed: number
}

const App = () => {
  
  const [todo, setTodo] = useState<Todo>({
    id : 0,
    title: '',
    description: '',
    completed: 0
  })
  const [todos, setTodos] = useState<Todo[] | null>()
  const [completed, setCompleted] = useState<number>(0)
  const resetStates = () =>{
    setTodo({
      id: 0,
      title: '',
      description: '',
      completed: 0
    })
  }
  const fetchTodos = async () => {
    try{
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/todo`)
      const {data} = await response.json()
      setTodos(data)
     
    }catch(e){
      console.log(e)
    }
  }
  useEffect(()=>{
    fetchTodos()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try{
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/todo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
      })
      fetchTodos()
      resetStates()
      const data = await response.json()
      console.log(data)
    }catch(e){
      console.log(e)
    }
  }

  const handleDelete = async (id: number) => {
    try{
      const response = await fetch(`http://${import.meta.env.VITE_BACKEND_URL}/api/todo/${id}`, {
        method: 'DELETE'
      })
      fetchTodos()
      const data = await response.json()
      console.log(data)
    }catch(e){
      console.log(e)
    }
  }

  return (
    <div className='bg-slate-900 min-h-screen flex flex-col items-center justify-center'>
      <div className='bg-slate-800  h-1/3 w-[80%] max-w-[80%] rounded-md flex justify-center flex-col items-center' >
        <h1 className='text-orange-500 text-3xl font-semibold '>Todo List</h1>
        <form action="" className='flex flex-col items-center' onSubmit={handleSubmit}>
        <input type="text" value={todo.title} name='title' className='bg-white mt-2 px-4 py-1 rounded-md outline-none' placeholder='Title' onChange={(e)=>{
          setTodo({
            ...todo,
            title: e.target.value
          })
        }}/>
        <textarea name="description" value={todo.description} className='bg-white mt-4 px-4 px-1 outline-none h-20 rounded-md' placeholder='Description' id=""
        onChange={(e)=>{
          setTodo({
            ...todo,
            description: e.target.value
          })
        }}
        ></textarea>
        <button type="submit" className='bg-orange-500 text-white px-4 py-2 mt-2 rounded-md cursor-pointer'>Add</button>
        </form>
      </div>
      <div className="min-w-[80%] max-w-[80%] h-2/3 bg-slate-800 rounded-md mt-4 p-2 flex flex-col items-center">
        {
          todos && todos.map((todo)=>{
       
            return (
              <div key={todo?.id} className='bg-slate-800 w-[80%] max-w-[80%] rounded-md mt-2 p-2 flex justify-between items-center'>
                <div>
                  <h1 className={`text-white text-lg font-semibold ${todo.completed == 1 ? 'line-through' : ''}`}>{todo.title}</h1>
                  <p className='text-white text-sm'>{todo.description}</p>
                </div>
                <div className="flex gap-4">
                  <button className='bg-green-500 text-white px-2 py-1 rounded-md cursor-pointer' onClick={async()=>{
                      if(todo.completed === 0){
                        setCompleted(completed + 1);
                      }else{
                        setCompleted(completed - 1)
                      }
                      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/todo/${todo.id}`, {
                        method: 'PATCH',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                          completed: todo.completed === 0 ? 1 : 0
                        })
                      })
                      console.log(await response.json())
                      fetchTodos()
                  }}>Complete</button>
                  <button className='bg-red-500 text-white px-2 py-1 rounded-md cursor-pointer'
                   onClick={()=>{
                    handleDelete(todo.id!)
                   }}
                  
                  >Delete</button>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default App