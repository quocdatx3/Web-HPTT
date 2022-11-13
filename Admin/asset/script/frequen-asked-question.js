$(document).ready(readyFn);

function readyFn() {
    // Code to run when the document is ready.
    $('#myTable').pageMe({pagerSelector:'#myPager',showPrevNext:true,hidePageNumbers:false,perPage:8});
}

