import SettingsItem from '@/components/SettingsItem';
import { settings } from '@/constants/data';
import icons from '@/constants/icons';
import images from '@/constants/images';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

export default function profile() {
  return (
    <SafeAreaView className='h-full bg-white'>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName='pb-32 px-7'
      >
        <View className='flex flex-row items-center justify-between mt-5'>
          <Text className='text-xl font-rubik-bold'>pr</Text>
          <Image source={icons.bell} className='size-5' />
        </View>

        <View className='flex-col justify-center flex mt-5'>
          <View className='flex flex-col items-center relative mt-5'>
            <Image
              source={images.avatar}
              className='size-44 relative rounded-full'
            />
            <TouchableOpacity className='absolute bottom-11 right-2'>
              <Image source={icons.edit} className='size-9' />
            </TouchableOpacity>

            <Text className='text-2xl font-rubik-bold mt-2'>
              Giorgi Nozadze
            </Text>
          </View>

          <View className='flex flex-col mt-10'>
            <SettingsItem icon={icons.calendar} title='My Bookings' />

            <SettingsItem icon={icons.wallet} title='Payments' />
          </View>

          <View className=' flex flex-col mt-5 border-t pt-5 border-primary-200'>
            {settings.slice(2).map((item, index) => (
              <SettingsItem key={index} {...item} />
            ))}
          </View>
        </View>

        <View className=' flex flex-col mt-5 border-t pt-5 border-primary-200'>
          <SettingsItem
            icon={icons.logout}
            title='logout'
            textStyle='text-danger'
            showArrow={false}
            onPress={() => {}}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
