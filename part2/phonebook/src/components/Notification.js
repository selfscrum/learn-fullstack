import React from 'react'

const Notification = ({ message, message_class }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className={message_class}>
        {message}
      </div>
    )
  }

  export default Notification