import * as React from 'react'

const reducer = (state, action) => {
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
        error: null,
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

export function useEditTracker(defaultTracker) {

  const [state, dispatch] = React.useReducer(reducer, {
    tracker: defaultTracker,
    error: null,
    status: 'idle',
    activeButtons: {btnSave: false, btnUp: false, btnDel: false},
    activeInput: false,
  })
  const editTracker = selectedTracker => {
    dispatch({type: 'edit', payload: selectedTracker})
  }

  const saveTracker = () => {
    dispatch({type: 'save'})
  }

  const updateTracker = () => {
    dispatch({type: 'update'})
  }

  const deleteTracker = (newTracker) => {
    dispatch({type: 'delete', payload: newTracker})
  }

  const newTracker = (newTracker) => {
    dispatch({type: 'new', payload: newTracker})
  }

  const setTracker = (changedTracker) => {
    dispatch({type: 'trackerChange', payload: changedTracker})
  }
  const failTracker = (missingAttribute) => {
    dispatch({type: 'trackerChange', payload: missingAttribute})
  }
  const {tracker, error, status, activeButtons, activeInput} = state
  return {
    tracker,
    error,
    status,
    activeButtons,
    activeInput,
    setTracker,
    editTracker,
    saveTracker,
    updateTracker,
    deleteTracker,
    newTracker,
    failTracker
  }
}