import Api from '@/services/Api'

//import ytsearch from 'ytsr/lib/main'
export default {
    /* eslint-disable */
    search (id, nexttoken) {
    if (nexttoken !== undefined) {
      return Api.hi().get('/search?q=' + id + '&nexttoken=' + nexttoken)
    } else {
      return Api.hi().get('/search?q=' + id)
    }
    //   ytsearch.getFilters(id, function(err, filters) {
    //       if (err) throw err;
    //       filter = filters.get('Type').find(function(o){
    //           return o.name === 'Video'
    //       });
    //       let options = {
    //           limit: 25,
    //           nextpageRef: filter.ref
    //       };
    //       ytsearch(null, options, function(err, searchResults) {
    //           if(err){
    //               return err
    //           }else{
    //               let results = parseresults(searchResults.items);
    //               console.log(results);
    //               return results
    //           }
    //
    //       });
    //   });
  },
  searchsuggestion (text) {
    return Api.hi().get('/search/suggestion?text=' + text)
  }
}
function parseresults(results) {
    let items = [];
    for ( let i = 0; i < results.length; i++ ) {
        items.push({id: {videoId: results[i].link.split('v=')[1]}, title : results[i].title, subtitle: results[i].author.name, duration: results[i].duration, play_counts: results[i].views, published_at: results[i].uploaded_at, thumbnail: results[i].thumbnail.split('?'[0])})
    }
    return items
}
