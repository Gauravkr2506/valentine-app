import React from "react";
import SplashScreen from "react-native-splash-screen";
import { BackHandler, InteractionManager, ActivityIndicator, FlatList, Animated, Easing } from "react-native";

import { Container, Content, StyleProvider, Root, Header, Title, Button, Left, Body, Text, Icon, Card, CardItem, Row, Col, View, Grid } from "native-base";
import { connect } from "react-redux";
import { LoadData } from "./../actions/action-main";
import MyListItem from "./../components/main/main-list";

class Main extends React.Component {
	constructor(props) {
		super(props);
		// this.getData = this.getData.bind(this);
	}
	componentWillMount() {

		this.props.LoadData();
	}
	componentDidMount(){
		SplashScreen.hide();
	}
	// getData() {
	// 	return this.props.data.map(item => {
	// 		return { key: item.key, tutorial_name: item.tutorial_name, description: item.description, img: item.img };
	// 	});
	// }
	_renderItem = ({ item }) => <MyListItem data={item} navigation={this.props.navigation} />;
	render() {
		return (
			<Container style={{ backgroundColor: "#ff4481" }}>
				<Content padder>
					<FlatList data={this.props.data} renderItem={this._renderItem} />
				</Content>
			</Container>
		);
	}
}
const mapStateToProps = state => {
	return {
		data: state.main_store.data
	};
};
const mapDispatchToProps = dispatch => {
	return {
		LoadData: () => dispatch(LoadData())
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Main);
