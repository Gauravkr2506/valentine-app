import React from "react";
import { connect } from "react-redux";
import { Image, TouchableOpacity, View, Text, InteractionManager } from "react-native";
import { Card, CardItem, Body } from "native-base";
import { SelectMessageType } from "./../../actions/action-main";
class MyListItem extends React.PureComponent {
	constructor(props) {
		super(props);
	}
	selectMessageType(key,title) {
		InteractionManager.runAfterInteractions(() => this.props.SelectMessageType(key));

		this.props.navigation.navigate("MessageScreen",{title});
	}
	render() {
		let { key, title, description, img, date } = this.props.data;

		return (
			<TouchableOpacity onPress={this.selectMessageType.bind(this, key,title)}>
				<View style={{ backgroundColor: "#fff", padding: 15, marginHorizontal: 5, marginVertical: 10, borderRadius: 20, borderWidth: 6, borderColor: "#ffa4b5" }}>
					<View style={{ flexDirection: "row" }}>
						<View style={{ width: 100, height: 100 }}>
							<Image source={img} style={{ width: 80, height: 80 }} />
						</View>
						<View style={{ flex: 1 }}>
							<Text style={{ color: "#ff4481", fontWeight: "bold", fontSize: 20 }}>{title}</Text>
							<Text style={{ color: "#ff9a2a", marginBottom: 5, fontSize: 13 }}>{date}</Text>
							<Text style={{ color: "#ba5d54", fontSize: 13 }}>{description}</Text>
						</View>
					</View>
				</View>
			</TouchableOpacity>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		SelectMessageType: key => dispatch(SelectMessageType(key))
	};
};
export default connect(
	null,
	mapDispatchToProps
)(MyListItem);
