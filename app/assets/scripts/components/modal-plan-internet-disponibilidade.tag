<modal-plan-internet-disponibilidade>

  <div class="modal modal-green" show={ visible }>

    <div class="modal_column-left">
      <header class="modal_header">
        <div class="modal_header_logo"></div>
        <h1 class="modal_header_title">consulta de cobertura</h1>
      </header>
    </div>

    <div class="modal_column-right">
      <main class="modal_container">

        <div class="modal_container_row">
          <h5>Já tem um fixo da Oi?</h5>
          <form id="form-consulta-de-cobertura">
            <div class="modal_container_half-left">
              <fieldset class="text">
                <div class="field-box round-all last-line text">
                  <label>DDD + Fixo da Oi</label>
                  <input type="text" name="ddd-fixo-da-oi" />
                </div>
              </fieldset>
            </div>
            <div class="modal_container_half-right">
              <button class="basic">Consulte a disponibilidade</button>
            </div>
          </form>
        </div>

        <div class="modal_container_row">
          <h5>Não tem um Telefone Fixo ainda?</h5>
          <button class="basic">Fale com um especialista</button>
        </div>

      </main>
    </div>

    <a href="javascript:void(0);" class="modal_close" onclick={ close }>Fechar</a>

  </div>

  <script>

    var self = this;
    self.visible = false;
    self.added = false;

    self.open = function() {
      $('body').addClass('scroll-lock');
      self.visible = true;
      self.update();
      oiMediator.publish( 'modal open', {type: 'plano internet disponibilidade'} );
    }

    self.close = function() {
      $('body').removeClass('scroll-lock');
      self.visible = false;
      self.update();
      oiMediator.publish( 'modal close', {type: 'plano internet disponibilidade'} );
    }

    self.add = function() {
      self.textAdd = 'Adicionado';
      oiMediator.publish( 'voz-total add' );
      self.added = true;
      self.update();
      self.close();
    }

    self.remove = function() {
      self.textAdd = 'Adicionar';
      self.added = false;
      self.update();
      oiMediator.publish( 'voz-total remove' );
    }

    document.onkeydown = function(evt) {
      evt = evt || window.event;
      // Esc
      if (evt.keyCode == 27) {
        self.close()
      }
    };

    $('#consulte-a-disponibilidade').on('click', function  (evt){
      evt.preventDefault();
      self.open();
    });

    self.open();

  </script>

</modal-plan-internet-disponibilidade>
