import { RecordModel } from 'pocketbase'

// Collection names (prefixed for multi-project PocketBase)
export const Collections = {
  USERS: 'users',
  PLANTS: 'pc_plants',
  WATERING_SCHEDULES: 'pc_watering_schedules',
  WATERING_LOGS: 'pc_watering_logs',
} as const

export interface User extends RecordModel {
  email: string
  avatar: string
  verified: boolean
}

export interface Plant extends RecordModel {
  user: string
  name: string
  species: string
  image: string
  purchase_date: string
  notes: string
}

export interface WateringSchedule extends RecordModel {
  plant: string
  water_amount_ml: number
  frequency_days: number
}

export interface WateringLog extends RecordModel {
  plant: string
  watered_at: string
  water_amount_ml: number
  notes: string
}
