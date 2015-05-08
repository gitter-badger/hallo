<oi-price>
  <div class="oi-price { small }">
    <div class="oi-price_prefix">
      { prefix }
    </div>
    <div class="oi-price_value">
      <span class="oi-price_value_integer">{ integer }</span>
      <span class="oi-price_value_cents">,{ cents }</span>

    </div>
    <div class="oi-price_suffix">
      <span>/</span>{ suffix }
    </div>
  </div>

  <script>
    var self = this;

    self.prefix = 'A partir de';
    self.integer = Math.floor(opts.price);
    self.cents = (opts.price + "").split('.')[1];
    self.suffix = 'Mês';
    self.small = opts.small ? 'oi-price--small' : '';

    this.updatePrice = function(newPrice){
      self.integer = Math.floor(newPrice);;
      self.cents = (newPrice + "").split('.')[1];
      self.update();
    }

  </script>

</oi-price>
