import { connect } from "react-redux";
import React, { Component } from "react";
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	Share,
	TouchableOpacity,
	ImageBackground,
	Modal,
	TouchableHighlight,
	Alert,
	ScrollView,
	Linking,
	Image,
	Clipboard,
	InteractionManager,
	TouchableNativeFeedback
} from "react-native";
import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from "react-native-menu";
import TopNavigation from "./../components/common/menu";
import { LoadMessage } from "./../actions/action-message-screen";
class MessageScreen extends Component {
	constructor(props) {
		super(props);
		this.share = this.share.bind(this);
		// this.getData = this.getData.bind(this);
		this.state = { modalVisible: false, msg: {} };
		this.clipboard = this.clipboard.bind(this);
		this.whatsapp = this.whatsapp.bind(this);
		this.shareTo = this.shareTo.bind(this);
		this.changeType = this.changeType.bind(this);
	}
	componentDidMount() {
		InteractionManager.runAfterInteractions(this.props.LoadMessage);
	}
	share(data) {
		this.setState({ modalVisible: true, msg: data });

		// Share.share({
		// 	title: data.title,
		// 	message: data.message
		// });
	}

	_renderItem = ({ item }) => <MyListItem share={data => this.share(data)} data={item} />;

	clipboard() {
		Clipboard.setString(this.state.msg.message);
	}
	whatsapp() {
		Linking.openURL(`whatsapp://send?text=${this.state.msg.message}`);
	}
	shareTo(data) {
		Share.share({
			title: this.state.msg.title,
			message: this.state.msg.message
		});
	}
	changeType(type) {
		// this.setState({ type: type });
		alert(type);
	}

	render() {
		return (
			<View style={{ flex: 1 }}>
				<TopNavigation changeType={type => this.changeType(type)} />
				<ImageBackground source={require("./../../img/bottle.jpg")} style={{ flex: 1, backgroundColor: "white" }}>
					<View style={{ flex: 10 }}>
						<FlatList data={this.props.data} renderItem={this._renderItem} />
					</View>
					<View style={{ flex: 1, backgroundColor: "#008000" }}>{/* <AdMobBanner adSize="smartBannerPortrait" adUnitID="ca-app-pub-9969212413329273/2210166532" /> */}</View>
					<Modal
						animationType="slide"
						transparent={false}
						visible={this.state.modalVisible}
						onRequestClose={() => {
							this.setState({ modalVisible: false });
							// Alert.alert("Modal has been closed.");
						}}
					>
						<View style={{ flex: 1 }}>
							<View style={{ height: 50, width: "100%", flexDirection: "row-reverse", padding: 10 }}>
								<TouchableNativeFeedback
									onPress={() => {
										this.setState({ modalVisible: false });
									}}
									// style={{ height: 50, width: "100%", padding: 10, flexDirection: "row", justifyContent: "flex-end" }}
								>
									<Image style={{ width: 20, height: 20 }} source={require("./../../img/close.png")} />
								</TouchableNativeFeedback>
							</View>
							<View style={{ flex: 1 }}>
								<View style={{ margin: 30, padding: 10, borderWidth: 4, borderColor: "#FF8448", borderRadius: 20 }}>
									<ScrollView scrollEnabled={true}>
										<View style={{ padding: 20 }}>
											<Text style={{ fontSize: 16 }}>{this.state.msg.message}</Text>
										</View>
									</ScrollView>
								</View>
							</View>

							<View style={{ height: 110, backgroundColor: "green" }}>
								<View style={{ height: 60, flexDirection: "row", justifyContent: "space-around", alignItems: "center", backgroundColor: "#C4B96A" }}>
									<TouchableHighlight
										onPress={this.clipboard}
										style={{
											width: 40,
											height: 40,
											backgroundColor: "#ff8000",
											justifyContent: "center",
											alignItems: "center",
											borderRadius: 25,
											borderWidth: 2,
											borderColor: "#998B56"
										}}
									>
										<Image style={{ width: 20, height: 20 }} source={require("./../../img/copy.png")} />
									</TouchableHighlight>
									<TouchableHighlight
										onPress={this.whatsapp}
										style={{
											width: 40,
											height: 40,
											backgroundColor: "#fff",
											justifyContent: "center",
											alignItems: "center",
											borderRadius: 25,
											borderWidth: 2,
											borderColor: "#998B56"
										}}
									>
										<Image style={{ width: 20, height: 20 }} source={require("./../../img/whatsapp.png")} />
									</TouchableHighlight>
									<TouchableHighlight
										onPress={this.shareTo}
										style={{
											width: 40,
											height: 40,
											backgroundColor: "#008000",
											justifyContent: "center",
											alignItems: "center",
											borderRadius: 25,
											borderWidth: 2,
											borderColor: "#998B56"
										}}
									>
										<Image style={{ width: 20, height: 20 }} source={require("./../../img/share.png")} />
									</TouchableHighlight>
								</View>
								<View style={{ height: 50, backgroundColor: "#333" }} />
							</View>
						</View>
					</Modal>
				</ImageBackground>
			</View>
		);
	}
}

class MyListItem extends Component {
	constructor(props) {
		super(props);
		this.share = this.share.bind(this);
	}
	share() {
		this.props.share(this.props.data);
	}
	render() {
		return (
			<TouchableOpacity
				onPress={this.share}
				style={{
					padding: 20,
					margin: 20,
					backgroundColor: "#fff",
					borderRadius: 20,
					shadowColor: "#666",
					shadowOffset: { width: 0, height: 0 },
					shadowRadius: 20,
					shadowOpacity: 0.5,
					elevation: 3
				}}
			>
				<Text style={{ fontSize: 15, lineHeight: 20 }}>{this.props.data.message}</Text>
			</TouchableOpacity>
		);
	}
}
const mapStateToProps = state => {
	return {
		data: state.message_store.data
	};
};
const mapDispatchToProps = dispatch => {
	return {
		LoadMessage: () => dispatch(LoadMessage())
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MessageScreen);
