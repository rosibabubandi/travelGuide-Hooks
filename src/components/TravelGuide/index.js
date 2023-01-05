import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'

import TravelPlaces from '../TravelPlaces'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
}

const TravelGuide = () => {
  const [travelGuideStatus, setTravelGuideStatus] = useState(
    apiStatusConstants.initial,
  )
  const [travelData, setTravelData] = useState([])

  const getTravelData = async () => {
    setTravelGuideStatus(apiStatusConstants.inProgress)

    const apiUrl = 'https://apis.ccbp.in/tg/packages'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const travelRawData = await response.json()
      const travelFetchedData = travelRawData.packages.map(eachPackage => ({
        id: eachPackage.id,
        name: eachPackage.name,
        imageUrl: eachPackage.image_url,
        description: eachPackage.description,
      }))

      setTravelGuideStatus(apiStatusConstants.success)
      setTravelData(travelFetchedData)
    }
  }
  useEffect(() => {
    getTravelData()
  }, [])
  const getInProgressView = () => (
    <div className="loading-container" data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  const getSuccessView = () => (
    <ul className="travel-guide-container">
      {travelData.map(eachPlace => (
        <TravelPlaces key={eachPlace.id} packageDetails={eachPlace} />
      ))}
    </ul>
  )

  const getTravelGuideViews = () => {
    switch (travelGuideStatus) {
      case apiStatusConstants.inProgress:
        return getInProgressView()
      case apiStatusConstants.success:
        return getSuccessView()
      default:
        return null
    }
  }
  return (
    <div className="main-container">
      <h1 className="travel-guide-heading">Travel Guide</h1>
      {getTravelGuideViews()}
    </div>
  )
}

export default TravelGuide
