export interface ItineraryDay {
  dayNumber: number
  attractionIds: string[]
}

export interface Itinerary {
  id: string
  title: string
  createdAt: string
  updatedAt: string
  days: ItineraryDay[]
}
