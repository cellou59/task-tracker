import {useState} from 'react'
import db from '../data'

function TrackersApp() {
  const [allTrackers,setAllTrackers] = useState(db)
  const [filterText,setFilterText] = useState('')
  const [selectedTracker,setSelectedTracker] = useState({})

  return (
    <>
      <div>il y a {allTrackers.length} trackers</div>
      <ul>
        {allTrackers.map(tracker => (
          <li key={tracker.id}>{tracker.name}</li>
        ))}
      </ul>
    </>
  )
}
export {TrackersApp}
