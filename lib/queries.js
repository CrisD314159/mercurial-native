
import * as Secure from 'expo-secure-store'
export async function getUserInfo(token) {
  try {
    const response = await fetch('https://brainy-sena-mercurial-app-169ad86c.koyeb.app/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    if(response.status === 401){
      return false
    }else{
      return true
    }
    
  } catch (error) {
    throw new Error('Invalid token')
  }
  
}

export async function getImage() {
  try {
    const image = await Secure.getItemAsync('image')
    if(!image) return 'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png'
    return image
    
  } catch (error) {
    throw new Error('There was a error with the API')
    
  }
  
}

export async function login({email, password}) {
  try {
    const response = await fetch('https://brainy-sena-mercurial-app-169ad86c.koyeb.app/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password }),
    });
    const data = await response.json();
    if(data.success){
      await Secure.setItemAsync('token', data.token)
      await Secure.setItemAsync('image', data.data.userImage)
      return data

    }else{
      return data
    }
  } catch (error) {
    throw new Error('Invalid credentials ')
    
  }
}

export function getImageFromLocalStorage() {
  if (localStorage.getItem('userImage')) {
    return localStorage.getItem('userImage')
  }
  return ''
}


export async function getTasks(){
  const token = await Secure.getItemAsync('token');

  try {
    const response = await fetch('https://brainy-sena-mercurial-app-169ad86c.koyeb.app/tasks/user/active', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      
    })
    if(response.status === 401){
       // La api devuleve 401 si no hay un usuario logueado, por lo tanto
      // Nosotros mandamos un error a la mutacion para que se comporte de una manera si es un error 401
      throw new Error('Unauthorized')
    }

    return await response.json()
  } catch (error) {
    throw new Error('There was a error with the API')
  }

}
export async function getDoneTasks(){
  const token = await Secure.getItemAsync('token');
  if(!token) throw new Error('Unauthorized')

  try {
    const response = await fetch('https://brainy-sena-mercurial-app-169ad86c.koyeb.app/tasks/done/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
     
    })
    
    if(response.status === 401){
       // La api devuleve 401 si no hay un usuario logueado, por lo tanto
      // Nosotros mandamos un error a la mutacion para que se comporte de una manera si es un error 401
      throw new Error('Unauthorized')
    }
    return response.json()
  } catch (error) {
    throw new Error('There was a error with the API')
  }

}

export async function getSubjects() {
  const token = await Secure.getItemAsync('token');
  if(!token) throw new Error('Unauthorized')

  try {
    const response = await fetch('https://brainy-sena-mercurial-app-169ad86c.koyeb.app/subjects/user/active', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    
    if(response.status === 401){
       // La api devuleve 401 si no hay un usuario logueado, por lo tanto
      // Nosotros mandamos un error a la mutacion para que se comporte de una manera si es un error 401
      throw new Error('Unauthorized')
    }
    return await response.json()
  } catch (error) {
    throw new Error('There was a error with the API')
  }

}

export async function getTopics() {
  const token = await Secure.getItemAsync('token');
  if(!token) throw new Error('Unauthorized')
  try {
    const response = await fetch('https://brainy-sena-mercurial-app-169ad86c.koyeb.app/topics/user/active', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    if(response.status === 401){
       // La api devuleve 401 si no hay un usuario logueado, por lo tanto
      // Nosotros mandamos un error a la mutacion para que se comporte de una manera si es un error 401
      throw new Error('Unauthorized')
    }
    return await response.json()
  } catch (error) {
    throw new Error('There was a error with the API')
  }

}


export async function logout(){
  try {
    await Secure.deleteItemAsync('token')
    await Secure.deleteItemAsync('image')
    return true
    
  } catch (error) {
    throw new Error('There was a error with the API')
    
  }
  

}


export async function createTask({tittle, description, subjectId, topicId}){
  const token = await Secure.getItemAsync('token');
  if(!token) throw new Error('Unauthorized')
  try {
    const response = await fetch('https://brainy-sena-mercurial-app-169ad86c.koyeb.app/tasks',{
      method:'POST',
      headers:{
        'content-type':'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({tittle, description, subjectId, topicId}),

    })
    if(response.status === 401){ 
      // La api devuleve 401 si no hay un usuario logueado, por lo tanto
      // Nosotros mandamos un error a la mutacion para que se comporte de una manera si es un error 401
      throw new Error('Unauthorized')
    }
    return await response.json()
    
  } catch (error) {
    throw new Error('There was a error with the API')
    
  }
}

export async function deleteTask(taskId) {
  const token = await Secure.getItemAsync('token');
  if(!token) throw new Error('Unauthorized')
  try {
    const response = await fetch(`https://brainy-sena-mercurial-app-169ad86c.koyeb.app/tasks/${taskId}`,{
      method:'DELETE',
      headers:{
        'Authorization': `Bearer ${token}`
      }
    })
    if(response.status === 401){
       // La api devuleve 401 si no hay un usuario logueado, por lo tanto
      // Nosotros mandamos un error a la mutacion para que se comporte de una manera si es un error 401
      throw new Error('Unauthorized')
    }
    return await response.json()
    
  } catch (error) {
    console.log(error);
    throw new Error('There was a error with the API')
    
  }
}

export async function markAsDoneTask({taskId}){
  const token = await Secure.getItemAsync('token');
  if(!token) throw new Error('Unauthorized')
  try {
    const response = await fetch(`https://brainy-sena-mercurial-app-169ad86c.koyeb.app/tasks/mark/done/${taskId}`,{
      method:'PUT',
      headers:{
        'Authorization': `Bearer ${token}`
      }
    })
    if(response.status === 401){
       // La api devuleve 401 si no hay un usuario logueado, por lo tanto
      // Nosotros mandamos un error a la mutacion para que se comporte de una manera si es un error 401
      throw new Error('Unauthorized')
    }

    return await response.json()
    
  } catch (error) {
    throw new Error('There was a error with the API')
    
  }
  
}

export async function createSubject({name, color}) {
  const token = await Secure.getItemAsync('token');
  if(!token) throw new Error('Unauthorized')
  try {
    const response = await fetch('https://brainy-sena-mercurial-app-169ad86c.koyeb.app/subjects',{
      method:'POST',
      headers:{
        'content-type':'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({name, color}),

    })
    if(response.status === 401){
       // La api devuleve 401 si no hay un usuario logueado, por lo tanto
      // Nosotros mandamos un error a la mutacion para que se comporte de una manera si es un error 401
      throw new Error('Unauthorized')
    }
    return await response.json()
    
  } catch (error) {
    throw new Error('There was a error with the API')
    
  }
  
}

export async function createTopic({tittle, color}) {
  const token = await Secure.getItemAsync('token');
  if(!token) throw new Error('Unauthorized')
try{
  const response = await fetch('https://brainy-sena-mercurial-app-169ad86c.koyeb.app/topics',{
    method:'POST',
    headers:{
      'content-type':'application/json',
        'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({tittle, color}),

  })
  if(response.status === 401){
    throw new Error('Unauthorized')
  }
  return await response.json()
} catch (error) {
  throw new Error('There was a error with the API')
  } 
}

export async function markAsRollBackTask({taskId}){
  const token = await Secure.getItemAsync('token');
  if(!token) throw new Error('Unauthorized')
  try {
    const response = await fetch(`https://brainy-sena-mercurial-app-169ad86c.koyeb.app/tasks/roll/back/${taskId}`,{
      method:'PUT',
      headers:{
        'Authorization': `Bearer ${token}`
      }
   
    })
    if(response.status === 401){
      throw new Error('Unauthorized')
    }
    return await response.json()
  } catch (error) {
    throw new Error('There was a error with the API')
  }
}

export async function deleteSubject(subjectId) {
  const token = await Secure.getItemAsync('token');
  if(!token) throw new Error('Unauthorized')
  try {
    const response = await fetch(`https://brainy-sena-mercurial-app-169ad86c.koyeb.app/subjects/${subjectId}`,{
      method:'DELETE',
      headers:{
        'Authorization': `Bearer ${token}`
      }
    })
    if(response.status === 401){
      throw new Error('Unauthorized')
    }
    return await response.json()
  } catch (error) {
    console.log(error);
    throw new Error('There was a error with the API')
  }
  
}
export async function deleteTopic(topicId){
  const token = await Secure.getItemAsync('token');
  if(!token) throw new Error('Unauthorized')
  try {
    const response = await fetch(`https://brainy-sena-mercurial-app-169ad86c.koyeb.app/topics/${topicId}`,{
      method:'DELETE',
      headers:{
        'Authorization': `Bearer ${token}`
      }
    })
    if(response.status === 401){
      throw new Error('Unauthorized')
    }
    return await response.json()
  } catch (error) {
    throw new Error('There was a error with the API')
  }
  
}

export async function updateSubject({id, name, color}) {
  const token = await Secure.getItemAsync('token');
  if(!token) throw new Error('Unauthorized')
  try {
    const response = await fetch(`https://brainy-sena-mercurial-app-169ad86c.koyeb.app/subjects/${id}`, {
      method:'PUT',
      headers:{
        'content-type':'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({id, name, color})
    })

    if(response.status === 401){
      throw new Error('Unauthorized')
    }
    return await response.json()
  } catch (error) {
    throw new Error('There was a error with the API')
    
  }
}

export async function updateTopic({id, tittle, color}){
  const token = await Secure.getItemAsync('token');
  if(!token) throw new Error('Unauthorized')
  try {
    const response = await fetch(`https://brainy-sena-mercurial-app-169ad86c.koyeb.app/topics/${id}`, {
      method:'PUT',
      headers:{
        'content-type':'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({id, tittle, color})
    })

    if(response.status === 401){
      throw new Error('Unauthorized')
    }
    return await response.json()
  } catch (error) {
    throw new Error('There was a error with the API')
    
  }
}
export async function updateTask({id, tittle, description}){
  const token = await Secure.getItemAsync('token');
  if(!token) throw new Error('Unauthorized')
  try {
    const response = await fetch(`https://brainy-sena-mercurial-app-169ad86c.koyeb.app/tasks/${id}`, {
      method:'PUT',
      headers:{
        'content-type':'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({id, tittle, description})
    })

    if(response.status === 401){
      throw new Error('Unauthorized')
    }
    return await response.json()
  } catch (error) {
    throw new Error('There was a error with the API')
    
  }
}

export async function getUser(){
  const token = await Secure.getItemAsync('token');
  if(!token) throw new Error('Unauthorized')
  try {
    const response = await fetch('https://brainy-sena-mercurial-app-169ad86c.koyeb.app/users',{
      method:'GET',
      headers:{
        'Authorization': `Bearer ${token}`
      }
    })
    if(response.status === 401){
      throw new Error('Unauthorized')
    }
    return await response.json()
    
  } catch (error) {
    throw new Error('There was a error with the API')
    
  }
}
