import { useEffect, useState, type FormEvent } from 'react'
import './App.css'

//Interface pour les tâches
interface Task {
  name: string;
  done: boolean
}

//Données initiales, le premier est marquée comme terminée
const mock_data: Task[] = [
  {name: "Faire l'exercice 1", done: true},
  {name: "Faire l'exercice 2", done: false},
  {name: "Faire l'exercice 3", done: false}
]


//Composant
function App() {
  const [tasks, setTasks] = useState<Task[]>(mock_data)
  const [newTask, setNewTask] = useState('')
  const [error, setError] = useState('')
  const [allDone, setAllDone] = useState(false)
  
  
  //Gestion de l'ajout
  const onSubmit = (e: FormEvent<HTMLFormElement>)=> {
    e.preventDefault() //Empêche la rechargement de la page
    setError('') //Reinitialise l'erreur
    
    //Empêche la création d'une tâche vide ou seulement avec des espaces
    if (newTask.trim().length === 0) {
      setError('La tâche ne peut pas être vide')
      return
    }
    
    //Empêche la création d'une tâche déjà existante, insensible à la casse
    if (tasks.some(task => task.name.toLowerCase() === newTask.toLowerCase())) {
      setError('La tâche existe déjà')
      return
    }
    
    //Empêche la création d'une tâche avec plus de 50 charactères
    if (newTask.length > 50) {
      setError('La tâche ne peut dépasser 50 charactères')
      return
    }
    
    //Ajoute la nouvelle tâche
    setTasks([...tasks, {name: newTask, done: false}])
    setNewTask('')
  }
  
  //Gestion des checking pour les tâches
  const onCheck = (name: string, done: boolean) => {
    setTasks(tasks.map(task => task.name === name ? {...task, done} : task)) //Cherche la tâche par son nom et asigne la nouvelle valeur de done (true -> false ou false -> true)
  }
  
  useEffect(()=> {
    //Verifie si toutes les tâches sont terminées
    const allDone = tasks.every(task => task.done)
    setAllDone(allDone)
  }, [tasks])

  return (
    <>
      <h1>Gestion de tâche</h1>
      <div>
        <form onSubmit={onSubmit}>
          <label >
            <span className='hidden'>Entrer le nom d'une tâche:</span> {/* Améliore l'expérience utilisateur */}
            <input type='text' placeholder='Nom de la tâche' value={newTask} onChange={(e)=> setNewTask(e.target.value)} ></input>
          </label>
          <button type='submit'>Ajouter</button>
        </form>
        {error && <p className='error'>{ error }</p> /*Affiche les messages d'erreur */} 
      </div>
      <main>
        {!allDone && (
          <ul>
            {tasks.map((task)=> (
              <li key={task.name}>
                <label>{task.name} <input type='checkbox' checked={task.done} onChange={() => onCheck(task.name, !task.done)}></input></label>
              </li>
            ))}
          </ul>
        )}
        {allDone && <p>Toutes les tâches sont terminées 🎉</p>}
      </main>
    </>
  )
}

export default App
