import { fetchApartamentId } from '@/constants/api';
import useFetch from '@/service/useFetch';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

interface Agent {
  id: number;
  name: string;
  role: string;
  avatar: string;
}

interface Property {
  id: number;
  title: string;
  type: string;
  rating: number;
  reviews: number;
  price: number;
  priceType: string;
  address: string;
  beds: number;
  bath: number;
  sqft: number;
  overview: string;
  image: string;
  gallery: string[];
  agent: Agent;
  facilities: string[];
  isFavorite: boolean;
}

type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];

const FACILITY_META: Record<string, { label: string; icon: IoniconsName }> = {
  parking: { label: 'Car Parking', icon: 'car-outline' },
  pool: { label: 'Swimming', icon: 'water-outline' },
  gym: { label: 'Gym & Fitness', icon: 'barbell-outline' },
  restaurant: { label: 'Restaurant', icon: 'restaurant-outline' },
  wifi: { label: 'WiFi', icon: 'wifi-outline' },
  pet: { label: 'Pet Friendly', icon: 'paw-outline' },
  laundry: { label: 'Laundry', icon: 'shirt-outline' },
  running: { label: 'Running', icon: 'walk-outline' },
};

export default function PropertyDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const {
    data: property,
    loading: loading,
    error: ApartamentsError,
  } = useFetch(() => fetchApartamentId(Number(id)));

  const [activeSlide, setActiveSlide] = useState(0);
  const [favorite, setFavorite] = useState(false);
  const heartScale = useRef(new Animated.Value(1)).current;

  const toggleFavorite = () => {
    Animated.sequence([
      Animated.spring(heartScale, { toValue: 1.45, useNativeDriver: true }),
      Animated.spring(heartScale, { toValue: 1, useNativeDriver: true }),
    ]).start();
    setFavorite((p) => !p);
  };

  if (loading || !property) {
    return (
      <View className='flex-1 items-center justify-center bg-white'>
        <Text className='text-gray-400 text-base'>Loading...</Text>
      </View>
    );
  }

  const slides =
    property.gallery?.length > 0 ? property.gallery : [property.image];

  return (
    <View className='flex-1 bg-white'>
      <StatusBar
        translucent
        backgroundColor='transparent'
        barStyle='light-content'
      />

      <View style={{ height: 320 }}>
        <FlatList
          data={slides}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, i) => String(i)}
          onMomentumScrollEnd={(e) =>
            setActiveSlide(Math.round(e.nativeEvent.contentOffset.x / width))
          }
          renderItem={({ item }) => (
            <Image
              source={{ uri: item }}
              style={{ width, height: 320 }}
              resizeMode='cover'
            />
          )}
        />

        <View
          className='absolute bottom-0 left-0 right-0'
          style={{ height: 90, backgroundColor: 'rgba(0,0,0,0.25)' }}
        />

        <View className='absolute bottom-4 self-center flex-row gap-1.5'>
          {slides.map((_, i) => (
            <View
              key={i}
              style={{
                height: 8,
                borderRadius: 4,
                backgroundColor:
                  i === activeSlide ? '#fff' : 'rgba(255,255,255,0.45)',
                width: i === activeSlide ? 24 : 8,
              }}
            />
          ))}
        </View>

        <View
          className='absolute left-0 right-0 flex-row justify-between items-center px-5'
          style={{ top: 52 }}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            className='w-10 h-10 rounded-full items-center justify-center'
            style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
          >
            <Ionicons name='arrow-back' size={20} color='#111' />
          </TouchableOpacity>

          <View className='flex-row gap-2.5'>
            <Animated.View style={{ transform: [{ scale: heartScale }] }}>
              <TouchableOpacity
                onPress={toggleFavorite}
                className='w-10 h-10 rounded-full items-center justify-center'
                style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
              >
                <Ionicons
                  name={favorite ? 'heart' : 'heart-outline'}
                  size={20}
                  color={favorite ? '#EF4444' : '#111'}
                />
              </TouchableOpacity>
            </Animated.View>

            <TouchableOpacity
              className='w-10 h-10 rounded-full items-center justify-center'
              style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
            >
              <Ionicons name='share-social-outline' size={20} color='#111' />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView
        className='flex-1 px-5 pt-5'
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <Text className='text-2xl font-bold text-gray-900 tracking-tight mb-2'>
          {property.title}
        </Text>

        <View className='flex-row items-center gap-2 mb-5'>
          <View className='bg-blue-100 px-2.5 py-1 rounded-md'>
            <Text className='text-blue-700 text-xs font-bold tracking-widest'>
              {property.type.toUpperCase()}
            </Text>
          </View>
          <Ionicons name='star' size={14} color='#F59E0B' />
          <Text className='text-sm text-gray-500 font-medium'>
            {property.rating} ({property.reviews.toLocaleString()} reviews)
          </Text>
        </View>

        <View className='flex-row items-center bg-gray-50 rounded-2xl py-4 px-2 mb-7'>
          <StatPill icon='bed-outline' value={`${property.beds} Beds`} />
          <View className='w-px bg-gray-200' style={{ height: 28 }} />
          <StatPill icon='water-outline' value={`${property.bath} bath`} />
          <View className='w-px bg-gray-200' style={{ height: 28 }} />
          <StatPill icon='expand-outline' value={`${property.sqft} sqft`} />
        </View>

        <Text className='text-lg font-bold text-gray-900 mb-3'>Agent</Text>
        <View className='flex-row items-center mb-7 gap-3'>
          <Image
            source={{ uri: property.agent.avatar }}
            className='w-14 h-14 rounded-full'
            style={{ borderWidth: 2, borderColor: '#DBEAFE' }}
          />
          <View className='flex-1'>
            <Text className='text-sm font-bold text-gray-900'>
              {property.agent.name}
            </Text>
            <Text className='text-xs text-gray-400 mt-0.5'>
              {property.agent.role}
            </Text>
          </View>
          <TouchableOpacity className='w-11 h-11 rounded-full border border-gray-200 items-center justify-center'>
            <Ionicons name='chatbubble-outline' size={18} color='#444' />
          </TouchableOpacity>
          <TouchableOpacity className='w-11 h-11 rounded-full border border-gray-200 items-center justify-center'>
            <Ionicons name='call-outline' size={18} color='#444' />
          </TouchableOpacity>
        </View>

        <Text className='text-lg font-bold text-gray-900 mb-3'>Overview</Text>
        <Text className='text-sm text-gray-500 leading-relaxed mb-7'>
          {property.overview}
        </Text>

        <Text className='text-lg font-bold text-gray-900 mb-4'>Facilities</Text>
        <View className='flex-row flex-wrap gap-3'>
          {property.facilities.map((key) => {
            const meta = FACILITY_META[key] ?? {
              label: key,
              icon: 'star-outline' as IoniconsName,
            };
            return (
              <View
                key={key}
                style={{ width: (width - 40 - 36) / 4 }}
                className='items-center gap-2'
              >
                <View className='w-14 h-14 rounded-2xl bg-blue-50 items-center justify-center'>
                  <Ionicons name={meta.icon} size={24} color='#1D4ED8' />
                </View>
                <Text
                  className='text-xs text-gray-500 text-center font-medium'
                  numberOfLines={1}
                >
                  {meta.label}
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>

      <View
        className='absolute bottom-0 left-0 right-0 flex-row items-center justify-between px-6 bg-white border-t border-gray-100'
        style={{ height: 90, paddingBottom: 16 }}
      >
        <View>
          <Text className='text-xs text-gray-400 mb-0.5'>Price</Text>
          <Text className='text-2xl font-extrabold text-gray-900'>
            ${property.price.toLocaleString()}
            <Text className='text-sm font-normal text-gray-400'>/month</Text>
          </Text>
        </View>

        <TouchableOpacity
          className='bg-blue-500 px-9 py-4 rounded-2xl'
          style={{
            elevation: 4,
            shadowColor: '#1E88E5',
            shadowOpacity: 0.35,
            shadowRadius: 10,
          }}
        >
          <Text className='text-white text-sm font-bold tracking-wide'>
            Book Now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function StatPill({ icon, value }: { icon: IoniconsName; value: string }) {
  return (
    <View className='flex-1 flex-row items-center justify-center gap-1.5'>
      <Ionicons name={icon} size={18} color='#555' />
      <Text className='text-xs font-semibold text-gray-700'>{value}</Text>
    </View>
  );
}
