<channel-modal>
  <div role="dialog" class="channel-modal { data.klass }">
    <div class="channel-modal_image" style="background-image:url(/assets/images/demo/bg-warner.jpg)"></div>
    <div class="channel-modal_indisponible">
      <div>
        Indisponível neste plano
      </div>
    </div>
    <div class="channel-modal_close">
      <svg class="nc-icon outline" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24">
        <g transform="translate(0, 0)">
          <line fill="none" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" x1="19" y1="5" x2="5" y2="19" stroke-linejoin="round"></line>
        </g>
        <g transform="translate(0, 0)">
          <line fill="none" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" x1="19" y1="19" x2="5" y2="5" stroke-linejoin="round"></line>
        </g>
      </svg>
      Fechar
    </div>
    <div class="channel-modal_content">
      <div class="channel-modal_logo" style="background-image:url(/assets/images/logos/prov/byu-tv.png);"></div>
      <div class="channel-modal_name">{ data.name }</div>
      <div class="channel-modal_channel">Canal 64</div>
      <div class="channel-modal_info">
        <p>Warner Channel é um canal de televisão por assinatura que é transmitido na América Latina e no Sudeste da Ásia pertencente a HBO (em conjunto com a empresa-irmã Warner Bros).</p>
        <p>A maior parte de sua programação tem o áudio original em Inglês com legendas em Português (para o Brasil), possuindo também poucos programas dublados.</p>
        <p>Os seriados exibidos no canal são principalmente da The CW, FOX, ABC, NBC e CBS. O acervo de filmes é da Warner Bros, e reúne as principais séries das produtoras Warner Bros. Television e da CBS Television Studios dos Estados Unidos. </p>
      </div>
      <div class="channel-modal_disponible">
        <div class="channel-modal_disponible_title">Disponível nos planos</div>
        <div class="channel-modal_disponible_list">
          <ul>
            <li>
              <a href="#">TV Start HD</a> - Plano à partir de R$ 59,90
            </li>
            <li>
              <a href="#">TV Mix HD</a> - Plano à partir de R$ 79,90
            </li>
            <li>
              <a href="#">TV Total HD</a> - Plano à partir de R$ 9  9,90
            </li>
          </ul>
        </div>
      </div>
      <div class="channel-modal_action">
        <div class="channel-modal_action_title">Já é cliente Oi TV HD?</div>
        <div class="channel-modal_action_link">
          <a href="">Faça um Upgrade do seu plano</a>
        </div>
      </div>
    </div>
  </div>
  <script>
    var self = this;
    self.data = {}
    loadChannel(urlApi){
      $.getJSON(urlApi, function(json){
        self.data = json.data;
        self.update()
      });
    }
  </script>
</channel-modal>
