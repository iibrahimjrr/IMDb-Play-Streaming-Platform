<?php

namespace Database\Seeders;

use App\Models\Content;
use App\Models\Episode;
use App\Models\Season;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // ── Users ──────────────────────────────────────────────────────────────
        User::firstOrCreate(['email' => 'ibrahim@imdbplay'], [
            'name'     => 'Ibrahim Elsayed',
            'password' => Hash::make('123123'),
            'role'     => 'admin',
        ]);

        // ── Contents ───────────────────────────────────────────────────────────
      $movies = [

['title'=>'Kira & El Gin','type'=>'movie','genre'=>'Action','year'=>'2022','duration'=>'2h 55m','rating'=>7.3,'description'=>'During the 1919 revolution, two men from different backgrounds unite against the British occupation.','director'=>'Marwan Hamed','cast'=>['Karim Abdel Aziz','Ahmed Ezz','Hend Sabry'],'image'=>'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQefuPfDel_V-JydkYHli6ar2svlwr3XVQImUTCUA0FOA&s','background_image'=>'https://i.ytimg.com/vi/Sh3T6kRHbD0/maxresdefault.jpg','watch_link'=>'https://www.playimdb.com/title/tt10935956/','is_hot'=>true,'is_trending'=>true],

['title'=>'Turab el-Mas','type'=>'movie','genre'=>'Drama','year'=>'2018','duration'=>'2h 42m','rating'=>7.9,'description'=>'A pharmacist seeks revenge after his father is murdered.','director'=>'Marwan Hamed','cast'=>['Asser Yassin','Menna Shalabi','Maged El-Kidwani'],'image'=>'https://media0101.elcinema.com/uploads/_315x420_88a789aeff4ccf3a4408e9f5369f0dd34028c8f313da2a052898ecb273cbc26d.jpg','background_image'=>'https://images.mubicdn.net/images/film/388813/cache-904512-1745501785/image-w1280.jpg?size=800x','watch_link'=>'https://www.playimdb.com/title/tt4003070/?ref_=mv_close','is_hot'=>true,'is_trending'=>false],

['title'=>'El Fil El Azraq','type'=>'movie','genre'=>'Thriller','year'=>'2014','duration'=>'2h 50m','rating'=>8.1,'description'=>'A psychiatrist faces supernatural mysteries and dark secrets.','director'=>'Marwan Hamed','cast'=>['Karim Abdel Aziz','Nelly Karim','Khaled El Sawy'],'image'=>'https://media0101.elcinema.com/uploads/_320x_af66a2bc372508ec81f5101518c3c0f1352ab7d1b2af1152a41dd305a5ca1402.jpg','background_image'=>'https://occ-0-8407-92.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABbUAyrNgKptnift9DsJTnTOkiZ05uVPL-pDkgJDyIN9FId6PfKueWChk2ZiajEAbx6NJ-qBlGXORSqkjso50E7RxETI2AUQwK0eg.jpg?r=342','watch_link'=>'https://www.playimdb.com/title/tt3461252/?ref_=tt_mlt_t_1','is_hot'=>false,'is_trending'=>false],

['title'=>'Ibrahim El Abyad','type'=>'movie','genre'=>'Crime','year'=>'2009','duration'=>'2h 14m','rating'=>7.5,'description'=>'A young man seeks revenge after witnessing his father’s murder.','director'=>'Marwan Hamed','cast'=>['Ahmed El Sakka','Amr Waked','Hend Sabry'],'image'=>'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUMZx9rgEepGfL_1_5UpqgWQZcpUSMaE0jggkqKQ9ABg&s','background_image'=>'https://a.ltrbxd.com/resized/alternative-backdrop/8/3/9/1/1/tmdb/bhZbvvTv7uDRZ0oW7LwFj2wzloy-1200-1200-675-675-crop-000000.jpg?v=a4d43f4294','watch_link'=>'https://www.playimdb.com/title/tt1459040/','is_hot'=>false,'is_trending'=>false],

['title'=>'El Gezira','type'=>'movie','genre'=>'Action','year'=>'2007','duration'=>'2h 5m','rating'=>7.8,'description'=>'A drug dealer rises to power on a dangerous island.','director'=>'Sherif Arafa','cast'=>['Ahmed El Sakka','Hend Sabry','Mahmoud Yassin'],'image'=>'https://upload.wikimedia.org/wikipedia/en/a/a4/El_Gezeira_film.jpg','background_image'=>'https://www.ledr.com/colours/black.jpg','watch_link'=>'','is_hot'=>false,'is_trending'=>false],

['title'=>'Welad Rizk','type'=>'movie','genre'=>'Action','year'=>'2015','duration'=>'1h 55m','rating'=>7.1,'description'=>'Brothers involved in crime try to escape their violent past.','director'=>'Tarek Alarian','cast'=>['Ahmed Ezz','Amr Youssef','Ahmed Dawood'],'image'=>'https://media0101.elcinema.com/uploads/_315x420_779243c14757d8c4c715ba34f4115f07e794480ffca02ca376ca3d8e5b2008d6.jpg','background_image'=>'https://www.ledr.com/colours/black.jpg','watch_link'=>'https://www.playimdb.com/title/tt4840206/','is_hot'=>false,'is_trending'=>false],

['title'=>'El Saher','type'=>'movie','genre'=>'Drama','year'=>'2001','duration'=>'2h 5m','rating'=>7.1,'description'=>'A mysterious illusionist becomes involved in dangerous secrets.','director'=>'Radwan El Kashef','cast'=>['Mahmoud Abdel Aziz','Hanan Turk'],'image'=>'https://placehold.co/315x420/png?text=El+Saher','background_image'=>'https://placehold.co/1200x675/png?text=El+Saher','watch_link'=>'https://www.playimdb.com/title/tt1173901/','is_hot'=>false,'is_trending'=>false],

['title'=>'Tito','type'=>'movie','genre'=>'Action','year'=>'2004','duration'=>'1h 58m','rating'=>7.4,'description'=>'A criminal struggles between loyalty, love, and survival.','director'=>'Tarek El Erian','cast'=>['Ahmed El Sakka','Hanan Turk'],'image'=>'https://a.ltrbxd.com/resized/film-poster/1/0/7/4/8/4/107484-tito-0-230-0-345-crop.jpg?v=81c86e1969','background_image'=>'https://www.ledr.com/colours/black.jpg','watch_link'=>'https://www.playimdb.com/title/tt0417202/','is_hot'=>false,'is_trending'=>false],

['title'=>'Morgan Ahmed Morgan','type'=>'movie','genre'=>'Comedy','year'=>'2007','duration'=>'1h 55m','rating'=>6.9,'description'=>'A wealthy businessman returns to university life with his daughter.','director'=>'Ali Idris','cast'=>['Adel Imam','Mervat Amin'],'image'=>'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZs43qcUBjnWnOL16a5K6KUa8fh4yNU-hFgw&s','background_image'=>'https://alchetron.com/cdn/morgan-ahmed-morgan-4452d3bd-1346-409f-9928-09388dd32bf-resize-750.jpeg','watch_link'=>'https://www.playimdb.com/title/tt1423961/','is_hot'=>false,'is_trending'=>false],

['title'=>'Hassan & Morcos','type'=>'movie','genre'=>'Comedy','year'=>'2008','duration'=>'2h 0m','rating'=>7.0,'description'=>'Two families face identity conflicts in a social comedy.','director'=>'Ramy Imam','cast'=>['Adel Imam','Omar elshref'],'image'=>'https://upload.wikimedia.org/wikipedia/en/c/c5/Hasan_wa_Murqos_Poster_%282008%29.jpg','background_image'=>'https://upload.wikimedia.org/wikipedia/en/c/c5/Hasan_wa_Murqos_Poster_%282008%29.jpg','watch_link'=>'https://www.playimdb.com/title/tt1423939/','is_hot'=>false,'is_trending'=>false],

['title'=>'X-Large','type'=>'movie','genre'=>'Comedy','year'=>'2011','duration'=>'2h 10m','rating'=>7.2,'description'=>'A man struggles with self-confidence and relationships because of his weight.','director'=>'Sherif Arafa','cast'=>['Ahmed Helmy','Donia Samir Ghanem'],'image'=>'https://media0101.elcinema.com/uploads/_315x420_75ffb46ed95b519c0ac408410be322dd9a8aa66c9dbd9d8f42c54fd653078b82.jpg','background_image'=>'https://www.ledr.com/colours/black.jpg','watch_link'=>'https://www.playimdb.com/title/tt2156807/','is_hot'=>false,'is_trending'=>false],

['title'=>'Asal Eswed','type'=>'movie','genre'=>'Comedy','year'=>'2010','duration'=>'2h 11m','rating'=>7.3,'description'=>'An Egyptian-American returns to Egypt after years abroad.','director'=>'Khaled Marei','cast'=>['Ahmed Helmy','Amy Samir Ghanem'],'image'=>'https://media0101.elcinema.com/uploads/_315x420_508b0515724d4ed184e47db9556f9c41d463674c256a3389b3c5efc75cd9c1d3.jpg','background_image'=>'https://pbs.twimg.com/media/EqfRxZkXYAIsalQ.jpg','watch_link'=>'https://www.playimdb.com/title/tt2210441/','is_hot'=>false,'is_trending'=>false],

['title'=>'El Mamar','type'=>'movie','genre'=>'War','year'=>'2019','duration'=>'2h 10m','rating'=>7.8,'description'=>'An Egyptian officer leads a heroic military mission.','director'=>'Sherif Arafa','cast'=>['Ahmed Ezz','Ahmed Rizk'],'image'=>'https://media0101.elcinema.com/uploads/_320x_a736b93ffd2500ebfe48f895cacb83ab6cb81c3d1066e78b32315ceffd51195c.jpg','background_image'=>'https://www.ledr.com/colours/black.jpg','watch_link'=>'#','is_hot'=>false,'is_trending'=>false],

['title'=>'The Blue Elephant 2','type'=>'movie','genre'=>'Thriller','year'=>'2019','duration'=>'2h 10m','rating'=>7.8,'description'=>'Dark supernatural events return to haunt Yahia.','director'=>'Marwan Hamed','cast'=>['Karim Abdel Aziz','Hend Sabry'],'image'=>'https://upload.wikimedia.org/wikipedia/ar/6/66/%D9%85%D9%84%D8%B5%D9%82_%D9%81%D9%8A%D9%84%D9%85_%D8%A7%D9%84%D9%81%D9%8A%D9%84_%D8%A7%D9%84%D8%A3%D8%B2%D8%B1%D9%82_2_%282019%29.jpg','background_image'=>'https://www.cairo24.com/UploadCache/libfiles/4/5/600x338o/763.jpg','watch_link'=>'https://www.playimdb.com/title/tt10515086/','is_hot'=>false,'is_trending'=>false],

['title'=>'El Kenz','type'=>'movie','genre'=>'Adventure','year'=>'2017','duration'=>'2h 43m','rating'=>7.0,'description'=>'Historical mysteries unfold across different timelines.','director'=>'Sherif Arafa','cast'=>['Mohamed Ramadan','Hend Sabry'],'image'=>'https://media0101.elcinema.com/uploads/_315x420_aa0c15b0fdfc2b1bcacfa4d52582f273e05bd056ebc7fbe78090308889259287.jpg','background_image'=>'https://placehold.co/1200x675/png?text=El+Kenz','watch_link'=>'https://www.playimdb.com/title/tt6182954/','is_hot'=>false,'is_trending'=>false],

['title'=>'Al Khaleya','type'=>'movie','genre'=>'Action','year'=>'2017','duration'=>'2h 6m','rating'=>7.1,'description'=>'Special forces fight against terrorist threats.','director'=>'Tarek Alarian','cast'=>['Ahmed Ezz','Mohamed Mamdouh'],'image'=>'https://media0101.elcinema.com/uploads/_320x_ef2a7ba3deddf66a80f5ffb01731814438687cf07d463c8fd9f5d38862e9e871.jpg','background_image'=>'https://resizing.flixster.com/WBZMSFQDq5xYug32iT42hgdC1EQ=/fit-in/352x330/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p26693324_i_h10_aa.jpg','watch_link'=>'https://www.playimdb.com/title/tt7025210/','is_hot'=>false,'is_trending'=>false],

['title'=>'El Harifa 1','type'=>'movie','genre'=>'Sports','year'=>'2024','duration'=>'1h 50m','rating'=>7.2,'description'=>'A talented football player faces challenges in school tournaments.','director'=>'Raouf El Sayed','cast'=>['Nour El Nabawy','Ahmed Ghozzi'],'image'=>'https://media0101.elcinema.com/uploads/_315x420_af58f42120e7abb35da00f97f9f1569da9526d275e663fd38988c0c09cfa6bf8.jpg','background_image'=>'https://images.justwatch.com/backdrop/332115902/s640/al-harifa.jpg','watch_link'=>'https://www.playimdb.com/title/tt30869622/','is_hot'=>false,'is_trending'=>false],

['title'=>'Voy Voy Voy','type'=>'movie','genre'=>'Comedy','year'=>'2023','duration'=>'1h 50m','rating'=>7.9,'description'=>'A young man pretends to be visually impaired to join a football team.','director'=>'Omar Hilal','cast'=>['Mohamed Farrag','Nelly Karim'],'image'=>'https://media0101.elcinema.com/uploads/_315x420_2d2272cce34ba42e4c7061e7960b5f0eb0d0b09ff71e65dd4a58e28553f57bab.jpg','background_image'=>'https://variety.com/wp-content/uploads/2023/11/Voy-Voy-Voy.jpg','watch_link'=>'https://www.playimdb.com/title/tt27721079/','is_hot'=>false,'is_trending'=>false],

['title'=>'Shalaby','type'=>'movie','genre'=>'Comedy','year'=>'2023','duration'=>'1h 48m','rating'=>6.4,'description'=>'A man tries to fulfill his late friend’s dream.','director'=>'Peter Mimi','cast'=>['Karim Mahmoud Abdel Aziz','Ruby'],'image'=>'https://upload.wikimedia.org/wikipedia/ar/3/3e/%D9%85%D9%84%D8%B5%D9%82_%D9%81%D9%8A%D9%84%D9%85_%D8%B4%D9%84%D8%A8%D9%8A.jpg','background_image'=>'https://placehold.co/1200x675/png?text=Shalaby','watch_link'=>'https://www.playimdb.com/title/tt24852128/','is_hot'=>false,'is_trending'=>false],

['title'=>'Tag','type'=>'movie','genre'=>'Comedy','year'=>'2023','duration'=>'1h 53m','rating'=>6.6,'description'=>'A superhero comedy with unusual powers and adventures.','director'=>'Sara Wafik','cast'=>['Tamer Hosny','Dina El Sherbiny'],'image'=>'https://media0101.elcinema.com/uploads/_320x_10e9f7b7d74d1c449221acd9a0d5d6e17b57223a730e3f6513f1f1e0b1d1cf6b.jpg','background_image'=>'https://www.ledr.com/colours/black.jpg','watch_link'=>'https://www.playimdb.com/title/tt27881382/','is_hot'=>false,'is_trending'=>false],

['title'=>'El Hareefa 2','type'=>'movie','genre'=>'Sports','year'=>'2025','duration'=>'2h 0m','rating'=>7.3,'description'=>'The football team returns for bigger challenges and competitions.','director'=>'Raouf El Sayed','cast'=>['Nour El Nabawy','Khaled El Zahaby'],'image'=>'https://media0101.elcinema.com/uploads/_315x420_ba718673cd0bdfce4c818f40ecfe29c69a40a6b2d6b11bcc5a605c07b4e3f4c8.jpg','background_image'=>'https://cairogossip.com/app/uploads/2024/12/461331431_1114007890089982_6470501766842847296_n.jpg','watch_link'=>'https://www.playimdb.com/title/tt34736127/','is_hot'=>false,'is_trending'=>false],

['title'=>'The Shawshank Redemption','type'=>'movie','genre'=>'Drama','year'=>'1994','duration'=>'2h 22m','rating'=>9.3,'description'=>'Two imprisoned men bond over years, finding hope and redemption.','director'=>'Frank Darabont','cast'=>['Tim Robbins','Morgan Freeman'],'image'=>'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4HfK8vvdtiNty9d6Gu0Da_BHCGJWlbl2M-Q&s','background_image'=>'https://media.vanityfair.com/photos/5d8535de6879fa00082e6ed9/master/pass/the-Shawshank-Redemption-movie-lede.png','watch_link'=>'https://www.playimdb.com/title/tt0111161/','is_hot'=>false,'is_trending'=>false],

['title'=>'The Godfather','type'=>'movie','genre'=>'Crime','year'=>'1972','duration'=>'2h 55m','rating'=>9.2,'description'=>'The aging patriarch of an organized crime dynasty transfers control to his son.','director'=>'Francis Ford Coppola','cast'=>['Marlon Brando','Al Pacino'],'image'=>'https://s3.amazonaws.com/nightjarprod/content/uploads/sites/243/2025/07/08153500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg','background_image'=>'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaLRdZkkq3ocTU_AGKRWav38kNgCRYec5w5g&s','watch_link'=>'https://www.playimdb.com/title/tt0068646/','is_hot'=>true,'is_trending'=>false],

['title'=>'The Dark Knight','type'=>'movie','genre'=>'Action','year'=>'2008','duration'=>'2h 32m','rating'=>9.0,'description'=>'Batman faces the Joker, a criminal mastermind who plunges Gotham into chaos.','director'=>'Christopher Nolan','cast'=>['Christian Bale','Heath Ledger'],'image'=>'https://play-lh.googleusercontent.com/auIs5tjWlLYaFPGClZOJ7m5YVbnX6uBvz0X02r8TkwFKdzE53ww2MqWSS9gU0YNqoYwvpg','background_image'=>'https://cdn.theatlantic.com/thumbor/zZWVn7B3bzrWJSxPFfgCh3LB3xM=/0x34:1597x866/1200x625/media/img/mt/2018/07/TDK/original.jpg','watch_link'=>'https://www.playimdb.com/title/tt0468569/','is_hot'=>true,'is_trending'=>false],

['title'=>'The Godfather Part II','type'=>'movie','genre'=>'Crime','year'=>'1974','duration'=>'3h 22m','rating'=>9.0,'description'=>'The early life and career of Vito Corleone and Michael’s rise in the mafia empire.','director'=>'Francis Ford Coppola','cast'=>['Al Pacino','Robert De Niro'],'image'=>'https://images.squarespace-cdn.com/content/v1/62ceea4ed58a7120a198c234/dced6517-2c20-40b6-b5d1-24936bd9e21a/GF2.png','background_image'=>'https://variety.com/wp-content/uploads/2017/01/godfather-part-ii.jpg','watch_link'=>'https://www.playimdb.com/title/tt0071562/','is_hot'=>true,'is_trending'=>false],

['title'=>'12 Angry Men','type'=>'movie','genre'=>'Drama','year'=>'1957','duration'=>'1h 36m','rating'=>9.0,'description'=>'A jury debates the guilt or innocence of a young defendant.','director'=>'Sidney Lumet','cast'=>['Henry Fonda','Lee J. Cobb'],'image'=>'https://upload.wikimedia.org/wikipedia/ar/f/f5/Twelve_angry_men.jpg','background_image'=>'https://filmforum.org/do-not-enter-or-modify-or-erase/client-uploads/hank_and_jim/_1000w/12-ANGRY-MEN---MAIN.jpg','watch_link'=>'https://www.playimdb.com/title/tt0050083/','is_hot'=>false,'is_trending'=>false],

['title'=>'Pulp Fiction','type'=>'movie','genre'=>'Crime','year'=>'1994','duration'=>'2h 34m','rating'=>8.9,'description'=>'Interwoven stories of crime and redemption in Los Angeles.','director'=>'Quentin Tarantino','cast'=>['John Travolta','Samuel L. Jackson'],'image'=>'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQauKd3omxWubAAXlOX-J5poW3ePEgskRFTLA&s','background_image'=>'https://m.media-amazon.com/images/S/pv-target-images/cb92f30cfbbf13f8a75b07a9080cb1ec84835cc2bafbc2b09b18b922376ed5e9._SX1080_FMjpg_.jpg','watch_link'=>'https://www.playimdb.com/title/tt0110912/','is_hot'=>false,'is_trending'=>false],

['title'=>'Fight Club','type'=>'movie','genre'=>'Drama','year'=>'1999','duration'=>'2h 19m','rating'=>8.8,'description'=>'An underground fight club grows into something much bigger.','director'=>'David Fincher','cast'=>['Brad Pitt','Edward Norton'],'image'=>'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNX2oZKIYLaW3kP_s97weKyOfIYJGHKPGljbNde55meA&s','background_image'=>'https://kinorotterdam.nl/content/uploads/2023/09/Fight-club-still-1.jpg','watch_link'=>'https://www.playimdb.com/title/tt0137523/','is_hot'=>true,'is_trending'=>false],

['title'=>'Inception','type'=>'movie','genre'=>'Sci-Fi','year'=>'2010','duration'=>'2h 28m','rating'=>8.8,'description'=>'A thief enters dreams to steal or plant ideas.','director'=>'Christopher Nolan','cast'=>['Leonardo DiCaprio','Joseph Gordon-Levitt'],'image'=>'https://upload.wikimedia.org/wikipedia/ar/e/e8/%D8%BA%D9%84%D8%A7%D9%81_%D9%81%D9%84%D9%85_%D8%A7%D8%B3%D8%AA%D9%87%D9%84%D8%A7%D9%84_%282010%29.jpeg','background_image'=>'https://occ-0-8407-2218.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABYq9mQWYeTu6dcsJ11AVU4tp9bu8qTaE8Q_njYFh39z-LyKinyLHcsDutldA6n3DeMX9-ImDCOm7BhSfNnR4Yy8711R1ZYs6HN9y.jpg?r=df3','watch_link'=>'https://www.playimdb.com/title/tt5295990/','is_hot'=>true,'is_trending'=>false],

['title'=>'Goodfellas','type'=>'movie','genre'=>'Crime','year'=>'1990','duration'=>'2h 25m','rating'=>8.7,'description'=>'The rise and fall of a mafia associate inside the criminal underworld.','director'=>'Martin Scorsese','cast'=>['Robert De Niro','Ray Liotta'],'image'=>'https://rafaelfilm.cafilm.org/wp-content/uploads/2022/05/goodfellas_sq.png','background_image'=>'https://people.com/thmb/wBUoqIhvO-XC13zR0Tt5uz3U-JQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(708x503:710x505)/Ray-Liotta-Robert-de-Niro-Paul-Sorvino-Joe-Pesci-Goodfellas-091125-tout-6114a89887fd45dcbe08903f27f366ff.jpg','watch_link'=>'https://www.playimdb.com/title/tt0099685/','is_hot'=>true,'is_trending'=>false],

['title'=>'Interstellar','type'=>'movie','genre'=>'Sci-Fi','year'=>'2014','duration'=>'2h 49m','rating'=>8.7,'description'=>'A team of explorers travel through a wormhole in space to save humanity.','director'=>'Christopher Nolan','cast'=>['Matthew McConaughey','Anne Hathaway'],'image'=>'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJHnx-WNPvrs5Ht6p3ZXI2_QY4eYWWikJKyg&s','background_image'=>'https://cdn.britannica.com/68/276368-050-6927FFE2/publicity-still-from-film-intersteller.jpg','watch_link'=>'https://www.playimdb.com/title/tt0816692/','is_hot'=>false,'is_trending'=>false],

['title'=>'Se7en','type'=>'movie','genre'=>'Thriller','year'=>'1995','duration'=>'2h 7m','rating'=>8.6,'description'=>'Two detectives hunt a serial killer inspired by the seven deadly sins.','director'=>'David Fincher','cast'=>['Brad Pitt','Morgan Freeman'],'image'=>'https://static.wikia.nocookie.net/allthetropes/images/1/1d/Articulos_1066_IMAGEN2_4204.jpg/revision/latest?cb=20240925012013','background_image'=>'https://substackcdn.com/image/fetch/$s_!Pu8Q!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcdbd0c17-6b2d-4f2f-a634-df63bfc71c3b_1600x666.jpeg','watch_link'=>'https://www.playimdb.com/title/tt0114369/','is_hot'=>false,'is_trending'=>false],

['title'=>'The Silence of the Lambs','type'=>'movie','genre'=>'Thriller','year'=>'1991','duration'=>'1h 58m','rating'=>8.6,'description'=>'An FBI trainee seeks help from a dangerous psychiatrist to catch a serial killer.','director'=>'Jonathan Demme','cast'=>['Jodie Foster','Anthony Hopkins'],'image'=>'https://m.media-amazon.com/images/I/51SHYSFNP2L._AC_UF1000,1000_QL80_.jpg','background_image'=>'https://www.indiewire.com/wp-content/uploads/2017/02/silence-of-the-lambs-anthony-hopkins-01.jpg?w=600&h=337&crop=1','watch_link'=>'https://www.playimdb.com/title/tt0102926/','is_hot'=>false,'is_trending'=>false],

// ['title'=>'The Matrix','type'=>'movie','genre'=>'Sci-Fi','year'=>'1999','duration'=>'2h 16m','rating'=>8.7,'description'=>'A hacker discovers the shocking truth about reality and joins a rebellion against machines.','director'=>'The Wachowskis','cast'=>['Keanu Reeves','Laurence Fishburne'],'image'=>'#','background_image'=>'#','watch_link'=>'#','is_hot'=>true,'is_trending'=>false],

// ['title'=>'Forrest Gump','type'=>'movie','genre'=>'Drama','year'=>'1994','duration'=>'2h 22m','rating'=>8.8,'description'=>'The story of a simple man who unknowingly influences historical events in America.','director'=>'Robert Zemeckis','cast'=>['Tom Hanks','Robin Wright'],'image'=>'#','background_image'=>'#','watch_link'=>'#','is_hot'=>false,'is_trending'=>true],

// ['title'=>'The Lord of the Rings: The Return of the King','type'=>'movie','genre'=>'Fantasy','year'=>'2003','duration'=>'3h 21m','rating'=>9.0,'description'=>'The final battle for Middle-earth begins as Frodo nears Mount Doom.','director'=>'Peter Jackson','cast'=>['Elijah Wood','Viggo Mortensen'],'image'=>'#','background_image'=>'#','watch_link'=>'#','is_hot'=>true,'is_trending'=>false],

// ['title'=>'The Empire Strikes Back','type'=>'movie','genre'=>'Sci-Fi','year'=>'1980','duration'=>'2h 4m','rating'=>8.7,'description'=>'Luke Skywalker trains as a Jedi while Darth Vader hunts the Rebel Alliance.','director'=>'Irvin Kershner','cast'=>['Mark Hamill','Harrison Ford'],'image'=>'#','background_image'=>'#','watch_link'=>'#','is_hot'=>false,'is_trending'=>false],

// ['title'=>'The Green Mile','type'=>'movie','genre'=>'Drama','year'=>'1999','duration'=>'3h 9m','rating'=>8.6,'description'=>'A prison guard discovers extraordinary powers in a death row inmate.','director'=>'Frank Darabont','cast'=>['Tom Hanks','Michael Clarke Duncan'],'image'=>'#','background_image'=>'#','watch_link'=>'#','is_hot'=>false,'is_trending'=>false],

// ['title'=>'Gladiator','type'=>'movie','genre'=>'Action','year'=>'2000','duration'=>'2h 35m','rating'=>8.5,'description'=>'A betrayed Roman general seeks revenge against a corrupt emperor.','director'=>'Ridley Scott','cast'=>['Russell Crowe','Joaquin Phoenix'],'image'=>'#','background_image'=>'#','watch_link'=>'#','is_hot'=>true,'is_trending'=>true]

];




$series = [];

        foreach (array_merge($movies, $series) as $data) {
            $isSeries = $data['type'] === 'series';
            $content  = Content::firstOrCreate(['title' => $data['title']], array_merge(
                $data,
                ['is_hot' => $data['is_hot'] ?? false, 'is_new' => $data['is_new'] ?? false,
                 'is_trending' => $data['is_trending'] ?? false, 'is_top_rated' => $data['is_top_rated'] ?? false,
                 'is_featured' => $data['is_featured'] ?? false]
            ));

            if ($isSeries && $content->seasons()->count() === 0) {
                for ($sn = 1; $sn <= 2; $sn++) {
                    $season = Season::create(['content_id' => $content->id, 'number' => $sn, 'title' => "Season {$sn}"]);
                    for ($ep = 1; $ep <= 4; $ep++) {
                        Episode::create([
                            'season_id'    => $season->id,
                            'number'       => $ep,
                            'title'        => "Episode {$ep}",
                            'description'  => "Season {$sn}, Episode {$ep} of {$content->title}.",
                            'duration'     => '45min',
                            'rating'       => round(8.0 + ($ep * 0.1), 1),
                            'release_date' => "2024-0{$sn}-0{$ep}",
                            'thumbnail'    => $data['image'],
                            'watch_link'   => '#',
                        ]);
                    }
                }
            }
        }

        $this->command->info('');
        $this->command->info('✅ IMDb Play seeded!');
        $this->command->info('   Admin → admin@imdbplay.com / admin123');
        $this->command->info('   User  → user@imdbplay.com  / user123');
        $this->command->info('');
    }
}
