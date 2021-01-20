function setMovieInfo()
{   
  var url = document.location.href;
  var urlList = url.split('=');  //“=” means obtain the value efter the symbol "=" 
  var movieID = urlList[urlList.length-1].split('.')[0];

  setMovieDetail(movieID);    
}  

function setMovieDetail(movieID)
{

var movieImage = document.getElementById("imgPicture");
var movieTitle = document.getElementById("pTitle");
var movieRating = document.getElementById("pRating");
var movieType = document.getElementById("pType");
var movieGenre =document.getElementById("pGenre");
var movieLanguage = document.getElementById("pLanguage");
var moviePlot= document.getElementById("plot");
var movieReleaseDate = document.getElementById("pReleaseDate");
var movieDirector = document.getElementById("pDirector");
var movieActors = document.getElementById("pActors");


  var APIKEY = 'ced10e13';
  $(document).ready(function(){   
     
    var URL = "http://www.omdbapi.com/?apikey="+APIKEY+"&i="+movieID;
 
     let movieRequest = new XMLHttpRequest;     
     let data;
     var movieText="";
  
     movieRequest.onreadystatechange = function () {
         if (movieRequest.readyState==4 && movieRequest.status==200) {
                  
            data = JSON.parse(movieRequest.responseText);
           
           if(data.Response=='False') //OMDB return en 'Response' as a bool object to show if there resluts match the search key word.
           {
            
            document.getElementById("pError").innerHTML= movieData.Error;      //OMDB API return en 'movieData.Error'         
           }
           else{                      
            movieImage.setAttribute('src', data.Poster);
            movieTitle.textContent = data.Title;
            movieRating.innerHTML = data.imdbRating; 
            movieType.innerHTML = data.Type;
            movieGenre.innerHTML =  data.Genre;  
            movieLanguage.innerHTML = data.Language;                       
            movieReleaseDate.innerHTML = data.Released;
            movieDirector.innerHTML =  data.Director;
            movieActors.innerHTML =  data.Actors;
            moviePlot.innerHTML = data.Plot;
          }
          
          }       
        }
        movieRequest.open('GET', URL);
        movieRequest.send(); 
      
    });
  
}
