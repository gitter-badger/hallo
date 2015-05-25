<oi-price>
  <div class="oi-price { small }">
    <div class="oi-price_prefix">
      { prefix }
    </div>
    <div class="oi-price_value">
      <span class="oi-price_value_integer">{ integer }</span>
      <span class="oi-price_value_cents">,{ cents }</span>
      <span class="oi-price_value_suffix"><span>/</span>{ suffix }</span>
    </div>
  </div>

  <script>
    var self = this;

    function toFixed(value, precision) {
      var precision = precision || 0,
          power = Math.pow(10, precision),
          absValue = Math.abs(Math.round(value * power)),
          result = (value < 0 ? '-' : '') + String(Math.floor(absValue / power));
      if (precision > 0) {
        var fraction = String(absValue % power),
          padding = new Array(Math.max(precision - fraction.length, 0) + 1).join('0');
        result += '.' + padding + fraction;
      }
      return (result + '').split('.')[1];
    }

    self.prefix = opts.prefix;
    self.integer = Math.floor(opts.price);
    self.cents = toFixed(opts.price, 2)// (opts.price.toPrecision(3) + "").split('.')[1] || '00';
    self.suffix = 'Mês';
    self.small = opts.small ? 'oi-price--small' : '';

    this.updatePrice = function(newPrice){
      self.integer = Math.floor(newPrice);;
      self.cents = toFixed(newPrice, 2)// (newPrice.toPrecision(4) + "").split('.')[1] || '00';
      self.update();
    }

  </script>

</oi-price>
