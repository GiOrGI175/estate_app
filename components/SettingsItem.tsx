import icons from '@/constants/icons';
import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type SettingsItemProps = {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textStyle?: any;
  showArrow?: boolean;
};

export default function SettingsItem({
  icon,
  title,
  onPress,
  textStyle,
  showArrow = true,
}: SettingsItemProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className='flex flex-row items-center justify-between py-3'
    >
      <View className='flex flex-row items-center gap-3'>
        <Image source={icon} className='size-6' />
        <Text
          className={`text-lg font-rubik-medium text-black-300 ${textStyle}`}
        >
          {title}
        </Text>
      </View>

      {showArrow && <Image source={icons.rightArrow} className='size-5' />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
