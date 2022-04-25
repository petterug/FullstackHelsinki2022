const Notification = ({message}) => {
    if(message === null) {
      return null
    }
    const splitMessage = message.split(",")

    if(splitMessage[0] === 'success') {
      return (
          <div className="success">
            Added {splitMessage[1]}
          </div>
      )
    }

    if(splitMessage[0] === 'error') {
      return (
          <div className="error">
            Information of {splitMessage[1]} has already been removed from server
          </div>
      )
    }
}

export default Notification