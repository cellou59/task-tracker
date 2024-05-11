/* eslint-disable no-unused-vars */
import * as React from 'react'
import {v4 as uuidv4} from 'uuid'
import {getDateTimeForPicker} from '../helper'

const newTracker = () => ({
  id: uuidv4(),
  category: 'Défault',
  starttime: getDateTimeForPicker(),
  endtime: '',
  name: '',
})

const TrackerEditForm = ({
  selectedTracker = {...newTracker(), id: ''},
  onAddTracker,
  onDeleteTracker,
  onUpdateTracker,
}) => {
  const [tracker, setTracker] = React.useState(selectedTracker)

  const handleTrackerName = e => {
    setTracker({...tracker, name: e.target.value})
  }
  const handleTrackerStartTime = e => {
    setTracker({...tracker, starttime: e.target.value})
  }
  const handleTrackerEndTime = e => {
    setTracker({...tracker, endtime: e.target.value})
  }
  const handleTrackerCategory = e => {
    setTracker({...tracker, category: e.target.value})
  }
  const handleOnSubmit = e => {
    e.preventDefault()
    onAddTracker(tracker)
  }
  const handleUpdateTracker = () => {
    onUpdateTracker(tracker)
  }
  const handleDeleteTracker = () => {
    onDeleteTracker(tracker.id)
  }
  const handleNewTracker = () => {
    setTracker(newTracker())
  }

  React.useEffect(() => {
    if (selectedTracker?.id !== '' && selectedTracker?.id !== tracker.id) {
      setTracker(selectedTracker)
    }
  
  }, [tracker, setTracker, selectedTracker])

  const disabled = tracker.id === '' ? true : false

  return (
    <>
      <form className="Form" onSubmit={handleOnSubmit}>
        <fieldset>
          <legend>Gestion des Trackers</legend>
          <label htmlFor="trackerName">Nom du tracker : </label>
          <input
            disabled={disabled}
            type="text"
            id="trackerName"
            placeholder="Nom"
            onChange={handleTrackerName}
            value={tracker.name}
          ></input>

          <label htmlFor="trackerStartTime">Date de début :</label>
          <input
            disabled={disabled}
            type="datetime-local"
            id="trackerStartTime"
            placeholder="Date JJ/MM/AAAA"
            onChange={handleTrackerStartTime}
            value={tracker.starttime}
            step="2"
          ></input>

          <label htmlFor="trackerEndTime">Date de fin :</label>
          <input
            disabled={disabled}
            type="datetime-local"
            id="trackerEndTime"
            placeholder="Date JJ/MM/AAAA"
            onChange={handleTrackerEndTime}
            value={tracker.endtime}
            step="2"
          ></input>

          <label>
            Categorie:
            <select
              disabled={disabled}
              value={tracker.category}
              onChange={handleTrackerCategory}
            >
              <option value="Sport">Sport</option>
              <option value="Code">Code</option>
              <option value="Perso">Perso</option>
              <option value="Défaut">Défaut</option>
            </select>
          </label>
          <label>Actions</label>
          <div className="Action">
            <input
              type="button"
              value="Nouveau tracker"
              onClick={handleNewTracker}
             
            />
            <input disabled={disabled} type="submit" value="Ajouter"/>
            <input
              type="button"
              onClick={handleDeleteTracker}
              value="Supprimer le tracker"
             
            />
            <input
              type="button"
              onClick={handleUpdateTracker}
              value="Modifier le tracker"
              
            />
          </div>
        </fieldset>
      </form>
    </>
  )
}

export {TrackerEditForm}
