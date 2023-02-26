import { useEffect, useState } from 'react';
import { addMeal, editMeal, getAllMeals, deleteMeal } from './FetchMeals';
import './App.css';
import MyMeals from './MyMeal';

function App() {

  const [myMeal, setMeal] = useState([]);
  const [title, setTitle] = useState("");
  const [editing, setEditing] = useState(false);
  const [mealId, setMealId] = useState("")

  useEffect(() => {
    getAllMeals(setMeal)
  }, [])

  const updatingInInput = (_id, title) => {
    setEditing(true)
    setTitle(title)
    setMealId(_id)
  }

  return (
    <div className="App">
      <h1>Meal Plan</h1>
      <input
      type = 'text'
      placeholder = 'Add a meal'
      value = { title }
      onChange = {(e) => setTitle(e.target.value)}/>
      <button 
        disabled={!title}
        onClick={editing ? () => editMeal(mealId, title, setTitle, setMeal, setEditing) : () => addMeal(title, setTitle, setMeal)}>
        {editing ? "Edit" : "Add"}
      </button>
        { myMeal.map((meal) => <MyMeals key={meal._id}  text={meal.title}
        updatingInInput={() => updatingInInput(meal._id, meal.title)}
        deleteMeal={() => deleteMeal(meal._id, setMeal)}/>
        )}
    </div>
  );
}

export default App;
