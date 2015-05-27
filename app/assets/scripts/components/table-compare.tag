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
    <tr each={ plan, id2 in plans } onclick={ parent.select } class={ selected: plan.selected } >
      <td class="opt">
        <span class="promo" if={ plan.best_seller }>Mais vendido</span>
        <input type="radio" name="plan-select" class="radio" checked={ plan.selected }>
        <oi-price price={ parent.plans[id2].price.loyal } small={ true } />
      </td>
      <td each={ idF, labelF in plan.features }>
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

    select(event){
      var item = event.item
      _.forEach(self.plans, function (plan){
        plan.selected = false
      });
      item.plan.selected = true;
      self.update();
    }
  </script>

</table-compare>
