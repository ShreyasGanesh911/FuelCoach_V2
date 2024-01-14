export default function StepFour() {
    
    return (
    <>
    <form className='w-50 border py-4 px-5 bg-white'style={{height:'60vh',borderRadius:'5%'}}>
        <h2>What is your goal</h2>
        <div className="displayFlex my-5"style={{flexDirection:'row',justifyContent:'space-evenly'}}>
    
    <div className="w-50  " > 
      <label className="w-100 " >
        <input type="radio" name="product" value={1} className="card-input-element" onChange={(e)=>console.log(e.target.value)} />
          <h5 className="card-input py-3 font-monospace text-center bg-light">Lose Weight</h5>
      </label>
    </div>
    <div className="w-50  " > 
      <label className="w-100 " >
        <input type="radio" name="product" className="card-input-element" value={2} onChange={(e)=>console.log(e.target.value)} />
          <h5 className="card-input py-3 font-monospace text-center bg-light">Gain Weight</h5>
      </label>
    </div>
    <div className="w-50  " > 
      <label className="w-100 " >
        <input type="radio" name="product" className="card-input-element" value={3} onChange={(e)=>console.log(e.target.value)} />
          <h5 className="card-input py-3 font-monospace text-center bg-light">Maintaine Weight</h5>
      </label>
    </div>

    </div>
        {/* <form>
            <div>
            <label htmlFor="">Lose Weight</label>
            <input type="radio" name='goal' value='Lose Weight'/>
            </div>
            <div>
            <label htmlFor="">Gain Weight / Bulk </label>
            <input type="radio" name='goal' value='Lose Weight'/>
            </div>
            <div>
            <label htmlFor="">Maintaine Weight</label>
            <input type="radio" name='goal' value='Lose Weight'/>
            </div>
            
        </form> */}
        <h2>How many times do you workout</h2>
        <select name="activity" className='form-select' id="">
        <option value="1">Sedentary: little or no exercise</option>
        <option value="2">Light: exercise 1-3 times/week</option>
        <option value="3">Moderate: exercise 4-5 times/week</option>
        <option value="4">Active: daily exercise or intense exercise 3-4 times/week</option>
        <option value="5">Very Active: intense exercise 6-7 times/week</option>
        <option value="6">Extra Active: very intense exercise daily, or physical job</option>
    </select>
      </form>
      
    </>
  )
}
