/* Loop through all dropdown buttons to toggle between hiding and showing its dropdown content 
- This allows the user to have multiple dropdowns without any conflict */
var dropdown = document.getElementsByClassName("dropdown-btn");
var i;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
    this.classList.toggle("btnactive");
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
}

function sortTable(tbname,n,type) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById(tbname);
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (dir == "asc") {
        if (type==0){
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
        else{
          if (Number(x.innerHTML) > Number(y.innerHTML)) {
            shouldSwitch = true;
            break;
          }
        }
      } else if (dir == "desc") {
        if (type==0){
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }else{
          if (Number(x.innerHTML) < Number(y.innerHTML)) {
            shouldSwitch = true;
            break;
          }
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount ++;
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

function closeModal(mdName) {
  document.getElementById(mdName).style.display = "none";
}

function openModal(mdName) {
  document.getElementById(mdName).style.display = "block";
}

$.fn.pageMe = function(opts){
  var $this = this,
      defaults = {
          perPage: 7,
          showPrevNext: false,
          hidePageNumbers: false
      },
      settings = $.extend(defaults, opts);
  
  var listElement = $this;
  var perPage = settings.perPage; 
  var children = listElement.children();
  var pager = $('.pager');
  
  if (typeof settings.childSelector!="undefined") {
      children = listElement.find(settings.childSelector);
  }
  
  if (typeof settings.pagerSelector!="undefined") {
      pager = $(settings.pagerSelector);
  }
  
  var numItems = children.length;
  var numPages = Math.ceil(numItems/perPage);

  pager.data("curr",0);
  
  if (settings.showPrevNext){
      $('<li><a href="#" class="prev_link">«</a></li>').appendTo(pager);
  }
  
  var curr = 0;
  while(numPages > curr && (settings.hidePageNumbers==false)){
      $('<li><a href="#" class="page_link">'+(curr+1)+'</a></li>').appendTo(pager);
      curr++;
  }
  
  if (settings.showPrevNext){
      $('<li><a href="#" class="next_link">»</a></li>').appendTo(pager);
  }
  
  pager.find('.page_link:first').addClass('active');
  pager.find('.prev_link').hide();
  if (numPages<=1) {
      pager.find('.next_link').hide();
  }
  pager.children().eq(1).addClass("active");
  
  children.hide();
  children.slice(0, perPage).show();
  
  pager.find('li .page_link').click(function(){
      var clickedPage = $(this).html().valueOf()-1;
      goTo(clickedPage,perPage);
      return false;
  });
  pager.find('li .prev_link').click(function(){
      previous();
      return false;
  });
  pager.find('li .next_link').click(function(){
      next();
      return false;
  });
  
  function previous(){
      var goToPage = parseInt(pager.data("curr")) - 1;
      goTo(goToPage);
  }
   
  function next(){
      goToPage = parseInt(pager.data("curr")) + 1;
      goTo(goToPage);
  }
  
  function goTo(page){
      var startAt = page * perPage,
          endOn = startAt + perPage;
      
      children.css('display','none').slice(startAt, endOn).show();
      
      if (page>=1) {
          pager.find('.prev_link').show();
      }
      else {
          pager.find('.prev_link').hide();
      }
      
      if (page<(numPages-1)) {
          pager.find('.next_link').show();
      }
      else {
          pager.find('.next_link').hide();
      }
      
      pager.data("curr",page);
      pager.children().removeClass("active");
      pager.children().eq(page+1).addClass("active");
  
  }
};
