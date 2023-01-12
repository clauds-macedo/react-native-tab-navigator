import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ITabInterface {
  tabs: { name: string; screen: JSX.Element; icon: any }[];
}

const { width } = Dimensions.get("window");
export default function TabBar({ tabs }: ITabInterface) {
  const [currentScreen, setCurrentScreen] = useState(0);
  
  const nextScreenRef = useRef(0);
  const [position, setPosition] = useState(
    new Animated.ValueXY({ x: 0, y: 0 })
  );
  const [fadeAnim, setFadeAnim] = useState(new Animated.Value(1));
  
  console.log(currentScreen);

  useEffect(() => {
    const animationListener = fadeAnim.addListener(({ value }) => {
      if (value === 0) {
        setCurrentScreen(nextScreenRef.current);
      }
    });
    return () => {
      fadeAnim.removeListener(animationListener);
    };
  }, [fadeAnim]);

  const handleTransition = (nextScreen: number) => {
    nextScreenRef.current = nextScreen;
    if (currentScreen === nextScreen) return;
    if (nextScreen < currentScreen) {
      //to previous screen
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(position.x, {
          toValue: width,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(position.x, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    } else {
      //to next screen
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(position.x, {
          toValue: -width,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(position.x, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[
          styles.screenContainer,
          { transform: [{ translateX: position.x }] },
          { opacity: fadeAnim },
        ]}
      >
        {tabs.map((screen) => (
            <View>{tabs[currentScreen].screen}</View>
        ))}
      </Animated.View>
      <View style={styles.buttonsContainer}>
        {tabs.map((screen, index) => (
          <TouchableOpacity
            key={screen.name}
            style={styles.button}
            onPress={() => {
              handleTransition(index);
            }}
          >
            <Text>{screen.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width,
  },
  screenContainer: {
    width,
    height: "100%",
    flexDirection: "row",
  },
  screen: {
    width,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonsContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#FFF",
    padding: 15
  },
  button: {
  },
});
