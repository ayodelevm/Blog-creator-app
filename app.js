// alert('hello');

var blogForm = document.getElementById('form-edit');
var blogTitle = document.getElementById('blog-title');
var txtArea = document.getElementById('text-area');
var displayArea = document.querySelector('#display');
var editButton = document.querySelector('#editButton')
var storeItems = JSON.parse(localStorage.getItem('storeItems')) || [];
var postKeys = JSON.parse(localStorage.getItem('postKeys')) || [];
var currentDiv = postKeys.length;
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

  
  storeItems.push(obj);
  console.log(storeItems);

  var postKey = generateKey();
  postKeys.push(postKey);
  localStorage.setItem('postKeys', JSON.stringify(postKeys));

  populateDisplay(storeItems, displayArea);
  localStorage.setItem('storeItems', JSON.stringify(storeItems));
  blogTitle.value = '';
  txtArea.value = '';
})
  
function populateDisplay(display = [], displayParagraph){
  
  for(var i = 0; i < storeItems.length; i++){
    displayParagraph.innerHTML = 
  `
 
    <h1>
      ${storeItems[i].title}
    </h1>
    
    <div>
      ${storeItems[i].body}
    </div>

    `
  }
  
}
function  generateKey() {
  return postKeys.length
}

populateDisplay(storeItems, displayArea);