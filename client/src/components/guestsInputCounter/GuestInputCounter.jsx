import './guestsInputCounter.scss'

const GuestsInputCounter = ({ guests, setGuests }) => {
  const handleGuest = (propName, op) => {
    setGuests((prev) => ({
      ...prev,
      [propName]: op === 'increment' ? guests[propName] + 1 : guests[propName] - 1,
    }))
  }

  return (
    <div className="guestsInputCounter">
      <div className="guestsInputCounter__item">
        <span>Adults</span>
        <div>
          <button onClick={() => handleGuest('adults')} disabled={guests.adults <= 1}>
            -
          </button>
          <span>{guests.adults}</span>
          <button onClick={() => handleGuest('adults', 'increment')}>+</button>
        </div>
      </div>
      <div className="guestsInputCounter__item">
        <span>Children</span>
        <div>
          <button onClick={() => handleGuest('children')} disabled={guests.children <= 0}>
            -
          </button>
          <span>{guests.children}</span>
          <button onClick={() => handleGuest('children', 'increment')}>+</button>
        </div>
      </div>
      <div className="guestsInputCounter__item">
        <span>Rooms</span>
        <div>
          <button onClick={() => handleGuest('rooms')} disabled={guests.rooms <= 1}>
            -
          </button>
          <span>{guests.rooms}</span>
          <button onClick={() => handleGuest('rooms', 'increment')}>+</button>
        </div>
      </div>
    </div>
  )
}
export default GuestsInputCounter
