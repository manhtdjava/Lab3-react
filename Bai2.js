import React, { useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Animated, SafeAreaView, Dimensions } from 'react-native';

const Bai2 = () => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const renderItem = ({ item, index }) => {
    const positionY = index * 0; // Height of each item + margin
    const positionY1 = index * 110;
    const translateY = scrollY.interpolate({
      inputRange: [positionY - 110, positionY, positionY1 + 110],
      outputRange: [40, 0, -40], // Adjust the translation distance as needed
      extrapolate: 'clamp',
    });
    const opacity = translateY.interpolate({
      inputRange: [-30, 0, 30],
      outputRange: [0, 1, 0],
      extrapolate: 'clamp',
    });
    const scale = translateY.interpolate({
      inputRange: [-50, 0, 50],
      outputRange: [0.5, 1, 1],
      extrapolate: 'clamp',
    });

    return (
        <Animated.View style={{ opacity, transform: [{ translateY }, { scale }] }}>
        <View style={styles.item}>
          <Text style={styles.text}>Flatlist Item</Text>
        </View>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>

<Animated.FlatList
  data={Array.from({ length: 10 }, (_, index) => ({ key: `${index}` }))}
  renderItem={renderItem}
  keyExtractor={(item) => item.key}
  scrollEventThrottle={16} // Tần suất sự kiện cuộn
  onScroll={Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: true } // Sử dụng Native Driver để tối ưu hiệu suất
  )}
  contentContainerStyle={styles.listContent}
  style={{flex:1}}
/>


    </SafeAreaView>
  );
};

export default Bai2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  listContent: {
    paddingTop: 0, 
    // Adjust as needed
  },
  item: {
    width: Dimensions.get('window').width - 20, // Adjust width according to your layout
    height: 90,
    backgroundColor: '#97FFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 15
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white'
  },
});
