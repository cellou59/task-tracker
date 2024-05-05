
import * as React from 'react'
import {diffTime} from '../helper'

const TrackerRow = ({tracker, selectedId, onSelected}) => {
  const startTime = new Date(tracker?.starttime).toLocaleString()
  const endTime = tracker?.endtime
    ? new Date(tracker?.endtime).toLocaleString()
    : 'en cours ...'

  const [duration, setDuration] = React.useState(
    diffTime(tracker?.starttime, tracker?.endtime),
  )


  React.useEffect(() => {
    const refresh = () => {
      setDuration(diffTime(tracker?.starttime, tracker?.endtime))
    }
    const timerID = setTimeout(() => refresh(), 1000)
    return () => {
      clearTimeout(timerID)
    }

  }, [duration, tracker?.endtime, tracker?.starttime])

  const handleClick = e => {
    onSelected(tracker)
  }
  const selected = tracker.id === selectedId ? 'selectedline' : ''
  return (
    <tr className={selected} onClick={handleClick}>
      <td>{tracker.name}</td>
      <td>{startTime}</td>
      <td>{endTime ? endTime : 'en cours ...'}</td>
      <td>{duration}</td> 
    </tr>
  )
}

export {TrackerRow}