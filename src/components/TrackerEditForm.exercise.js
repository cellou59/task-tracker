/* eslint-disable no-unused-vars */
import * as React from 'react'
import {v4 as uuidv4} from 'uuid'
import {getDateTimeForPicker} from '../helper'

const reducer = (state, action) => {
  console.log('🚀 ~ reducer ~ action.type:', action.type)
  switch (action.type) {
    case 'new':
      return {
        status: 'new',
        tracker: action.payload,
        activeButtons: {btnSave: true, btnUp: false, btnDel: false},
        activeInput: true,
        error: null,
      }
    case 'edit':
      return {
        status: 'edit',
        tracker: action.payload,
        activeButtons: {btnSave: false, btnUp: true, btnDel: true},
        activeInput: true,
        error: null,
      }
    case 'save':
      return {
        ...state,
        status: 'saved',
        tracker: action.payload,
        activeButtons: {btnSave: false, btnUp: false, btnDel: false},
        activeInput: false,
        error: null,
      }
    case 'update':
      return {
        ...state,
        status: 'updated',
        activeButtons: {btnSave: false, btnUp: true, btnDel: true},
        activeInput: true,
      }
    case 'delete':
      return {
        ...state,
        status: 'deleted',
        tracker: action.payload,
        activeButtons: {btnSave: false, btnUp: false, btnDel: false},
        activeInput: false,
        error: null,
      }

    // 🐶 continue pour 'update' 'delete' et 'fail'

    case 'trackerChange':
      return {
        ...state,
        status: 'trackerChange',
        tracker: action.payload,
        activeButtons: {...state.activeButtons},
        activeInput: true,
      }
    case 'fail':
      return {
        ...state,
        status: 'failed',
        error: `Operation failed : missing ${action.payload}`,
      }
    default:
      throw new Error('Action non supporté')
  }
}

const newTracker = () => ({
  id: uuidv4(),
  category: 'Défaut',
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
  const [state, dispatch] = React.useReducer(reducer, {
    tracker: selectedTracker,
    error: null,
    status: 'idle',
    activeButtons: {btnSave: false, btnUp: false, btnDel: false},
    activeInput: false,
  })

  const handleTrackerName = e => {
    const updatedTracker = {...state.tracker, name: e.target.value}
    dispatch({type: 'trackerChange', payload: updatedTracker})
  }
  const handleTrackerStartTime = e => {
    const updatedTracker = {...state.tracker, starttime: e.target.value}
    dispatch({type: 'trackerChange', payload: updatedTracker})
  }
  const handleTrackerEndTime = e => {
    const updatedTracker = {...state.tracker, endtime: e.target.value}
    dispatch({type: 'trackerChange', payload: updatedTracker})
  }
  const handleTrackerCategory = e => {
    const updatedTracker = {...state.tracker, category: e.target.value}
    dispatch({type: 'trackerChange', payload: updatedTracker})
  }

  React.useEffect(() => {
    if (selectedTracker?.id !== '') {
      dispatch({type: 'edit', payload: selectedTracker})
    }
  }, [selectedTracker])

  const handleOnSubmit = e => {
    e.preventDefault()
    onAddTracker(state.tracker)
    dispatch({type: 'save',payload: newTracker()})
  }

  const handleUpdateTracker = () => {
    if(state.tracker.name === '' || state.tracker.name === null){
      dispatch({type: 'fail', payload: 'name'})
      return
    }
    onUpdateTracker(state.tracker)
    dispatch({type: 'update'})
  }

  const handleDeleteTracker = () => {
    if(state.tracker.id === '' || state.tracker.id === null){
      dispatch({type: 'fail', payload: 'id'})
      return
    }
    onDeleteTracker(state.tracker)
    dispatch({type: 'delete', payload: newTracker()})
  }

  const handleNewTracker = () => {
    dispatch({type: 'new', payload: newTracker()})
  }

  return (
    <>
      <form className="Form" onSubmit={handleOnSubmit}>
        <fieldset>
          <legend>Gestion des Trackers</legend>
          <label htmlFor="trackerName">Nom du tracker : </label>
          <input
            disabled={!state.activeInput}
            type="text"
            id="trackerName"
            placeholder="tracker name..."
            onChange={handleTrackerName}
            value={state.tracker.name}
          ></input>

          <label htmlFor="trackerDateStart">Date de début : </label>
          <input
            disabled={!state.activeInput}
            id="trackerDateStart"
            type="datetime-local"
            placeholder="durée..."
            onChange={handleTrackerStartTime}
            value={state.tracker.starttime}
            step="2"
          ></input>

          <label htmlFor="trackerDateEnd">Date de fin : </label>

          <input
            disabled={!state.activeInput}
            id="trackerDateEnd"
            type="datetime-local"
            placeholder="durée..."
            onChange={handleTrackerEndTime}
            value={state.tracker.endtime}
            step="2"
          ></input>

          <label>
            Categorie:
            <select
              disabled={!state.activeInput}
              value={state.tracker.category}
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
              disabled={!state.activeButtons.btnSave}
              type="submit"
              value="Ajouter"
            ></input>
            <input
              disabled={!state.activeButtons.btnDel}
              type="button"
              value="Supprimer"
              onClick={handleDeleteTracker}
            ></input>
            <input
              disabled={!state.activeButtons.btnUp}
              type="button"
              value="Mettre à jour"
              onClick={handleUpdateTracker}
            ></input>
          </div>
        </fieldset>
        {state.error ?
         (<div style={{color:'red'}}>{state.error}</div>)
         :null
        }
      </form>
    </>
  )
}

export {TrackerEditForm}
