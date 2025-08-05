import Snorlax  from '../assets/snorlax.png'

function Spinner() {
  return (
    <div className="spinner-container ">
      <div className="shake-vertical "><img src={Snorlax} alt="portal" 
      /></div>
    </div>
  );
}

export default Spinner;