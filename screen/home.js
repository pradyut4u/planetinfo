import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, Alert, SafeAreaView } from 'react-native'
import axios from 'axios'
import { ListItem } from 'react-native-elements'

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listdata: [],
            url: "http://127.0.0.1:5000/"
        }
    }

    componentDidMount() {
        this.getplanets()
    }

    getplanets = () => {
        const url = this.state.url
        axios.get(url)
            .then(response => {
                return (
                    this.setState({ listdata: response.data.data })
                )
            })
            .catch(error => {
                Alert.alert(error.message)
            })
    }

    keyExtractor = (item, index) => index.toString()
    renderItem = ({ item, index }) => (
        <ListItem
            key={index}
            title={`Planet: ${item.name}`}
            subtitle={`Distance : ${item.distance_from_earth}`}
            titleStyle={styles.title}
            containerStyle={styles.listContainer}
            bottomDivider
            chevron
            onPress={() => this.props.navigation.navigate("Detail")}
             />
    )

    render() {
        const listdata = this.state.listdata
        if (listdata.length === 0) {
            return (
                <View style={styles.emptyContainer}>
                    <Text>
                        Loading...
                    </Text>
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <SafeAreaView></SafeAreaView>
                <View style={styles.upperContainer}>
                    <Text style={styles.headerText}>
                        Planet information
                    </Text>
                </View>
                <View style={styles.lowerContainer}>
                    <FlatList keyExtractor={this.keyExtractor} data={this.state.listdata} renderItem={this.renderItem} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#edc988" }, upperContainer: {
        flex: 0.1,
        justifyContent: "center", alignItems: "center"
    }, headerText: { fontSize: 30, fontWeight: "bold", color: "#132743" }, lowerContainer: {
        flex: 0.9
    }, emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" }, emptyContainerText: { fontSize: 20 }, title: { fontSize: 18, fontWeight: "bold", color: "#d7385e" }, listContainer: { backgroundColor: "#eeecda" }
});