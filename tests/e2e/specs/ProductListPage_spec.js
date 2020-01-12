import { parseNumber, truncateTextWithEllipses } from '../../../src/utilities/helperFunctions';
import {
  FAKE_WAIT_TIME_MS,
  PRODUCTS_PER_PAGE,
  PAGE_COUNT,
  PRODUCT_TITLE_DROPDOWN_MAX_LENGTH,
} from '../../../src/utilities/constants';

describe('Product Page test', () => {
  beforeEach(() => {
    cy.server();
    // Route the API request to a stubbed response.
    // cy.route({
    //   // method: 'GET',
    //   // url: // Some url to make requests to,
    //   response: mockedProducts,
    // });
    cy.visit('/');
    cy.wait(FAKE_WAIT_TIME_MS);
  });

  it('Visits the main page app url', () => {
    cy.visit('/');
  });

  it('Add a product to cart', () => {
    let productPrice;
    let currentPrice;
    let newPrice;
    let currentCartQty;
    let newCartQty;
    // Product could be between 0 and 5 => eq(Math.round(Math.random() * 5)) (PRODUCTS_PER_PAGE = 6)
    const selectedItemIndex = Math.round(Math.random() * (PRODUCTS_PER_PAGE - 1));

    cy.get('div.header-cart__count').within(() => {
      cy.get('.cart__item-counter').then(($cartItemCounter) => {
        currentCartQty = parseNumber($cartItemCounter.text());
        cy.get('div.header-cart__price').then(($totalPriceDiv) => {
          currentPrice = parseNumber($totalPriceDiv.get(0).innerText);
        });
      });
    });

    cy.get('li.product-list__item').eq(selectedItemIndex).within(() => {
      cy.get('.product__price--discounted').then(($productPrice) => {
        productPrice = parseNumber($productPrice.text());
        cy.get('button').eq(1).should('not.have.class', 'button--in-cart');
        cy.get('button').eq(1).click().should('have.class', 'button--in-cart')
          .and('contain', 'In Cart');
      });
    });
    cy.get('div.header-cart__count').within(() => {
      cy.get('.cart__item-counter').then(($cartItemCounter) => {
        newCartQty = parseNumber($cartItemCounter.text());
        expect(newCartQty).to.equal(currentCartQty + 1);
      });
    });
    cy.get('div.header-cart__price').then(($totalPriceDiv) => {
      newPrice = parseNumber($totalPriceDiv.get(0).innerText);
      expect(newPrice).to.equal(currentPrice + productPrice);
    });
  });

  it('Add a product to wishlist', () => {
    let currentWishlistQty;
    let newWishlistQty;
    const selectedItemIndex = Math.round(Math.random() * (PRODUCTS_PER_PAGE - 1));

    cy.get('div.header-cart__wishlist-count').within(() => {
      cy.get('.wishlist__item-counter').then(($cartItemCounter) => {
        currentWishlistQty = parseNumber($cartItemCounter.text());
      });
    });

    // Product could be between 0 and 5 => eq(Math.round(Math.random() * 5)) (PRODUCTS_PER_PAGE = 6)
    cy.get('li.product-list__item').eq(selectedItemIndex).within(() => {
      cy.get('.product__price--discounted').then(() => {
        cy.get('button').eq(0).should('not.have.class', 'button--in-wishlist');
        cy.get('button').eq(0).click().should('have.class', 'button--in-wishlist');
      });
    });
    cy.get('div.header-cart__wishlist-count').within(() => {
      cy.get('.wishlist__item-counter').then(($cartItemCounter) => {
        newWishlistQty = parseNumber($cartItemCounter.text());
        expect(newWishlistQty).to.equal(currentWishlistQty + 1);
      });
    });
  });

  it('Visit next page', () => {
    let currentPageNumber;
    let newPageNumber;
    cy.get('li.pagination-custom__description--current').within(($currentPageItem) => {
      currentPageNumber = parseNumber($currentPageItem.text());
    });
    cy.get('div[id="nextPageIcon"]').click();
    cy.get('div.spinner-base').then($spinner => expect($spinner).not.to.be.null);
    cy.wait(FAKE_WAIT_TIME_MS);
    cy.get('div.spinner-base').should('not.exist');
    cy.get('li.pagination-custom__description--current').within(($currentPageItem) => {
      newPageNumber = parseNumber($currentPageItem.text());
      expect(newPageNumber).to.equal(currentPageNumber + 1);
    });
    cy.get('li.product-list__item').should('have.length', PRODUCTS_PER_PAGE);
  });

  it('Visit specific page', () => {
    let currentPageNumber;
    let newPageNumber;
    let randomNextPageIndex;
    const possiblePageNumbers = [];
    cy.get('li.pagination-custom__description--current').within(($currentPageItem) => {
      currentPageNumber = parseNumber($currentPageItem.text());
    });

    cy.get('li.pagination-custom__description > span').each(($paginationItem) => {
      const pageNumber = $paginationItem.text();
      if (pageNumber.includes('...')) {
        possiblePageNumbers.push(-1);
      } else {
        possiblePageNumbers.push(parseNumber(pageNumber));
      }
    }).then(() => {
      expect(possiblePageNumbers[0]).to.equal(1);
      expect(possiblePageNumbers).to.includes(-1);
      expect(possiblePageNumbers[possiblePageNumbers.length - 1]).to.equal(PAGE_COUNT);
      do {
        randomNextPageIndex = Math.floor(Math.random() * (possiblePageNumbers.length - 1));
      } while (possiblePageNumbers[randomNextPageIndex] === currentPageNumber || possiblePageNumbers[randomNextPageIndex] === -1); // If it's -1 -> it's '...'

      cy.get('li.pagination-custom__description').eq(randomNextPageIndex).click();
      cy.get('div.spinner-base').then($spinner => expect($spinner).not.to.be.null);
      cy.wait(FAKE_WAIT_TIME_MS);
      cy.get('div.spinner-base').should('not.exist');

      cy.get('li.pagination-custom__description--current').within(($currentPageItem) => {
        newPageNumber = parseNumber($currentPageItem.text());
        expect(newPageNumber).to.equal(possiblePageNumbers[randomNextPageIndex]);
      });
      cy.get('li.product-list__item').should('have.length', PRODUCTS_PER_PAGE);
    });
  });

  it('Add & remove product from cart dropdown', () => {
    let productTitle;
    let originalPrice;
    let newPrice;
    let originalCartQty;
    let newCartQty;
    const selectedItemIndex = Math.round(Math.random() * (PRODUCTS_PER_PAGE - 1));

    cy.get('li.product-list__item').eq(selectedItemIndex).within(() => {
      cy.get('div.product__details').within(() => {
        cy.get('h1.product__title').then(($productTitle) => {
          productTitle = $productTitle.text().replace('...', '');
        });
      });
      cy.get('button').eq(1).should('not.have.class', 'button--in-cart')
        .and('contain', 'Add to Cart');
    });

    cy.get('#cart-icon').then(() => {
      cy.get('div.dropdown-container').then($dropdown => expect($dropdown).to.have.css('display', 'none')).then(() => {
        cy.get('.cart__item-counter').then(($cartItemCounter) => {
          originalCartQty = parseNumber($cartItemCounter.text());
          cy.get('div.header-cart__price').then(($totalPriceDiv) => {
            originalPrice = parseNumber($totalPriceDiv.get(0).innerText);
          });
        });
      });
    });

    cy.get('li.product-list__item').eq(selectedItemIndex).within(() => {
      cy.get('div.product__details').within(() => {
        cy.get('h1.product__title').then(($productTitle) => {
          productTitle = $productTitle.text().replace('...', '');
        });
      });
      cy.get('button').eq(1).click().should('have.class', 'button--in-cart')
        .and('contain', 'In Cart');
    });

    cy.get('#cart-icon').click().then(() => {
      cy.get('div.dropdown-container').then($dropdown => expect($dropdown).to.not.have.css('display', 'none'));
    });

    cy.get('ul.shopping-cart-items').within(() => {
      cy.get('li').filter(`:contains("${truncateTextWithEllipses(productTitle, PRODUCT_TITLE_DROPDOWN_MAX_LENGTH).replace('...', '')}")`).within(($product) => {
        cy.log($product);
        cy.get('svg.deleteItem').click();
      });
    });

    cy.get('li.product-list__item').eq(selectedItemIndex).within(() => {
      cy.get('button').eq(1).should('not.have.class', 'button--in-cart')
        .and('contain', 'Add to Cart');
    });

    cy.get('#cart-icon').click().then(() => {
      cy.get('div.dropdown-container').then($dropdown => expect($dropdown).to.not.have.css('display', 'none'));
      cy.get('ul.shopping-cart-items').within(($ul) => {
        if ($ul.has('li').length > 0) {
          // In case there are other elements previously added
          cy.get('li').filter(`:contains("${truncateTextWithEllipses(productTitle, PRODUCT_TITLE_DROPDOWN_MAX_LENGTH).replace('...', '')}")`)
            .should('have.length', 0);
        } else {
          cy.get('div span').should(($textSpan) => {
            expect($textSpan.text()).to.includes('You haven\'t added items to your cart yet.');
          });
        }
      });
    });

    cy.get('div.header-cart__count').within(() => {
      cy.get('.cart__item-counter').then(($cartItemCounter) => {
        newCartQty = parseNumber($cartItemCounter.text());
        expect(newCartQty).to.equal(originalCartQty);
      });
    });
    cy.get('div.header-cart__price').then(($totalPriceDiv) => {
      newPrice = parseNumber($totalPriceDiv.get(0).innerText);
      expect(newPrice).to.equal(originalPrice);
    });
  });
});
