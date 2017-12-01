let callback = function(event){

 // GET API KEY JS CODE
let url = 'https://www.forverkliga.se/JavaScript/api/crud.php?requestKey';
let outputApi = document.getElementsByClassName('api-output')[0];
let apiBtn = document.getElementById('api-btn');
let getApi = function(){
  fetch(url)
  .then(function(response) {
    return response.json();
  }).then(function(response2){
    outputApi.innerHTML = response2.key;
  })
};

// ADD A BOOK CODE
let inputTitle = document.getElementById('input-title');//INPUT TITLE
let inputAuthor = document.getElementById('input-author');//INPUT AUTHOR
let addBtn = document.getElementById('add-btn'); //ADD BOOK BUTTON
let bookOutput = document.getElementsByClassName('bookOutput')[0]; // DIV FOR BOOKS
let inputDelete = document.getElementById('input-delete');//INPUT DELETE BOOK
let deleteBtn = document.getElementById('btn-delete');//BUTTON DELETE BOOK
let errorDelete = document.getElementById('errorDelete')//ERROR TEXT ADD
let errorAdd = document.getElementById('errorAdd')//ERROR TEXT DELETE
let bookTextList = document.getElementById('div-text'); // P ELEMENT INSIDE DIV THAT CHANGES INNERHTML

//VIEW ALL BOOKS
let viewDataFunction = function() {
  let url = 'https://www.forverkliga.se/JavaScript/api/crud.php?op=select&key=GxtKv';
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log(json);
        if(json.status === 'success'){
        bookTextList.innerHTML = "";
        for(i = 0; i < json.data.length; i++) {
          bookTextList.innerHTML +=
          "Author: " + json.data[i].author +
          " Title: " + json.data[i].title +
          " ID: " + json.data[i].id +
          " Updated: " + json.data[i].updated + "<br>";
        }
      }else{
        bookTextList.innerHTML += 'Error loading books - Please refresh the page';
      }
      console.log(json);
    })
}
viewDataFunction();

//CREATES BOOK DEPENDING ON INPUT
let createBook = function() {
  let valueTitle = inputTitle.value;//INPUT VALUE TITLE
  let valueAuthor = inputAuthor.value;//INPUT VALUE AUTHOR
  let urlEdited = 'https://www.forverkliga.se/JavaScript/api/crud.php?op=insert&key=GxtKv' + '&title=' + valueTitle + '&author=' + valueAuthor;
  console.log(urlEdited);
     fetch(urlEdited)
       .then(function(response) {
         return response.json();
       }).then(function(json) {
         console.log(json);
       })
};
//DELETE BOOK BY ID
let deleteBook = function() {
let valueDelete = inputDelete.value; //INPUT VALUE ID
let url = 'https://www.forverkliga.se/JavaScript/api/crud.php?op=delete&key=GxtKv' + '&id=' + valueDelete;
fetch(url)
  .then(function(response) {
    return response.json();
  }).then(function(json) {
    console.log(json.status);
    if(json.status === "success"){
      viewDataFunction();
      errorDelete.style.display = 'none';
    }else{
      errorDelete.style.display = 'inline-block';
    }
  });
}

// EVENTS
apiBtn.addEventListener('click', getApi);//GET API - CLICK EVENT
addBtn.addEventListener('click', createBook);//ADD BOOK - CLICK EVENT
deleteBtn.addEventListener('click', deleteBook);//DELETE BOOK BY ID



}
window.addEventListener('load', callback);
