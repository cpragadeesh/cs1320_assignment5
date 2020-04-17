import React from 'react';
import { StyleSheet, View, TextInput, Button, Text, Alert } from 'react-native';

class SignupScreen extends React.Component {

	constructor(props) {
		super(props);
	}

	onSignupPress = () => {
		if (this.state.username === ""
			|| (this.state.password !== this.state.password2)) {
				Alert.alert(
			      'Invalid information',
			      'Either your username is blank or passwords are not matching.',
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
			<View style={styles.container}>
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
			    <TextInput
			    	autoCompleteType='password'
			    	placeholder='confirm password'
			    	style={styles.inputBox}
			    	onChangeText={(password) => this.setState({password2: password})} />
			    <Button
					title="Signup"
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

export default SignupScreen