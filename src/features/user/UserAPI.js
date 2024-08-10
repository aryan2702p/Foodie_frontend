export function fetchLoggedInUserOrders(userId) {
    return new Promise(async (resolve) =>{
      const response = await fetch('https://foodiebackend-production.up.railway.app/orders/user/'+userId) 
      const data = await response.json()
      resolve({data})
    }
    );
  }

  export function fetchLoggedInUser(userId) {
    return new Promise(async (resolve) =>{
      const response = await fetch('https://foodiebackend-production.up.railway.app/users/'+userId) 
      const data = await response.json()
      resolve({data})
    }
    );
  }

  export function fetchAllUsers() {
    return new Promise(async (resolve) =>{
      const response = await fetch('https://foodiebackend-production.up.railway.app/users/') 
      const data = await response.json();
      const totalUsers = await response.headers.get('X-Total-Count');
      resolve({ data: { users: data, totalUsers: +totalUsers } });
    }
    );
  }
  
  
  export function updateUser(update) {
    return new Promise(async (resolve) => {
      const response = await fetch('https://foodiebackend-production.up.railway.app/users/'+update.id, {
        method: 'PATCH',
        body: JSON.stringify(update),
        headers: { 'content-type': 'application/json' },
      });
      const data = await response.json();
    
      resolve({ data });
    });
  }

  