

function setPageInfo()
{   
  var url = document.location.search;
  var urlList = url.split('=');  //“=” means obtain the value efter the symbol "=" 
  var keyword = urlList[urlList.length-1].split('.')[0];  //to get the search word

  setMovieList(keyword.trim()); 
}  

function searchMovie()
{
  var txtKey =  document.getElementById("txtKeyWord");
  if(txtKey.value == "" || txtKey.value == null)
  {
    alert("Please enter en key word for search!");
  }
  else
  {
    //setMovieList(keyWord);  //It is battre use replace ,because when the use using back navigation on the browser.
    window.location.replace("/SearchMovieOMDB/SearchPage.html?movie="+txtKey.value);
  }
 
}

function setMovieList(keyword)
{
  var APIKEY = 'ced10e13';  //this is a my own API KEY for OMDB
  document.getElementById("pSearcWord").innerHTML= keyword.toString();   //to show the key word on the page   

  $(document).ready(function(){   
   
    var URL = "http://www.omdbapi.com/?apikey="+APIKEY+"&s="+keyword+"&type=movie";
 
     let movieRequest = new XMLHttpRequest;     
     let movieData;
     var movieText="";
     
  
     movieRequest.onreadystatechange = function () {
         if (movieRequest.readyState==4 && movieRequest.status==200) {
                  
            movieData = JSON.parse(movieRequest.responseText);
            //console.log(movieData);

            //console.log(movieData.Response);

           if(movieData.Response=='False') //OMDB return en 'Response' as a bool object to show if there resluts match the search key word.
           {
            document.getElementById("divMovies").innerHTML="";
            document.getElementById("pError").innerHTML= movieData.Error;      //OMDB API return en 'movieData.Error'         
           }
           else{
             movieData.Search.forEach((item) => {  // movieData.Search is en JSON array from OMDB API

              movieText += "<div class='movieCard'><div class='movie-image-box'>";
              if(item.Poster != 'N/A')
              {
                movieText += "<img class='movie-image' src='" + item.Poster + "'></div>";               
              }
              else{
                movieText += "<img class='noImage' src='/SearchMovieOMDB/Images/noImage.png'></div>";  //if there no image-path in the API response
              }

              movieText += "<div class='movie-description'>"+
              "<a href='DetailPage.html?movieID="+ item.imdbID  +"'><p class='movie-title'>"+ item.Title +"</p></a>"+            
              "<p><span class='topic'>Type: </span> &nbsp;"+ item.Type +"</p>"+ 
              "<p><span class='topic'>Year: </span> &nbsp;"+ item.Year +"</p></div></div>";            
                         
            });
  
            document.getElementById("divMovies").innerHTML= movieText;
            document.getElementById("pError").innerHTML="";
          }
          
          }       
        }
        movieRequest.open('GET', URL);
        movieRequest.send(); 
      
    });
  
}
