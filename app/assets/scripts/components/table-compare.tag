<table-compare>
  <table class="table-compare">
    <caption>Compare os planos de telefonia fixa</caption>
    <thead>
      <tr>
        <td></td>
        <td each={ id, label in labels }>{ label }</td>
      </tr>
    </thead>
    <tbody>
    <tr each={ plan in plans } >
      <td class="opt" onclick={ selectPlan }>
        <span class="promo" if={ plan.best_seller }>Mais vendido</span>
        <oi-price id="price-ilimitado-ddd" price={ plan.price.loyal } small={ true } ></oi-price>
      </td>
      <td  each={ idF, labelF in plan.features }>
        <span class="tag" if={ labelF.tag }>{ labelF.text }</span>
        <span class="bold" if={ !labelF.tag }>{ labelF.text }</span>
      </td>
    </tr>
  </tbody>
</table>

  <script>
    var self = this;
    self.plans = opts.plans;
    self.labels = opts.labels;

    this.selectPlan = function (){
      console.log('select');
    }
  </script>

</table-compare>
