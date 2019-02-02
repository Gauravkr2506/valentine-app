/** @format */

import React, { Component } from "react";
import { Text, View } from "react-native";
import Menu, { MenuOptions, MenuOption, MenuTrigger } from "react-native-menu";

export default class TopNavigation extends Component {
	render() {
		return (
			<View style={{ paddingTop: 10, paddingBottom: 10, flexDirection: "row", backgroundColor: "#ff8000" }}>
				<View style={{ flex: 1, paddingLeft: 10 }}>
					<Text style={{ fontSize: 22, color: "#fff" }}>Valentine Day</Text>
				</View>
				<Menu onSelect={type => this.props.changeType(type)}>
					<MenuTrigger style={{ width: 30, height: 30, alignItems: "center" }}>
						<Text style={{ fontSize: 20, color: "#fff" }}>&#8942;</Text>
					</MenuTrigger>
					<MenuOptions>
						<MenuOption value={1}>
							<Text style={{ color: "#000" }}>Hindi</Text>
						</MenuOption>
						<MenuOption value={2}>
							<Text style={{ color: "#000" }}>English</Text>
						</MenuOption>
						<MenuOption value={3}>
							<Text style={{ color: "#000" }}>All</Text>
						</MenuOption>
					</MenuOptions>
				</Menu>
			</View>
		);
	}
}
