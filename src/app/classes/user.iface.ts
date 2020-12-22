export interface User {
    id: number,
    name: string,
    url: string,
    description: string,
    link: string,
    slug: string,
    avatar_urls: {
      [key: string]: string
    },
    meta: any[],
    userEmail: string,
    _links:{
       self:[
          {
             href: string
          }
       ],
       collection:[
          {
             href: string
          }
       ]
    }
}
