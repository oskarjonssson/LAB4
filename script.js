let callback = function(event){

 // GET API KEY JS CODE
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
let inputTitle = document.getElementById('input-title');//INPUT TITLE
let inputAuthor = document.getElementById('input-author');//INPUT AUTHOR
let addBtn = document.getElementById('add-btn'); //ADD BOOK BUTTON
let listBooks = document.getElementById('list-books'); // LISTA/UL FOR BOOKS
let showBtn = document.getElementById('show-btn');//SHOW BOOKS BUTTON
let apiMessage = document.getElementById('api-message');
let apiStatus = document.getElementById('api-status');


// FUNCTION CLICK BUTTON CLICK EVENT
//INPUT FOR QUERYSTRINGS
let check = function() {
  let valueTitle = inputTitle.value;//INPUT VALUE TITLE
  let valueAuthor = inputAuthor.value;//INPUT VALUE AUTHOR
  let urlEdited = 'https://www.forverkliga.se/JavaScript/api/crud.php?op=insert&key=4tUkA' + '&title=' + valueTitle + '&author=' + valueAuthor;
  console.log(urlEdited);
     fetch(urlEdited)
       .then(function(response) {
         return response.json();
       }).then(function(json) {
         console.log(json);
         if(json.status === 'success'){//IF API RETURNS STATUS SUCCESS - CREATES NEW BOOK FROM INPUT
           let liItem = document.createElement('li');
           liItem.innerHTML = valueTitle + ', ' + valueAuthor;
           listBooks.appendChild(liItem);
           listBooks.style.display = 'none';
           apiStatus.innerHTML = "Status: Succes"
           apiMessage.innerHTML = "";

         }else {
           apiStatus.innerHTML = "Status: Error";
           apiMessage.innerHTML = "message: " + json.message;
           console.log('ERROR');//ERROR HANDLING - DISPLAYS IF ERROR FROM API
         }
       })
};


//SKAPAR LIST-ELEMENT OCH APPENDAR TILL listBooks
function appendList(valueTitle, valueAuthor){

  let liItem = document.createElement('li');
  liItem.innerHTML = valueTitle + ', ' + valueAuthor;
  console.log(json.id);
  listBooks.appendChild(liItem);
};

//BUTTON EVENT CLICK -- appendList & changeUrl
addBtn.addEventListener('click', check);
//SHOW LIST / HIDE LIST
showBtn.addEventListener('click', function(event){
  if(listBooks.style.display === 'none'){
    listBooks.style.display = 'block';
    showBtn.innerHTML = 'Hide books'
  }else{
    listBooks.style.display = 'none';
    showBtn.innerHTML = 'Show books'
  }
});

}
window.addEventListener('load', callback);
