import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Animated, SafeAreaView } from 'react-native';

export default class Bai3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
    };
  }

  render() {
 
      
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, 100],
      outputRange: [150, 50],
      extrapolate: 'clamp',
    });

    const headerOpacity = this.state.scrollY.interpolate({
      inputRange: [0, 100],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    const headerScale = this.state.scrollY.interpolate({
      inputRange: [0, 100],
      outputRange: [1, 0.5],
      extrapolate: 'clamp',
    });
    const headerScale1 = this.state.scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [1, 1],
        extrapolate: 'clamp',
      });
      const translateYFlatList = this.state.scrollY.interpolate({
        inputRange: [-300, 100],
        outputRange: [0, -100],// Điều chỉnh giá trị translate Y tùy theo khoảng cách mong muốn
        extrapolate: 'clamp',
      });
      
    const AnimatedFlatList = Animated.createAnimatedComponent(FlatList); // Bọc FlatList vào Animated

    return (
      <SafeAreaView style={styles.container}>
       
        {/* Phần 1 */}
    <View style={[styles.header, { opacity: 1, transform: [{ scale: 1 }] }]}>
      <Text style={styles.headerText}>Animated Header</Text>
    </View>
    
    {/* Phần 2 */}
    <Animated.View
      style={[styles.header, { opacity: headerOpacity, transform: [{ scale: headerScale }] }]}
    >
      <Text style={styles.headerText}>Animated Header</Text>
    </Animated.View>
    
    {/* Phần 3 */}
    <Animated.View
      style={[styles.header, {
        opacity: headerScale1,
        transform: [
          { scale: 1 },
          {
            translateY: headerHeight.interpolate({
              inputRange: [50, 150],
              outputRange: [-100, 0],
              extrapolate: 'clamp',
            }),
          },
        ],
      }]}
    >
      <Text style={styles.headerText}>Animated Header</Text>
    </Animated.View>
        
        
        
        <AnimatedFlatList // Sử dụng AnimatedFlatList thay vì FlatList
          style={{ transform: [{ translateY: translateYFlatList }] , paddingTop:110}}
          data={data}
          renderItem={({ item }) => (
            <View style={styles.item}>
                
              <Text>{item.text}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: true }
          )}
          ListHeaderComponent={<Text style={styles.listHeader}>Popular Quizes</Text>}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  item: {
    height: 200,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 50
  },
  listHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'white',
    padding: 10,
  },
});

const data = [
  { id: 1, text: 'Item 1' },
  { id: 2, text: 'Item 2' },
  { id: 3, text: 'Item 3' },
];




