export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch('https://foodiebackend-production.up.railway.app/cart/', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}

export function fetchItemsByUserId(userId) {
  return new Promise(async (resolve) =>{
    console.log('fetching items by id')
    //TODO: we will not hard-code server URL here
    const response = await fetch('https://foodiebackend-production.up.railway.app/cart/?user=' + userId) 
    const data = await response.json()
    resolve({data})
  }
  );
}

export function updateCart(update) {
  return new Promise(async (resolve) => {
    const response = await fetch('https://foodiebackend-production.up.railway.app/cart/'+update.id, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}
export function resetCart(userId) {
  // get all items of user's cart - and then delete each
  return new Promise(async (resolve) => {
    const response = await fetchItemsByUserId(userId);
    const items = response.data;
    for (let item of items) {
      await deleteItemFromCart(item.id);
    }
    resolve({status:'success'})
  });
}


export function deleteItemFromCart(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch('https://foodiebackend-production.up.railway.app/cart/'+itemId, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    
    resolve({ data:{id:itemId} });
  });
}