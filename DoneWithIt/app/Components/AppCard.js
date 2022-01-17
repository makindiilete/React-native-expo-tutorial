import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import colors from "../config/colors";
import { AppText } from "./AppText";
import { Image } from "react-native-expo-image-cache";

export function AppCard({ imageUrl, subtitle, title, onPress, thumbnailUrl }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.cardContainer}>
        {/*<Image source={{ uri: imageUrl }} style={styles.image} />*/}
        {/*tint will determine how dark the preview image will be*/}
        <Image
          uri={imageUrl}
          tint="light"
          style={styles.image}
          preview={{ uri: thumbnailUrl }}
        />
        <View style={styles.detailsContainer}>
          <AppText style={styles.title}> {title} </AppText>
          <AppText style={styles.subTitle}> {subtitle} </AppText>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.white,
    borderRadius: 15,
    marginBottom: 20,
    overflow: "hidden", // our image will overflow and block our card border radius so we use ds to hide the overflow
  },
  image: {
    width: "100%",
    height: 200,
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    marginBottom: 7,
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
  },
});
