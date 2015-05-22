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
    <div class="channel-print_print">
      <button type="button" role="button"  onclick={ printPage } class="channel-print_print_bt-print">Imprimir</button>
    </div>
    <div class="channel-print_results">
      <div class="channel-print_results_container">
        <h2><img src="/assets/images/oi/oi-logo.svg" width="70" />MIX HD <span>{ quant }</span> CANAIS</h2>
        <ol class="channel-print_list">
          <li class="channel-print_list_item" each={channel in results}>
              <svg width="100%" height="100%">
                <rect width="100%" height="100%" style="fill:rgb(245,245,245);" />
              </svg>
              <span class="channel-print_list_number">{ channel.number }</span>
              <span class="channel-print_list_type">
                <img class="channel-print_list_type_img type-{ channel.type }" src="{ channel.type == '1' ? '/assets/images/logos/240X80/' + channel.img + '.png' : '/assets/images/icons/music.svg' }" />
              </span>
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
    self.quant = '';

    self.visible = false;

    this.on('mount', function(){
      self.loadChannels();
    });

    this.open = function(e) {
      self.visible = true;
      self.update();
      $('body').addClass('scroll-lock');
    }
    
    this.close = function(e) {
      self.visible = false;
      $('body').removeClass('scroll-lock');
    }

    this.printPage = function(e) {
      window.print();
    }


    loadChannels(){
      $.getJSON('/api/channel/list.json', function(json){
        self.channels = _.sortBy(json.data, "name");
        self.meta = json.meta;
        self.results = self.channels
        self.quant = self.channels.length
        self.update();
      });
    }
    
  </script>
</channel-print>