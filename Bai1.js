import { Animated, Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

const Bai1 = () => {
    const position = useRef(new Animated.ValueXY()).current;
    const windowHeight = Dimensions.get('window').height;
    // useEffect(()=>{
    //     start()
    // },[])
    const start =()=>{
        const randomY = Math.floor(Math.random()*windowHeight);// vi tri bat ki theo y
        Animated.timing(position,{
            toValue:{x:0, y:randomY},
            duration: 3000,
            useNativeDriver: false,
        }).start(()=>start())
    }
    const move =()=>{
       start()
    }
  return (
   <SafeAreaView style={styles.container}>
    <TouchableOpacity style={{padding: 20, backgroundColor: 'blue'}} onPress={()=>move()}>
            <Text style={{color: 'white'}}>Move</Text>
    </TouchableOpacity>
            <Animated.View style={[styles.box, position.getLayout()]}/>
   </SafeAreaView>
  )
}

export default Bai1

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    box:{
        width:50,
        height:50,
        backgroundColor: 'red'
    }
})