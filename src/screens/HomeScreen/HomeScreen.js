import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setColor, editColor, deleteColor } from "../../../store/colorSlice";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  TouchableHighlight,
} from "react-native";

const HomeScreen = () => {
  const color = useSelector((state) => state.color.value);
  const dispatch = useDispatch();

  const randomRgb = () => {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    return `rgb(${red}, ${green}, ${blue})`;
  };

  return (
    <View>
      <StatusBar style="dark" />
      <TouchableOpacity
        onPress={() => dispatch(setColor())}
        style={styles.button}
      >
        <Text style={{ fontSize: 20 }}>Generate Random Color</Text>
      </TouchableOpacity>
      <FlatList
      ListFooterComponent={<View style={{ marginBottom: 150 }} />} 
        keyExtractor={(item, index) => item}
        data={color}
        style={{ marginTop: 15 }}
        renderItem={({ item }) => {
          return (
            <View style={{ alignItems: "center" }}>
              <TouchableHighlight onPress={() => dispatch(editColor([item, randomRgb()]))}>
                <View

                  style={{
                    backgroundColor: item,
                    height: 150,
                    width: 150,
                    alignSelf: "center",
                    margin: 10,
                  }}
                ><Text> {item} </Text></View></TouchableHighlight>
              <TouchableHighlight style={{ backgroundColor: 'gray', paddingHorizontal: 10, paddingVertical: 5, borderRadius:5 }}
                onPress={() => dispatch(deleteColor(item))}><Text>Delete Colour</Text></TouchableHighlight>
            </View>
          );
        }}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  button: {
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
  },
});
