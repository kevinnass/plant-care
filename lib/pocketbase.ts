import PocketBase from 'pocketbase'
import AsyncStorage from '@react-native-async-storage/async-storage'

const pbUrl = process.env.EXPO_PUBLIC_POCKETBASE_URL!

export const pb = new PocketBase(pbUrl)

// Persist auth state in AsyncStorage for React Native
pb.authStore.onChange(async () => {
  try {
    if (pb.authStore.isValid) {
      await AsyncStorage.setItem('pb_auth', JSON.stringify({
        token: pb.authStore.token,
        record: pb.authStore.record,
      }))
    } else {
      await AsyncStorage.removeItem('pb_auth')
    }
  } catch (e) {
    console.error('Failed to persist auth state:', e)
  }
})

// Restore auth state from AsyncStorage on init
export async function restoreAuth() {
  try {
    const raw = await AsyncStorage.getItem('pb_auth')
    if (raw) {
      const { token, record } = JSON.parse(raw)
      pb.authStore.save(token, record)
      // Refresh token if still valid
      try {
        await pb.collection('users').authRefresh()
      } catch {
        pb.authStore.clear()
      }
    }
  } catch (e) {
    console.error('Failed to restore auth state:', e)
  }
}
