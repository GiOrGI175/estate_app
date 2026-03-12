import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View className='flex-1 items-center justify-center bg-white'>
        <Text className='text-xl font-bold text-blue-500'>
          Welcome to Nativewind!
        </Text>
      </View>
      <Link href='/SignIn'>SignIn</Link>
      <Link href='/explore'>explore</Link>
      <Link href='/profile'>profile</Link>
      <Link href='/properties/1'>properties</Link>
    </View>
  );
}
