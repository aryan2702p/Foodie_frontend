export function createOrder(order) {
    return new Promise(async (resolve) => {
      const response = await fetch('https://foodiebackend-production.up.railway.app/orders', {
        method: 'POST',
        body: JSON.stringify(order),
        headers: { 'content-type': 'application/json' },
      });
      const data = await response.json();
      resolve({ data });
    });
  }

  export function updateOrder(order) {
    return new Promise(async (resolve) => {
      const response = await fetch('https://foodiebackend-production.up.railway.app/orders/'+order.id, {
        method: 'PATCH',
        body: JSON.stringify(order),
        headers: { 'content-type': 'application/json' },
      });
      const data = await response.json();
      resolve({ data });
    });
  }
  
  export function fetchAllOrders(sort, pagination) {
   let queryString = '';
  
   for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
    for (let key in pagination) {
      queryString += `${key}=${pagination[key]}&`;
    }
  
    return new Promise(async (resolve) => {
      const response = await fetch(
        'https://foodiebackend-production.up.railway.app/orders?' + queryString
      );
      const data = await response.json();
      const totalOrders = await response.headers.get('X-Total-Count');
      resolve({ data: { orders: data, totalOrders: +totalOrders } });
    });
  }

  export function fetchAdminOrders() {
    
    return new Promise(async (resolve) => {
      const response = await fetch('https://foodiebackend-production.up.railway.app/orders/admin');
      const data = await response.json();
      resolve({ data });
    });
   }