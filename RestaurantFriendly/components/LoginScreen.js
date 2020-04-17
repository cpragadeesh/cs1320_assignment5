import React from 'react';
import { StyleSheet, View, Button, TextInput, Text, Alert } from 'react-native';

class LoginScreen extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: ""
		}
	}

	onSignupPress = () => {
		this.props.navigation.navigate("Signup");
	}

	onLoginPress = () => {

		if (this.state.username === "" || this.state.password === "") {
			Alert.alert(
		      'Invalid information',
		      'Either your username or password is blank.',
		      [
		        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
		        {text: 'OK', onPress: () => console.log('OK Pressed')},
		      ],
		      { cancelable: false }
		    );
		} else {
			this.props.navigation.navigate("Home", {
				username: this.state.username
			})
		}
	}

	render() {
		return (
			<View 
				style={styles.container}>
			    <TextInput
			    	autoCompleteType='email'
			    	placeholder='username'
			    	style={styles.inputBox}
			    	onChangeText={(username) => this.setState({username: username})} />
		    	<TextInput
			    	autoCompleteType='password'
			    	placeholder='password'
			    	style={styles.inputBox}
			    	onChangeText={(password) => this.setState({password: password})} />
			    <Button
					title="Login"
					style={styles.button}
					onPress={this.onLoginPress}
			    />
			    <Button
					title="Signup"
					style={styles.button}
					onPress={this.onSignupPress}
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
    justifyContent: "center",
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
  	marginBottom: 7,
  }
});

export default LoginScreen