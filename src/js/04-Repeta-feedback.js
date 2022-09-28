import throttle from 'lodash.throttle';

const refs = {
 form: document.querySelector('.feedback-form'),
 textarea: document.querySelector('textarea[name="message"]'),
};

// Створюємо пустий об'єкт, в який будуть зберігатися данні із інпунів форми.
// Ці данні ми покладемо у localeStorage
const formData = {};
// Для того щоб не зробити помилку в коді при написанні ключа в localStorage
// використовують константу STORAGE_KEY
const STORAGE_KEY = 'feedback-message';

// Якщо натиснута кнопка submit то виконуємо колбек функцію onFormSubmit 
refs.form.addEventListener('submit', onFormSubmit);

// Якщо вводиться текст у textarea то виконуємо колбек функцію onTextareaInput
// також додаємо throttle для того щоб знизити навантаження на процесор
refs.textarea.addEventListener('input', throttle(onTextareaInput, 500));

// Делегування подій .Прослуховуємо події на формі
refs.form.addEventListener('input', onInput)

function onInput(event) {
 // при наборі в інпуті, буде братися значення name і value цього інпута
 // console.log(e.target.name);
 // console.log(e.target.value);

// Записуємо в об'єкт formData ключ (назву інпута) і значення (те що ввів користувач).
 formData[event.target.name] = event.target.value;
 localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
}

// Викликаємо функцію при перезапуску сторінки
populateTextarea();



// Submit ______________________________________________________________________

function onFormSubmit(event) {
 // Зупиняємо поведінку по замовчуванні
 event.preventDefault();
 console.log('Відправляємо форму');
 
 // Очищаємо форму після submit
 event.currentTarget.reset();
 console.log('Очищаємо форму');
 
 // Прибираємо повідомлення із сховища після submit
 // щоб дані знову не заповнили поля і користувач не подумав що форма не відправилась
 localStorage.removeItem(STORAGE_KEY)
 console.log('Очищаємо localeStorage');
};






// Input ______________________________________________________________________

function onTextareaInput(evt) {
 // Отримуємо значення поля
 const message = evt.target.value; 
 console.log(message);
 
 // Зберігаємо його в сховище
 // Записуємо значення з textarea в локальне сховище (якщо ми працюємо тільки із textarea)
 // localStorage.setItem(STORAGE_KEY, message)

}







// Reload ______________________________________________________________________

function populateTextarea() { 
 // Отримуємо значення із сховища
 // при загрузці сторінки буде братися значення із localStorage буде
 // але якщо користувач вперше на сторінці то localStorage буде пустим і видать null
 // щоб цього уникнути потрібно робити перевірку

 
 // Якщо там щось було. обновлюємо DOM
 const savedMessage = localStorage.getItem(STORAGE_KEY)

 // якщо localeStorage === null (savedMessage = false), то виходимо з функції
 //  if (!savedMessage) {
 //  console.log('localStorage пустий');
 //  return;
 // };
 // або якщо localStorage !== null (savedMessage = true), то виконуємо код
 if (savedMessage) {
  console.log(`В localStorge було збережене ${savedMessage}`);
  refs.textarea.value = savedMessage;

 } else console.log('localStorage пустий');

};
