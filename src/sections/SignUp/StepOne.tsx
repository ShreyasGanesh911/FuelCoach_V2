import "../../Styles/SignUp.css";

export default function StepOne() {
  return (
    <>
      <form className="w-50 border py-4 px-5 bg-white" style={{ height: "60vh",borderRadius:'5%' }}>
        <div className="mb-3">
    <label htmlFor="exampleInputEmail1 " className="form-label font-monospace">Name</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">Enter your name*</div>
  </div>
        <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label font-monospace">Email</label>
    <input type="email" className="form-control" required id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
        <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label font-monospace">Phone</label>
    <input type="number" className="form-control" id="exampleInputPhone1" aria-describedby="emailHelp" maxLength={10} min={0}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
      </form>

      {/* <label htmlFor="activity">What describes you the most</label>
    <select name="activity" className='form-select' id="">
        <option value="1">Sedentary: little or no exercise</option>
        <option value="2">Light: exercise 1-3 times/week</option>
        <option value="3">Moderate: exercise 4-5 times/week</option>
        <option value="4">Active: daily exercise or intense exercise 3-4 times/week</option>
        <option value="5">Very Active: intense exercise 6-7 times/week</option>
        <option value="6">Extra Active: very intense exercise daily, or physical job</option>
    </select> */}
    </>
  );
}
