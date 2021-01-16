

function setPageInfo()
{   

 var url = document.location.search;
 var urlList = url.split('=');  //“=” means obtain the value efter the symbol "=" 
 var keyword = urlList[urlList.length-1].split('.')[0];

 setMovieList(keyword.trim());
    
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
           if(movieData.Response !="False")
           {
             console.log(movieData);
             //console.log(movieData.Search);
             
             movieData.Search.forEach((item) => {
                          
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
          //}
          //else{
           // document.getElementById("pError").innerHTML="There no movies match your search word, please enter again!";
          //}
          
          }
     }  
  
     movieRequest.open('GET', URL);
     movieRequest.send(); 
  
    });
  
}
