/* eslint-disable no-unused-vars */
import * as React from 'react'
import {useEditTracker} from '../useEditTracker'
import {v4 as uuidv4} from 'uuid'
import {getDateTimeForPicker} from '../helper'

const boilerTracker = () => ({
  id: uuidv4(),
  category: 'Défaut',
  starttime: getDateTimeForPicker(),
  endtime: '',
  name: '',
})

const TrackerEditForm = ({
  selectedTracker = { ...boilerTracker(),id: ''},
  onAddTracker,
  onDeleteTracker,
  onUpdateTracker,
}) => {
  const {
    tracker,
    error,
    activeButtons,
    activeInput,
    setTracker,
    editTracker,
    saveTracker,
    updateTracker,
    deleteTracker,
    newTracker,
    failTracker
  } = useEditTracker(selectedTracker)

  const handleTrackerName = e => {
    const updatedTracker = {...tracker, name: e.target.value}
    setTracker(updatedTracker)
  }
  const handleTrackerStartTime = e => {
    const updatedTracker = {...tracker, starttime: e.target.value}
    setTracker(updatedTracker)
  }
  const handleTrackerEndTime = e => {
    const updatedTracker = {...tracker, endtime: e.target.value}
    setTracker(updatedTracker)
  }
  const handleTrackerCategory = e => {
    const updatedTracker = {...tracker, category: e.target.value}
    setTracker(updatedTracker)
  }

  React.useEffect(() => {
    if (selectedTracker?.id !== '') {
      editTracker(selectedTracker)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTracker])

  const handleOnSubmit = e => {
    e.preventDefault()
    onAddTracker(tracker)
    saveTracker()
  }

  const handleUpdateTracker = () => {
    if(tracker.name === '' || tracker.name === null){
      failTracker('name')
      return
    }
    updateTracker()
    onUpdateTracker(tracker)
  }

  const handleDeleteTracker = () => {
    if(tracker.id === '' || tracker.id === null){
      failTracker('id')
      return
    }
    onDeleteTracker(tracker)
    deleteTracker(boilerTracker()) 
  }

  const handleNewTracker = () => {
    newTracker(boilerTracker())
  }

  return (
    <>
      <form className="Form" onSubmit={handleOnSubmit}>
        <fieldset>
          <legend>Gestion des Trackers</legend>
          <label htmlFor="trackerName">Nom du tracker : </label>
          <input
            disabled={!activeInput}
            type="text"
            id="trackerName"
            placeholder="tracker name..."
            onChange={handleTrackerName}
            value={tracker.name}
          ></input>

          <label htmlFor="trackerDateStart">Date de début : </label>
          <input
            disabled={!activeInput}
            id="trackerDateStart"
            type="datetime-local"
            placeholder="durée..."
            onChange={handleTrackerStartTime}
            value={tracker.starttime}
            step="2"
          ></input>

          <label htmlFor="trackerDateEnd">Date de fin : </label>

          <input
            disabled={!activeInput}
            id="trackerDateEnd"
            type="datetime-local"
            placeholder="durée..."
            onChange={handleTrackerEndTime}
            value={tracker.endtime}
            step="2"
          ></input>

          <label>
            Categorie:
            <select
              disabled={!activeInput}
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
              value="Nouveau Tracker"
              onClick={handleNewTracker}
            ></input>
            <input
              disabled={!activeButtons.btnSave}
              type="submit"
              value="Ajouter"
            ></input>
            <input
              disabled={!activeButtons.btnDel}
              type="button"
              value="Supprimer"
              onClick={handleDeleteTracker}
            ></input>
            <input
              disabled={!activeButtons.btnUp}
              type="button"
              value="Mettre à jour"
              onClick={handleUpdateTracker}
            ></input>
          </div>
        </fieldset>
        {error ?
         (<div style={{color:'red'}}>{error}</div>)
         :null
        }
      </form>
    </>
  )
}

export {TrackerEditForm}
