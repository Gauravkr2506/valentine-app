import { connect } from "react-redux";
import React, { Component } from "react";
import { AdMobBanner, AdMobInterstitial } from "react-native-admob";
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
	TouchableNativeFeedback,
	ToastAndroid
} from "react-native";
import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from "react-native-menu";
// import TopNavigation from "./../components/common/menu";
import { LoadMessage, UnselectMessageType } from "./../actions/action-message-screen";
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
		this.getData = this.getData.bind(this);
	}
	componentDidMount() {
		InteractionManager.runAfterInteractions(this.props.LoadMessage);
	}
	componentWillUnmount() {
		InteractionManager.runAfterInteractions(this.props.UnselectMessageType);
	}
	share(data) {
		this.setState({ modalVisible: true, msg: data });
	}

	_renderItem = ({ item }) => <MyListItem share={data => this.share(data)} data={item} />;

	clipboard() {
		Clipboard.setString(this.state.msg.message);
		ToastAndroid.show("Copied to clipboard", ToastAndroid.SHORT);
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
	getData() {
		if (this.props.message_type == "1") {
			return this.props.data;
		} else if (this.props.message_type == "") {
			return [];
		} else {
			return this.props.data.filter(msg => msg.message_type == this.props.message_type);
		}
	}
	render() {
		return (
			<View style={{ flex: 1 }}>
				{/* <TopNavigation changeType={type => this.changeType(type)} /> */}
				<View style={{ flex: 10 }}>
					<ImageBackground source={require("./../../img/img2.png")} style={{ flex: 1, backgroundColor: "white" }}>
						<FlatList data={this.getData()} renderItem={this._renderItem} />
					</ImageBackground>
				</View>

				<View style={{ flex: 1, backgroundColor: "#000" }}>
					<AdMobBanner adSize="smartBannerPortrait" adUnitID="ca-app-pub-9969212413329273/8961048732" />
				</View>
				<Modal
					animationType="slide"
					transparent={false}
					visible={this.state.modalVisible}
					onRequestClose={() => {
						this.setState({ modalVisible: false });
						// Alert.alert("Modal has been closed.");
					}}
				>
					<ImageBackground source={require("./../../img/img1.png")} style={{ flex: 1, backgroundColor: "white" }}>
						<View style={{ flex: 1 }}>
							<View style={{ height: 50, width: "100%", alignItems: "flex-end", padding: 10 }}>
								<TouchableNativeFeedback
									onPress={() => {
										this.setState({ modalVisible: false });
									}}
									// style={{ height: 50, width: "100%", padding: 10, flexDirection: "row", justifyContent: "flex-end" }}
								>
									<View style={{ flex: 1, width: 36, height: 36, borderRadius: 18, backgroundColor: "#fff", alignItems: "center", justifyContent: "center" }}>
										<Image style={{ width: 20, height: 20 }} source={require("./../../img/close.png")} />
									</View>
								</TouchableNativeFeedback>
							</View>
							<View style={{ flex: 1 }}>
								<View style={{ margin: 30, padding: 10, borderWidth: 4, borderColor: "#fff", borderRadius: 20 }}>
									<ScrollView scrollEnabled={true}>
										<View style={{ padding: 20, borderRadius: 18, backgroundColor: "rgba(255,255,255,0.9)" }}>
											<Text style={{ fontSize: 16 }}>{this.state.msg.message}</Text>
										</View>
									</ScrollView>
								</View>
							</View>

							<View style={{ height: 110, backgroundColor: "green" }}>
								<View style={{ height: 60, flexDirection: "row", justifyContent: "space-around", alignItems: "center", backgroundColor: "#ba2a6a" }}>
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
								<View style={{ height: 50, backgroundColor: "#333" }}>
									<AdMobBanner adSize="smartBannerPortrait" adUnitID="ca-app-pub-9969212413329273/6498536922" />
								</View>
							</View>
						</View>
					</ImageBackground>
				</Modal>
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
		data: state.message_store.data,
		message_type: state.main_store.selected_message_type
	};
};
const mapDispatchToProps = dispatch => {
	return {
		LoadMessage: () => dispatch(LoadMessage()),
		UnselectMessageType: () => dispatch(UnselectMessageType())
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MessageScreen);
