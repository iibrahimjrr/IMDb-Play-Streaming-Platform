import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { contentApi, adminApi } from '../services/api'

export interface Episode { id:number; number:number; title:string; description:string; duration:string; rating:number; releaseDate:string; thumbnail:string; watchLink:string }
export interface Season   { id:number; number:number; title:string; episodes:Episode[] }
export interface Content  {
  id:number; title:string; type:'movie'|'series'; image:string; backgroundImage?:string
  rating:number; year:string; description:string; genre:string; duration?:string
  director:string; cast:string[]; watchLink?:string
  trending?:boolean; topRated?:boolean; newRelease?:boolean; isHot?:boolean; isNew?:boolean; featured?:boolean
  seasons?:Season[]
}

interface Ctx {
  contents: Content[]; loading: boolean
  addContent(d: Omit<Content,'id'>): Promise<void>
  updateContent(id:number, d:Partial<Content>): Promise<void>
  deleteContent(id:number): Promise<void>
  setFeatured(id:number): Promise<void>
  getFeatured(): Content|null
  reload(): Promise<void>
}

const Cx = createContext<Ctx|undefined>(undefined)

// Fallback data if API unavailable
const FALLBACK: Content[] = [
{
  id:1,
  title:'Turab el-Mas',
  type:'movie',
  image:'https://media0101.elcinema.com/uploads/_315x420_88a789aeff4ccf3a4408e9f5369f0dd34028c8f313da2a052898ecb273cbc26d.jpg',
  backgroundImage:'https://images.mubicdn.net/images/film/388813/cache-904512-1745501785/image-w1280.jpg?size=800x',
  rating:7.9,
  year:'2018', 
  description:'A man who works in a pharmacy as a part time job to aid his financial status finds out that his father has been exterminated by a savage brute and sought to avenge him, then unlocks a whole ....', 
  genre:'Drama', 
  duration:'2h 42m', 
  director:'Marwan Hamed', 
  cast:['Asser Yassin',"Menna Shalabi",'Maged El-Kidwani'], 
  watchLink:'https://www.playimdb.com/title/tt4003070/?ref_=mv_close', 
  isHot:false, 
  trending:false, 
  topRated:false 
},

{
  id: 2,
  title: 'El Fil El Azraq',
  type: 'movie',
  image: 'https://media0041.elcinema.com/uploads/_315x420_574ac9a6a2fcbf45f58f4dfb9a7d4d56d8a7cbdeb18f0bc33bd583a14bcbb157.jpg',
  backgroundImage: 'https://media0041.elcinema.com/uploads/_315x420_574ac9a6a2fcbf45f58f4dfb9a7d4d56d8a7cbdeb18f0bc33bd583a14bcbb157.jpg',
  rating: 8.1,
  year: '2014',
  description: 'A psychiatrist returns to work at Al Abbasia hospital where he faces a dangerous criminal case connected to his past and strange supernatural events.',
  genre: 'Thriller',
  duration: '2h 50m',
  director: 'Marwan Hamed',
  cast: ['Karim Abdel Aziz', 'Nelly Karim', 'Khaled El Sawy'],
  watchLink: 'https://elcinema.com/en/work/2035164/',
  isHot: true,
  trending: true,
  topRated: true
},

{
  id: 3,
  title: 'Kira & El Gin',
  type: 'movie',
  image: 'https://media0041.elcinema.com/uploads/_315x420_4a3e0d6f9d5b6cdb59c59e86cdc84e64546a1e0149253b209d292743ffb391d1.jpg',
  backgroundImage: 'https://media0041.elcinema.com/uploads/_315x420_4a3e0d6f9d5b6cdb59c59e86cdc84e64546a1e0149253b209d292743ffb391d1.jpg',
  rating: 7.3,
  year: '2022',
  description: 'During the 1919 revolution, two men from different backgrounds unite against the British occupation in a story filled with action and resistance.',
  genre: 'Action',
  duration: '2h 55m',
  director: 'Marwan Hamed',
  cast: ['Karim Abdel Aziz', 'Ahmed Ezz', 'Hend Sabry'],
  watchLink: 'https://elcinema.com/en/work/2066395/',
  isHot: true,
  trending: true,
  topRated: false
},

{
  id: 4,
  title: 'Ibrahim El Abyad',
  type: 'movie',
  image: 'https://media0041.elcinema.com/uploads/_315x420_4d4f8ff0f3e7d8c35c50a6481d948e57808b4374c1c1ff717a8ba4c8988e85b7.jpg',
  backgroundImage: 'https://media0041.elcinema.com/uploads/_315x420_4d4f8ff0f3e7d8c35c50a6481d948e57808b4374c1c1ff717a8ba4c8988e85b7.jpg',
  rating: 7.5,
  year: '2009',
  description: 'A young man raised in dangerous neighborhoods seeks revenge after witnessing the murder of his father.',
  genre: 'Crime',
  duration: '2h 14m',
  director: 'Marwan Hamed',
  cast: ['Ahmed El Sakka', 'Amr Waked', 'Hend Sabry'],
  watchLink: 'https://elcinema.com/en/work/1009563/',
  isHot: false,
  trending: true,
  topRated: false
},

{
  id: 5,
  title: 'El Gezira',
  type: 'movie',
  image: 'https://media0041.elcinema.com/uploads/_315x420_3f0cf2b58d8dc8b7e7a3ddc7e2cfdab91c8f4f6df2b5cb582fa418eb2c86c55d.jpg',
  backgroundImage: 'https://media0041.elcinema.com/uploads/_315x420_3f0cf2b58d8dc8b7e7a3ddc7e2cfdab91c8f4f6df2b5cb582fa418eb2c86c55d.jpg',
  rating: 7.8,
  year: '2007',
  description: 'A powerful drug dealer rises to control an isolated island while facing police and rival gangs.',
  genre: 'Action',
  duration: '2h 5m',
  director: 'Sherif Arafa',
  cast: ['Ahmed El Sakka', 'Hend Sabry', 'Mahmoud Yassin'],
  watchLink: 'https://elcinema.com/en/work/1008105/',
  isHot: false,
  trending: false,
  topRated: true
},

{
  id: 6,
  title: 'Welad Rizk',
  type: 'movie',
  image: 'https://media0041.elcinema.com/uploads/_315x420_4f5ec5cb5a7e3dc5c3efc6f7e45f3d72b7d6c6b76e3ed5b0efc5d2dbbcf7fd68.jpg',
  backgroundImage: 'https://media0041.elcinema.com/uploads/_315x420_4f5ec5cb5a7e3dc5c3efc6f7e45f3d72b7d6c6b76e3ed5b0efc5d2dbbcf7fd68.jpg',
  rating: 7.1,
  year: '2015',
  description: 'A group of brothers involved in crime try to leave their dangerous life behind, but their past keeps chasing them.',
  genre: 'Action',
  duration: '1h 55m',
  director: 'Tarek Alarian',
  cast: ['Ahmed Ezz', 'Amr Youssef', 'Ahmed Dawood'],
  watchLink: 'https://elcinema.com/en/work/2034477/',
  isHot: true,
  trending: true,
  topRated: false
},

  {
    id: 8,
    title: 'El Saher',
    type: 'movie',
    image: 'https://placehold.co/315x420/png?text=El+Saher',
    backgroundImage: 'https://placehold.co/1200x675/png?text=El+Saher',
    rating: 7.1,
    year: '2001',
    description: 'A mysterious illusionist becomes involved in dangerous secrets and emotional conflicts.',
    genre: 'Drama',
    duration: '2h 5m',
    director: 'Radwan El Kashef',
    cast: ['Mahmoud Abdel Aziz', 'Hanan Turk'],
    watchLink: '#',
    isHot: false,
    trending: false,
    topRated: false
  },
  {
    id: 9,
    title: 'Tito',
    type: 'movie',
    image: 'https://placehold.co/315x420/png?text=Tito',
    backgroundImage: 'https://placehold.co/1200x675/png?text=Tito',
    rating: 7.4,
    year: '2004',
    description: 'A criminal struggles between loyalty, love, and survival.',
    genre: 'Action',
    duration: '1h 58m',
    director: 'Tarek El Erian',
    cast: ['Ahmed El Sakka', 'Hanan Turk'],
    watchLink: '#',
    isHot: true,
    trending: true,
    topRated: false
  },
  {
    id: 10,
    title: 'Morgan Ahmed Morgan',
    type: 'movie',
    image: 'https://placehold.co/315x420/png?text=Morgan+Ahmed+Morgan',
    backgroundImage: 'https://placehold.co/1200x675/png?text=Morgan+Ahmed+Morgan',
    rating: 6.9,
    year: '2007',
    description: 'A wealthy businessman returns to university life with his daughter.',
    genre: 'Comedy',
    duration: '1h 55m',
    director: 'Ali Idris',
    cast: ['Adel Imam', 'Mervat Amin'],
    watchLink: '#',
    isHot: false,
    trending: true,
    topRated: false
  },
  {
    id: 11,
    title: 'Hassan & Morcos',
    type: 'movie',
    image: 'https://placehold.co/315x420/png?text=Hassan+%26+Morcos',
    backgroundImage: 'https://placehold.co/1200x675/png?text=Hassan+%26+Morcos',
    rating: 7.0,
    year: '2008',
    description: 'Two families face identity conflicts in a social comedy.',
    genre: 'Comedy',
    duration: '2h 0m',
    director: 'Ramy Imam',
    cast: ['Adel Imam', 'Omar الشريف'],
    watchLink: '#',
    isHot: false,
    trending: false,
    topRated: false
  },
  {
    id: 12,
    title: 'Ibrahim El Abyad',
    type: 'movie',
    image: 'https://placehold.co/315x420/png?text=Ibrahim+El+Abyad',
    backgroundImage: 'https://placehold.co/1200x675/png?text=Ibrahim+El+Abyad',
    rating: 7.5,
    year: '2009',
    description: 'A young man seeks revenge after his father is murdered.',
    genre: 'Crime',
    duration: '2h 14m',
    director: 'Marwan Hamed',
    cast: ['Ahmed El Sakka', 'Amr Waked'],
    watchLink: '#',
    isHot: true,
    trending: true,
    topRated: true
  },
  {
    id: 13,
    title: 'X-Large',
    type: 'movie',
    image: 'https://placehold.co/315x420/png?text=X-Large',
    backgroundImage: 'https://placehold.co/1200x675/png?text=X-Large',
    rating: 7.2,
    year: '2011',
    description: 'A man struggles with self-confidence and relationships because of his weight.',
    genre: 'Comedy',
    duration: '2h 10m',
    director: 'Sherif Arafa',
    cast: ['Ahmed Helmy', 'Donia Samir Ghanem'],
    watchLink: '#',
    isHot: true,
    trending: false,
    topRated: false
  },
  {
    id: 14,
    title: 'Asal Eswed',
    type: 'movie',
    image: 'https://placehold.co/315x420/png?text=Asal+Eswed',
    backgroundImage: 'https://placehold.co/1200x675/png?text=Asal+Eswed',
    rating: 7.3,
    year: '2010',
    description: 'An Egyptian-American returns to Egypt after years abroad.',
    genre: 'Comedy',
    duration: '2h 11m',
    director: 'Khaled Marei',
    cast: ['Ahmed Helmy', 'Amy Samir Ghanem'],
    watchLink: '#',
    isHot: false,
    trending: true,
    topRated: false
  },
  {
    id: 15,
    title: 'El Gezira',
    type: 'movie',
    image: 'https://placehold.co/315x420/png?text=El+Gezira',
    backgroundImage: 'https://placehold.co/1200x675/png?text=El+Gezira',
    rating: 7.8,
    year: '2007',
    description: 'A drug dealer rises to power on a dangerous island.',
    genre: 'Action',
    duration: '2h 5m',
    director: 'Sherif Arafa',
    cast: ['Ahmed El Sakka', 'Hend Sabry'],
    watchLink: '#',
    isHot: true,
    trending: true,
    topRated: true
  },
  {
    id: 16,
    title: 'El Fil El Azraq',
    type: 'movie',
    image: 'https://placehold.co/315x420/png?text=El+Fil+El+Azraq',
    backgroundImage: 'https://placehold.co/1200x675/png?text=El+Fil+El+Azraq',
    rating: 8.1,
    year: '2014',
    description: 'A psychiatrist faces supernatural mysteries and dark secrets.',
    genre: 'Thriller',
    duration: '2h 50m',
    director: 'Marwan Hamed',
    cast: ['Karim Abdel Aziz', 'Nelly Karim'],
    watchLink: '#',
    isHot: true,
    trending: true,
    topRated: true
  },
  {
    id: 17,
    title: 'Hepta',
    type: 'movie',
    image: 'https://placehold.co/315x420/png?text=Hepta',
    backgroundImage: 'https://placehold.co/1200x675/png?text=Hepta',
    rating: 7.7,
    year: '2016',
    description: 'Multiple love stories connect through seven emotional stages.',
    genre: 'Romance',
    duration: '2h 0m',
    director: 'Hady El Bagoury',
    cast: ['Amr Youssef', 'Yasmine Raees'],
    watchLink: '#',
    isHot: true,
    trending: true,
    topRated: false
  },
  {
    id: 18,
    title: 'Welad Rizk',
    type: 'movie',
    image: 'https://placehold.co/315x420/png?text=Welad+Rizk',
    backgroundImage: 'https://placehold.co/1200x675/png?text=Welad+Rizk',
    rating: 7.1,
    year: '2015',
    description: 'Brothers involved in crime try to escape their violent past.',
    genre: 'Action',
    duration: '1h 55m',
    director: 'Tarek Alarian',
    cast: ['Ahmed Ezz', 'Amr Youssef'],
    watchLink: '#',
    isHot: true,
    trending: true,
    topRated: false
  },
  {
    id: 19,
    title: 'Kira & El Gin',
    type: 'movie',
    image: 'https://placehold.co/315x420/png?text=Kira+%26+El+Gin',
    backgroundImage: 'https://placehold.co/1200x675/png?text=Kira+%26+El+Gin',
    rating: 7.3,
    year: '2022',
    description: 'Two revolutionaries fight against British occupation.',
    genre: 'Action',
    duration: '2h 55m',
    director: 'Marwan Hamed',
    cast: ['Karim Abdel Aziz', 'Ahmed Ezz'],
    watchLink: '#',
    isHot: true,
    trending: true,
    topRated: true
  },
  {
    id: 20,
    title: 'Turab El Mas',
    type: 'movie',
    image: 'https://placehold.co/315x420/png?text=Turab+El+Mas',
    backgroundImage: 'https://placehold.co/1200x675/png?text=Turab+El+Mas',
    rating: 7.9,
    year: '2018',
    description: 'A pharmacist seeks revenge after a tragic murder.',
    genre: 'Drama',
    duration: '2h 42m',
    director: 'Marwan Hamed',
    cast: ['Asser Yassin', 'Menna Shalaby'],
    watchLink: '#',
    isHot: false,
    trending: true,
    topRated: true
  },
  {
    id: 21,
    title: 'El Badla',
    type: 'movie',
    image: 'https://placehold.co/315x420/png?text=El+Badla',
    backgroundImage: 'https://placehold.co/1200x675/png?text=El+Badla',
    rating: 6.5,
    year: '2018',
    description: 'Two men swap identities in a comedic adventure.',
    genre: 'Comedy',
    duration: '1h 52m',
    director: 'Mohamed Gamal El Adl',
    cast: ['Tamer Hosny', 'Amina Khalil'],
    watchLink: '#',
    isHot: false,
    trending: false,
    topRated: false
  },
  {
    id: 22,
    title: 'El Mamar',
    type: 'movie',
    image: 'https://placehold.co/315x420/png?text=El+Mamar',
    backgroundImage: 'https://placehold.co/1200x675/png?text=El+Mamar',
    rating: 7.8,
    year: '2019',
    description: 'An Egyptian officer leads a heroic military mission.',
    genre: 'War',
    duration: '2h 10m',
    director: 'Sherif Arafa',
    cast: ['Ahmed عز', 'Ahmed Rizk'],
    watchLink: '#',
    isHot: true,
    trending: true,
    topRated: true
  },
  {
    id: 23,
    title: 'Mousa',
    type: 'movie',
    image: 'https://placehold.co/315x420/png?text=Mousa',
    backgroundImage: 'https://placehold.co/1200x675/png?text=Mousa',
    rating: 6.9,
    year: '2021',
    description: 'A student invents the first Egyptian robot.',
    genre: 'Sci-Fi',
    duration: '1h 45m',
    director: 'Peter Mimi',
    cast: ['Karim Mahmoud Abdel Aziz', 'Eyad Nassar'],
    watchLink: '#',
    isHot: true,
    trending: false,
    topRated: false
  },
  {
    id: 24,
    title: 'El Ankaboot',
    type: 'movie',
    image: 'https://placehold.co/315x420/png?text=El+Ankaboot',
    backgroundImage: 'https://placehold.co/1200x675/png?text=El+Ankaboot',
    rating: 6.4,
    year: '2022',
    description: 'A dangerous businessman enters an international conflict.',
    genre: 'Action',
    duration: '1h 48m',
    director: 'Ahmed Nader Galal',
    cast: ['Ahmed El Sakka', 'Mona Zaki'],
    watchLink: '#',
    isHot: false,
    trending: false,
    topRated: false
  },
  {
    id: 25,
    title: 'The Blue Elephant 2',
    type: 'movie',
    image: 'https://placehold.co/315x420/png?text=The+Blue+Elephant+2',
    backgroundImage: 'https://placehold.co/1200x675/png?text=The+Blue+Elephant+2',
    rating: 7.8,
    year: '2019',
    description: 'Dark supernatural events return to haunt Yahia.',
    genre: 'Thriller',
    duration: '2h 10m',
    director: 'Marwan Hamed',
    cast: ['Karim Abdel Aziz', 'Hend Sabry'],
    watchLink: '#',
    isHot: true,
    trending: true,
    topRated: true
  },
  {
    id: 26,
    title: '122',
    type: 'movie',
    image: 'https://placehold.co/315x420/png?text=122',
    backgroundImage: 'https://placehold.co/1200x675/png?text=122',
    rating: 6.8,
    year: '2019',
    description: 'A horror thriller inside a terrifying hospital.',
    genre: 'Horror',
    duration: '1h 35m',
    director: 'Yasser Aly',
    cast: ['Ahmed Dawood', 'Amina Khalil'],
    watchLink: '#',
    isHot: false,
    trending: true,
    topRated: false
  },
  {
    id: 27,
    title: 'El Kenz',
    type: 'movie',
    image: 'https://placehold.co/315x420/png?text=El+Kenz',
    backgroundImage: 'https://placehold.co/1200x675/png?text=El+Kenz',
    rating: 7.0,
    year: '2017',
    description: 'Historical mysteries unfold across different timelines.',
    genre: 'Adventure',
    duration: '2h 43m',
    director: 'Sherif Arafa',
    cast: ['Mohamed Ramadan', 'Hend Sabry'],
    watchLink: '#',
    isHot: false,
    trending: false,
    topRated: false
  },
  {
    id: 28,
    title: 'Al Khaleya',
    type: 'movie',
    image: 'https://placehold.co/315x420/png?text=Al+Khaleya',
    backgroundImage: 'https://placehold.co/1200x675/png?text=Al+Khaleya',
    rating: 7.1,
    year: '2017',
    description: 'Special forces fight against terrorist threats.',
    genre: 'Action',
    duration: '2h 6m',
    director: 'Tarek Alarian',
    cast: ['Ahmed Ezz', 'Mohamed Mamdouh'],
    watchLink: '#',
    isHot: true,
    trending: true,
    topRated: false
  },
  {
    id: 29,
    title: 'Haram El Gassad',
    type: 'movie',
    image: 'https://placehold.co/315x420/png?text=Haram+El+Gassad',
    backgroundImage: 'https://placehold.co/1200x675/png?text=Haram+El+Gassad',
    rating: 6.3,
    year: '2016',
    description: 'A dramatic story about power, betrayal, and ambition.',
    genre: 'Drama',
    duration: '1h 50m',
    director: 'Khaled El Hagar',
    cast: ['Rania Youssef', 'Mahmoud Abdel Moghny'],
    watchLink: '#',
    isHot: false,
    trending: false,
    topRated: false
  },
  {
    id: 30,
    title: 'Hamlet Pheroun',
    type: 'movie',
    image: 'https://placehold.co/315x420/png?text=Hamlet+Pheroun',
    backgroundImage: 'https://placehold.co/1200x675/png?text=Hamlet+Pheroun',
    rating: 6.7,
    year: '2019',
    description: 'A dangerous mission unfolds between Egypt and Syria.',
    genre: 'Action',
    duration: '1h 45m',
    director: 'Raouf Abdel Aziz',
    cast: ['Amr Saad', 'Mahmoud Abdel Moghny'],
    watchLink: '#',
    isHot: true,
    trending: false,
    topRated: false
  },
  {
    id: 31,
    title: 'El Harifa',
    type: 'movie',
    image: 'https://placehold.co/315x420/png?text=El+Harifa',
    backgroundImage: 'https://placehold.co/1200x675/png?text=El+Harifa',
    rating: 7.2,
    year: '2024',
    description: 'A talented football player faces challenges in school tournaments.',
    genre: 'Sports',
    duration: '1h 50m',
    director: 'Raouf El Sayed',
    cast: ['Nour El Nabawy', 'Ahmed Ghozzi'],
    watchLink: '#',
    isHot: true,
    trending: true,
    topRated: false
  },
  {
    id: 32,
    title: 'Baad El Shar',
    type: 'movie',
    image: 'https://placehold.co/315x420/png?text=Baad+El+Shar',
    backgroundImage: 'https://placehold.co/1200x675/png?text=Baad+El+Shar',
    rating: 6.0,
    year: '2023',
    description: 'A romantic comedy with magical twists and adventures.',
    genre: 'Comedy',
    duration: '1h 42m',
    director: 'Ahmed Abdel Wahab',
    cast: ['Ali Rabie', 'Myrna Nour El Din'],
    watchLink: '#',
    isHot: false,
    trending: false,
    topRated: false
  },
  {
    id: 33,
    title: 'Nabd El Omor',
    type: 'movie',
    image: 'https://placehold.co/315x420/png?text=Nabd+El+Omor',
    backgroundImage: 'https://placehold.co/1200x675/png?text=Nabd+El+Omor',
    rating: 6.8,
    year: '2023',
    description: 'A touching story about love, life, and difficult choices.',
    genre: 'Drama',
    duration: '1h 40m',
    director: 'Adel Aadeb',
    cast: ['Nadine Nassib Njeim', 'Maged El Kedwany'],
    watchLink: '#',
    isHot: false,
    trending: true,
    topRated: false
  },
  {
    id: 34,
    title: 'Voy Voy Voy',
    type: 'movie',
    image: 'https://placehold.co/315x420/png?text=Voy+Voy+Voy',
    backgroundImage: 'https://placehold.co/1200x675/png?text=Voy+Voy+Voy',
    rating: 7.9,
    year: '2023',
    description: 'A young man pretends to be visually impaired to join a football team.',
    genre: 'Comedy',
    duration: '1h 50m',
    director: 'Omar Hilal',
    cast: ['Mohamed Farrag', 'Nelly Karim'],
    watchLink: '#',
    isHot: true,
    trending: true,
    topRated: true
  },
  {
    id: 35,
    title: 'Shalaby',
    type: 'movie',
    image: 'https://placehold.co/315x420/png?text=Shalaby',
    backgroundImage: 'https://placehold.co/1200x675/png?text=Shalaby',
    rating: 6.4,
    year: '2023',
    description: 'A man tries to fulfill his late friend’s dream.',
    genre: 'Comedy',
    duration: '1h 48m',
    director: 'Peter Mimi',
    cast: ['Karim Mahmoud Abdel Aziz', 'Ruby'],
    watchLink: '#',
    isHot: false,
    trending: false,
    topRated: false
  },
  {
    id: 36,
    title: 'Tag',
    type: 'movie',
    image: 'https://placehold.co/315x420/png?text=Tag',
    backgroundImage: 'https://placehold.co/1200x675/png?text=Tag',
    rating: 6.6,
    year: '2023',
    description: 'A superhero comedy with unusual powers and adventures.',
    genre: 'Comedy',
    duration: '1h 53m',
    director: 'Sara Wafik',
    cast: ['Tamer Hosny', 'Dina El Sherbiny'],
    watchLink: '#',
    isHot: true,
    trending: true,
    topRated: false
  },
  {
    id: 37,
    title: 'Aserb',
    type: 'movie',
    image: 'https://placehold.co/315x420/png?text=Aserb',
    backgroundImage: 'https://placehold.co/1200x675/png?text=Aserb',
    rating: 7.0,
    year: '2024',
    description: 'An action-packed mission inspired by real events.',
    genre: 'Action',
    duration: '2h 4m',
    director: 'Ahmed Nader Galal',
    cast: ['Ahmed El Sakka', 'Mohamed Mamdouh'],
    watchLink: '#',
    isHot: true,
    trending: true,
    topRated: false
  },
  {
    id: 38,
    title: 'El Hareefa 2',
    type: 'movie',
    image: 'https://placehold.co/315x420/png?text=El+Hareefa+2',
    backgroundImage: 'https://placehold.co/1200x675/png?text=El+Hareefa+2',
    rating: 7.3,
    year: '2025',
    description: 'The football team returns for bigger challenges and competitions.',
    genre: 'Sports',
    duration: '2h 0m',
    director: 'Raouf El Sayed',
    cast: ['Nour El Nabawy', 'Khaled El Zahaby'],
    watchLink: '#',
    isHot: true,
    trending: true,
    topRated: false
  }
]

export function ContentProvider({ children }: { children: ReactNode }) {
  const [contents, setContents] = useState<Content[]>(FALLBACK)
  const [loading,  setLoading]  = useState(false)

  useEffect(() => { reload() }, [])

  async function reload() {
    setLoading(true)
    try {
      const data = await contentApi.all()
      if (Array.isArray(data) && data.length > 0) setContents(data)
    } catch { /* use fallback silently */ }
    finally { setLoading(false) }
  }

  async function addContent(d: Omit<Content,'id'>) {
    try {
      const item = await adminApi.addContent({ ...d, background_image: d.backgroundImage, watch_link: d.watchLink, is_hot: d.isHot, is_new: d.isNew, is_trending: d.trending, is_top_rated: d.topRated, is_featured: d.featured })
      setContents(p => [...p, item])
    } catch { setContents(p => [...p, { ...d, id: Date.now() }]) }
  }

  async function updateContent(id: number, d: Partial<Content>) {
    try {
      const item = await adminApi.updateContent(id, { ...d, background_image: d.backgroundImage, watch_link: d.watchLink, is_hot: d.isHot, is_new: d.isNew, is_trending: d.trending, is_top_rated: d.topRated, is_featured: d.featured })
      setContents(p => p.map(c => c.id===id ? item : c))
    } catch { setContents(p => p.map(c => c.id===id ? {...c,...d} : c)) }
  }

  async function deleteContent(id: number) {
    try { await adminApi.deleteContent(id) } catch {}
    setContents(p => p.filter(c => c.id!==id))
  }

  async function setFeatured(id: number) {
    try { await adminApi.setFeatured(id) } catch {}
    setContents(p => p.map(c => ({...c, featured: c.id===id})))
  }

  const getFeatured = () => contents.find(c=>c.featured) ?? contents[0] ?? null

  return (
    <Cx.Provider value={{ contents, loading, addContent, updateContent, deleteContent, setFeatured, getFeatured, reload }}>
      {children}
    </Cx.Provider>
  )
}

export const useContent = () => {
  const c = useContext(Cx); if (!c) throw new Error(); return c
}
