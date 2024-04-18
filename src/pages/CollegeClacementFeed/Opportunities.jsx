import React from 'react'
import PlacementFeed from './PlacementFeed/PlacementFeed'
import WorkShop from './WorkShop/WorkShop'


const Opportunities = () => {
  return (
    <div>
      <h1 className=' text-4xl  font-semibold   text-orange-500'>Opportunities</h1>


      <PlacementFeed />
     <WorkShop/>
    </div>
  )
}

export default Opportunities
