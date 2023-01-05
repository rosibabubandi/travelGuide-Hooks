import './index.css'

const TravelPlaces = props => {
  const {packageDetails} = props

  const {name, imageUrl, description} = packageDetails

  return (
    <li>
      <div className="each-travel-container">
        <img src={imageUrl} className="travel-image" alt={name} />
        <div className="each-travel-text-container">
          <h1 className="inside-card-heading">{name}</h1>
          <p className="inside-card-description">{description}</p>
        </div>
      </div>
    </li>
  )
}

export default TravelPlaces
