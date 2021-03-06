<channel-search>
  <div class="oi-channels_search-call">
    <a href="#" onclick={ open }>
      <svg version="1.1" baseProfile="full" xmlns="http://www.w3.org/2000/svg" height="100%" width="100%" class="icon-search" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 500 500" enable-background="new 0 0 500 500" xml:space="preserve">
        <path fill-rule="evenodd" clip-rule="evenodd" stroke="#000000" stroke-miterlimit="10" d="M488.4,427.1L387.1,325.8 c22-33.2,34.8-73,34.8-115.8C421.9,94,327.9,0,212,0C96,0,2,94,2,209.9c0,116,94,210,210,210c42.8,0,82.6-12.8,115.8-34.8 l101.3,101.3c16.4,16.5,42.9,16.5,59.3,0C504.8,470,504.8,443.5,488.4,427.1z M211.4,335.2c-69.5,0-125.9-56.3-125.9-125.9 c0-69.5,56.3-125.9,125.9-125.9c69.5,0,125.8,56.4,125.8,125.9C337.3,278.9,280.9,335.2,211.4,335.2z"> </path>
      </svg>
      Busque um canal específico
    </a>
  </div>
  <div class="channel-search" show={ visible }>
    <div class="channel-search_close" onclick={ close }>
      <svg class="nc-icon outline" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24">
        <g transform="translate(0, 0)">
          <line fill="none" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" x1="19" y1="5" x2="5" y2="19" stroke-linejoin="round"></line>
        </g>
        <g transform="translate(0, 0)">
          <line fill="none" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" x1="19" y1="19" x2="5" y2="5" stroke-linejoin="round"></line>
        </g>
      </svg>
    </div>
    <div class="channel-search_form">
      <div class="channel-search_form_container">
        <div class="channel-search_logo">
          <svg class=" oi-logo" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 30 30" xml:space="preserve" aria-labelledby="logo-oi-title" role="img">
            <title id="logo-oi-title">Logo Oi</title>
            <desc></desc>
            <g>
              <path fill="#F7A800" d="M22.8,25.3C16,31.3-2.2,31.4,1.5,26.3c4.3-6-2.1-13.6,3.3-21C10-1.9,21.1-1.3,26,4.2 C31,9.7,29.5,19.2,22.8,25.3z"> </path>
            </g>
            <g>
              <g>
                <ellipse fill="#FFFFFF" cx="20" cy="21" rx="1.5" ry="4.5"></ellipse>
              </g>
              <g>
                <circle fill="#FFFFFF" cx="20" cy="13.8" r="1.5"> </circle>
              </g>
              <g>
                <path fill="#FFFFFF" d="M13.1,16.4c-2.5,0-4.2,2-4.2,4.5c0,2.5,1.7,4.5,4.2,4.5c2.5,0,4.2-2,4.2-4.5C17.3,18.4,15.6,16.4,13.1,16.4 M13.1,23.4c-1.2,0-1.8-1.2-1.8-2.4c0-1.2,0.6-2.4,1.8-2.4c1.2,0,1.8,1.2,1.8,2.4C14.9,22.2,14.2,23.4,13.1,23.4z"> </path>
              </g>
            </g>
          </svg>
        </div>
        <div class="channel-search_legend">Lista de Canais</div>
        <div class="channel-search_input">
          <label>
            <svg version="1.1" baseProfile="full" xmlns="http://www.w3.org/2000/svg" height="100%" width="100%" class="icon-search" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 500 500" enable-background="new 0 0 500 500" xml:space="preserve"> <path fill-rule="evenodd" clip-rule="evenodd" stroke="#000000" stroke-miterlimit="10" d="M488.4,427.1L387.1,325.8 c22-33.2,34.8-73,34.8-115.8C421.9,94,327.9,0,212,0C96,0,2,94,2,209.9c0,116,94,210,210,210c42.8,0,82.6-12.8,115.8-34.8 l101.3,101.3c16.4,16.5,42.9,16.5,59.3,0C504.8,470,504.8,443.5,488.4,427.1z M211.4,335.2c-69.5,0-125.9-56.3-125.9-125.9 c0-69.5,56.3-125.9,125.9-125.9c69.5,0,125.8,56.4,125.8,125.9C337.3,278.9,280.9,335.2,211.4,335.2z"> </path></svg>
            <span>Busque um canal específico</span>
            <input onkeyup={ search } value={query} type="text" autofocus placeholder="Busque um canal específico">
          </label>
        </div>
      </div>
    </div>
    <div class="channel-search_results">
      <div class="channel-search_results_container">
        <ol class="channel-search_list">
          <li class="channel-search_list_item" each={channel in results}>
            <a href="#{ channel.slug }">
              <span class="channel-search_list_type type-{ channel.type }" style="{ channel.type == '1' ? 'background-image:url(/assets/images/logos/height40/' + channel.img + '.png)' : '' }"></span>
              <span class="channel-search_list_name">{ channel.name }</span>
            </a>
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
      $('body').addClass('scroll-lock');
    }

    document.onkeydown = function(evt) {
      evt = evt || window.event;
      // Esc
      if (evt.keyCode == 27) {
        self.close()
      }
    };

    this.close = function(e) {
      self.visible = false;
      $('body').removeClass('scroll-lock');
    }

    this.search = function(evt) {
      evt = evt || window.event;
      if (evt.keyCode == 27) {
        self.close()
        return
      }
      self.query = e.target.value;
      var arr = self.channels.filter(filterLv)
      var results;

      results = _.sortBy(arr, function(channel) {
        var query = self.query.replace(/ /g,'').toLowerCase();
        var channelName = channel.name.replace(/ /g,'').toLowerCase();
        var startsWith =  _.startsWith(channelName, query);
        return startsWith ? -1 : 0;
      });

      results = _.sortBy(results, function(channel) {
        var query = self.query.replace(/ /g,'').toLowerCase();
        var channelName = channel.name.replace(/ /g,'').toLowerCase();
        var includes =  _.include(channelName, query);
        return includes ? -1 : 0;
      });

      results = _.sortBy(arr, "type");

      self.results = results.slice(0, 8);

      // self.results = _.sortBy(self.channels.filter(filterLv), "name");

      // _.debounce(function(){
      //   self.test
      // }, 500)

      self.update();
    }.bind(this);

    function filterLv(channel){
      if(!channel){
        return
      }
      var query = self.query.replace(/ /g,'').toLowerCase();
      var channelName = channel.name.replace(/ /g,'').toLowerCase();
      var channelKeywords = channel.keywords.replace(/,/g,'').toLowerCase();
      var distL = 0;

      if( _.include(channelName, query) ){
        return true;
      }

      // if( channelName.length < query.length ){
      //   return false;
      // }

      if(channelKeywords.length > 0){
        var distL = _.levenshtein( query, channelKeywords)
        if(distL <= 4){
          return true;
        } else {
          return false;
        }
      }

      var distL = _.levenshtein( query, channelName)
      if(distL <= 3){
        return true;
      } else {
        return false;
      }

    }

    loadChannels(){
      $.getJSON('/api/channel/list.json', function(json){
        self.channels = _.sortBy(json.data, "name");
        self.meta = json.meta;
        self.results = self.channels.slice(0, 8)
      });
    }

  </script>
</channel-search>
