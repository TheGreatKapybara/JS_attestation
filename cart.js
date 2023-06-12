const dropdown_cart = document.querySelector('.dropdown_cart')
if(JSON.parse(localStorage.getItem("array")).length !== 0) {
  document.querySelector('.no-items').classList.add('hide')
  console.log(123);
}
function addtocart(event) {
    const res = {
        'price': event.target.dataset.price,
        'name': event.target.dataset.name,
        'img': event.target.dataset.img,
        'count': 1,
        'id': event.target.dataset.id
    } 
    const cartStorage = localStorage.getItem("array") || "[]"
    const cart = JSON.parse(cartStorage)
    
    if (cart.filter(e => e.id === res.id).length > 0) {
      let index = cart.findIndex(p => p.id == res.id);
      cart[index].count = cart[index].count + 1
      localStorage.setItem("array", JSON.stringify(cart))
    } else {
      localStorage.setItem("array", JSON.stringify([...cart, res]))
    }
    location.reload();
}

function removefromcart(event) {
    const cartStorage = localStorage.getItem("array") || "[]"
    let cart = JSON.parse(cartStorage)
    cart = cart.filter( obj => obj.id !== event.target.dataset.id)
    localStorage.setItem("array", JSON.stringify(cart))
    location.reload();
  
}
const cartStorage = localStorage.getItem("array") || "[]"
const cart = JSON.parse(cartStorage)
document.querySelector('.cart_num').innerHTML = cart.length
cart.forEach(el => {
    const cart_product = document.createElement('div')
    cart_product.classList.add('cart_product')

    cart_product.innerHTML = `
    <div class="cart_product_close" onclick="removefromcart(event)" data-id="${el.id}" >x</div>
    <div class="cart_product_img">
      <img src="${el.img}">
    </div>
    <div class="cart_product_info">
      <div class="cart_product_name">
      ${el.name}
      </div>
      <div class="cart_product_art">
        <div class="cart_product_price">
          Price: <span>${el.price}</span>
        </div>
        <div class="cart_product_count">
          Quality: <span>${el.count}</span>
        </div>
      </div>
      
    </div>`
    dropdown_cart.appendChild(cart_product)
})