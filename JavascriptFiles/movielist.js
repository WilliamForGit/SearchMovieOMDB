  
$(document).ready(function(){
  $("#search").click(function()
  {
   
    var URL = "http://www.omdbapi.com/?i=tt3896198&apikey=ced10e13&s=mulan&type=movie";

   let ourRequest = new XMLHttpRequest;
   
   let ourData;
   var movieText="";

   ourRequest.onreadystatechange = function () {
       if (ourRequest.readyState==4 && ourRequest.status==200) {
           ourData = JSON.parse(ourRequest.responseText);
           console.log(ourData);
           //console.log(ourData.Search);
           
           ourData.Search.forEach((item) => {
            console.log('ID: ' + item.imdbID);
            console.log('Title: ' + item.Title);
            console.log('Poster: ' + item.Poster);    
            console.log('Type: ' + item.Type);
            
            if(item.Poster != 'N/A')
            {
              movieText += " <img class='menu' src='" + item.Poster + "'><p>";
            }
            else{
              movieText += " <img class='menu' src='/images/No_image_available.png'><p>";
            }
                       
          });

          document.getElementById("divMovies").innerHTML= movieText;
          
          console.log(movieText);
       }
   }  

   ourRequest.open('GET', URL);
   ourRequest.send();   


  });
});