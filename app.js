// alert('hello');

var blogForm = document.getElementById('form-edit');
var blogTitle = document.getElementById('blog-title');
var txtArea = document.getElementById('text-area');
var displayArea = document.querySelector('#display');
var ListDisplayArea = document.getElementById('list-display')
var editButton = document.querySelector('#editButton');
var submitButton = document.getElementById('form-submit');
var storeItems = JSON.parse(localStorage.getItem('storeItems')) || [];
var postKeys = JSON.parse(localStorage.getItem('postKeys')) || [];
var currentDiv = postKeys.length;
console.log(currentDiv)
// var storeItems = []


blogForm.addEventListener('submit', function(event){
  // function addToStorage(event) {
  event.preventDefault()
  console.log('hello')
  var obj = 
  {title: '', 
  body: ''
  };
  obj.title = blogTitle.value;
  obj.body = txtArea.value;

  currentDiv = postKeys.length;

  storeItems.push(obj);
  console.log(storeItems);

  var postKey = generateKey();
  postKeys.push(postKey);
  localStorage.setItem('postKeys', JSON.stringify(postKeys));

 populateListDisplay(storeItems, ListDisplayArea);
  localStorage.setItem('storeItems', JSON.stringify(storeItems));
  blogTitle.value = '';
  txtArea.value = '';
})
  
function populateDisplay(display = [], displayParagraph){
  
  for(var i = 0; i < display.length; i++){
    displayParagraph.innerHTML = 
  `
 
    <h1>
      ${storeItems[i].title}
    </h1>
    
    <p>
      ${storeItems[i].body}
    </p>

    `
  }
  
}


function populateListDisplay(display = [], displayParagraph){
  displayParagraph.innerHTML = display.map(function(item){
    return `
    <h1>
      ${item.title}
    </h1>
    
    <p>
      ${item.body}
    </p>
    `
  }).join('');
}



function  generateKey() {
  return postKeys.length
}


populateDisplay(storeItems, displayArea);

populateListDisplay(storeItems, ListDisplayArea);


editButton.addEventListener('click', function(event){
  event.preventDefault();
  blogTitle.value = JSON.parse(localStorage.getItem('storeItems'))[currentDiv].title;
  txtArea.value = JSON.parse(localStorage.getItem('storeItems'))[currentDiv].body;

  submitButton.addEventListener('click', function(){
    event.preventDefault();

    blogTitle.value = JSON.parse(localStorage.getItem('storeItems'))[currentDiv].title;
    txtArea.value = JSON.parse(localStorage.getItem('storeItems'))[currentDiv].body;

  })

})




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


  
function populateDisplay(pageId){
  const pageData = getPostForPage(pageId);
  console.dir(pageData)
  if(pageData){
    displayArea.innerHTML = getPostHtml(pageData);
  }
}

