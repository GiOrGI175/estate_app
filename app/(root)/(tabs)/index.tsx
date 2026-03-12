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
      <Text className='text-red-500 text-3xl font-rubik'>Hello</Text>
      <Link href='/SignIn'>SignIn</Link>
      <Link href='/explore'>explore</Link>
      <Link href='/profile'>profile</Link>
      <Link href='/properties/1'>properties</Link>
    </View>
  );
}
