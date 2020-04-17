import React from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';

class HomeScreen extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			username: props.route.params.username
		};
	}

	onFindNearbyClicked = () => {
		this.props.navigation.navigate("Restaurants");
	}

	render() {
		return (
			<View style={styles.container}>
				<Text
					style={styles.welcomeText}>Welcome, { this.state.username } </Text>
			    <Button
			    	style={styles.button}
					title="Find nearby restaurants"
					onPress={this.onFindNearbyClicked}
			    />
			</View>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#eaeaea",
    justifyContent: "space-around",
  },
  welcomeText: {
  	textAlign: "center"
  },
  inputBox: {
  	width: '70%',
  	marginBottom: 25,
  	marginLeft: 45,
  	height: 25,
	borderBottomColor: 'red',
	borderBottomWidth: 2
  },
  button: {
  	width: '50%',
  }
});

export default HomeScreen