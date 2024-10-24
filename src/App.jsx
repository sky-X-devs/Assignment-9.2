import { useEffect, useState } from "react";

function App() {
  const [time, setTime] = useState(0); // total time in seconds
  const [isRunning, setIsRunning] = useState(false); // whether the timer is running
  const [editState, setEditState] = useState({
    field: '', // tracks whether user is editing hours, minutes, or seconds
    value: { hours: '00', minutes: '00', seconds: '00' }, // input values for time
  });

  // Countdown logic: 
    useEffect(() => {
    let interval = null;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time <= 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [time, isRunning]);

  // Format time into hours, minutes, and seconds
  function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return {
      hours: String(hours).padStart(2, '0'),
      minutes: String(minutes).padStart(2, '0'),
      seconds: String(secs).padStart(2, '0'),
    };
  }

  // Calculate total time in seconds from hours, minutes, seconds
  function calculateTime(hours, minutes, seconds) {
    return parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
  }

  // Handle editing of the time fields (hours, minutes, or seconds)
  const handleEditField = (field) => {
    if (editState.field === field) {
      // Save the new time if currently editing the same field
      const newTime = {
        ...formatTime(time),
        [field]: editState.value[field].padStart(2, '0'),
      };
      const calculatedTime = calculateTime(
        newTime.hours,
        newTime.minutes,
        newTime.seconds
      );
      setTime(calculatedTime);
      setEditState({ field: '', value: newTime });
    } else {
      // Prepare for editing the clicked field
      const formattedTime = formatTime(time);
      setEditState({
        field,
        value: formattedTime,
      });
      setIsRunning(false); // Pause the timer while editing
    }
  };

  // Update the input value as the user types
  const handleInputChange = (e, field) => {
    setEditState((prevState) => ({
      ...prevState,
      value: {
        ...prevState.value,
        [field]: e.target.value,
      },
    }));
  };

  // Start, pause, or reset the timer
  const toggleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setTime(0);
    setIsRunning(false);
  };

  return (
    <div>
      <div>
        <span onDoubleClick={() => handleEditField('hours')}>
          {editState.field === 'hours' ? (
            <input
				maxLength={2}	
              value={editState.value.hours}
              onChange={(e) => handleInputChange(e, 'hours')}
            />
          ) : (
            formatTime(time).hours
          )}
        </span>
        :
        <span onDoubleClick={() => handleEditField('minutes')}>
          {editState.field === 'minutes' ? (
            <input 
				maxLength={2}	
              value={editState.value.minutes}
              onChange={(e) => handleInputChange(e, 'minutes')}
            />
          ) : (
            formatTime(time).minutes
          )}
        </span>
        :
        <span onDoubleClick={() => handleEditField('seconds')}>
          {editState.field === 'seconds' ? (
            <input 	
              value={editState.value.seconds}
              onChange={(e) => handleInputChange(e, 'seconds')}
            />
          ) : (
            formatTime(time).seconds
          )}
        </span>
      </div>

      <button onClick={toggleStartPause}>
        {isRunning ? "Pause" : "Start"}
      </button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
}

export default App;
