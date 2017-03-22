// alert('hello');

const blogForm = document.getElementById('form-edit');
const blogTitle = document.getElementById('blog-title');
const txtArea = document.getElementById('text-area');
const displayArea = document.querySelector('#display');
const ListDisplayArea = document.getElementById('list-display');
const editButton = document.querySelector('#editButton');
const readMore = document.getElementById('read-more');
const submitButton = document.getElementById('form-submit');
const storeItems = JSON.parse(localStorage.getItem('storeItems')) || [];
const postKeys = JSON.parse(localStorage.getItem('postKeys')) || [];
const currentDiv = postKeys.length;
// const showPost;
console.log(currentDiv)
// const storeItems = []


blogForm.addEventListener('submit', function(event){
  // function addToStorage(event) {
  event.preventDefault()
  console.log('hello')
  const obj = 
  {title: '', 
  body: ''
  };
  obj.title = blogTitle.value;
  obj.body = txtArea.value;

  // currentDiv = postKeys.length;

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

// readMore.addEventListener('click', function(event){
//   showPost(0)
//   // function addToStorage(event) {
//   event.preventDefault()
//   console.log('hello')
  
//   currentDiv = postKeys.length;


//   populateDisplay(DisplayArea);

// })
  
function populateDisplay(index){
  display = JSON.parse(localStorage.getItem('storeItems'))[`${index}`];
  // for(let i = 0; i < display.length; i++){
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
  // }
  
}




function populateListDisplay(display = [], displayParagraph){
  displayParagraph.innerHTML = display.map(function(item, index){
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
  // event.preventDefault();
  blogTitle.value = JSON.parse(localStorage.getItem('storeItems'))[`${index}`].title;
  txtArea.value = JSON.parse(localStorage.getItem('storeItems'))[`${index}`].body;


}




nextButton.addEventListener('click', function(event){
  paginateNext();
});

previousButton.addEventListener('click', function(event){
  paginatePrevious();
});

function generateKey() {
  return postKeys.length;
}

function getPostForPage(pageId){
  return JSON.parse(fetchFromLocalStorage(pageId));
}

function persistToLocalStorage(key,object){
  localStorage.setItem(key, object);
}

function fetchFromLocalStorage(key){
  return localStorage.getItem(key);
}

function getPostHtml(postData){
   return `

    <h1>
      ${postData.title}
    </h1>
    
    <div>
      ${postData.body}
    </div>

    `;
}

function paginateNext(){
  if(pageId <= postKeys.length - 1){
    populateDisplay(++currentPage);
  }
}

function paginatePrevious(pageId){
  if(pageId <= 0){
    populateDisplay(--currentPage);
  }
}


  
// function populateDisplay(pageId){
//   const pageData = getPostForPage(pageId);
//   console.dir(pageData)
//   if(pageData){
//     displayArea.innerHTML = getPostHtml(pageData);
//   }
// }

