<channel-print>
  <div class="channel-print" show={ visible }>
    <div class="channel-print_close" onclick={ close }>
      <svg class="nc-icon outline" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24">
        <g transform="translate(0, 0)">
          <line fill="none" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" x1="19" y1="5" x2="5" y2="19" stroke-linejoin="round"></line>
        </g>
        <g transform="translate(0, 0)">
          <line fill="none" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" x1="19" y1="19" x2="5" y2="5" stroke-linejoin="round"></line>
        </g>
      </svg>
    </div>
    <div class="channel-print_results">
      <div class="channel-print_results_container">
        <h2>MIX HD <span></span> CANAIS</h2>
        <ol class="channel-print_list">
          <li class="channel-print_list_item" each={channel in results}>
              <span class="channel-print_list_number">{ channel.number }</span>
              <span class="channel-print_list_type type-{ channel.type }" style="{ channel.type == '1' ? 'background-image:url(/assets/images/logos/height40/' + channel.img + '.png)' : '' }"></span>
              <span class="channel-print_list_name">{ channel.name }</span>
            
          </li>
        </ol>
      </div>
    </div>
  </div>
  <script>
    var self = this;
    self.channels = [];
    self.meta = {};
    self.results = [];
    self.query = '';

    self.visible = false;

    this.on('mount', function(){
      self.loadChannels();
    });

    this.open = function(e) {
      self.visible = true;
      //console.log("abriu");
      //$('body').addClass('scroll-lock');
    }
    
    // this.close = function(e) {
    //   self.visible = false;
    //   $('body').removeClass('scroll-lock');
    // }

    // this.print = function(e) {
    //   self.query = e.target.value;
    //   var arr = self.channels.filter(filterLv)
    //   var results;

    //   results = _.sortBy(arr, function(channel) {
    //     var query = self.query.replace(/ /g,'').toLowerCase();
    //     var channelName = channel.name.replace(/ /g,'').toLowerCase();
    //     var startsWith =  _.startsWith(channelName, query);
    //     return startsWith ? -1 : 0;
    //   });

    //   results = _.sortBy(results, function(channel) {
    //     var query = self.query.replace(/ /g,'').toLowerCase();
    //     var channelName = channel.name.replace(/ /g,'').toLowerCase();
    //     var includes =  _.include(channelName, query);
    //     return includes ? -1 : 0;
    //   });

    //   results = _.sortBy(arr, "type");

    //   self.results = results.slice(0, 8);

    //   // self.results = _.sortBy(self.channels.filter(filterLv), "name");

    //   // _.debounce(function(){
    //   //   self.test
    //   // }, 500)

    //   
    // }.bind(this);

    // function filterLv(channel){
    //   var query = self.query.replace(/ /g,'').toLowerCase();
    //   var channelName = channel.name.replace(/ /g,'').toLowerCase();
    //   var channelKeywords = channel.keywords.replace(/,/g,'').toLowerCase();
    //   var distL = 0;

    //   if( _.include(channelName, query) ){
    //     return true;
    //   }

    //   // if( channelName.length < query.length ){
    //   //   return false;
    //   // }

    //   if(channelKeywords.length > 0){
    //     var distL = _.levenshtein( query, channelKeywords)
    //     if(distL <= 4){
    //       return true;
    //     } else {
    //       return false;
    //     }
    //   }

    //   var distL = _.levenshtein( query, channelName)
    //   if(distL <= 3){
    //     return true;
    //   } else {
    //     return false;
    //   }

    // }

    loadChannels(){
      $.getJSON('/api/channel/list.json', function(json){
        self.channels = _.sortBy(json.data, "name");
        self.meta = json.meta;
        self.results = self.channels
        self.update();

        // muda para o ON no final
        $('.channel-print_results_container h2 span').text(self.channels.length);
        //$('body').addClass('scroll-lock');
      });
    }
    
  </script>
</channel-print>
