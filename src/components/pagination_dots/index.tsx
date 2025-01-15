import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, View, ViewStyle} from 'react-native';

interface PaginationProps {
  data: any[]; // Array for the number of dots
  currentIndex: number; // Active index of the dot
  dotStyle?: ViewStyle; // Custom styles for dots
  dotActiveStyle?: ViewStyle; // Custom styles for active dot
}

const PaginationDots: React.FC<PaginationProps> = ({
                                                     data,
                                                     currentIndex,
                                                     dotStyle,
                                                     dotActiveStyle,
                                                   }) => {
  const animations = useRef<Animated.Value[]>(
    data.map(() => new Animated.Value(1)) // Scale value for each dot
  ).current;

  useEffect(() => {
    // Reset all dots to initial state
    animations.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: index === currentIndex ? 1.5 : 1, // Scale up active dot
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  }, [animations, currentIndex]);

  return (
    <View style={styles.container}>
      {data.map((_, index) => (
        <Animated.View
          key={index}
          style={[
            styles.dot,
            dotStyle,
            index === currentIndex && [styles.activeDot, dotActiveStyle],
            { transform: [{ scale: animations[index] }] }, // Animated scale
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#007BFF",
  },
});

export default PaginationDots;
