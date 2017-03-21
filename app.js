// alert('hello');

var blogForm = document.getElementById('form-edit');
var blogTitle = document.getElementById('blog-title');
var txtArea = document.getElementById('text-area');
var displayArea = document.querySelector('#display');
var storeItems = JSON.parse(localStorage.getItem('storeItems')) || []
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
  console.log(obj.body.split('\n'));
  
  storeItems.push(obj);
  console.log(storeItems);
  populateDisplay(storeItems, displayArea);
  localStorage.setItem('storeItems', JSON.stringify(storeItems));
  blogTitle.value = '';
  txtArea.value = '';
  // }
})
  
function populateDisplay(display = [], displayParagraph){
  displayParagraph.innerHTML = display.map(function(i){
    return `

    <h1>
      ${i.title}
    </h1>
    
    <div>
      ${i.body}
    </div>

    `
  }).join('');
}

populateDisplay(storeItems, displayArea);

