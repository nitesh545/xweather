import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react';
import {Box, Button} from "@mui/material";


function App() {
	const [temp, setTemp] = useState(0.0);
	const [humidity, setHumidity] = useState(0.0);
	const [condition, setCondition] = useState('');
	const [windSpeed, setWindSpeed] = useState(0.0);
	const [cityName, setCityName] = useState('');
	const [searching, setSearhing] = useState(false);

	function fetchPlaces(city) {
		fetch(`https://api.weatherapi.com/v1/current.json?key=ee2961071b524586b39161743242909&q=${city}`)
			.then(res => res.json())
			.then((data) => {
				console.log(data.current);
				setTemp(data.current.temp_c);
				setHumidity(data.current.humidity);
				setCondition(data.current.condition.text);
				setWindSpeed(data.current.wind_kph);
				setSearhing(true);
			})
			.catch(err => {
				alert("Failed to fetch weather data");
			});
	}

	useEffect(() => {
		fetchPlaces();
	}, []);

	return (
		<div className="App">
			<Box sx={{display: 'flex', justifyContent: 'center', padding: '5rem'}}>
				<input type='text' placeholder='Enter city name' className='search-bar' onChange={(e) => {
					setCityName(e.target.value);
				}}/>
				<button className='search-btn' onClick={() => {
					console.log(cityName);
					fetchPlaces(cityName);
				}}>Search
				</button>
			</Box>
			{
				!searching ? (<p>Loading data...</p>) : (

					<div className='weather-cards'>
						<div className='weather-card'>
							<h4>Temperature</h4>
							<h5>{temp}</h5>
						</div>
						<div className='weather-card'>
							<h4>Humidity</h4>
							<h5>{humidity}</h5>
						</div>
						<div className='weather-card'>
							<h4>Condition</h4>
							<h5>{condition}</h5>
						</div>
						<div className='weather-card'>
							<h4>Wind Speed</h4>
							<h5>{windSpeed}</h5>
						</div>
					</div>)
			}
		</div>
	);
}

export default App;
