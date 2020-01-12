# Vue Buy - Simple E-commerce app

This is simple e-commerce app, developed with Vue
<br/>

### The simple e-commerce application has:
- “Add/Remove to Bag” and “Add/Remove to Wishlist” actions (on client side only)
- Each page shows a list of 6 products, and has a pagination component to navigate between pages (configurable)
- The cart in the header updates with the new quantities and the new total price
- A cart dropdown shows products currently added to the bag, with the possibility of removing them

### What has been used?:
- vue-cli has been used for starting project
- Mocked data (first obtained from [random-product-api](https://github.com/rodrigoabb/random-products-api)) and mocked request calls are used for showing purposes, but easily changeable to real api calls (which will be done in future release)
- Code has been written thinking on modularity, reusability and performance, as requested. Also it's well documented
- Build and other task instructions are provided at the end of this README.md.
- No external resource has been linked from appication.

### Result
All of this, hard work and the always-present help from dev community, I was able to build a simple e-commerce application with the following technologies and features:
- Vue JS application with Vuex
- Responsive design
- Great User Experience
- Performant code and reusable components
- Code well documented with JSDoc
- Unit testing (Jest) and E2E testing (Cypress)
- Use of CSS preprocessors
- Use of ESLint tool
- Added personal touches
- Followed good practices

------------

## Commands & Tasks
These are the npm commands and tasks for each process:

### Project setup
```
npm install
```

### Compiles and hot-reloads for Development
```
npm run serve
```

### Compiles and minifies for Production
```
npm run build
```
Production build is generated on /dist folder

### Run your Unit Tests
```
npm run test:unit
```

### Run your End-to-End Tests
```
npm run test:e2e
```

### Generate Documentation
```
npm run docs
```
Documentation is generated on /docs folder
