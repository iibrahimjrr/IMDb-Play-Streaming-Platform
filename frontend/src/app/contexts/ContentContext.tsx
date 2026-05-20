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
  id: 1,
  title: 'Kira & El Gin',
  type: 'movie',
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQefuPfDel_V-JydkYHli6ar2svlwr3XVQImUTCUA0FOA&s',
  backgroundImage: 'https://i.ytimg.com/vi/Sh3T6kRHbD0/maxresdefault.jpg',
  rating: 7.3,
  year: '2022',
  description: 'During the 1919 revolution, two men from different backgrounds unite against the British occupation in a story filled with action and resistance.',
  genre: 'Action',
  duration: '2h 55m',
  director: 'Marwan Hamed',
  cast: ['Karim Abdel Aziz', 'Ahmed Ezz', 'Hend Sabry'],
  watchLink: 'https://www.playimdb.com/title/tt10935956/',
  isHot: true,
  trending: true,
  topRated: false
},
{
  id:2,
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
  isHot:true, 
  trending:false, 
  topRated:false 
},

{
  id: 3,
  title: 'El Fil El Azraq',
  type: 'movie',
  image: 'https://media0101.elcinema.com/uploads/_320x_af66a2bc372508ec81f5101518c3c0f1352ab7d1b2af1152a41dd305a5ca1402.jpg',
  backgroundImage: 'https://occ-0-8407-92.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABbUAyrNgKptnift9DsJTnTOkiZ05uVPL-pDkgJDyIN9FId6PfKueWChk2ZiajEAbx6NJ-qBlGXORSqkjso50E7RxETI2AUQwK0eg.jpg?r=342',
  rating: 8.1,
  year: '2014',
  description: 'A psychiatrist returns to work at Al Abbasia hospital where he faces a dangerous criminal case connected to his past and strange supernatural events.',
  genre: 'Thriller',
  duration: '2h 50m',
  director: 'Marwan Hamed',
  cast: ['Karim Abdel Aziz', 'Nelly Karim', 'Khaled El Sawy'],
  watchLink: 'https://www.playimdb.com/title/tt3461252/?ref_=tt_mlt_t_1',
  isHot: false,
  trending: false,
  topRated: false
},



{
  id: 4,
  title: 'Ibrahim El Abyad',
  type: 'movie',
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUMZx9rgEepGfL_1_5UpqgWQZcpUSMaE0jggkqKQ9ABg&s',
  backgroundImage: 'https://a.ltrbxd.com/resized/alternative-backdrop/8/3/9/1/1/tmdb/bhZbvvTv7uDRZ0oW7LwFj2wzloy-1200-1200-675-675-crop-000000.jpg?v=a4d43f4294',
  rating: 7.5,
  year: '2009',
  description: 'A young man raised in dangerous neighborhoods seeks revenge after witnessing the murder of his father.',
  genre: 'Crime',
  duration: '2h 14m',
  director: 'Marwan Hamed',
  cast: ['Ahmed El Sakka', 'Amr Waked', 'Hend Sabry'],
  watchLink: 'https://www.playimdb.com/title/tt1459040/',
  isHot: false,
  trending: false,
  topRated: false
},

{
  id: 5,
  title: 'El Gezira',
  type: 'movie',
  image: 'https://upload.wikimedia.org/wikipedia/en/a/a4/El_Gezeira_film.jpg',
  backgroundImage: 'https://www.ledr.com/colours/black.jpg',
  rating: 7.8,
  year: '2007',
  description: 'A powerful drug dealer rises to control an isolated island while facing police and rival gangs.',
  genre: 'Action',
  duration: '2h 5m',
  director: 'Sherif Arafa',
  cast: ['Ahmed El Sakka', 'Hend Sabry', 'Mahmoud Yassin'],
  watchLink: '',
  isHot: false,
  trending: false,
  topRated: false
},

{
  id: 6,
  title: 'Welad Rizk',
  type: 'movie',
  image: 'https://media0101.elcinema.com/uploads/_315x420_779243c14757d8c4c715ba34f4115f07e794480ffca02ca376ca3d8e5b2008d6.jpg',
  backgroundImage: 'https://www.ledr.com/colours/black.jpg',
  rating: 7.1,
  year: '2015',
  description: 'A group of brothers involved in crime try to leave their dangerous life behind, but their past keeps chasing them.',
  genre: 'Action',
  duration: '1h 55m',
  director: 'Tarek Alarian',
  cast: ['Ahmed Ezz', 'Amr Youssef', 'Ahmed Dawood'],
  watchLink: 'https://www.playimdb.com/title/tt4840206/',
  isHot: false,
  trending: false,
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
    watchLink: 'https://www.playimdb.com/title/tt1173901/',
    isHot: false,
    trending: false,
    topRated: false
  },
  {
    id: 9,
    title: 'Tito',
    type: 'movie',
    image: 'https://a.ltrbxd.com/resized/film-poster/1/0/7/4/8/4/107484-tito-0-230-0-345-crop.jpg?v=81c86e1969',
    backgroundImage: 'https://www.ledr.com/colours/black.jpg',
    rating: 7.4,
    year: '2004',
    description: 'A criminal struggles between loyalty, love, and survival.',
    genre: 'Action',
    duration: '1h 58m',
    director: 'Tarek El Erian',
    cast: ['Ahmed El Sakka', 'Hanan Turk'],
    watchLink: 'https://www.playimdb.com/title/tt0417202/',
    isHot: false,
    trending: false,
    topRated: false
  },
{
  id: 10,
  title: 'Morgan Ahmed Morgan',
  type: 'movie',
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZs43qcUBjnWnOL16a5K6KUa8fh4yNU-hFgw&s',
  backgroundImage: 'https://alchetron.com/cdn/morgan-ahmed-morgan-4452d3bd-1346-409f-9928-09388dd32bf-resize-750.jpeg',
  rating: 6.9,
  year: '2007',
  description: 'A wealthy businessman returns to university life with his daughter.',
  genre: 'Comedy',
  duration: '1h 55m',
  director: 'Ali Idris',
  cast: ['Adel Imam', 'Mervat Amin'],
  watchLink: 'https://www.playimdb.com/title/tt1423961/',
  isHot: false,
  trending: false,
  topRated: false
},
{
  id: 11,
  title: 'Hassan & Morcos',
  type: 'movie',
  image: 'https://upload.wikimedia.org/wikipedia/en/c/c5/Hasan_wa_Murqos_Poster_%282008%29.jpg',
  backgroundImage: 'https://upload.wikimedia.org/wikipedia/en/c/c5/Hasan_wa_Murqos_Poster_%282008%29.jpg',
  rating: 7.0,
  year: '2008',
  description: 'Two families face identity conflicts in a social comedy.',
  genre: 'Comedy',
  duration: '2h 0m',
  director: 'Ramy Imam',
  cast: ['Adel Imam', 'Omar elshref'],
  watchLink: 'https://www.playimdb.com/title/tt1423939/',
  isHot: false,
  trending: false,
  topRated: false
},

{
  id: 13,
  title: 'X-Large',
  type: 'movie',
  image: 'https://media0101.elcinema.com/uploads/_315x420_75ffb46ed95b519c0ac408410be322dd9a8aa66c9dbd9d8f42c54fd653078b82.jpg',
  backgroundImage: 'https://www.ledr.com/colours/black.jpg',
  rating: 7.2,
  year: '2011',
  description: 'A man struggles with self-confidence and relationships because of his weight.',
  genre: 'Comedy',
  duration: '2h 10m',
  director: 'Sherif Arafa',
  cast: ['Ahmed Helmy', 'Donia Samir Ghanem'],
  watchLink: 'https://www.playimdb.com/title/tt2156807/',
  isHot: false,
  trending: false,
  topRated: false
},
{
  id: 14,
  title: 'Asal Eswed',
  type: 'movie',
  image: 'https://media0101.elcinema.com/uploads/_315x420_508b0515724d4ed184e47db9556f9c41d463674c256a3389b3c5efc75cd9c1d3.jpg',
  backgroundImage: 'https://pbs.twimg.com/media/EqfRxZkXYAIsalQ.jpg',
  rating: 7.3,
  year: '2010',
  description: 'An Egyptian-American returns to Egypt after years abroad.',
  genre: 'Comedy',
  duration: '2h 11m',
  director: 'Khaled Marei',
  cast: ['Ahmed Helmy', 'Amy Samir Ghanem'],
  watchLink: 'https://www.playimdb.com/title/tt2210441/',
  isHot: false,
  trending: false,
  topRated: false
},

{
  id: 22,
  title: 'El Mamar',
  type: 'movie',
  image: 'https://media0101.elcinema.com/uploads/_320x_a736b93ffd2500ebfe48f895cacb83ab6cb81c3d1066e78b32315ceffd51195c.jpg',
  backgroundImage: 'https://www.ledr.com/colours/black.jpg',
  rating: 7.8,
  year: '2019',
  description: 'An Egyptian officer leads a heroic military mission.',
  genre: 'War',
  duration: '2h 10m',
  director: 'Sherif Arafa',
  cast: ['Ahmed عز', 'Ahmed Rizk'],
  watchLink: '#',
  isHot: false,
  trending: false,
  topRated: false
},
{
  id: 25,
  title: 'The Blue Elephant 2',
  type: 'movie',
  image: 'https://upload.wikimedia.org/wikipedia/ar/6/66/%D9%85%D9%84%D8%B5%D9%82_%D9%81%D9%8A%D9%84%D9%85_%D8%A7%D9%84%D9%81%D9%8A%D9%84_%D8%A7%D9%84%D8%A3%D8%B2%D8%B1%D9%82_2_%282019%29.jpg',
  backgroundImage: 'https://www.cairo24.com/UploadCache/libfiles/4/5/600x338o/763.jpg',
  rating: 7.8,
  year: '2019',
  description: 'Dark supernatural events return to haunt Yahia.',
  genre: 'Thriller',
  duration: '2h 10m',
  director: 'Marwan Hamed',
  cast: ['Karim Abdel Aziz', 'Hend Sabry'],
  watchLink: 'https://www.playimdb.com/title/tt10515086/',
  isHot: false,
  trending: false,
  topRated: false
},
{
  id: 27,
  title: 'El Kenz',
  type: 'movie',
  image: 'https://media0101.elcinema.com/uploads/_315x420_aa0c15b0fdfc2b1bcacfa4d52582f273e05bd056ebc7fbe78090308889259287.jpg',
  backgroundImage: 'https://placehold.co/1200x675/png?text=El+Kenz',
  rating: 7.0,
  year: '2017',
  description: 'Historical mysteries unfold across different timelines.',
  genre: 'Adventure',
  duration: '2h 43m',
  director: 'Sherif Arafa',
  cast: ['Mohamed Ramadan', 'Hend Sabry'],
  watchLink: 'https://www.playimdb.com/title/tt6182954/',
  isHot: false,
  trending: false,
  topRated: false
},
{
  id: 28,
  title: 'Al Khaleya',
  type: 'movie',
  image: 'https://media0101.elcinema.com/uploads/_320x_ef2a7ba3deddf66a80f5ffb01731814438687cf07d463c8fd9f5d38862e9e871.jpg',
  backgroundImage: 'https://resizing.flixster.com/WBZMSFQDq5xYug32iT42hgdC1EQ=/fit-in/352x330/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p26693324_i_h10_aa.jpg',
  rating: 7.1,
  year: '2017',
  description: 'Special forces fight against terrorist threats.',
  genre: 'Action',
  duration: '2h 6m',
  director: 'Tarek Alarian',
  cast: ['Ahmed Ezz', 'Mohamed Mamdouh'],
  watchLink: 'https://www.playimdb.com/title/tt7025210/',
  isHot: false,
  trending: false,
  topRated: false
},

{
  id: 31,
  title: 'El Harifa 1',
  type: 'movie',
  image: 'https://media0101.elcinema.com/uploads/_315x420_af58f42120e7abb35da00f97f9f1569da9526d275e663fd38988c0c09cfa6bf8.jpg',
  backgroundImage: 'https://images.justwatch.com/backdrop/332115902/s640/al-harifa.jpg',
  rating: 7.2,
  year: '2024',
  description: 'A talented football player faces challenges in school tournaments.',
  genre: 'Sports',
  duration: '1h 50m',
  director: 'Raouf El Sayed',
  cast: ['Nour El Nabawy', 'Ahmed Ghozzi'],
  watchLink: 'https://www.playimdb.com/title/tt30869622/',
  isHot: false,
  trending: false,
  topRated: false
},
{
  id: 34,
  title: 'Voy Voy Voy',
  type: 'movie',
  image: 'https://media0101.elcinema.com/uploads/_315x420_2d2272cce34ba42e4c7061e7960b5f0eb0d0b09ff71e65dd4a58e28553f57bab.jpg',
  backgroundImage: 'https://variety.com/wp-content/uploads/2023/11/Voy-Voy-Voy.jpg',
  rating: 7.9,
  year: '2023',
  description: 'A young man pretends to be visually impaired to join a football team.',
  genre: 'Comedy',
  duration: '1h 50m',
  director: 'Omar Hilal',
  cast: ['Mohamed Farrag', 'Nelly Karim'],
  watchLink: 'https://www.playimdb.com/title/tt27721079/',
  isHot: false,
  trending: false,
  topRated: false
},
{
  id: 35,
  title: 'Shalaby',
  type: 'movie',
  image: 'https://upload.wikimedia.org/wikipedia/ar/3/3e/%D9%85%D9%84%D8%B5%D9%82_%D9%81%D9%8A%D9%84%D9%85_%D8%B4%D9%84%D8%A8%D9%8A.jpg',
  backgroundImage: 'https://placehold.co/1200x675/png?text=Shalaby',
  rating: 6.4,
  year: '2023',
  description: 'A man tries to fulfill his late friend’s dream.',
  genre: 'Comedy',
  duration: '1h 48m',
  director: 'Peter Mimi',
  cast: ['Karim Mahmoud Abdel Aziz', 'Ruby'],
  watchLink: 'https://www.playimdb.com/title/tt24852128/',
  isHot: false,
  trending: false,
  topRated: false
},
{
  id: 36,
  title: 'Tag',
  type: 'movie',
  image: 'https://media0101.elcinema.com/uploads/_320x_10e9f7b7d74d1c449221acd9a0d5d6e17b57223a730e3f6513f1f1e0b1d1cf6b.jpg',
  backgroundImage: 'https://www.ledr.com/colours/black.jpg',
  rating: 6.6,
  year: '2023',
  description: 'A superhero comedy with unusual powers and adventures.',
  genre: 'Comedy',
  duration: '1h 53m',
  director: 'Sara Wafik',
  cast: ['Tamer Hosny', 'Dina El Sherbiny'],
  watchLink: 'https://www.playimdb.com/title/tt27881382/',
  isHot: false,
  trending: false,
  topRated: false
},
{
  id: 37,
  title: 'Aserb',
  type: 'movie',
  image: '#',
  backgroundImage: '#',
  rating: 7.0,
  year: '2024',
  description: 'An action-packed mission inspired by real events.',
  genre: 'Action',
  duration: '2h 4m',
  director: 'Ahmed Nader Galal',
  cast: ['Ahmed El Sakka', 'Mohamed Mamdouh'],
  watchLink: '#',
  isHot: false,
  trending: false,
  topRated: false
},
{
  id: 38,
  title: 'El Hareefa 2',
  type: 'movie',
  image: 'https://media0101.elcinema.com/uploads/_315x420_ba718673cd0bdfce4c818f40ecfe29c69a40a6b2d6b11bcc5a605c07b4e3f4c8.jpg',
  backgroundImage: 'https://cairogossip.com/app/uploads/2024/12/461331431_1114007890089982_6470501766842847296_n.jpg',
  rating: 7.3,
  year: '2025',
  description: 'The football team returns for bigger challenges and competitions.',
  genre: 'Sports',
  duration: '2h 0m',
  director: 'Raouf El Sayed',
  cast: ['Nour El Nabawy', 'Khaled El Zahaby'],
  watchLink: 'https://www.playimdb.com/title/tt34736127/',
  isHot: false,
  trending: false,
  topRated: false
},

{
  id: 40,
  title: 'The Shawshank Redemption',
  type: 'movie',
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4HfK8vvdtiNty9d6Gu0Da_BHCGJWlbl2M-Q&s',
  backgroundImage: 'https://media.vanityfair.com/photos/5d8535de6879fa00082e6ed9/master/pass/the-Shawshank-Redemption-movie-lede.png',
  rating: 9.3,
  year: '1994',
  description: 'Two imprisoned men bond over years, finding hope and redemption.',
  genre: 'Drama',
  duration: '2h 22m',
  director: 'Frank Darabont',
  cast: ['Tim Robbins', 'Morgan Freeman'],
  watchLink: 'https://www.playimdb.com/title/tt0111161/',
  isHot: false,
  trending: false,
  topRated: true
},
{
  id: 41,
  title: 'The Godfather',
  type: 'movie',
  image: 'https://s3.amazonaws.com/nightjarprod/content/uploads/sites/243/2025/07/08153500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
  backgroundImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaLRdZkkq3ocTU_AGKRWav38kNgCRYec5w5g&s',
  rating: 9.2,
  year: '1972',
  description: 'The aging patriarch of an organized crime dynasty transfers control to his son.',
  genre: 'Crime',
  duration: '2h 55m',
  director: 'Francis Ford Coppola',
  cast: ['Marlon Brando', 'Al Pacino'],
  watchLink: 'https://www.playimdb.com/title/tt0068646/',
  isHot: true,
  trending: false,
  topRated: true
},
{
  id: 42,
  title: 'The Dark Knight',
  type: 'movie',
  image: 'https://play-lh.googleusercontent.com/auIs5tjWlLYaFPGClZOJ7m5YVbnX6uBvz0X02r8TkwFKdzE53ww2MqWSS9gU0YNqoYwvpg',
  backgroundImage: 'https://cdn.theatlantic.com/thumbor/zZWVn7B3bzrWJSxPFfgCh3LB3xM=/0x34:1597x866/1200x625/media/img/mt/2018/07/TDK/original.jpg',
  rating: 9.0,
  year: '2008',
  description: 'Batman faces the Joker, a criminal mastermind who plunges Gotham into chaos.',
  genre: 'Action',
  duration: '2h 32m',
  director: 'Christopher Nolan',
  cast: ['Christian Bale', 'Heath Ledger'],
  watchLink: 'https://www.playimdb.com/title/tt0468569/',
  isHot: true,
  trending: false,
  topRated: true
},
{
  id: 43,
  title: 'The Godfather Part II',
  type: 'movie',
  image: 'https://images.squarespace-cdn.com/content/v1/62ceea4ed58a7120a198c234/dced6517-2c20-40b6-b5d1-24936bd9e21a/GF2.png',
  backgroundImage: 'https://variety.com/wp-content/uploads/2017/01/godfather-part-ii.jpg',
  rating: 9.0,
  year: '1974',
  description: 'The early life and career of Vito Corleone, and his son Michael’s expansion of the family empire.',
  genre: 'Crime',
  duration: '3h 22m',
  director: 'Francis Ford Coppola',
  cast: ['Al Pacino', 'Robert De Niro'],
  watchLink: 'https://www.playimdb.com/title/tt0071562/',
  isHot: true,
  trending: false,
  topRated: true
},
{
  id: 44,
  title: '12 Angry Men',
  type: 'movie',
  image: 'https://upload.wikimedia.org/wikipedia/ar/f/f5/Twelve_angry_men.jpg',
  backgroundImage: 'https://filmforum.org/do-not-enter-or-modify-or-erase/client-uploads/hank_and_jim/_1000w/12-ANGRY-MEN---MAIN.jpg',
  rating: 9.0,
  year: '1957',
  description: 'A jury deliberates the guilt or innocence of a defendant.',
  genre: 'Drama',
  duration: '1h 36m',
  director: 'Sidney Lumet',
  cast: ['Henry Fonda', 'Lee J. Cobb'],
  watchLink: 'https://www.playimdb.com/title/tt0050083/',
  isHot: false,
  trending: false,
  topRated: true
},

{
  id: 47,
  title: 'Pulp Fiction',
  type: 'movie',
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQauKd3omxWubAAXlOX-J5poW3ePEgskRFTLA&s',
  backgroundImage: 'https://m.media-amazon.com/images/S/pv-target-images/cb92f30cfbbf13f8a75b07a9080cb1ec84835cc2bafbc2b09b18b922376ed5e9._SX1080_FMjpg_.jpg',
  rating: 8.9,
  year: '1994',
  description: 'Interwoven stories of crime and redemption in Los Angeles.',
  genre: 'Crime',
  duration: '2h 34m',
  director: 'Quentin Tarantino',
  cast: ['John Travolta', 'Samuel L. Jackson'],
  watchLink: 'https://www.playimdb.com/title/tt0110912/',
  isHot: false,
  trending: false,
  topRated: true
},

{
  id: 50,
  title: 'Fight Club',
  type: 'movie',
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNX2oZKIYLaW3kP_s97weKyOfIYJGHKPGljbNde55meA&s',
  backgroundImage: 'https://kinorotterdam.nl/content/uploads/2023/09/Fight-club-still-1.jpg',
  rating: 8.8,
  year: '1999',
  description: 'An underground fight club becomes something much more.',
  genre: 'Drama',
  duration: '2h 19m',
  director: 'David Fincher',
  cast: ['Brad Pitt', 'Edward Norton'],
  watchLink: 'https://www.playimdb.com/title/tt0137523/',
  isHot: true,
  trending: false,
  topRated: true
},
{
  id: 51,
  title: 'Inception',
  type: 'movie',
  image: 'https://upload.wikimedia.org/wikipedia/ar/e/e8/%D8%BA%D9%84%D8%A7%D9%81_%D9%81%D9%84%D9%85_%D8%A7%D8%B3%D8%AA%D9%87%D9%84%D8%A7%D9%84_%282010%29.jpeg',
  backgroundImage: 'https://occ-0-8407-2218.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABYq9mQWYeTu6dcsJ11AVU4tp9bu8qTaE8Q_njYFh39z-LyKinyLHcsDutldA6n3DeMX9-ImDCOm7BhSfNnR4Yy8711R1ZYs6HN9y.jpg?r=df3',
  rating: 8.8,
  year: '2010',
  description: 'A thief enters dreams to steal or plant ideas.',
  genre: 'Sci-Fi',
  duration: '2h 28m',
  director: 'Christopher Nolan',
  cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt'],
  watchLink: 'https://www.playimdb.com/title/tt5295990/',
  isHot: true,
  trending: false,
  topRated: true
},

{
  id: 54,
  title: 'Goodfellas',
  type: 'movie',
  image: 'https://rafaelfilm.cafilm.org/wp-content/uploads/2022/05/goodfellas_sq.png',
  backgroundImage: 'https://people.com/thmb/wBUoqIhvO-XC13zR0Tt5uz3U-JQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(708x503:710x505)/Ray-Liotta-Robert-de-Niro-Paul-Sorvino-Joe-Pesci-Goodfellas-091125-tout-6114a89887fd45dcbe08903f27f366ff.jpg',
  rating: 8.7,
  year: '1990',
  description: 'The rise and fall of a mafia associate.',
  genre: 'Crime',
  duration: '2h 25m',
  director: 'Martin Scorsese',
  cast: ['Robert De Niro', 'Ray Liotta'],
  watchLink: 'https://www.playimdb.com/title/tt0099685/',
  isHot: true,
  trending: false,
  topRated: true
},

{
  id: 55,
  title: 'Interstellar',
  type: 'movie',
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJHnx-WNPvrs5Ht6p3ZXI2_QY4eYWWikJKyg&s',
  backgroundImage: 'https://cdn.britannica.com/68/276368-050-6927FFE2/publicity-still-from-film-intersteller.jpg',
  rating: 8.7,
  year: '2014',
  description: 'A team of explorers travel through a wormhole in space to save humanity.',
  genre: 'Sci-Fi',
  duration: '2h 49m',
  director: 'Christopher Nolan',
  cast: ['Matthew McConaughey', 'Anne Hathaway'],
  watchLink: 'https://www.playimdb.com/title/tt0816692/',
  isHot: false,
  trending: false,
  topRated: true
},
{
  id: 56,
  title: 'Se7en',
  type: 'movie',
  image: 'https://static.wikia.nocookie.net/allthetropes/images/1/1d/Articulos_1066_IMAGEN2_4204.jpg/revision/latest?cb=20240925012013',
  backgroundImage: 'https://substackcdn.com/image/fetch/$s_!Pu8Q!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcdbd0c17-6b2d-4f2f-a634-df63bfc71c3b_1600x666.jpeg',
  rating: 8.6,
  year: '1995',
  description: 'Two detectives hunt a serial killer using the seven deadly sins.',
  genre: 'Thriller',
  duration: '2h 7m',
  director: 'David Fincher',
  cast: ['Brad Pitt', 'Morgan Freeman'],
  watchLink: 'https://www.playimdb.com/title/tt0114369/',
  isHot: false,
  trending: false,
  topRated: true
},
{
  id: 57,
  title: 'The Silence of the Lambs',
  type: 'movie',
  image: 'https://m.media-amazon.com/images/I/51SHYSFNP2L._AC_UF1000,1000_QL80_.jpg',
  backgroundImage: 'https://www.indiewire.com/wp-content/uploads/2017/02/silence-of-the-lambs-anthony-hopkins-01.jpg?w=600&h=337&crop=1',
  rating: 8.6,
  year: '1991',
  description: 'A young FBI cadet seeks the help of a brilliant but dangerous cannibal psychiatrist.',
  genre: 'Thriller',
  duration: '1h 58m',
  director: 'Jonathan Demme',
  cast: ['Jodie Foster', 'Anthony Hopkins'],
  watchLink: 'https://www.playimdb.com/title/tt0102926/',
  isHot: false,
  trending: false,
  topRated: true
},

]

export function ContentProvider({ children }: { children: ReactNode }) {
  const [contents, setContents] = useState<Content[]>(FALLBACK)
  const [loading,  setLoading]  = useState(false)

  useEffect(() => { reload() }, [])

  async function reload() {
    setLoading(false)
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
