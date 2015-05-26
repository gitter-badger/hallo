<modal-internet-disponibilidade>
  <div class="modal-plan-fixo" show={ visible }>

    <header class="modal-plan-fixo_header">
      <div class="modal-plan-fixo_container">
        <button class="modal-plan-fixo_close" onclick={ close }>Fechar</button>
        <div class="modal-plan-fixo_header_img"></div>
        <h1 class="modal-plan-fixo_header_title ">voz total (fixo + pré)</h1>
        <div class="modal-plan-fixo_header_action">
          <button class="modal-plan-fixo_header_action_add { added ? 'added' : '' }" onclick={ add}>{ textAdd }</button>
          <button class="modal-plan-fixo_header_action_rem" onclick={ remove }>Remover</button>
        </div>
      </div>
    </header>

    <main class="modal-plan-fixo_main">
      <div class="modal-plan-fixo_main_container">
        <div class="modal-plan-fixo_main_col">


        </div>
      </div>
    </main>
  </div>

  <script>

    var self = this;
    self.visible = false;
    self.added = false;
    self.textAdd = 'Adicionar';

    self.open = function() {
      $('body').addClass('scroll-lock');
      self.visible = true;
      self.update();
      oiMediator.publish( 'modal open', {type: 'plano fixo'} );
    }

    self.close = function() {
      $('body').removeClass('scroll-lock');
      self.visible = false;
      self.update();
      oiMediator.publish( 'modal close', {type: 'plano fixo'} );
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

    $('.open-voz-total').on('click', function  (evt){
      evt.preventDefault();
      self.open();
    });

  </script>

</modal-internet-disponibilidade>
