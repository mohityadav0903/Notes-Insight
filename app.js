// console.log("hello");
showNotes();
// Automatic heading written
const heading = document.getElementById("heading");
const str = "Welcome to Note-Insight";
let idx = 1;
setInterval(write, 200);
heading.addEventListener("load", write());
function write() {
  heading.innerText = str.slice(0, idx);
  idx++;
  if (idx > str.length) {
    idx = 1;
    //PASUE DE YAHA PR THODI DER KAAA
  }
}
// if user click at clear all notes then clear the local
function clear() {
  localStorage.clear();
  showNotes();
}
let clearBtn = document.getElementById("clearNotes");
clearBtn.addEventListener("click", clear);

// if user add a note and title,add it to local storage
function add(e) {
  let addTxt = document.getElementById("addTxt");

  // for title
  let addTitle = document.getElementById("title");
  let titles = localStorage.getItem("titles");

  if (titles == null) {
    titleObj = [];
  } else {
    titleObj = JSON.parse(titles);
  
  }
  if(addTxt.value!=="" &&addTitle.value!==""){
    titleObj.push(addTitle.value);
    localStorage.setItem("titles", JSON.stringify(titleObj)); 
  }
  // console.log(
  //   titles
  // );
  
  // for note
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  if(addTxt.value!=="" &&addTitle.value!==""){
    
    notesObj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
  }
  // console.log(notes);
  
  // showing of notes
  // showTitles();
  if(addTxt.value!=="" &&addTitle.value!==""){
      console.log("chal raha he");
      showNotes();
    }
    else{
      alert("Please add your title and note");
    }
    addTitle.value = "";
    addTxt.value = "";
}
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", add);

// // function to show titles from localStorage
// function showTitles() {
//   let titles=localStorage.getItem('titles');
//   if(titles==null){
//     titlesObj=[];
//   }
//   else{
//     titlesObj=JSON.parse(titles);
//   }

// }

// function to show wlwments from localstorage
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let titles = localStorage.getItem("titles");
  if (titles == null) {
    titleObj = [];
  } else {
    titleObj = JSON.parse(titles);
  }
  // console.log(titleObj);
  // let titleArray=Array.from(titleObj);
  // console.log(titleArray);
  let html = "";
  notesObj.forEach(function (ele, ind) {
    html += `
    <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${titleObj[ind]}</h5>
                        <p class="card-text"> ${ele}</p>
                        <button id="${ind}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                    </div>
                </div>`;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show! Use "Add" button present in above section to add a note `;
  }
}

// function to delete a notes
function deleteNote(ind) {
  let titles = localStorage.getItem("titles");
  if (titles == null) {
    titleObj = [];
  } else {
    titleObj = JSON.parse(titles);
  }
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  titleObj.splice(ind,1);
  localStorage.setItem("titles", JSON.stringify(titleObj)); 
  notesObj.splice(ind, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

// searching operation

let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();
  // console.log('Input event fired!', inputVal);
  let noteCards = document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach(function (element) {
    //searching by title keywords
    let titleTxt = element.getElementsByTagName("h5")[0].innerText;
    // searching by note keywords
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else if (titleTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }

    // console.log(cardTxt);
  });
});

// speech to text

if (annyang) {
  // Let's define our first command. First the text we expect, and then the function it should call
  var commands = {
    hello: function () {
      console.log("Hello");
      i = 1;
    },
    "add title *tag": function (variable) {
      console.log(variable);
      let title = document.getElementById("title");
      title.value = variable;
      i = 2;
    },
    "ad title *tag": function (variable) {
      console.log(variable);
      let title = document.getElementById("title");
      title.value = variable;
      i = 2;
    },
    "add a title *tag": function (variable) {
      console.log(variable);
      let title = document.getElementById("title");
      title.value = variable;
      i = 2;
    },
    "a title *tag": function (variable) {
      console.log(variable);
      let title = document.getElementById("title");
      title.value = variable;
      i = 2;
    },
    "add note *tag": function (variable) {
      console.log(variable);
      let note = document.getElementById("addTxt");
      note.value = variable;
      i = 3;
    },
    "ad note *tag": function (variable) {
      console.log(variable);
      let note = document.getElementById("addTxt");
      note.value = variable;
      i = 3;
    },
    "a note *tag": function (variable) {
      console.log(variable);
      let note = document.getElementById("addTxt");
      note.value = variable;
      i = 3;
    },
   "add": function () {
      console.log("add ho gaya");
      add();
      i = 4;
    },
    "ad": function () {
      console.log("add ho gaya");
      add();
      i = 4;
    },
    
    "clear": function () {
      console.log("clear ho gaya");
      clear();
      i = 5;
    },
    "delete *tag": function (variable) {
      console.log("delete ho gaya");
      deleteNote(variable);
      i = 6;
    },
  };

  // Add our commands to annyang
  annyang.addCommands(commands);

  // Start listening. You can call this here, or attach this call to an event, button, etc.
  annyang.start();
}

// text to speech
let i = 1;
let mainContainer = document.getElementsByTagName("body")[0];
mainContainer.addEventListener("click", () => {
  let speech = new SpeechSynthesisUtterance();
  speech.lang = "en-US";
  speech.text = "Welcome to Notes Insight please click anywhere to continue.";
  speech.volume = 1;
  speech.rate = 0.8;
  speech.pitch = 1;

  if (i == 1) {
    window.speechSynthesis.speak(speech);

    i = 0;
  }
  if (i == 2) {
    let title=document.getElementById("title");
    let  str=title.value;
    speech.text = "Title Added "+str;
    
    window.speechSynthesis.speak(speech);
    i = 0;
  }
  if (i == 3) {
    let title=document.getElementById("addTxt");
    let  str=title.value;
    speech.text = "Note Added "+str;
    window.speechSynthesis.speak(speech);
    i = 0;
  }
  if (i == 4) {
    speech.text = "Added";
    window.speechSynthesis.speak(speech);
    i = 0;
  }
  if (i == 5) {
    speech.text = "Clear";
    window.speechSynthesis.speak(speech);
    i = 0;
  }
  if (i == 6) {
    speech.text = "Deleted";
    window.speechSynthesis.speak(speech);
    i = 0;
  }
  console.log(i);
});

// window.onload = function () {
//   document.getElementById("tah_audio").play();
//   console.log("done");
// };
