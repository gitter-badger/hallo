<oi-card>
  <div class="card"  each={ items }>
    <h3 class="card-title">{ title }</h3>
    <ul class="card-list-subtitle">
      <li>111 Canais</li>
      <li>12 HD</li>
    </ul>

     <oi-price />

    <div class="card-info">Preço para cliente Oi Banda Larga. Não cliente: R$ 49,90</div>
    <ul class="card-list">
      <li>Instalação Gráris</li>
    </ul>
    <a href="#link" class="card-action">Conheça o Start HD</a>
  </div>
  <script>
    this.items = [
      { title: 'Start HD', prefix: 'a partir de', price: '39', cents: ',90', sufix: '/mês' },
      { title: 'Mix HD',   prefix: 'a partir de', price: '69', cents: ',90', sufix: '/mês' },
      { title: 'Total HD', prefix: 'a partir de', price: '89', cents: ',90', sufix: '/mês' }
    ]
  </script>
</oi-card>
