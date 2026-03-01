import { RecordModel } from 'pocketbase'

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
