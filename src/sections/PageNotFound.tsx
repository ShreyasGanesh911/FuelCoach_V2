import { Link } from 'react-router-dom'
import '../Styles/PageNotFound.css'
export default function PageNotFound() {
  return (
    <section className="page-pnf displayFlex-pnf">
      <div className='displayFlex-pnf'>
      <i className="fa-solid fa-battery-empty py-3 text-center" style={{fontSize:'200px'}}></i>
      <h2 className='p-2 text-center text-danger'>404: The page you are looking for isn’t here</h2>
      <h5 className='p-2 text-center'>You either tried some shady route or you came here by mistake. Whichever it is, try using the navigation</h5>
      <div>
        <Link to='/' className='nav-link'><button className='btn  btn-lg btn-warning displayFlex backBtn' ><i className="fa-solid fa-arrow-left mx-1 "></i>Go back</button></Link>
      </div>
      </div>
    </section>
  )
}

