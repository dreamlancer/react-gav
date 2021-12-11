import { useState } from 'react'
import { toast } from 'react-toastify'
import moment from 'moment'

// convert object to FormData
export const notify = (type, message) => {
  if (type === 'success') {
    toast.success(message, {
      style: { fontSize: 16 },
    })
  } else if (type === 'error') {
    // if (!message) message = 'Something Went Wrong. Try Again!'
    toast.error(message, {
      style: { fontSize: 16 },
    })
  } else if (type === 'warning') {
    toast.warning(message)
  } else {
    toast(message)
  }
}

// custom helper to take input field
export const useInput = (initialValue = '') => {
  const [value, setValue] = useState(initialValue)
  const handleChange = (e) => setValue(e.target.value)
  return [value, handleChange, setValue]
}

export const ratingDate = (date) => {
  return  moment.utc(date ).local().format('DD/MMM/YYYY');
}