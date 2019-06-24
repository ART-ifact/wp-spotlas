export interface LocationItem {
  id: number,
  shared: string,
  hash: string,
  title: string,
  note: string,
  properties: {
    accesibility : string,
    category: string,
    adress: string,
    type: string,
    wheater: {
      cloudy: boolean,
      foggy: boolean,
      rainy: boolean,
      sunny: boolean
    },
    seasons: {
      autumn: boolean,
      spring: boolean,
      summer: boolean,
      winter: boolean
    },
    images: any[]
  },
  geoLocation: {
    lat: number,
    lng: number
  }
}
