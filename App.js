import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';

const App = () => {
  const [location, setLocation] = useState(null);
  const [forecast, setForecast] = useState([]);
  const API_KEY = 'YOUR_API_KEY';

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Location permission not granted');
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      fetchWeather(currentLocation.coords.latitude, currentLocation.coords.longitude);
    })();
  }, []);

  const fetchWeather = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );
      setForecast(response.data.list);
    } catch (error) {
      console.error('Error fetching weather data', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weekly Weather Forecast</Text>
      {forecast.map((day, index) => (
        <View key={index} style={styles.day}>
          <Text>Date: {day.dt_txt}</Text>
          <Text>Temperature: {day.main.temp} °C</Text>
          <Text>Humidity: {day.main.humidity}%</Text>
          <Text>Rain: {day.rain ? day.rain['3h'] : '0'} mm</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  day: {
    marginVertical: 10,
  },
});

export default App;
