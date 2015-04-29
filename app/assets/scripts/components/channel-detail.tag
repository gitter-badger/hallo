<channel-detail>
  <div class="channel-info" if="{ data.name }">
    <h1 class="title">{ data.name }</h1>
    <a href="#" class="call">
      <span class="number">106 31</span>
      Ligue para contratar
    </a>
    <h2 class="subtitle">{ data.desc.title }</h2>
    <div class="desc">
      <p each={ text in data.desc.text }>{ text }</p>
    </div>
    <h2 class="title-list">{ data.pack.title }</h2>
    <ul class="list-channels">
      <li each={ item in data.pack.items }>
        <span>{ item.name }</span>
        <span>{ item.number }</span>
      </li>
    </ul>
    <h2 class="title-avaliable" if={ data.plans }>Disponível nos planos:</h2>
    <ul class="list-avaliable">
      <li each={ data.plans }>
        <a href="{ data.url }">{ name }</a>
        — Plano a partir de R$ { price }
      </li>
    </ul>
    <div class="sign-now">Ainda não tem Oi TV HD? Assine agora.</div>
  </div>
  <script>
    var self = this;
    self.data = {}
    $.getJSON(opts.urlApi, function(json){
      self.data = json.data;
      self.update()
    });
  </script>
</channel-detail>
