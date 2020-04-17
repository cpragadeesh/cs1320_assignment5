import React from 'react';
import { StyleSheet, View, TextInput, Button, Text, FlatList, ListItem, TouchableHighlight } from 'react-native';

import * as Location from 'expo-location';

const API = {
	key: "AIzaSyD6w0kn3fFTRyNV9EucVbJTYy5c13SpomY"
};

class Restaurant extends React.Component {
  render() {
    return <TouchableHighlight  style={styles.row} >
    			<Text> {this.props.restaurant.name} </Text>
    		</TouchableHighlight>;
  }
}

class RestaurantsScreen extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			lat: 0,
			lng: 0,
			restaurants: [],
			select_res: [],
			is_loading: true
		}
	}

	componentDidMount() {
		this.getLocation().then((location) => {
			this.setState({
				lat: location.coords.latitude,
				lng: location.coords.longitude
			});

			this.updateRestaurants();
		});
	}

	updateRestaurants = () => {
		places_url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + this.state.lat.toString() + ',' + this.state.lng.toString() + "&radius=1500&type=restaurant&key=AIzaSyD6w0kn3fFTRyNV9EucVbJTYy5c13SpomY"
		console.log(places_url)
		fetch(places_url)
		  .then((response) => {
		    return response.json();
		  })
		  .then((data) => {
		    this.setState({restaurants: data.results.slice(0, 10)})
		    this.setState({select_res: data.results.slice(0, 10)})
		    this.setState({is_loading: false})
		  });
	}

	getLocation = async() => {
		let { status } = await Location.requestPermissionsAsync();
		if (status !== 'granted') {
			setErrorMsg('Permission to access location was denied');
		}

		let location = await Location.getCurrentPositionAsync({});
		return location;
	}

	renderRow = ({item, index}) => {
		return <Restaurant restaurant={item}/>
	}

	onChangeText = (text) => {
		if (text === "") {
			this.setState({select_res: this.state.restaurants});
		} else {
			var filter_res = this.state.restaurants.filter( function (res) {
				return res.name.toLowerCase().indexOf(text.toLowerCase()) !== -1;
			});
			this.setState({select_res: filter_res});
		}
	}

	render() {
		return (
			<View style={styles.container}>
			    <TextInput
			      style={{ marginBottom: 10, height: 40, borderColor: 'blue', borderWidth: 1 }}
			      onChangeText={text => this.onChangeText(text)}
			      placeholder="Search for restaurant"
			    />
			    { this.state.is_loading ? 
			    	<Text> Fetching nearby restaurants </Text>
					: <FlatList
						data={this.state.select_res}
						renderItem={this.renderRow}
					  />}
			</View>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eaeaea",
    justifyContent: "center",
  },
  inputBox: {
  	width: '70%',
  	marginBottom: 25,
  	marginLeft: 45,
  	height: 25,
  	alignSelf: "flex-start",
	borderBottomColor: 'red',
	borderBottomWidth: 2
  },
  button: {
  	width: '50%',
  	marginBottom: 7,
  },
  row: {
  	height: 40,
  	paddingLeft: 5,
  	flex: 1,
  	justifyContent: 'center',
  	borderColor: 'gray',
  	borderBottomWidth: 1,
  }
});

export default RestaurantsScreen