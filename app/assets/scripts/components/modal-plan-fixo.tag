<modal-planfixo>
  <div class="modal-plan-fixo" show={ visible }>

    <header class="modal-plan-fixo_header">
      <div class="modal-plan-fixo_container">
        <button class="modal-plan-fixo_close" onclick={ close }>Fechar</button>
        <div class="modal-plan-fixo_header_img"></div>
        <h1 class="modal-plan-fixo_header_title ">
          <span class="init">Voz total (fixo + pré) </span>
          <span class="end">Escolha seu chip pré</span>
        </h1>
        <div class="modal-plan-fixo_header_action">
          <button class="modal-plan-fixo_header_action_add { added ? 'added' : '' }" onclick={ add}>{ textAdd }</button>
          <button class="modal-plan-fixo_header_action_rem" onclick={ remove }>Remover</button>
        </div>
      </div>
    </header>

    <main class="modal-plan-fixo_main">
      <div class="modal-plan-fixo_main_container">
        <div class="modal-plan-fixo_main_col">
          <table class="table-compare">
            <tbody>
              <tr>
                <td class="opt">
                  <input type="radio" name="plan-select" class="radio" checked={ plan.selected }>
                  <oi-price price={ plan.addons.chip_pre } small={true} />
                </td>
                <td>
                  <span class="plan-name">Chip pré</span>
                  <span class="plan-info">
                    R$ 10 de recarga automática por mês
                    <br>
                    Ligações locais ilimitadas para Fixo e Celular da Oi
                  </span>
                </td>
              </tr>
              <tr>
                <td class="opt">
                  <input type="radio" name="plan-select" class="radio" checked={ plan.selected }>
                  <oi-price price={ plan.addons.chip_pre_internet_ddd } small={true} />
                </td>
                <td>
                  <span class="plan-name">Chip pré com internet e DDD</span>
                  <span class="plan-info">
                    R$ 20 de recarga automática por mês
                    <br>
                    Ligações locais ilimitadas para Fixo e Celular da Oi
                    <br>
                    Ligações DDD ilimitadas para Fixo e Celular da Oi
                    <br>
                    100 MB de internet por mês
                    <br>
                    100 torpedos (SMS) por mês para qualquer operadora
                    <br>
                    Oi WiFi ilimitado
                  </span>
                </td>
              </tr>
            </tbody>
          </table>

          <span class="modal-plan-fixo_desc_title">
            Com o Voz Total você fala ilimitado dentro e fora de casa.
          </span>

          <span class="modal-plan-fixo_desc_title">
            O 1º chip é grátis e você ainda pode acrescentar mais 2 chips na mesma oferta. Tudo isso na conta do seu fixo.
          </span>

          <h2 class="modal-plan-fixo_desc_title">Como funciona?</h2>

          <p class="modal-plan-fixo_desc_text">
            Após a instalação do fixo, você receberá o chips pré pelo correio em até 15 dias úteis. Para ativar o chip, ligue para *144 e em até 48h a recarga do pré-pago estará disponível.
          </p>

          <h2 class="modal-plan-fixo_desc_title">Entenda o Voz Total</h2>

          <ol class="modal-plan-fixo_desc_ord-list">
            <li>O Voz Total é um benefício para clientes que possuem um Fixo da Oi.</li>
            <li>Todo mês você escolhe uma recarga de R$ 10 ou R$ 20 para o seu Pré da Oi e este valor vem cobrado na conta do seu fixo.</li>
            <li>A recarga pode ser usada para ligações locais realizadas do seu Pré da Oi para fixos e celulares.</li>
            <li>É possível cadastrar até 3 chips após a instalação do seu fixo.</li>
            <li>Clientes que já tem Pré Pago da Oi não perdem os benefícios da sua oferta vigente.</li>
            <li>A recarga fica disponível 48 horas após a adesão.</li>
            <li>O valor da recarga do seu pré é liberada em até 5 dias úteis após o pagamento da conta do fixo.</li>
            <li>Caso você não pague a conta do seu Fixo da Oi, não receberá os benefícios no seu pré-pago.</li>
            <li>Você só pode se cadastrar o chip do Voz Total quando seu fixo estiver instalado.</li>
            <li>O Voz Total não está disponível para chips Oi Controle.</li>
          </ol>

          <hr class="modal-plan-fixo_line">

          <h2 class="modal-plan-fixo_desc_title">Se você já tem um chip Pré da Oi, basta cadastrar-se</h2>

          <ol class="modal-plan-fixo_desc_ord-list">
            <li>Conclua o pedido do seu fixo e aguarde a instalação.</li>
            <li>Depois da instalação, cadastre o Voz Total pelo 284 1043 ou <a href="#">acessando a Minha Oi.</a> </li>
            <li>Após o cadastro do chip, em até 48 horas sua recarga estará disponível no seu pré-pago.</li>
          </ol>
        </div>
      </div>
    </main>
  </div>

  <script>
  var self = this;
  self.visible = false;
  self.added = false;
  self.textAdd = 'Adicionar';
  self.plan = opts.plan;

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

</modal-planfixo>
