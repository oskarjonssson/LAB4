let callback = function(event){

  //COUNTER
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

// ADD A BOOK CODE
let inputTitle = document.getElementById('input-title');//INPUT TITLE
let inputAuthor = document.getElementById('input-author');//INPUT AUTHOR
let addBtn = document.getElementById('add-btn'); //ADD BOOK BUTTON
let bookOutput = document.getElementsByClassName('bookOutput')[0]; // DIV FOR BOOKS
let inputDelete = document.getElementById('input-delete');//INPUT DELETE BOOK
let deleteBtn = document.getElementById('btn-delete');//BUTTON DELETE
let bookTextList = document.getElementById('div-text');//P ELEMENT IN DIV THAT STORES BOOKS
let apiMessage = document.getElementById('api-message'); //MESSAGE FROM SERVER
let apiStatus = document.getElementById('api-status'); //STATUS MESSAGE
let addImg = document.createElement('img'); //SKAPAR EN IMG TAG FÖR THUMBNAILS TILL BÖCKERNA
let createDiv = document.createElement('div'); //SKAPAR EN DIV



//VIEW ALL BOOKS
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
          " ID: " + json.data[i].id + " " +
          " Updated: " + json.data[i].updated + "<br>";
        }
      }else{
        bookTextList.innerHTML += 'Error loading books - Please refresh the page';
        counter += 1;
        counterOutput.innerHTML ='ERRORS: ' + counter;

      }
      console.log(json);
    })
}
viewDataFunction();

//CREATES BOOK DEPENDING ON INPUT
let createBook = function(googleTitle, googleAuthor) {
  let valueTitle = inputTitle.value;//INPUT VALUE TITLE
  let valueAuthor = inputAuthor.value;//INPUT VALUE AUTHOR
  let urlEdited = 'https://www.forverkliga.se/JavaScript/api/crud.php?op=insert&key=GxtKv' + '&title=' + valueTitle + googleTitle + '&author=' + valueAuthor + googleAuthor;
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
           counter += 1;
           counterOutput.innerHTML ='ERRORS: ' + counter;
         }
       })
};
//DELETE BOOK BY ID
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
        errorDelete.style.display = 'none';
      }else{
        errorDelete.style.display = 'inline';
        counter += 1;
        counterOutput.innerHTML ='ERRORS: ' + counter;
      }
    });
};
// CHANGE BOOKS ------------------

let btnChange = document.getElementById('btnChange');
let idChange = document.getElementById('input-id-change');
let titleChange = document.getElementById('input-title-change');
let authorChange = document.getElementById('input-author-change');


let changeBook = function(){
  //INPUT VALUES
  let idChangeValue = idChange.value;
  let titleChangeValue = titleChange.value;
  let authorChangeValue = authorChange.value;
  let urlChange = 'https://www.forverkliga.se/JavaScript/api/crud.php?op=update&key=GxtKv' + '&id=' + idChangeValue + '&title=' + titleChangeValue + '&author=' + authorChangeValue;
  fetch(urlChange)
    .then(function(response){
      return response.json();
    }).then(function(json){
      if(json.status == 'success'){
        console.log('SUCCESS'); //IF SUCCESS
      }else{
        console.log('ERROR - CHANGE') //IF ERROR
        counter += 1;
        counterOutput.innerHTML ='ERRORS: ' + counter;
      }
    })
};

// EVENTS
btnChange.addEventListener('click', changeBook); // CHANGEBOOK - CLICK EVENT
apiBtn.addEventListener('click', getApi);//GET API - CLICK EVENT
addBtn.addEventListener('click', createBook);//ADD BOOK - CLICK EVENT
deleteBtn.addEventListener('click', deleteBook);//DELETE BOOK BY ID
searchBtn.addEventListener('click', function(event) { // SEARCH GOOGLE API BOOKS
  let inputValue = searchField.value;
  fetchGoogleBooks(inputValue);
});


// SEARCH FOR GOOGLE BOOKS
let searchedList = document.getElementById('searchedList');
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


            })
            createDivText.innerHTML += getTitle + "<br>" + "Author: " + getAuthor + "<br>";
          }
        });
};







}

window.addEventListener('load', callback);
