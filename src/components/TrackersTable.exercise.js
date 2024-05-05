import * as React from 'react'
import './Trackers.css'
import {groupBy, diffTime} from '../helper'

const TrackerCategory = ({category}) => {
  return (
    <tr>
      <th className="th-category" colSpan="4">
        {category}
      </th>
    </tr>
  )
}

const TrackerRow = ({tracker}) => {
  const duration = diffTime(tracker?.starttime, tracker?.endtime )
  return (
    <tr>
      <td>{tracker.name}</td>
      <td>{tracker.starttime}</td>
      <td>{tracker.endtime}</td>
      <td>{duration}</td>
    </tr>
  )
}

const TrackersTable = ({trackers}) => {
  const rows = []
  let lastCategory =''
  const trackersParCategory = groupBy(trackers, 'category')
  
  Object.keys(trackersParCategory).forEach(category => {
    trackersParCategory[category].forEach(tracker => {
      if (tracker.category !== lastCategory) {
        rows.push(<TrackerCategory key={category} category={category}/>)

      }
      rows.push(<TrackerRow key={tracker.id} tracker={tracker}/>)
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
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    </>
  )
}

export {TrackersTable}
