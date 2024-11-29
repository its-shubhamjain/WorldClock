# World Clock App

This is a React Native application that displays the current time for a selected city, state, or country. The app allows users to browse through a list of countries, states, and cities and dynamically fetches the corresponding time based on the selected location's latitude and longitude.

## Features

- **Country, State, and City Dropdowns**: Users can select a country, state, and city dynamically using dropdown menus.
- **Live Time Updates**: The app fetches the current time for the selected location and updates it every second.
- **Asynchronous Data Fetching**: Data for countries, states, and cities is fetched from a third-party API.
- **Error Handling**: Handles errors gracefully when fetching data from APIs.
- **Loading Indicators**: Displays a loader when data is being fetched.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/its-shubhamjain/WorldClock.git
   ```
2. Navigate to the project directory:
   ```bash
   cd WorldClock
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Usage

1. Start the application:
   ```bash
   npx react-native run-android   # For Android
   npx react-native run-ios       # For iOS
   ```

2. Select a country from the dropdown menu. States and cities will populate based on the selected country.
3. The app will fetch and display the current time for the selected location.

## Dependencies

- [React Native](https://reactnative.dev/): Framework for building native apps using React.
- [Axios](https://axios-http.com/): Promise-based HTTP client for fetching data.
- [react-native-dropdown-picker](https://hossein-zare.github.io/react-native-dropdown-picker-website/): Component for creating dropdown menus.

## API Usage

The app integrates with the following APIs:

1. **Country-State-City Search API**
   - Used to fetch countries, states, and cities dynamically.
   - API Documentation: [RapidAPI](https://rapidapi.com)

2. **World Time API**
   - Used to fetch the current time based on latitude and longitude.
   - API Documentation: [API Ninjas](https://api-ninjas.com)

## Environment Variables

To run the app, set your API keys in the code:

1. Replace `RAPID_API_KEY` with your RapidAPI key.
2. Replace the `X-Api-Key` for the World Time API with your own key.

## Screenshots

Add screenshots of the app here to showcase the functionality.

## Acknowledgments

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [RapidAPI](https://rapidapi.com) for providing APIs.
- [API Ninjas](https://api-ninjas.com) for time-related APIs.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
