/// <reference types="cypress" />

const { faker } = require('@faker-js/faker');

describe('Funcionalidade Página de Produtos', () => {
    beforeEach(() => {
        cy.visit('produtos')

    });

    it('Deve selecionar um produto da lista', () => {
        cy.get('[class="product-block grid"]')
            //.first()
            //.eq(3)
            .contains('Ariel Roll Sleeve Sweatshirt')
            .click()

    });

    it('Deve adicionar o produto ao carrinho', () => {

        var quantidade = 4

        cy.get('[class="product-block grid"]')
            .contains('Abominable Hoodie').click()
        cy.get('.button-variable-item-M').click()
        cy.get('.button-variable-item-Green').click()
        cy.get('.input-text').clear().type(quantidade)
        cy.get('.single_add_to_cart_button').click()

        cy.get('.dropdown-toggle > .mini-cart-items').should('contain', quantidade)
        cy.get('.woocommerce-message').should('contain', quantidade + ' × “Abominable Hoodie” foram adicionados no seu carrinho.')


    });

    it('Deve adicionar produtos ao carrinho - Usando Comando customizados', () => {
        cy.addProdutos('Abominable Hoodie', 'M', 'Blue', 2)
    });

    
    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        cy.addProdutos('Ariel Roll Sleeve Sweatshirt', 'XS', 'Red', 5)
        // 3. Navegar até o carrinho
        cy.get('.woocommerce-message > .button').click(); // Abre o carrinho

        // 4. Verificar se o produto foi adicionado ao carrinho
        cy.get('.product-name > a').should('contain', 'Ariel Roll Sleeve Sweatshirt');
        
        // 5. Prosseguir para o checkout
        cy.get('.checkout-button').click(); // Botão para ir para o checkout

        // 6. Preencher informações de checkout
        cy.get('.showlogin').click();
        cy.get('#username').type('aluno_ebac@teste.com');
        cy.get('#password').type('teste@teste.com');
        cy.get('.woocommerce-button').click();
        

        // Selecionar o método de pagamento
        cy.get('#payment_method_bacs').check(); // Seleciona pagamento por transferência bancária
        cy.get('#terms').check();
        
        // 7. Finalizar o pedido
        cy.get('#place_order').click(); // Botão para finalizar a compra

        // 8. Validar a compra
       
       //cy.get('.page-title').should('contain', 'PEDIDO RECEBIDO'); // Verifica se a confirmação do pedido está visível
       cy.get('.woocommerce-notice').should('contain', 'Seu pedido foi recebido.');
       cy.get('.woocommerce-order-details__title').should('contain', 'Detalhes do pedido');
});

});