import { useEffect,useState } from "react";
function App(){
	const [time , setTime] = useState(0);
	const [isRunning , setisRunning] = useState(false);
	const [editState,setEditState] = useState({field:'',value:{hours: '01',minutes:'00',seconds:'00'}});
	
	useEffect(()=>{
		if(time>0 && isRunning){
			const Interval = setInterval(() => {
				setTime(c=>c-1);
			}, 1000);
			return ()=>{clearInterval(Interval);}
		}else{
			setisRunning(false)
		}
	},[time,isRunning]);

	const handleEditField = (field)=>{
		console.log("handleEditField called")
		if(editState.field === field){
			const newTime = {
				...formatTime(time),
				[field]:editState.value.padStart(2,'0')
			};
			const calculatedTime = calculateTime(newTime.hours,newTime.minutes,newTime.seconds);
			setTime(calculatedTime);
			setEditState({field:null,value:null});
		}else{
			setisRunning(false);
		}
	}
	function InputHandling(e){
		console.log("inputhandling called");
		setEditState(editState.value.e.target.value);
	}

	function PauseStart(){
		console.log("pauseStart called")
		setisRunning(!isRunning);
	}

	function formatTime(time) {
		console.log("formatTime called")
		const hours = Math.floor(time / 3600);
		const minutes = Math.floor((time % 3600) / 60);
		const seconds = Math.floor(time % 60);
	  
		setEditState({
		  field: '',
		  value: {
			hours: String(hours).padStart(2, '0'),
			minutes: String(minutes).padStart(2, '0'),
			seconds: String(seconds).padStart(2, '0')
		  }
		});
	  }
		  

	function calculateTime(hours,minutes,seconds){
		const calculatedTime = parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
		return isNaN(calculatedTime) ? 0 : calculatedTime;
	}
	
	return(
		<div>
			<span onClick={PauseStart} onDoubleClickCapture={InputHandling}>
  				Hours: {editState.value ? editState.value.hours : '00'}
			</span>
			<span onClick={PauseStart} onDoubleClickCapture={InputHandling}>
				minutes: {editState.value ? editState.value.minutes : '00'}
			</span>

			<span onClick={PauseStart} onDoubleClickCapture={InputHandling}>
				seconds: {editState.value ? editState.value.seconds : '00'}
			</span>

			<button onClick={PauseStart}>{isRunning?"Pause":"Start"}</button>
		</div>
	)
}
export default App;