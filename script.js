let callback = function(event) {

//ERROR COUNTER

let counterOutput = document.getElementById('counter');
let counter = 0;

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

apiBtn.addEventListener('click', getApi);//GET API - CLICK EVENT

//VIEW LIBRARY WITH ALL BOOKS
let bookTextList = document.getElementsByClassName('outputBooks')[0];//

let viewDataFunction = function() {
  let url = 'https://www.forverkliga.se/JavaScript/api/crud.php?op=select&key=GxtKv';
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
        if(json.status === 'success'){
        bookTextList.innerHTML = "";
        for(i = 0; i < json.data.length; i++) {
          bookTextList.innerHTML +=
          " Title: " + json.data[i].title + " " +
          "Author: " + json.data[i].author + " " +
          " ID: " + json.data[i].id + "<br> "; //+
          //" Updated: " + json.data[i].updated + "<br>";
        }
      }else{
        viewDataFunction();
        bookTextList.innerHTML += json.message + " " + "- Please refresh the page";
        counter += 1;
        counterOutput.innerHTML ='ERRORS: ' + counter;
      }
      console.log(json);
    })
}
viewDataFunction();
//CREATE BOOKS


let createBook = function(googleTitle, googleAuthor) {
  let urlEdited = 'https://www.forverkliga.se/JavaScript/api/crud.php?op=insert&key=GxtKv' + '&title=' +  googleTitle + '&author=' + googleAuthor;
     fetch(urlEdited)
       .then(function(response) {
         return response.json();
       }).then(function(json) {
         console.log(json);
         if(json.status === 'success'){//IF API RETURNS STATUS SUCCESS - CREATES NEW BOOK FROM INPUT
           viewDataFunction();
         }else {
           createBook(googleTitle, googleAuthor);
           viewDataFunction();
           //apiStatus.innerHTML = "Status: Error";
           //apiMessage.innerHTML = "message: " + json.message;
           console.log('ERROR');//ERROR HANDLING - DISPLAYS IF ERROR FROM API
           counter += 1;
           counterOutput.innerHTML ='ERRORS: ' + counter;
         }
       })
};






//DELETE BOOKS
let inputDelete = document.getElementById('input-delete');//INPUT DELETE BOOK
let deleteBtn = document.getElementById('btn-delete');//BUTTON DELETE

let deleteBook = function() {
  let valueDelete = inputDelete.value; //INPUT VALUE ID
  let urlDelete = 'https://www.forverkliga.se/JavaScript/api/crud.php?op=delete&key=GxtKv' + '&id=' + valueDelete;
  fetch(urlDelete)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log(json.status);
      if(json.status === "success"){
        viewDataFunction();
        //errorDelete.style.display = 'none';
      }else{
        deleteBook();
        if(counter > 10){
          window.location.reload(); //RELOADS PAGE IF ERROR EXCEED 10
        }
        //errorDelete.style.display = 'inline';
        counter += 1;
        counterOutput.innerHTML ='ERRORS: ' + counter;
      }
    });
};

let deleteBookLimit = function(){
  if(inputDelete.value.length == 5){
    deleteBook();
  }else{
    console.log("Input must have length of five")
  }

}
deleteBtn.addEventListener('click', deleteBookLimit);//DELETE BOOK BY ID

// CHANGE BOOKS WITH KEYPRESS

let inputIdChange = document.getElementById('input-id-change');
let inputTitleChange = document.getElementById('input-title-change');
let inputAuthorChange = document.getElementById('input-author-change');

let changeBook = function(){
  //INPUT VALUES
  let idChangeValue = inputIdChange.value;
  let titleChangeValue = inputTitleChange.value;
  let authorChangeValue = inputAuthorChange.value;
  let urlChange = 'https://www.forverkliga.se/JavaScript/api/crud.php?op=update&key=GxtKv' + '&id=' + idChangeValue + '&title=' + titleChangeValue + '&author=' + authorChangeValue;
  fetch(urlChange)
    .then(function(response){
      return response.json();
    }).then(function(json){
      if(json.status == 'success'){
        console.log('SUCCESS'); //IF SUCCESS
        viewDataFunction();  // UPDATES THE LIST AFTER YOU ADDED THE BOOK
      }else{
        changeBook();
        console.log('ERROR - CHANGE') //IF ERROR
        counter += 1;
        counterOutput.innerHTML ='ERRORS: ' + counter;
      }
    })
};

let keyPressEnterFunction = function(event){
    if (event.keyCode == 13) {
      if(inputIdChange.value.length == 5){
        console.log('You pressed a "enter" key');
        changeBook();
      }else{
        console.log('ID must be 5 numbers long');
      }
    }
  }
inputIdChange.addEventListener('keypress', keyPressEnterFunction);
inputAuthorChange.addEventListener('keypress', keyPressEnterFunction);
inputTitleChange.addEventListener('keypress', keyPressEnterFunction);

// SEARCH GOOGLE API FOR BOOKS

let searchedList = document.getElementById('searchedList');
let searchBtn = document.getElementById('buttonSearch');
let inputSearch = document.getElementById('inputSearch');

function fetchGoogleBooks(input) {
      searchedList.innerHTML = "";
      let url = 'https://www.googleapis.com/books/v1/volumes?key=AIzaSyAjEEliLxgt_UKvfhO9aQDoF-Rdo2YHKhA&q=' + input;
      fetch(url)
        .then(function(response) {
          return response.json();
        }).then(function(response2) {
          console.log(response2);
          for (i = 0; i < response2.items.length; i++) {
            let addImg = document.createElement('img');
            let List = document.createElement('li');
            let createDivText = document.createElement('div');
            let createDivImg = document.createElement('div');
            let createDivWrap = document.createElement('div');
            let createBtn = document.createElement('button');
            let getTitle = response2.items[i].volumeInfo.title;
            let getAuthor = response2.items[i].volumeInfo.authors;

            addImg.src = response2.items[i].volumeInfo.imageLinks.thumbnail;
            searchedList.appendChild(List); //Lägger in listan i UL-elementet
            createDivImg.appendChild(addImg); //Skapar ett IMG-element och lägger in den i den tomma diven
            createDivWrap.appendChild(createDivImg);
            createDivWrap.appendChild(createDivText);
            List.appendChild(createDivWrap);
            createDivWrap.appendChild(createBtn);
            List.className = "innerWrapper"; //Lägger till en klass för Li-elementet
            createDivText.className = "infoStyle"; //Lägger till en klass för Div'en med text
            createDivImg.className = "imgStyle"; // Lägger till en klass för Div'en med bildenv(thumbnail) i
            createDivWrap.className = "containerBook";
            createBtn.className = "addBookStyleBtn";
            createBtn.innerHTML = "ADD BOOK";
            createBtn.addEventListener('click', function(event){
              createBook(getTitle, getAuthor);
            });
            createDivText.innerHTML += "Title: " + getTitle + "<br>" + "Author: " + getAuthor + "<br>";
          }
        });
};

searchBtn.addEventListener('click', function(event) { // SEARCH GOOGLE API BOOKS
  let inputValue = inputSearch.value;
  fetchGoogleBooks(inputValue);
});




}
window.addEventListener('load', callback);
