import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Dimensions} from "react-native";
import TabBar from "./src/Tab";

export default function App() {
  return (
    <View style={styles.container}>
      <TabBar
        tabs={[
          { name: "Tradutor", icon: <></>, screen: <Text style={{ flex: 1, backgroundColor: "green", width: Dimensions.get("window").width }}>tradasdsadasds</Text> },
          { name: "Dicionário", icon: <></>, screen: <Text style={{ flex: 1, backgroundColor: "yellow", width: Dimensions.get("window").width  }}>Dict</Text> },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
