// eslint-disable-next-line
function addNew(element) {
  document.getElementById('add-product-section').style.display = 'flex';
  document.getElementById('product-list-section').style.display = 'none';
  document.getElementById('search-product-section').style.display = 'none';
  document.querySelectorAll('.menu-item').forEach((n) => { n.style.color = 'black'; });
  element.style.color = '#5c7c99';
}

// eslint-disable-next-line
function list(element) {
  document.getElementById('product-list-section').style.display = 'flex';
  document.getElementById('add-product-section').style.display = 'none';
  document.getElementById('search-product-section').style.display = 'none';
  document.querySelectorAll('.menu-item').forEach((n) => { n.style.color = 'black'; });
  element.style.color = '#5c7c99';
}

// eslint-disable-next-line
function contact(element) {
  document.getElementById('search-product-section').style.display = 'flex';
  document.getElementById('product-list-section').style.display = 'none';
  document.getElementById('add-product-section').style.display = 'none';
  document.querySelectorAll('.menu-item').forEach((n) => { n.style.color = 'black'; });
  element.style.color = '#5c7c99';
}
