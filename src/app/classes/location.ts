export interface LocationItem {
  id: number,
  shared: string,
  hash: string,
  title: string,
  properties: {
    accesibility : string,
    category: string,
    adress: string,
    type: string,
    wheater: {
      autumn: string,
      cloudy: string,
      foggy: string,
      rainy: string,
      sunny: string
    },
    seasony: {
      autumn: string,
      spring: string,
      summer: string,
      winter: string
    },
    images: any[]
  },
  geoLocation: {
    lat: number,
    lng: number
  }
}
