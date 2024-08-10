export function createUser(userData) {
    return new Promise(async (resolve) => {
      const response = await fetch('https://foodiebackend-production.up.railway.app/auth/signup', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: { 'content-type': 'application/json' },
      });
      const data = await response.json();
     
      resolve({ data });
    });
  }
  export function signOut(userId) {
    return new Promise(async (resolve) => {
      resolve({ data: 'success' });
    });
  }
  export function checkUser(loginInfo) {
    return new Promise(async (resolve, reject) => {
      try {
        console.log('request sent',loginInfo)
        const response = await fetch('https://foodiebackend-production.up.railway.app/auth/login', {
          method: 'POST',
          body: JSON.stringify(loginInfo),
          headers: { 'content-type': 'application/json' },
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          resolve({ data });
        } else {
          console.log('err')

          const error = await response.json();
          reject(error);
        }
      } catch (error) {
        console.log('request sent')
        reject( error );
      }
    });
    
  }