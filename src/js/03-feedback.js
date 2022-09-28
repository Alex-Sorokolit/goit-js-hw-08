import throttle from 'lodash.throttle';

const refs = {
 form: document.querySelector('.feedback-form'),
 textarea: document.querySelector('textarea[name="message"]'),
};

// Створюємо пустий об'єкт, в який будуть зберігатися данні із інпунів форми.
// Ці данні ми покладемо у localeStorage
let formData = {};

// Для того щоб не зробити помилку в коді при написанні ключа в localStorage
// використовують константу STORAGE_KEY
const STORAGE_KEY = 'feedback-form-state';

// Якщо натиснута кнопка submit то виконуємо колбек функцію onFormSubmit 
refs.form.addEventListener('submit', onFormSubmit);

// Делегування подій .Прослуховуємо події на формі
// Якщо щось вводиться в інпут, то виконується функція onInput
// з періодичністю яка регулюється throttle
refs.form.addEventListener('input', throttle(onInput, 500));

// При перезапуску сторінки викликаємо функцію, яка перевірить 
// чи є дані у localStorage і якщо є, то заповнить інпути
populateTextarea();



//  Any Input ________________________________________________________________
function onInput(event) {
 // при наборі в інпуті, буде братися значення name і value цього інпута
 // console.log(event.target);
 // console.log(event.target.name);
 // console.log(event.target.value);

 // деструктуризуємо name і value із event
 const { name, value } = event.target;
 // console.log(name);
 // console.log(value);

 // Використовуємо конструкцію try catch для відловлювання можливих помилок,
 // які можуть виникнути при JSON.stringify
 try {
 formData = localStorage.getItem(STORAGE_KEY)
 // Перевіряємо чи localStorage містить в собі дані
  if (formData) {
   // Якщо в localStorage є дані, то ми їх парсимо в formData
  formData = JSON.parse(formData)
  } else {
   // Якщо localeStorage пустий, то присвоюємо пустий об'єкт
   formData = {}
 }
 
// в об'єкт formData в ключ name записуємо значення value
  formData[name] = value;

  // Створюємо змінну в яку кладемо дані у вигляді рядка
  const stringifyData = JSON.stringify(formData)
  // Записуємо ці дані у localeStorage
  localStorage.setItem(STORAGE_KEY, stringifyData);
 } catch (error) {
  // Якщо виникне помилка відобразиться повідомлення, але скрипт не впаде
  console.error(error);
}
}



// Submit form ______________________________________________________________________

function onFormSubmit(event) {
 // Зупиняємо поведінку по замовчуванні
 event.preventDefault();
 console.log('Відправляємо форму');
 
 // Очищаємо форму після submit
 event.currentTarget.reset();
 console.log('Очищаємо форму');
 
 // Очищаємо  localeStorage після submit
 // щоб дані знову не заповнили поля і користувач не подумав що форма не відправилась
 localStorage.removeItem(STORAGE_KEY)
 console.log('Очищаємо localeStorage');
};




// Reload page ______________________________________________________________________

function populateTextarea() { 
 // Отримуємо значення із сховища
 // при загрузці сторінки буде братися значення із localStorage 
 // але якщо користувач вперше на сторінці то localStorage буде пустим і видать null
 // щоб цього уникнути потрібно робити перевірку

 // Записуємо у змінну дані із localeStorage 
 const savedMessage = localStorage.getItem(STORAGE_KEY)

 // якщо localStorage !== null (savedMessage = true), то виконуємо код
 if (savedMessage) {
 
// Конструкцією try catch відловлюємо помилки які можуть виникнути при парсі
  try {
   const parseData = JSON.parse(savedMessage);
   // entries видасть масив масивів
   // Деструктуризуємо цей масив і перебеберемо в циклі forEach (кожен елемент)
   Object.entries(parseData).forEach(([name, value]) => {
    // console.log(name);
    // console.log(value);

    // Записуємо значення в інпут форми
    refs.form.elements[name].value = value;
   })

  } catch (error) {
   console.error(error);
  }
 } 
};

