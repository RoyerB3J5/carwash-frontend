import { useState } from "react"
import { useAuth } from "../context/authContext"
import { useNavigate } from "react-router-dom"
import AnnounceError from "../components/AnnounceError"

function Home() {
  const [user,setUser] = useState({email:'',password:''})
  const [error,setError] = useState(false)
  const {login } = useAuth()
  const navigate = useNavigate()

  const changeUser = ({target:{id,value}}: React.ChangeEvent<HTMLInputElement>) => {
    setUser({...user,[id]:value})
  }

  const hanldeClick = () =>{
    setError(false)
  }
  const handleSubmit = async (e :React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try{
      await login(user.email,user.password)
      navigate('/dashboard')
    } catch (error){
      console.log(error)
      setError(true)
      setUser({email:'',password:''})
    }
  }
  return (
    <main className="flex flex-col h-full relative" >
      <section className="flex flex-col justify-center items-center w-full gap-2 flex-grow p-5 " >
        {error && <AnnounceError />}
        <form className="flex flex-col h-auto gap-6 p-6 min-w-[300px] shadow-xl rounded-lg" onSubmit={handleSubmit}>
          <img src="/CarHome.webp" alt="Logo de CarWash" className="h-[120px] w-[120px] self-center mb-3" />
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-h5 font-medium">Correo electrónico</label>
            <input type="email" id="email" placeholder="Ingresar correo electrónico" className="p-3 border rounded-lg border-gray-200 focus:outline-0 focus:border-primary" value={user.email} onChange={changeUser} onClick={hanldeClick}/>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-h5 font-medium">Contraseña</label>
            <input type="password" id="password" placeholder="Ingresar contraseña" className="p-3 border rounded-lg border-gray-200 focus:outline-0 focus:border-primary" value={user.password} onChange={changeUser} />
          </div>
          <button className="py-3 px-7 bg-accent text-p font-semibold rounded-md hover:scale-105 hover:-translate-y-2 transition-all cursor-pointer" >Ingresar</button>
        </form>
      </section>
      <div className="h-10 bg-primary w-full rounded-t-md"></div>
    </main>
  )
}

export default Home