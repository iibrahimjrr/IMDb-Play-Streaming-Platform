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

['title'=>'Turab el-Mas','type'=>'movie','genre'=>'Drama','year'=>'2018','duration'=>'2h 42m','rating'=>7.9,'description'=>'A pharmacist seeks revenge after his father is murdered.','director'=>'Marwan Hamed','cast'=>['Asser Yassin','Menna Shalabi','Maged El-Kidwani'],'image'=>'https://media0101.elcinema.com/uploads/_315x420_88a789aeff4ccf3a4408e9f5369f0dd34028c8f313da2a052898ecb273cbc26d.jpg','background_image'=>'https://images.mubicdn.net/images/film/388813/cache-904512-1745501785/image-w1280.jpg?size=800x','watch_link'=>'https://www.playimdb.com/title/tt4003070/?ref_=mv_close'],

['title'=>'El Fil El Azraq','type'=>'movie','genre'=>'Thriller','year'=>'2014','duration'=>'2h 50m','rating'=>8.1,'description'=>'A psychiatrist faces supernatural mysteries.','director'=>'Marwan Hamed','cast'=>['Karim Abdel Aziz','Nelly Karim','Khaled El Sawy'],'image'=>'https://media0041.elcinema.com/uploads/_315x420_574ac9a6a2fcbf45f58f4dfb9a7d4d56d8a7cbdeb18f0bc33bd583a14bcbb157.jpg','background_image'=>'https://media0041.elcinema.com/uploads/_315x420_574ac9a6a2fcbf45f58f4dfb9a7d4d56d8a7cbdeb18f0bc33bd583a14bcbb157.jpg','watch_link'=>'https://elcinema.com/en/work/2035164/','is_hot'=>true,'is_trending'=>true,'is_top_rated'=>true],

['title'=>'Kira & El Gin','type'=>'movie','genre'=>'Action','year'=>'2022','duration'=>'2h 55m','rating'=>7.3,'description'=>'Two revolutionaries fight British occupation.','director'=>'Marwan Hamed','cast'=>['Karim Abdel Aziz','Ahmed Ezz','Hend Sabry'],'image'=>'https://media0041.elcinema.com/uploads/_315x420_4a3e0d6f9d5b6cdb59c59e86cdc84e64546a1e0149253b209d292743ffb391d1.jpg','background_image'=>'https://media0041.elcinema.com/uploads/_315x420_4a3e0d6f9d5b6cdb59c59e86cdc84e64546a1e0149253b209d292743ffb391d1.jpg','watch_link'=>'https://elcinema.com/en/work/2066395/','is_hot'=>true,'is_trending'=>true],

['title'=>'Ibrahim El Abyad','type'=>'movie','genre'=>'Crime','year'=>'2009','duration'=>'2h 14m','rating'=>7.5,'description'=>'A young man seeks revenge after his father is murdered.','director'=>'Marwan Hamed','cast'=>['Ahmed El Sakka','Amr Waked','Hend Sabry'],'image'=>'https://media0041.elcinema.com/uploads/_315x420_4d4f8ff0f3e7d8c35c50a6481d948e57808b4374c1c1ff717a8ba4c8988e85b7.jpg','background_image'=>'https://media0041.elcinema.com/uploads/_315x420_4d4f8ff0f3e7d8c35c50a6481d948e57808b4374c1c1ff717a8ba4c8988e85b7.jpg','watch_link'=>'https://elcinema.com/en/work/1009563/','is_trending'=>true],

['title'=>'El Gezira','type'=>'movie','genre'=>'Action','year'=>'2007','duration'=>'2h 5m','rating'=>7.8,'description'=>'A drug dealer rises to power on a dangerous island.','director'=>'Sherif Arafa','cast'=>['Ahmed El Sakka','Hend Sabry','Mahmoud Yassin'],'image'=>'https://media0041.elcinema.com/uploads/_315x420_3f0cf2b58d8dc8b7e7a3ddc7e2cfdab91c8f4f6df2b5cb582fa418eb2c86c55d.jpg','background_image'=>'https://media0041.elcinema.com/uploads/_315x420_3f0cf2b58d8dc8b7e7a3ddc7e2cfdab91c8f4f6df2b5cb582fa418eb2c86c55d.jpg','watch_link'=>'https://elcinema.com/en/work/1008105/','is_top_rated'=>true],

['title'=>'Welad Rizk','type'=>'movie','genre'=>'Action','year'=>'2015','duration'=>'1h 55m','rating'=>7.1,'description'=>'Brothers involved in crime try to escape their violent past.','director'=>'Tarek Alarian','cast'=>['Ahmed Ezz','Amr Youssef','Ahmed Dawood'],'image'=>'https://media0041.elcinema.com/uploads/_315x420_4f5ec5cb5a7e3dc5c3efc6f7e45f3d72b7d6c6b76e3ed5b0efc5d2dbbcf7fd68.jpg','background_image'=>'https://media0041.elcinema.com/uploads/_315x420_4f5ec5cb5a7e3dc5c3efc6f7e45f3d72b7d6c6b76e3ed5b0efc5d2dbbcf7fd68.jpg','watch_link'=>'https://elcinema.com/en/work/2034477/','is_hot'=>true,'is_trending'=>true],

['title'=>'El Saher','type'=>'movie','genre'=>'Drama','year'=>'2001','duration'=>'2h 5m','rating'=>7.1,'description'=>'A mysterious illusionist becomes involved in dangerous secrets.','director'=>'Radwan El Kashef','cast'=>['Mahmoud Abdel Aziz','Hanan Turk'],'image'=>'https://placehold.co/315x420/png?text=El+Saher','background_image'=>'https://placehold.co/1200x675/png?text=El+Saher','watch_link'=>'#'],

['title'=>'Tito','type'=>'movie','genre'=>'Action','year'=>'2004','duration'=>'1h 58m','rating'=>7.4,'description'=>'A criminal struggles between loyalty and survival.','director'=>'Tarek El Erian','cast'=>['Ahmed El Sakka','Hanan Turk'],'image'=>'https://placehold.co/315x420/png?text=Tito','background_image'=>'https://placehold.co/1200x675/png?text=Tito','watch_link'=>'#','is_hot'=>true,'is_trending'=>true],

['title'=>'Morgan Ahmed Morgan','type'=>'movie','genre'=>'Comedy','year'=>'2007','duration'=>'1h 55m','rating'=>6.9,'description'=>'A wealthy businessman returns to university life.','director'=>'Ali Idris','cast'=>['Adel Imam','Mervat Amin'],'image'=>'https://placehold.co/315x420/png?text=Morgan+Ahmed+Morgan','background_image'=>'https://placehold.co/1200x675/png?text=Morgan+Ahmed+Morgan','watch_link'=>'#'],

['title'=>'Hassan & Morcos','type'=>'movie','genre'=>'Comedy','year'=>'2008','duration'=>'2h 0m','rating'=>7.0,'description'=>'Two families face identity conflicts in a social comedy.','director'=>'Ramy Imam','cast'=>['Adel Imam','Omar El Sherif'],'image'=>'https://placehold.co/315x420/png?text=Hassan+%26+Morcos','background_image'=>'https://placehold.co/1200x675/png?text=Hassan+%26+Morcos','watch_link'=>'#'],

['title'=>'X-Large','type'=>'movie','genre'=>'Comedy','year'=>'2011','duration'=>'2h 10m','rating'=>7.2,'description'=>'A man struggles with self-confidence because of his weight.','director'=>'Sherif Arafa','cast'=>['Ahmed Helmy','Donia Samir Ghanem'],'image'=>'https://placehold.co/315x420/png?text=X-Large','background_image'=>'https://placehold.co/1200x675/png?text=X-Large','watch_link'=>'#','is_hot'=>true],

['title'=>'Asal Eswed','type'=>'movie','genre'=>'Comedy','year'=>'2010','duration'=>'2h 11m','rating'=>7.3,'description'=>'An Egyptian-American returns to Egypt after years abroad.','director'=>'Khaled Marei','cast'=>['Ahmed Helmy','Amy Samir Ghanem'],'image'=>'https://placehold.co/315x420/png?text=Asal+Eswed','background_image'=>'https://placehold.co/1200x675/png?text=Asal+Eswed','watch_link'=>'#','is_trending'=>true],

['title'=>'Hepta','type'=>'movie','genre'=>'Romance','year'=>'2016','duration'=>'2h 0m','rating'=>7.7,'description'=>'Multiple love stories connect through emotional stages.','director'=>'Hady El Bagoury','cast'=>['Amr Youssef','Yasmine Raees'],'image'=>'https://placehold.co/315x420/png?text=Hepta','background_image'=>'https://placehold.co/1200x675/png?text=Hepta','watch_link'=>'#','is_hot'=>true,'is_trending'=>true],

['title'=>'El Badla','type'=>'movie','genre'=>'Comedy','year'=>'2018','duration'=>'1h 52m','rating'=>6.5,'description'=>'Two men swap identities in a comedic adventure.','director'=>'Mohamed Gamal El Adl','cast'=>['Tamer Hosny','Amina Khalil'],'image'=>'https://placehold.co/315x420/png?text=El+Badla','background_image'=>'https://placehold.co/1200x675/png?text=El+Badla','watch_link'=>'#'],

['title'=>'El Mamar','type'=>'movie','genre'=>'War','year'=>'2019','duration'=>'2h 10m','rating'=>7.8,'description'=>'An Egyptian officer leads a heroic military mission.','director'=>'Sherif Arafa','cast'=>['Ahmed Ezz','Ahmed Rizk'],'image'=>'https://placehold.co/315x420/png?text=El+Mamar','background_image'=>'https://placehold.co/1200x675/png?text=El+Mamar','watch_link'=>'#','is_hot'=>true,'is_trending'=>true,'is_top_rated'=>true],

['title'=>'Mousa','type'=>'movie','genre'=>'Sci-Fi','year'=>'2021','duration'=>'1h 45m','rating'=>6.9,'description'=>'A student invents the first Egyptian robot.','director'=>'Peter Mimi','cast'=>['Karim Mahmoud Abdel Aziz','Eyad Nassar'],'image'=>'https://placehold.co/315x420/png?text=Mousa','background_image'=>'https://placehold.co/1200x675/png?text=Mousa','watch_link'=>'#'],

['title'=>'El Ankaboot','type'=>'movie','genre'=>'Action','year'=>'2022','duration'=>'1h 48m','rating'=>6.4,'description'=>'A dangerous businessman enters an international conflict.','director'=>'Ahmed Nader Galal','cast'=>['Ahmed El Sakka','Mona Zaki'],'image'=>'https://placehold.co/315x420/png?text=El+Ankaboot','background_image'=>'https://placehold.co/1200x675/png?text=El+Ankaboot','watch_link'=>'#'],

['title'=>'The Blue Elephant 2','type'=>'movie','genre'=>'Thriller','year'=>'2019','duration'=>'2h 10m','rating'=>7.8,'description'=>'Dark supernatural events return to haunt Yahia.','director'=>'Marwan Hamed','cast'=>['Karim Abdel Aziz','Hend Sabry'],'image'=>'https://placehold.co/315x420/png?text=The+Blue+Elephant+2','background_image'=>'https://placehold.co/1200x675/png?text=The+Blue+Elephant+2','watch_link'=>'#','is_hot'=>true,'is_trending'=>true,'is_top_rated'=>true],

['title'=>'122','type'=>'movie','genre'=>'Horror','year'=>'2019','duration'=>'1h 35m','rating'=>6.8,'description'=>'A horror thriller inside a terrifying hospital.','director'=>'Yasser Aly','cast'=>['Ahmed Dawood','Amina Khalil'],'image'=>'https://placehold.co/315x420/png?text=122','background_image'=>'https://placehold.co/1200x675/png?text=122','watch_link'=>'#'],

['title'=>'El Kenz','type'=>'movie','genre'=>'Adventure','year'=>'2017','duration'=>'2h 43m','rating'=>7.0,'description'=>'Historical mysteries unfold across different timelines.','director'=>'Sherif Arafa','cast'=>['Mohamed Ramadan','Hend Sabry'],'image'=>'https://placehold.co/315x420/png?text=El+Kenz','background_image'=>'https://placehold.co/1200x675/png?text=El+Kenz','watch_link'=>'#'],

['title'=>'Al Khaleya','type'=>'movie','genre'=>'Action','year'=>'2017','duration'=>'2h 6m','rating'=>7.1,'description'=>'Special forces fight terrorist threats.','director'=>'Tarek Alarian','cast'=>['Ahmed Ezz','Mohamed Mamdouh'],'image'=>'https://placehold.co/315x420/png?text=Al+Khaleya','background_image'=>'https://placehold.co/1200x675/png?text=Al+Khaleya','watch_link'=>'#','is_hot'=>true,'is_trending'=>true],

['title'=>'Haram El Gassad','type'=>'movie','genre'=>'Drama','year'=>'2016','duration'=>'1h 50m','rating'=>6.3,'description'=>'A dramatic story about power, betrayal, and ambition.','director'=>'Khaled El Hagar','cast'=>['Rania Youssef','Mahmoud Abdel Moghny'],'image'=>'https://placehold.co/315x420/png?text=Haram+El+Gassad','background_image'=>'https://placehold.co/1200x675/png?text=Haram+El+Gassad','watch_link'=>'#'],

['title'=>'Hamlet Pheroun','type'=>'movie','genre'=>'Action','year'=>'2019','duration'=>'1h 45m','rating'=>6.7,'description'=>'A dangerous mission unfolds between Egypt and Syria.','director'=>'Raouf Abdel Aziz','cast'=>['Amr Saad','Mahmoud Abdel Moghny'],'image'=>'https://placehold.co/315x420/png?text=Hamlet+Pheroun','background_image'=>'https://placehold.co/1200x675/png?text=Hamlet+Pheroun','watch_link'=>'#','is_hot'=>true],

['title'=>'El Harifa','type'=>'movie','genre'=>'Sports','year'=>'2024','duration'=>'1h 50m','rating'=>7.2,'description'=>'A talented football player faces challenges in school tournaments.','director'=>'Raouf El Sayed','cast'=>['Nour El Nabawy','Ahmed Ghozzi'],'image'=>'https://placehold.co/315x420/png?text=El+Harifa','background_image'=>'https://placehold.co/1200x675/png?text=El+Harifa','watch_link'=>'#','is_hot'=>true,'is_trending'=>true],

['title'=>'Baad El Shar','type'=>'movie','genre'=>'Comedy','year'=>'2023','duration'=>'1h 42m','rating'=>6.0,'description'=>'A romantic comedy with magical twists and adventures.','director'=>'Ahmed Abdel Wahab','cast'=>['Ali Rabie','Myrna Nour El Din'],'image'=>'https://placehold.co/315x420/png?text=Baad+El+Shar','background_image'=>'https://placehold.co/1200x675/png?text=Baad+El+Shar','watch_link'=>'#'],

['title'=>'Nabd El Omor','type'=>'movie','genre'=>'Drama','year'=>'2023','duration'=>'1h 40m','rating'=>6.8,'description'=>'A touching story about love and difficult choices.','director'=>'Adel Aadeb','cast'=>['Nadine Nassib Njeim','Maged El Kedwany'],'image'=>'https://placehold.co/315x420/png?text=Nabd+El+Omor','background_image'=>'https://placehold.co/1200x675/png?text=Nabd+El+Omor','watch_link'=>'#','is_trending'=>true],

['title'=>'Voy Voy Voy','type'=>'movie','genre'=>'Comedy','year'=>'2023','duration'=>'1h 50m','rating'=>7.9,'description'=>'A young man pretends to be visually impaired to join a football team.','director'=>'Omar Hilal','cast'=>['Mohamed Farrag','Nelly Karim'],'image'=>'https://placehold.co/315x420/png?text=Voy+Voy+Voy','background_image'=>'https://placehold.co/1200x675/png?text=Voy+Voy+Voy','watch_link'=>'#','is_hot'=>true,'is_trending'=>true,'is_top_rated'=>true],

['title'=>'Shalaby','type'=>'movie','genre'=>'Comedy','year'=>'2023','duration'=>'1h 48m','rating'=>6.4,'description'=>'A man tries to fulfill his late friend’s dream.','director'=>'Peter Mimi','cast'=>['Karim Mahmoud Abdel Aziz','Ruby'],'image'=>'https://placehold.co/315x420/png?text=Shalaby','background_image'=>'https://placehold.co/1200x675/png?text=Shalaby','watch_link'=>'#'],

['title'=>'Tag','type'=>'movie','genre'=>'Comedy','year'=>'2023','duration'=>'1h 53m','rating'=>6.6,'description'=>'A superhero comedy with unusual powers and adventures.','director'=>'Sara Wafik','cast'=>['Tamer Hosny','Dina El Sherbiny'],'image'=>'https://placehold.co/315x420/png?text=Tag','background_image'=>'https://placehold.co/1200x675/png?text=Tag','watch_link'=>'#','is_hot'=>true,'is_trending'=>true],

['title'=>'Aserb','type'=>'movie','genre'=>'Action','year'=>'2024','duration'=>'2h 4m','rating'=>7.0,'description'=>'An action-packed mission inspired by real events.','director'=>'Ahmed Nader Galal','cast'=>['Ahmed El Sakka','Mohamed Mamdouh'],'image'=>'https://placehold.co/315x420/png?text=Aserb','background_image'=>'https://placehold.co/1200x675/png?text=Aserb','watch_link'=>'#','is_hot'=>true,'is_trending'=>true],

['title'=>'El Hareefa 2','type'=>'movie','genre'=>'Sports','year'=>'2025','duration'=>'2h 0m','rating'=>7.3,'description'=>'The football team returns for bigger competitions and challenges.','director'=>'Raouf El Sayed','cast'=>['Nour El Nabawy','Khaled El Zahaby'],'image'=>'https://placehold.co/315x420/png?text=El+Hareefa+2','background_image'=>'https://placehold.co/1200x675/png?text=El+Hareefa+2','watch_link'=>'#','is_hot'=>true,'is_trending'=>true],

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
