import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:  {
        position: "absolute",
        bottom: 0,
        borderWidth: 1,
        width: Dimensions.get("window").width,
        padding: 20
    }
})