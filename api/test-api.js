const http = require('http');
const BASE = 'http://localhost:3001';

const tests = [
  { label: '1. GET /categories', url: '/categories' },
  { label: '2. GET /products (total)', url: '/products' },
  { label: '3. GET /products?categoryId=100 (Apple)', url: '/products?categoryId=100' },
  { label: '4. GET /products?categoryId=c200 (Samsung)', url: '/products?categoryId=c200' },
  { label: '5. GET /products?q=iphone (Recherche)', url: '/products?q=iphone' },
  { label: '6. GET /products?q=galaxy (Recherche)', url: '/products?q=galaxy' },
  { label: '7. GET /products?q=xperia (Recherche)', url: '/products?q=xperia' },
  { label: '8. GET /products?type=tablet', url: '/products?type=tablet' },
  { label: '9. GET /products?type=phone', url: '/products?type=phone' },
  { label: '10. GET /products?type=watch', url: '/products?type=watch' },
  { label: '11. GET /products?isTopSeller=true', url: '/products?isTopSeller=true' },
  { label: '12. GET /products?isNewProduct=true', url: '/products?isNewProduct=true' },
  { label: '13. GET /products?_page=1&_limit=12 (Pagination)', url: '/products?_page=1&_limit=12' },
  { label: '14. GET /products?_sort=price&_order=asc&_limit=3 (Tri)', url: '/products?_sort=price&_order=asc&_limit=3' },
  { label: '15. GET /products/1015 (Detail produit)', url: '/products/1015' },
  { label: '16. GET /products?categoryId=100&q=ipad (Combinaison)', url: '/products?categoryId=100&q=ipad' },
  { label: '17. GET /slides', url: '/slides' },
  { label: '18. GET /carts', url: '/carts' },
  { label: '19. GET /orders', url: '/orders' },
];

let done = 0;
const results = [];

tests.forEach((test, i) => {
  http.get(BASE + test.url, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      try {
        const json = JSON.parse(data);
        const count = Array.isArray(json) ? json.length : 1;
        const totalHeader = res.headers['x-total-count'] || '';
        let detail = count + ' items';
        if (totalHeader) detail += ' (X-Total-Count: ' + totalHeader + ')';
        if (count === 1 && !Array.isArray(json) && json.name) {
          detail = json.name + ' | categoryName: ' + json.categoryName;
        }
        results[i] = '  OK   | ' + test.label.padEnd(55) + ' => ' + detail;
      } catch(e) {
        results[i] = '  FAIL | ' + test.label.padEnd(55) + ' => Parse error';
      }
      done++;
      if (done === tests.length) printResults();
    });
  }).on('error', (e) => {
    results[i] = '  FAIL | ' + test.label.padEnd(55) + ' => ' + e.message;
    done++;
    if (done === tests.length) printResults();
  });
});

function printResults() {
  const ok = results.filter(r => r.includes('OK')).length;
  const fail = results.filter(r => r.includes('FAIL')).length;
  console.log('');
  console.log('='.repeat(80));
  console.log('  TESTS API - MyStore Mock Server (localhost:3001)');
  console.log('='.repeat(80));
  console.log('');
  results.forEach(r => console.log(r));
  console.log('');
  console.log('='.repeat(80));
  console.log('  Resultat: ' + ok + ' OK / ' + fail + ' FAIL sur ' + tests.length + ' tests');
  console.log('='.repeat(80));
  console.log('');
}
