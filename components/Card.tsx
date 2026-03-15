import icons from '@/constants/icons';
import images from '@/constants/images';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

type CardsProps = {
  onPress?: () => void;
};

export default function Card({ onPress }: CardsProps) {
  return (
    <TouchableOpacity
      className='flex-1 w-full mt-4 px-3 py-4 rounded-lg bg-white shadow-lg shadow-black-100/70 relative'
      onPress={onPress}
    >
      <View className='flex flex-row items-center absolute px-2 top-5 right-5 bg-white/90 p-1 rounded-full z-50'>
        <Image source={icons.star} className='size-2.5' />
        <Text className='text-xs font-rubik-bold text-primary-300 ml-0.5'>
          4.4
        </Text>
      </View>

      <Image source={images.newYork} className='w-full h-40 rounded-lg' />

      <View className='flex flex-col mt-2'>
        <Text className='text-base font-rubik-bold text-black-300'>
          cozy studio
        </Text>
        <Text className='text-xs font-rubik text-black-100'>
          22 W 15th, New York, NY 10011
        </Text>

        <View className='flex flex-row items-center justify-between mt-2'>
          <Text className='text-base font-rubik-bold text-primary-300'>
            $2500
          </Text>
          <Image
            source={icons.heart}
            className='w-5 h-5 mr-2'
            tintColor='#191D31'
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}
