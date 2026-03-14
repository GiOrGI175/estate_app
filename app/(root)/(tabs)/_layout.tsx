import Tabicon from '@/components/Tabicon';
import icons from '@/constants/icons';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: 'white',
          position: 'absolute',
          borderTopColor: '#0061FF1A',
          borderTopWidth: 1,
          minHeight: 70,
        },
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'home',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Tabicon icon={icons.home} focused={focused} title='home' />
          ),
        }}
      />
      <Tabs.Screen
        name='explore'
        options={{
          title: 'explore',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Tabicon icon={icons.search} focused={focused} title='explore' />
          ),
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'profile',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Tabicon icon={icons.person} focused={focused} title='profile' />
          ),
        }}
      />
    </Tabs>
  );
}
