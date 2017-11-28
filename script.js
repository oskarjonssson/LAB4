let callback = function(event){

 // GET APU KEY JS CODE
let url = 'https://www.forverkliga.se/JavaScript/api/crud.php?requestKey';
let outputApi = document.getElementsByClassName('api-output')[0];
let apiBtn = document.getElementById('api-btn');
function getApi(){
  fetch(url)
  .then(function(response) {
    return response.json();
  }).then(function(response2){
    outputApi.innerHTML = response2.key;
  })
};

apiBtn.addEventListener('click', function(event){
  getApi();
});

// ADD A BOOK CODE

let inputTitle = document.getElementById('input-title');
let inputAuthor = document.getElementById('input-author');
let addBtn = document.getElementById('add-btn');
let listBooks = document.getElementById('list-books');


// FUNCTION CLICK BUTTON CLICK EVENT
function changeUrl(valueTitle, valueAuthor) {
  let urlEdited = 'https://www.forverkliga.se/JavaScript/api/crud.php?op=insert&key=4tUkA' + '&title=' + valueTitle + '&author=' + valueAuthor;
  console.log(urlEdited);
     fetch(urlEdited)
       .then(function(response) {
         return response.json();
       }).then(function(json) {
         outputApi.innerHTML = "Status:"+json.status;
         outputApi.innerHTML += " ID:"+ json.id;
         console.log(json);
       })
};

//SKAPAR LIST-ELEMENT OCH APPENDAR TILL listBooks
function appendList(valueTitle, valueAuthor){
  let liItem = document.createElement('li');
  liItem.innerHTML = valueTitle + ', ' + valueAuthor;
  listBooks.appendChild(liItem);
};




//BUTTON EVENT CLICK --
addBtn.addEventListener('click', function(event){
  let valueTitle = inputTitle.value;
  let valueAuthor = inputAuthor.value;
  changeUrl(valueTitle, valueAuthor);
  appendList(valueTitle, valueAuthor);
});



}
window.addEventListener('load', callback);
