import Loading from "@/components/loading"
import { Roboto_400Regular, Roboto_500Medium, Roboto_700Bold, useFonts } from "@expo-google-fonts/roboto"
import { Slot } from "expo-router"
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from "react"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import "./../../styles/global.css"

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular, Roboto_500Medium, Roboto_700Bold
  })
  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return <Loading></Loading>
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Slot></Slot>
    </GestureHandlerRootView>
  )
}
