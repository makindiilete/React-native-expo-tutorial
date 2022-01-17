import React from "react";
import { View, StyleSheet, Modal } from "react-native";
import { AppText } from "../Components/AppText";
import * as Progress from "react-native-progress";
import LottieView from "lottie-react-native";
import colors from "../config/colors";

export function UploadScreen({ progress, visible, onDone }) {
  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        {/*  if d progress is less than 100 i.e. not complete yet, we show progress bar else we show our done animation setting loop to false so it doesnt show more than once*/}
        {progress < 100 ? (
          <Progress.Bar
            progress={progress}
            width={200}
            color={colors.primary}
          />
        ) : (
          <LottieView
            source={require("../assets/animations/done.json")}
            autoPlay
            loop={false}
            style={styles.animation}
            onAnimationFinish={onDone}
          />
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  animation: {
    width: 150,
  },
});
