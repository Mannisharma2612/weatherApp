import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DangerZone } from 'expo';
const { DZ }  = DangerZone;
import { API_KEY } from './shared/WeatherApi';

import Weather from './components/weather';

export default class App extends React.Component {
  state = {
    isLoading: true,
    temperature: 0,
    weatherStatus: null,
    error: null
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      error => {
        this.setState({
          error: 'Error Getting Weather Conditions in Your Location'
        });
      }
    );
  }
  fetchWeather(lat,lon) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
    )
    .then(res => res.json())
    .then(json => {
      this.setState({
        temperature: json.main.temp,
        weatherStatus: json.weather[0].main,
        isLoading: false
      });
    });
  }

  render(){
    const { isLoading, weatherStatus, temperature } = this.state;
    return(
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Fetching The Weather</Text>
          </View>
        ) : (
          <Weather weather={weatherStatus} temperature={temperature} />
        )}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFDE4'
  },
  loadingText: {
    fontSize: 30
  }
});