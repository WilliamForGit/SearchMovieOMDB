
function setPageInfo()
{   
  var url = document.location.search;
  var urlList = url.split('=');  //“=” means obtain the value efter the symbol "=" 
  var keyword = urlList[urlList.length-1].split('.')[0];

  setMovieList(keyword.trim());    
}  

function searchMovie()
{
  var txtKey =  document.getElementById("txtKeyWord");
  var keyWord = txtKey.value;
  console.log(keyWord);

  setMovieList(keyWord);
  txtKey.value="";
}

function setMovieList(keyword)
{
  var APIKEY = 'ced10e13';
  $(document).ready(function(){   
     
    var URL = "http://www.omdbapi.com/?apikey=ced10e13&s="+keyword+"&type=movie";
 
     let movieRequest = new XMLHttpRequest;     
     let movieData;
     var movieText="";
  
     movieRequest.onreadystatechange = function () {
         if (movieRequest.readyState==4 && movieRequest.status==200) {
                  
            movieData = JSON.parse(movieRequest.responseText);
            console.log(movieData);

            console.log(movieData.Response);

           if(movieData.Response=='False') //OMDB return en 'Response' as a bool object to show if there resluts match the search key word.
           {
            document.getElementById("divMovies").innerHTML="";
            document.getElementById("pError").innerHTML= movieData.Error;      //OMDB API return en 'movieData.Error'         
           }
           else{
             movieData.Search.forEach((item) => {  // movieData.Search is en JSON array from OMDB API
                          
              if(item.Poster != 'N/A')
              {
                movieText += "<div class='card'><div class='card-image-box'> <img class='card-image' src='" + item.Poster + "'></div>"+
                "<div class='card-description'>"+
                "<a><p class='card-title'>"+ item.Title +"</p></a>"+            
                "<p><span class='topic'>Type: </span> &nbsp;"+ item.Type +"</p>"+ 
                "<p><span class='topic'>Year: </span> &nbsp;"+ item.Year +"</p></div></div>";            
              }
              else{
                movieText += "<div class='card-image-box'> <img class='card-image' src='/images/No_image_available.png'></div>";
              }
                         
            });
  
            document.getElementById("divMovies").innerHTML= movieText;
          }
          
          }       
        }
        movieRequest.open('GET', URL);
        movieRequest.send(); 
      
    });
  
}
