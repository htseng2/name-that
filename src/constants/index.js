import edition1980s from '../assets/editions/edition-1980s.webp';
import edition1990s from '../assets/editions/edition-1990s.webp';
import editionChristmas from '../assets/editions/edition-christmas.webp';
import editionHalloween from '../assets/editions/edition-halloween.webp';
import editionTomCruise from '../assets/editions/edition-tom-cruise.webp';
import editionTVShow from '../assets/editions/edition-tv-show.webp';
import babyOneMoreTime from '../assets/songs/baby-one-more-time.m4a';
import toyStory from '../assets/movies/toy-story.webp';
import titanic from '../assets/movies/titanic.webp';
import bohemianRhapsody from '../assets/songs/bohemian-rhapsody.m4a';
import pulpFiction from '../assets/movies/pulp-fiction.webp';
import thriller from '../assets/songs/thriller.m4a';
import jurassicPark from '../assets/movies/jurassic-park.webp';
import billieJean from '../assets/songs/billie-jean.m4a';
import forrestGump from '../assets/movies/forrest-gump.webp';
import hotelCalifornia from '../assets/songs/hotel-california.m4a';

export const EDITION_OPTIONS = [
  { title: '1980s Edition', img: edition1980s },
  { title: '1990s Edition', img: edition1990s },
  { title: 'Christmas Edition', img: editionChristmas },
  { title: 'Halloween Edition', img: editionHalloween },
  { title: 'Tom Cruise Edition', img: editionTomCruise },
  { title: 'TV Show Edition', img: editionTVShow },
];

export const QUESTIONS_DATABASE = [
  {
    type: 'movie',
    url: toyStory,
    answer: 'Toy Story (1995)',
  },
  {
    type: 'song',
    url: babyOneMoreTime,
    answer: 'Baby One More Time (Britney Spears)',
  },
  {
    type: 'movie',
    url: titanic,
    answer: 'Titanic (1997)',
  },
  {
    type: 'song',
    url: bohemianRhapsody,
    answer: 'Bohemian Rhapsody (Queen)',
  },
  {
    type: 'movie',
    url: pulpFiction,
    answer: 'Pulp Fiction (1994)',
  },
  {
    type: 'song',
    url: thriller,
    answer: 'Thriller (Michael Jackson)',
  },
  {
    type: 'movie',
    url: jurassicPark,
    answer: 'Jurassic Park (1993)',
  },
  {
    type: 'song',
    url: billieJean,
    answer: 'Billie Jean (Michael Jackson)',
  },
  {
    type: 'movie',
    url: forrestGump,
    answer: 'Forrest Gump (1994)',
  },
  {
    type: 'song',
    url: hotelCalifornia,
    answer: 'Hotel California (Eagles)',
  },
];
