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
let apiMessage = document.getElementById('api-message'); //MESSAGE FROM SERVER
let apiStatus = document.getElementById('api-status'); //STATUS MESSAGE


//VIEW ALL BOOKS
let viewDataFunction = function() {
  let infoDiv = document.getElementById('infoDiv');
  let url = 'https://www.forverkliga.se/JavaScript/api/crud.php?op=select&key=GxtKv';
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log(json);
        if(json.status === 'success'){
        document.getElementById('div-text').innerHTML = "";
        for(i = 0; i < json.data.length; i++) {
          document.getElementById('div-text').innerHTML +=
          "Author: " + json.data[i].author +
          " Title: " + json.data[i].title +
          " ID: " + json.data[i].id +
          " Updated: " + json.data[i].updated + "<br>";
        }
      }else{
        document.getElementById('div-text').innerHTML += 'Error loading books - Please refresh the page';
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
         if(json.status === 'success'){//IF API RETURNS STATUS SUCCESS - CREATES NEW BOOK FROM INPUT
  apiStatus.innerHTML = "Status: Succes"
  apiMessage.innerHTML = "";

}else {
  apiStatus.innerHTML = "Status: Error";
  apiMessage.innerHTML = "message: " + json.message;
  console.log('ERROR');//ERROR HANDLING - DISPLAYS IF ERROR FROM API
}
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
    viewDataFunction();
  });
}

// EVENTS
apiBtn.addEventListener('click', getApi);//GET API - CLICK EVENT
addBtn.addEventListener('click', createBook);//ADD BOOK - CLICK EVENT
deleteBtn.addEventListener('click', deleteBook);//DELETE BOOK BY ID



}
window.addEventListener('load', callback);
