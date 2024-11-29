import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Button, ActivityIndicator} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';

const WorldClockScreen = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState({
    label: '',
    value: '',
    latitude: '',
    longitude: '',
  });
  const [selectedState, setSelectedState] = useState({
    label: '',
    value: '',
    latitude: '',
    longitude: '',
  });
  const [selectedCity, setSelectedCity] = useState({
    label: '',
    value: '',
    latitude: '',
    longitude: '',
  });

  const [time, setTime] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const [isRunning, setIsRunning] = useState(false);

  const [countryOpen, setCountryOpen] = useState(false);
  const [stateOpen, setStateOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);

  const RAPID_API_KEY = '026330963fmshde8414f87803fbcp1fe36djsnaab7fd69651c';

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          'https://country-state-city-search-rest-api.p.rapidapi.com/allcountries',
          {
            headers: {
              'x-rapidapi-key': RAPID_API_KEY,
              'x-rapidapi-host':
                'country-state-city-search-rest-api.p.rapidapi.com',
            },
          },
        );
        setCountries(
          response.data.map((country) => ({
            label: country.name,
            value: country.isoCode,
            latitude: country.latitude,
            longitude: country.longitude,
          })),
        );
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    if (!selectedCountry.value) return;

    const fetchStates = async () => {
      try {
        const response = await axios.get(
          `https://country-state-city-search-rest-api.p.rapidapi.com/states-by-countrycode?countrycode=${selectedCountry.value}`,
          {
            headers: {
              'x-rapidapi-key': RAPID_API_KEY,
              'x-rapidapi-host':
                'country-state-city-search-rest-api.p.rapidapi.com',
            },
          },
        );
        
        setStates(
          response.data.map((state) => ({
            label: state.name,
            value: state.isoCode,
            latitude: state.latitude,
            longitude: state.longitude,
          })),
        );
        setCities([]);
        setLatitude(selectedCountry.latitude);
        setLongitude(selectedCountry.longitude);
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    };
    fetchStates();
  }, [selectedCountry]);

  useEffect(() => {
    if (!selectedState.value) return;

    const fetchCities = async () => {
      try {
        const response = await axios.get(
          `https://country-state-city-search-rest-api.p.rapidapi.com/cities-by-countrycode-and-statecode?countrycode=${selectedCountry.value}&statecode=${selectedState.value}`,
          {
            headers: {
              'x-rapidapi-key': RAPID_API_KEY,
              'x-rapidapi-host':
                'country-state-city-search-rest-api.p.rapidapi.com',
            },
          },
        );
        setCities(
          response.data.map((city) => ({
            label: city.name,
            value: city.name,
            latitude: city.latitude,
            longitude: city.longitude,
          })),
        );
        setLatitude(selectedState.latitude);
        setLongitude(selectedState.longitude);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };
    fetchCities();
  }, [selectedState]);

  useEffect(() => {
    if (selectedCity.value) {
      setLatitude(selectedCity.latitude);
      setLongitude(selectedCity.longitude);
    }
  }, [selectedCity]);

  const fetchTime = async () => {
    if (latitude === null || longitude === null) return;
    try {
      const response = await axios.get(
        `https://api.api-ninjas.com/v1/worldtime?lat=${latitude}&lon=${longitude}`,
        {
          headers: {
            'X-Api-Key': 'XcTKUawzovKRskNLH0pUIg==OnJzyjB8M87RT4qb',
          },
        },
      );
      setTime(response.data.datetime);
    } catch (error) {
      console.error('Error fetching time:', error);
    }
  };

  useEffect(() => {
    if (latitude) {
      fetchTime();
      const interval = setInterval(() => {
        setTime(prevTime => {
          
          if (prevTime) {
            const date = new Date(prevTime);
            
            date.setSeconds(date.getSeconds() + 1);
            return date.toISOString();
          }
          return prevTime;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [latitude]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>World Clock</Text>

      {countries.length === 0 ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={{zIndex: 10}}>
          <DropDownPicker
            open={countryOpen}
            setOpen={setCountryOpen}
            value={selectedCountry.value}
            items={countries}
            placeholder="Select Country"
            style={styles.dropdown}
            onSelectItem={item => {
              setSelectedCountry(item);
              setLatitude(item.latitude);
              setLongitude(item.longitude);
            }}
          />
        </View>
      )}

      {states.length > 0 && (
        <View style={{zIndex: 5}}>
          <DropDownPicker
            open={stateOpen}
            setOpen={setStateOpen}
            value={selectedState.value}
            items={states}
            placeholder="Select State"
            style={styles.dropdown}
            onSelectItem={item => {
              setSelectedState(item);
              setLatitude(item.latitude);
              setLongitude(item.longitude);
            }}
          />
        </View>
      )}

      {cities.length > 0 && (
        <View style={{zIndex: 1}}>
          <DropDownPicker
            open={cityOpen}
            setOpen={setCityOpen}
            value={selectedCity.value}
            items={cities}
            placeholder="Select City"
            style={styles.dropdown}
            onSelectItem={item => {
              setSelectedCity(item);
              setLatitude(item.latitude);
              setLongitude(item.longitude);
            }}
          />
        </View>
      )}

      <Text style={styles.time}>
        {time
          ? `Time: ${new Date(time).toLocaleTimeString()}`
          : 'Choose a country and press start'}
      </Text>

      {/* <Button
        title={isRunning ? 'Pause' : 'Start'}
        onPress={() => {
          if (isRunning) {
            setIsRunning(false);
          } else {
            setIsRunning(true);
            fetchTime();
          }
        }}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  time: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  dropdown: {
    marginBottom: 16,
  },
});

export default WorldClockScreen;
