// ManagePage acts as a central hub for all page objects in the app.
// It uses lazy getters to create each page object only when needed.
// This saves resources in large test suites, as unused pages are not built.
// For small projects, you could create all page objects up front instead.

import { Page } from '@playwright/test';
import { HomePage } from './HomePage';
import { LoginPage } from './LoginPage';
import { ProductPage } from './ProductPage';
import { CartPage } from './CartPage';
import { SignupPage } from './SignupPage';


export default class ManagePage {
    constructor(private readonly page: Page) { }

    // private caches (undefined until first access)
    private _home?: HomePage;
    private _login?: LoginPage;
    private _product?: ProductPage;
    private _cart?: CartPage;
    private _signup?: SignupPage;
    // Lazy getter: creates the page object only on first use, then reuses it.

    get homePage(): HomePage {
        if (!this._home) {
            this._home = new HomePage(this.page);
        }
        return this._home;
    }

    get loginPage(): LoginPage {
        if (!this._login) {
            this._login = new LoginPage(this.page);
        }
        return this._login;
    }

    get productPage(): ProductPage {
        if (!this._product) {
            this._product = new ProductPage(this.page);
        }
        return this._product;
    }

    get cartPage(): CartPage {
        if (!this._cart) {
            this._cart = new CartPage(this.page);
        }
        return this._cart;
    }

    get signupPage(): SignupPage {
        if (!this._signup) {
            this._signup = new SignupPage(this.page);
        }
        return this._signup;
    }
}
