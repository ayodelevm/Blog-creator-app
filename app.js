// alert('hello');

const blogCreate = document.getElementById('form-create');
const blogEdit = document.getElementById('form-edit');
const blogTitle = document.getElementById('blog-title');
const editTitle = document.getElementById('edit-title');
const textArea = document.getElementById('text-area');
const editTextArea = document.getElementById('edit-text-area');
const displayArea = document.querySelector('#display');
const ListDisplayArea = document.getElementById('list-display');
const editButton = document.querySelector('#editButton');
const readMore = document.getElementById('read-more');
const deletePost = document.getElementById('delete-post');
const submitButton = document.getElementById('form-submit');
const previousButton = document.getElementById('previous-button');
const nextButton = document.getElementById('next-button')
const storeItems = JSON.parse(localStorage.getItem('storeItems')) || [];
let currentDiv = false;
let newIndex = 0;
let pageStatus = false;
let pageNumber = 0;

/*
=======================================================================================================
== function for creating blog post                                                                   ==
=======================================================================================================
*/


blogCreate.addEventListener('submit', function(event){

  event.preventDefault()
  console.log('hello')
  const obj = 
  {title: '', 
  body: ''
  };
  
  if( blogTitle.value !== '' && textArea.value !== '') {
    obj.title = blogTitle.value;
    obj.body = textArea.value;
    storeItems.push(obj);
    console.log(storeItems);
    populateListDisplay(storeItems, ListDisplayArea);
    localStorage.setItem('storeItems', JSON.stringify(storeItems));
  }
  blogTitle.value = '';
  textArea.value = '';
})


/*
=======================================================================================================
== function for editing blog post                                                                    ==
=======================================================================================================
*/


blogEdit.addEventListener('submit', function(event){

  if(currentDiv === true  && editTitle.value !== '' && editTextArea.value !== '') {
    const storageElement = JSON.parse(localStorage.getItem('storeItems'));
    storageElement[`${newIndex}`].title = editTitle.value;
    storageElement[`${newIndex}`].body = editTextArea.value;
    localStorage.setItem('storeItems', JSON.stringify(storageElement));
    populateListDisplay(storeItems, ListDisplayArea);
  }
  else {
    alert("Content can't be empty. Please Edit your post!")
  }

})

/*
=======================================================================================================
== function for deleting post                                                                        ==
=======================================================================================================
*/

function postDelete(index) {
  const storageElements = JSON.parse(localStorage.getItem('storeItems'));
  storageElements.splice(index, 1);
  if(storageElements.length){
    localStorage.setItem('storeItems', JSON.stringify(storageElements));
    populateListDisplay(storeItems, ListDisplayArea); 
  }
  if (!storageElements.length) {
    delete window.localStorage.storeItems;

    populateListDisplay(storeItems, ListDisplayArea);    
  }
  
}


/*
=======================================================================================================
== function to show all posts in a single page in list format                                        ==
=======================================================================================================
*/

function populateListDisplay(display = [], displayParagraph){
  displayParagraph.innerHTML = display.map(function(item, index){
    item.index = index;
    return `
    <div id = "post-head">
      <button id="delete-post" onClick='postDelete(${index}); refreshPage();'>Delete</button>
    
      <button id="editButton" onClick="editPost(${index}); showDiv('#edit');">Edit</button>
    </div>
      
      <h1 class = 'blog-heading'>
        ${item.title}
      </h1>

      <p class = 'blog-content'>
        ${item.body}
      </p>
    <a href="#" onClick="populateDisplay(${index}); showDiv('#display');" id= "read-more">Read more...</a>
    `
  }).join('');

}


/*
=======================================================================================================
== function to show posts on single page                                                             ==
=======================================================================================================
*/


function populateDisplay(index){

  if(!JSON.parse(localStorage.getItem('storeItems')) || !JSON.parse(localStorage.getItem('storeItems')).length){
    return;
  }
  display = JSON.parse(localStorage.getItem('storeItems'))[`${index}`];

  displayArea.innerHTML = 
  `
    <h1 class = 'blog-heading'>
      ${display.title}
    </h1>
    
    <p class = 'blog-content'>
      ${display.body}
    </p>
    <a href="#" onClick="previous(${index})" id="previous-button">Previous</a>
    <a href="#" onClick="next(${index})" id="next-button">Next</a>
    `
  pageStatus = true;
  pageNumber = index;
 
}


/*
=======================================================================================================
== function to enable blog post edit                                                                 ==
=======================================================================================================
*/

function editPost(index){

  editTitle.value = JSON.parse(localStorage.getItem('storeItems'))[`${index}`].title;
  editTextArea.value = JSON.parse(localStorage.getItem('storeItems'))[`${index}`].body;
  currentDiv = true;
  newIndex = index;
} 


/*
=======================================================================================================
== function to enable next page button                                                               ==
=======================================================================================================
*/


function next(index, divName){

  storage = JSON.parse(localStorage.getItem('storeItems'))
  
  if(storage.length-1 === index) {
    const element = document.querySelector('#next-button');
    element.classList.add("hide-div")
  }

  if(index === 1) {
    const element = document.querySelector('#previous-button');
    element.classList.add("show-div")
  }
  
  if(pageStatus === true) {
    pageIndex = index + 1;
    populateDisplay(pageIndex);
    console.log(pageNumber);
  }
  
  pageNumber = index +1; 
}


/*
=======================================================================================================
== function to enable previous page button                                                           ==
=======================================================================================================
*/


function previous(index){
  
  storage = JSON.parse(localStorage.getItem('storeItems'))
  
  if(index === 0) {
    const element = document.querySelector('#previous-button');
    element.classList.add("hide-div")
  }

  if(storage.length-1 >= index && index !== 0) {
    const element = document.querySelector('#next-button');
    element.classList.add("show-div")
  }

  if(pageStatus === true) {
    pageIndex = index-1;
    console.log(pageStatus);
    console.log(pageNumber);

    populateDisplay(pageIndex)
    console.log(pageNumber);
  }
  pageNumber = index-1;
}

/*
=======================================================================================================
== function to enable automatic page reload                                                          ==
=======================================================================================================
*/


function refreshPage() {
  
  window.location.reload();
}


function currentDate() {
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  return date
}



/*
=======================================================================================================
== Calling post display functions to enable persistence on refresh                                   ==
=======================================================================================================
*/

populateDisplay(pageNumber);

populateListDisplay(storeItems, ListDisplayArea);


/*
=======================================================================================================
== function to enable hiding and showing of divs                                                     ==
=======================================================================================================
*/

const mydivs = ['#create', '#edit', '#list-display', '#display'];

function showDiv(divName) {
  const elem = document.querySelector(divName);
  mydivs.forEach(function(div) {
    const hideElement = document.querySelector(div);
    hideElement.classList.remove("show-div")
    hideElement.classList.add("hide-div")
  });
  elem.classList.add("show-div");
}


