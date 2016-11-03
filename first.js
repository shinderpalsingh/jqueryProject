 $(function() {
   var $page=$('#page');
   
   var $abc=$('#abc');
   var Movie=[];
   $('#button').on('click',function(){   //it is used for click button operation

    $('#abc').empty(); //it is used for empty table

    var searchInput=$('#searchInput').val().trim();   //it is used to take value from text
    $.ajax({
      type:'GET',
      url:'http://www.omdbapi.com/?s='+searchInput,
//url:'http://www.omdbapi.com/?s='+$('#searchInput').val(),
cache:false,
success:function (newMovie) {   // newMovie returns array
   $('#pagination').children().remove();
  if(newMovie.Response=="True"){
    var count=0;
    Movie=newMovie.Search;

    for(var m=0;m<Movie.length;m++) 
    {
      if(m==0){
        $abc.append( "<tr>"+"<th>" +"Poster" + "</th>" + "<th>" +"title" + "</th>" + "<th>" +"Year" + "</th>" + "<th>" +"imdbID" + "</th>" +"<th>" +"Type" + "</th>"+ "</tr>" );
      }
      if(Movie[m].Poster==="N/A")
      {
       $abc.append("<tr class='post'>"+ "<td>" + "<img class='img-responsive images' src='../images/noImage.jpg'>" + "</td>" + "<td>"+Movie[m].Title + "</td>" +"<td>"+Movie[m].Year + "</td>" + "<td>"+Movie[m].imdbID + "</td>" + "<td>"+Movie[m].Type + "</td>"  +"</tr>");
     }
     else
     {
      $abc.append("<tr class='post'>"+ "<td>" + "<img class='img-responsive images' src="+ Movie[m].Poster+ ">" + "</td>" + "<td>"+Movie[m].Title + "</td>" +"<td>"+Movie[m].Year + "</td>" + "<td>"+Movie[m].imdbID + "</td>" + "<td>"+Movie[m].Type + "</td>"  +"</tr>");
    }
    count++;

  }

  var itemsPerPage=2;       //start pagination
  var paginationLength=Math.ceil(count/itemsPerPage);
  $('.post').filter(":gt("+(itemsPerPage-1)+")").hide();
  for(var i=0;i<paginationLength;i++){
    $("#pagination").append("<li>"+ (i+1)  +"</li>");
  }

  $("#pagination li").on('click',function(){
    $('.post').hide();
    var linkNumber=$(this).text();
    var contentToShow=$('.post').filter(':lt('+linkNumber*itemsPerPage+')');
    var contentToHide=$('.post').filter(':lt('+(linkNumber-1)*itemsPerPage+')')
    $.merge(contentToHide,$('.post').filter(":gt("+(((linkNumber)*itemsPerPage)-1)+")"));

    contentToShow.show();
    contentToHide.hide();

  });
}
else if(newMovie.Error=="Something went wrong."  ){
  alert("please enter movie");
// $abc.append("<tr>" + "please enter movie"+"</tr");
 // #pagination.remove();
}
else if(newMovie.Response=="False"){
alert("wrong movie entered");
 //$abc.append("<tr>" + "please enter movie"+"</tr");

 // #pagination.remove();     //end pagination
}

}
});
  });
 });


