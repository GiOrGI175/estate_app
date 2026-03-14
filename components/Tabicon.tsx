import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

type TabIconProps = {
  focused: boolean;
  icon: any;
  title: string;
};

export default function Tabicon({ focused, icon, title }: TabIconProps) {
  return (
    <View className='flex-1 mt-3 flex flex-col items-center'>
      <Image
        source={icon}
        tintColor={focused ? '#0061ff' : '#666876'}
        resizeMode='contain'
        className='size-6'
      />
      <Text
        className={`${focused ? 'text-primary-300 font-rubik-medium' : 'text-black-200 font-rubik '} text-xs w-full text-center mt-1`}
      >
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
