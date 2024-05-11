/* eslint-disable no-unused-vars */
import * as React from 'react'
import {FilterTrackers} from './FilterTrackers'
import {TrackersTable} from './TrackersTable'
import {TrackerEditForm} from './TrackerEditForm'
import db from '../data'

function TrackersApp() {
  const [allTrackers, setAllTrackers] = React.useState(db)
  const [filterText, setFilterText] = React.useState('')
  const [selectedTracker, setSelectedTracker] = React.useState()

  const handleTextChange = text => {
    setFilterText(text)
    const filteredTracker = db.filter(
      track => track.name.toLowerCase().indexOf(text) !== -1,
    )
    setAllTrackers(filteredTracker)
  }
  const handleAddTracker = (newTracker) =>{
    if(newTracker.name === '' ||  !!newTracker?.name) {
      alert('veuillez renseigner le nom du tracker')
      return
    }

    setAllTrackers([...allTrackers,newTracker])
  }
  const handleDeleteTracker = (trackerId) =>{
    if(!trackerId) {
      alert('il manque le tracker id')
      return
    }
    const filteredTracker = allTrackers.filter(tracker => tracker.id !== trackerId)
    setAllTrackers(filteredTracker)
  }
  const handleUpdateTracker = (updatedTracker) =>{
    let missingInfo = []
     Object.entries(updatedTracker).forEach((prop) => {
      const [key,value] = prop
      if((!value || value ==='') && key !== 'endtime' ){
        missingInfo.push(key)
      }
    })
    if(missingInfo.length > 0) {
      alert(`veuillez renseigner : ${missingInfo.join(', ')}`)
    }
    const updatedTrackers = allTrackers.map( tracker => tracker.id === updatedTracker.id ? updatedTracker :tracker )
    setAllTrackers(updatedTrackers)
  }
  return (
    <div>
      <FilterTrackers onTextChange={handleTextChange} />
      <TrackerEditForm 
        selectedTracker={selectedTracker} 
        onAddTracker={handleAddTracker}
        onDeleteTracker={handleDeleteTracker}
        onUpdateTracker={handleUpdateTracker}
      /> 
      <TrackersTable
        trackers={allTrackers}
        selectedTracker={selectedTracker}
        onSelectedTracker={setSelectedTracker}
      />
    </div>
  )
}
export {TrackersApp}
