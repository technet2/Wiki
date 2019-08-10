function LoadUI(sourceUrl, selector)
{
  vvar jqxhr = $.get(sourceUrl, function(html) 
  {
      console.log( "Got the file" );
      var ix = html.indexOf('<div class="xxx"');            // todo
      if (ix != -1)
      {
        ix += 10;                                             // todo
        var endIx = html.indexOf('</div>', ix);
        if (endIx != -1)
        {
          var js = html.substring(ix, endIx - ix);
          eval(
        }
      }
  })
  .done(function() {
    console.log( "Job done. This is a chance to tidy up" );
  })
  .fail(function() {
    console.log( "Error!" );
  })
  .always(function() {
    console.log( "Finished loading the UI code" );
  });
}
