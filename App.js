import React, { Component } from "react";
import { Button, Icon, View } from "native-base";
import { Animated, Easing, NetInfo } from "react-native";
import { Provider } from "react-redux";
import store from "./src/reducers";
import Main from "./src/screens/main";
// import VideoList from "./src/screens/video-list";
// import Video from "./src/screens/youtube";
import MessageScreen from "./src/screens/message-screen";
import { createStackNavigator, HeaderBackBtton, createAppContainer } from "react-navigation";
const option = {
	headerStyle: {
		backgroundColor: "#ba2a6a"
	},
	headerTintColor: "#fff",
	headerTitleStyle: {
		fontWeight: "normal",
		fontSize: 17
	}
};
const MainNav = createStackNavigator(
	{
		Main: {
			screen: Main,
			navigationOptions: ({ navigation }) => ({
				title: "Happy Valentine Week"
			})
		},
		MessageScreen: {
			screen: MessageScreen,
			navigationOptions: {
				header: null
			}
		}
		// Video: Video
	},
	{
		defaultNavigationOptions: () =>
			Object.assign(
				{
					initialRouteName: "Main"
				},
				option
			),
		mode: "card",
		headerMode: "screen",
		headerTransitionPreset: "uikit",
		transitionConfig: () => ({
			transitionSpec: {
				duration: 300,
				easing: Easing.out(Easing.poly(4)),
				timing: Animated.timing
			},
			screenInterpolator: sceneProps => {
				const { layout, position, scene } = sceneProps;
				const { index } = scene;

				const width = layout.initWidth;
				const translateX = position.interpolate({
					inputRange: [index - 1, index, index + 1],
					outputRange: [width, 0, 0]
				});
				const opacity = position.interpolate({
					inputRange: [index - 1, index - 0.99, index],
					outputRange: [0, 1, 1]
				});

				return { opacity, transform: [{ translateX: translateX }] };
			}
		})
	}
);

const AppContainer = createAppContainer(MainNav);

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<AppContainer />
			</Provider>
		);
	}
}
export default App;
