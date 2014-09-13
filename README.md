react-bootpage
==============

Component react for Boostrap pagination

#Example


```javascript
var settings = {
  total: 20, // total page number
  startPage: 2, // start page from left 
  page: 4,  // Selected page
  maxVisible: 10, // maximum number of pages visibles at a time
  nextCallback: function(states, pageNumber){}, // callback executed after next button click
  prevCallback: function(states, pageNumber){}, // callback executed after previous button click
  nextText: '&raquo;', // text used for next button
  prevText: '&laquo;', // text used for previous button
  increment: 3, // page increment or decrement when clicking prev/next buttons
  pageCallback: function(states, pageNumber){} // callback executed after page selection
};

<Bootpag settings={settings} />
