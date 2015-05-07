<movie-rent>
  <div class="movie-rent { data.klass }" show={ visible } itemscope itemtype="http://schema.org/Movie">

    <div class="movie-rent_image" itemprop="image" content="{ data.img }" style="background-image:url({ data.image })"></div>

    <div class="movie-rent_close" onclick={ close }>
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

    <div class="movie-rent_container">

      <div class="movie-rent_header">
        <div class="movie-rent_broadcast">
          <ul itemscope itemtype="http://schema.org/BroadcastEvent">
            <li itemprop="publishedOn" itemscope itemtype="http://schema.org/BroadcastService">
              <span class="vod" itemprop="name" content="Vídeo on Demand"><acronym title="Vídeo on Demand">VOD</acronym></span>
            </li>
            <li itemprop="publishedOn" itemscope itemtype="http://schema.org/BroadcastService">
              <span class="oi-filmes" itemprop="name">Oi Filmes</span>
            </li>
          </ul>
        </div>

        <h1 class="movie-rent_title" itemprop="name">{ data.name }</h1>

        <div class="movie-rent_price">
          <div itemprop="offers" itemscope itemtype="http://schema.org/Offer">
            <div class="oi-price">
              <meta itemprop="priceCurrency" content="BRL" />
              <meta itemprop="availabilityEnds" content="2015-04-29" />
              <div class="oi-price_prefix">
                A partir de
              </div>
              <div class="oi-price_value" itemprop="price" content="10.00">
                <span class="oi-price_value_integer">
                  { data.offers.price.split('.')[0] }
                </span>
                <span class="oi-price_value_cents">
                 ,{ data.offers.price.split('.')[1] }
                </span>
              </div>
            </div>

            <span itemprop="potentialAction">
              <a class="movie-rent_action" href="tel:+10631" itemscope itemtype="http://schema.org/RentAction">
                <span class="movie-rent_action_number">106 31</span>
                <span class="movie-rent_action_text" itemprop="name">Alugue o Filme</span>
                <meta itemprop="price" content="{ data.offers.price }">
              </a>
            </span>

          </div>
        </div>
      </div>

      <div class="movie-rent_content">
        <div class="movie-rent_info">
          <span itemprop="duration">{ data.duration }</span>
          <span itemprop="genre">{ data.genre }</span>
        </div>

        <div class="movie-rent_desc" itemprop="description">
          <p>{ data.description }</p>
          <p>Disponível para aluguel até 10/10/2015</p>
        </div>

        <div class="movie-rent_table" itemscope itemtype="http://schema.org/Table">
          <h2 class="movie-rent_table_title">Escolha como alugar</h2>
          <table>
            <caption itemprop="headline" >Compare o Vídeo on Demand com o Oi Filmes</caption>
            <thead>
              <tr>
                <th></th>
                <th scope="col">Horário</th>
                <th scope="col">Prazo para assistir</th>
                <th scope="col">Quem tem acesso</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Vídeo on Demand</th>
                <td>Você pode assistir quando quiser</td>
                <td>48 horas</td>
                <td>Só clientes com Gravador</td>
              </tr>
              <tr>
                <th scope="row">Oi Filmes</th>
                <td>Horários fixos, Consulte a programação</td>
                <td>24 horas</td>
                <td>Todos os clientes Oi TV HD</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="movie-rent_question" itemscope itemtype="http://schema.org/Question">
          <h1 class="movie-rent_question_title" itemprop="name">Como o Vídeo on Demand [VoD] funciona?</h1>
          <div class="movie-rent_question_text" itemprop="acceptedAnswer" itemscope itemtype="http://schema.org/Answer">
            <div itemprop="text">
              <ol itemscope itemtype="http://schema.org/ItemList">
                <meta itemprop="itemListOrder" content="http://schema.org/ItemListOrderDescending" />
                <li itemprop="itemListElement">O VOD é um serviço de aluguel de filmes para clientes Oi TV HD com Gravador Digital</li>
                <li itemprop="itemListElement">Para consultar os filmes disponíveis, basta selecionar o botão "VOD" no seu Controle Remoto.</li>
                <li itemprop="itemListElement">Para alugar os filmes, ligue para 106 31.</li>
                <li itemprop="itemListElement">Após alugar, você pode dar play, pausar, voltar e ver tudo de novo durante 48 horas.</li>
                <li itemprop="itemListElement">Novos títulos são adicionados a cada 15 dias.</li>
              </ol>
            </div>
          </div>
        </div>

        <div class="movie-rent_question" itemscope itemtype="http://schema.org/Question">
          <h1 class="movie-rent_question_title" itemprop="name">Como o Oi Filmes funciona?</h1>
          <div class="movie-rent_question_text" itemprop="acceptedAnswer" itemscope itemtype="http://schema.org/Answer">
            <div itemprop="text">
              <ol itemscope itemtype="http://schema.org/ItemList">
                <meta itemprop="itemListOrder" content="http://schema.org/ItemListOrderDescending" />
                <li itemprop="itemListElement">O Oi Filmes é o pay-per-view da Oi com filmes recém-saídos do cinema para alugar.</li>
                <li itemprop="itemListElement">Para consultar os filmes disponíveis, acesse o canal 310 da sua Oi TV HD.</li>
                <li itemprop="itemListElement">Para alugar os filmes, ligue para 106 31.</li>
                <li itemprop="itemListElement">Cada filme tem sessões de exibição com horários fixos. Consulte-as pelo seu controle remoto.</li>
                <li itemprop="itemListElement">Após o aluguel, o canal do filme ficará disnível por 24 horas.</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div class="movie-rent_avaliability">
        <div class="movie-rent_avaliability_title">Disponível nos planos</div>
        <ul class="movie-rent_avaliability_list">
          <li>
            <a href="#">TV Start HD</a> - Plano à partir de R$ 59,90
            <a href="#">TV Mix HD</a> - Plano à partir de R$ 79,90
            <a href="#">TV Total HD</a> - Plano à partir de R$ 9  9,90
          </li>
        </ul>
      </div>

    </div>

  </div>
  <script>
    var self = this;
    self.visible = false;

    this.on('mount', function(){
    });

    this.open = function(url) {
      self.loadMovie(url)
    }

    this.close = function(e) {
      self.visible = false;
      $('body').removeClass('scroll-lock');
    }

    self.loadMovie = function(url){
      $.getJSON('/api/rent/' + url + '.json', function(json){
        self.visible = true;
        self.data = json.data;
        self.data.klass = self.data.image !== undefined ? 'has-image' : '';
        self.update()
      });
      $('body').addClass('scroll-lock');
    }

  </script>
</movie-rent>
