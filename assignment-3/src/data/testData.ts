export const BASE_URL = 'https://shop.polymer-project.org';

export const CATEGORIES = {
  MENS_OUTERWEAR: { name: "Men's Outerwear", path: '/list/mens_outerwear' },
  LADIES_OUTERWEAR: { name: "Ladies Outerwear", path: '/list/ladies_outerwear' },
  MENS_TSHIRTS: { name: "Men's T-Shirts", path: '/list/mens_tshirts' },
  LADIES_TSHIRTS: { name: "Ladies T-Shirts", path: '/list/ladies_tshirts' },
};

export const PRODUCTS = {
  MENS_OUTERWEAR: {
    name: 'Summit Kit',
    size: 'M',
    quantity: 1,
  },
  LADIES_TSHIRTS: {
    name: 'Colorblock V',
    size: 'S',
    quantity: 2,
  },
};

export const CHECKOUT_DATA = {
  VALID: {
    firstName: 'Jane',
    lastName: 'Doe',
    address: '123 Main Street',
    city: 'Mountain View',
    state: 'CA',
    zip: '94043',
    country: 'US',
    phone: '6505550123',
    email: 'jane.doe@example.com',
    cardNumber: '4111111111111111',
    cardExpiry: '01/25',
    cardCVC: '123',
  },
  INVALID_CARD: {
    firstName: 'John',
    lastName: 'Smith',
    address: '456 Oak Avenue',
    city: 'San Francisco',
    state: 'CA',
    zip: '94102',
    country: 'US',
    phone: '4155550987',
    email: 'john.smith@example.com',
    cardNumber: '0000000000000000',
    cardExpiry: '13/99',
    cardCVC: 'abc',
  },
  EMPTY: {
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    phone: '',
    email: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
  },
};

export const PAGE_TITLES = {
  HOME: 'SHOP',
  CART: 'SHOP',
  CHECKOUT: 'SHOP',
};

export const TIMEOUTS = {
  SHORT: 5000,
  MEDIUM: 15000,
  LONG: 30000,
};
