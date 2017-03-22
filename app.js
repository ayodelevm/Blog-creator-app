// alert('hello');

const blogCreate = document.getElementById('form-create');
const blogEdit = document.getElementById('form-edit');
const blogTitle = document.getElementById('blog-title');
const editTitle = document.getElementById('edit-title');
const txtArea = document.getElementById('text-area');
const editTxtArea = document.getElementById('edit-text-area');
const displayArea = document.querySelector('#display');
const ListDisplayArea = document.getElementById('list-display');
const editButton = document.querySelector('#editButton');
const readMore = document.getElementById('read-more');
const submitButton = document.getElementById('form-submit');
const previousButton = document.getElementById('previousButton');
const nextButton = document.getElementById('nextButton')
const storeItems = JSON.parse(localStorage.getItem('storeItems')) || [];
const postKeys = JSON.parse(localStorage.getItem('postKeys')) || [];
let currentDiv = false;
let newIndex = 0;
let pageStatus = false;
let pageNumber = 0;

// console.log(currentDiv)



blogCreate.addEventListener('submit', function(event){

  event.preventDefault()
  console.log('hello')
  const obj = 
  {title: '', 
  body: ''
  };
  obj.title = blogTitle.value;
  obj.body = txtArea.value;



  storeItems.push(obj);
  console.log(storeItems);

  const postKey = generateKey();
  postKeys.push(postKey);
  localStorage.setItem('postKeys', JSON.stringify(postKeys));

  populateListDisplay(storeItems, ListDisplayArea);
  localStorage.setItem('storeItems', JSON.stringify(storeItems));
  blogTitle.value = '';
  txtArea.value = '';
})

blogEdit.addEventListener('submit', function(event){
  if(currentDiv === true) {

    console.log(currentDiv)
    console.log(newIndex)

    const storageElement = JSON.parse(localStorage.getItem('storeItems'));
    console.log(storageElement);
    storageElement[`${newIndex}`].title = editTitle.value;
    storageElement[`${newIndex}`].body = editTxtArea.value;

    localStorage.setItem('storeItems', JSON.stringify(storageElement));

    populateListDisplay(storeItems, ListDisplayArea);
  }
  




})

  
function populateDisplay(index){
  display = JSON.parse(localStorage.getItem('storeItems'))[`${index}`];
  
    displayArea.innerHTML = 
  `
 
    <h1>
      ${display.title}
    </h1>
    
    <p>
      ${display.body}
    </p>
    <button id="previousButton">Previous</button>
    <button id="nextButton">Next</button>
    `

  pageStatus = true;
  pageNumber = index;
}


function populateListDisplay(display = [], displayParagraph){
  displayParagraph.innerHTML = display.map(function(item, index){
    item.index = index;
    return `
    <h1>
      ${item.title}
    </h1>
    <button id="editButton" onClick='editPost(${index})'>Edit</button>
    <p>
      ${item.body}
    </p>
    <a href="#" onClick='populateDisplay(${index})' id= "read-more">Read more...</a>
    `
  }).join('');

}



function  generateKey() {
  return postKeys.length
}


populateDisplay(0);

populateListDisplay(storeItems, ListDisplayArea);





function editPost(index){

  editTitle.value = JSON.parse(localStorage.getItem('storeItems'))[`${index}`].title;
  editTxtArea.value = JSON.parse(localStorage.getItem('storeItems'))[`${index}`].body;
  currentDiv = true;
  newIndex = index;
  return
} 

function publishEdit(index) {
  
}





// nextButton.addEventListener('click', function(event){
//   paginateNext();
// });

// previousButton.addEventListener('click', function(event){
//   paginatePrevious();
// });

// function generateKey() {
//   return postKeys.length;
// }

// function getPostForPage(pageId){
//   return JSON.parse(fetchFromLocalStorage(pageId));
// }

// function persistToLocalStorage(key,object){
//   localStorage.setItem(key, object);
// }

// function fetchFromLocalStorage(key){
//   return localStorage.getItem(key);
// }

// function getPostHtml(postData){
//    return `

//     <h1>
//       ${postData.title}
//     </h1>
    
//     <div>
//       ${postData.body}
//     </div>

//     `;
// }

// function paginateNext(){
//   if(pageId <= postKeys.length - 1){
//     populateDisplay(++currentPage);
//   }
// }

// function paginatePrevious(pageId){
//   if(pageId <= 0){
//     populateDisplay(--currentPage);
//   }
// }



