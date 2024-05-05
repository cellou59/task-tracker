import * as React from 'react'
import './Trackers.css'
import {groupBy, diffTime} from '../helper'
import {TrackerCategory} from './TrackerCategory'


const TrackerRow = ({tracker,selectedId,onSelected}) => {
  const duration = diffTime(tracker?.starttime, tracker?.endtime)
  const handleClick = (id) => {
    onSelected(id)
  }
  return (
    <tr className={selectedId === tracker.id ? 'selectedLine':null} onClick={()=>handleClick(tracker)}>
      <td>{tracker.name}</td>
      <td>{tracker.starttime}</td>
      <td>{tracker.endtime}</td>
      <td>{duration}</td>
    </tr>
  )
}


const TrackersTable = ({trackers,selectedTracker,onSelectedTracker}) => {
  const rows = []
  let lastCategory = ''

  const trackersParCategory = groupBy(trackers, 'category')
  Object.keys(trackersParCategory).forEach(category => {
    trackersParCategory[category].forEach(tracker => {
      if (tracker.category !== lastCategory) {
        rows.push(
          <TrackerCategory
            key={category}
            category={tracker.category}
          ></TrackerCategory>,
        )
      }
      rows.push(<TrackerRow 
        key={tracker.id} 
        tracker={tracker} 
        selectedTracker={selectedTracker} 
        onSelected={(tracker) =>  onSelectedTracker(tracker)}
        selectedId={selectedTracker.id}
        ></TrackerRow>)

      lastCategory = tracker.category
    })
  })

  return (
    <>
      <h2>Liste des trackers</h2>
      <div className="TableContainer">
        <table>
          <thead>
            <tr>
              <th>Nom du Tracker</th>
              <th>Début</th>
              <th>Fin</th>
              <th>Durée</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    </>
  )
}

export {TrackersTable}
