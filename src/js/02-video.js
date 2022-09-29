import VimeoPlayer from '@vimeo/player';
import throttle from 'lodash.throttle';

// Створюємо константу ключа для localeStorage
const LOCALSTORAGE_KEY = 'current-play-time'

// Дістаємо плеєер із сторінки
const playerElements = document.querySelector('#vimeo-player')
// console.log(playerElements);

// Створюємо об'єкта player із імпортованого VimeoPlayer 
const player = new VimeoPlayer(playerElements);
// console.log(player);



// Відслідкувати час
const onPlay = function(data) {
  const time = JSON.stringify(data.seconds)
  console.log(time);
  // Зберегти час у localStorage
localStorage.setItem(LOCALSTORAGE_KEY,time)  
};
// Метод .on це метод бібліотеки vimeo він приймає 
// on(event: string, callback: function)
// на callback-функцію додаємо throttle щоб дані записувались з інтервалом
player.on('timeupdate', throttle(onPlay,1000));



// Перезавантаження сторінки виконати метод setCurrentTime()
// дістаємо значення часу із localeStorage
const initPage = localStorage.getItem(LOCALSTORAGE_KEY)
console.log('дані із localeStorage',initPage);

// Встановлюємо час
if (initPage) {
  player.setCurrentTime(initPage)
}else { player.setCurrentTime(0)}