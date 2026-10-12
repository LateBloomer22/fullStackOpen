import React from 'react'

const Notification = ({message, success}) => {
    if (message == null) {
        return null;
    }
  return (
    <div className={success ? 'add-notification' : 'remove-notification'}>
        {message}
    </div>
  )
}

export default Notification