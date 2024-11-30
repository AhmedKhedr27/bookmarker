var siteName = document.getElementById('siteName');
var siteUrl = document.getElementById('siteUrl');
var submitBtn = document.querySelector('#submitBtn');
var deleteBtn = document.getElementById('deleteBtn');
var visitBtn = document.getElementById('visitBtn');
var urlRules = document.getElementById('urlRules');
var search = document.getElementById('search');
var globalIndex;

var bookmarks =[];


if(localStorage.getItem('bookmarks') != undefined){
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
}
display(bookmarks);


// add function
function addbookmark(){
    if( urlValidation() == true){
        var bookmark ={
            name : siteName.value,
            url : siteUrl.value
        }
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks' , JSON.stringify(bookmarks));
        clear();
        display(bookmarks);
        document.getElementById("alertUrl").classList.add("d-none");
    }
    else{
        urlValidation();
    }
    
}
submitBtn.addEventListener('click' , function(){addbookmark();})
function clear(){
    siteName.value = null;
    siteUrl.value = null;
}

// display function
function display(blist , term = 0 ){
    var cartoona = ' ';
    for(i = 0 ; i < blist.length ; i++){
        cartoona += ` <tr>
                  <td>${i + 1}</td>
                  <td>${blist[i].name}</td>              
                  <td>
                    <button id="visitBtn" onclick ="visitBookmark(${i})" class="btn btn-success" >
                      <i class="fa-solid fa-eye pe-2"></i>Visit
                    </button>
                  </td>
                  <td>
                    <button id="updateBtn" onclick ="updateBookmark(${i})" class="btn btn-primary" >
                      <i class="fa-solid fa-eye pe-2"></i>Update
                    </button>
                  </td>
                  <td>
                    <button id="deleteBtn" onclick ="deleteBookmark(${i}) " class="btn btn-danger pe-2" >
                      <i class="fa-solid fa-trash-can"></i>
                      Delete
                    </button>
                  </td>
              </tr>`
    }
    document.getElementById("tableContent").innerHTML = cartoona;
}

// delete
function deleteBookmark(indx){
    bookmarks.splice(indx , 1);
    localStorage.setItem('bookmarks' , JSON.stringify(bookmarks));
    display(bookmarks);
}
function visitBookmark(indx){
    open(bookmarks[indx].url);
}
/*
function urlValidation(){
    if(urlRegex.test(siteUrl.value) == false){
        urlRules.classList.remove('d-none');
        document.querySelector('.container').classList.add('opacity-50');
        document.querySelector('.container').addEventListener('click' , function(){
            urlRules.classList.add('d-none');
        })
        document.querySelector('#urlRules button').addEventListener('click' , function(){
            urlRules.classList.add('d-none');
        })
    }
    else{
        return true;
    }
}
document.querySelector('#urlRules button').addEventListener('click' , function(){
    urlRules.classList.add('d-none')});
    document.querySelector('.container').addEventListener('click' , function(){
        urlRules.classList.add('d-none')});
        */
       function urlValidation(){
        var urlRegex = /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/ig ;
        if(urlRegex.test(siteUrl.value) == false){
            document.getElementById("alertUrl").classList.remove("d-none");
            return false;
        }
        else{
            return true;
        }
       }
       function updateBookmark(indx){
        siteName.value = bookmarks[indx].name;
        siteUrl.value = bookmarks[indx].url;
        document.getElementById('submitBtn').classList.add('d-none');
        document.getElementById('update-Btn').classList.remove('d-none');
        globalIndex =indx;
    }
    
    function compeleteUpdate(){
        bookmarks[globalIndex].name = siteName.value;
    bookmarks[globalIndex].url = siteUrl.value;
    document.getElementById('update-Btn').classList.add('d-none');
    document.getElementById('submitBtn').classList.remove('d-none');
    localStorage.setItem('bookmarks' , JSON.stringify(bookmarks));
    display(bookmarks);
    clear();
    }
    document.getElementById('update-Btn').addEventListener('click' , compeleteUpdate)

    function searchBookmark(){
        var term = search.value;
        var searchItems = [];
        for(var i = 0; i < bookmarks.length ; i++){
            if(bookmarks[i].name.toLocaleLowerCase().includes(term.toLocaleLowerCase())){
                searchItems.push(bookmarks[i]);
            }
            display(searchItems , term);
    
        }
    
    }
    search.addEventListener('input' , searchBookmark);