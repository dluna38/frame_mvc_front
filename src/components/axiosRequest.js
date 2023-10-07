import axios from "axios";


async function getAllPost(categoriaId){
    let result = [];
    await axios.get("post", {params:{categoria:categoriaId}}).then((res) =>{
        let dataResponse = res.data;
        result = dataResponse.data.data;
    }).catch((error)=>{
        console.log(error)
    });
    console.log(result)
    return result;
}

async function crearPost(post){
    let result = false;
    await axios.post("post",post).then((res) =>{
        let dataResponse = res.data;
        result = true;
    }).catch((error)=>{
        console.log(error)
    });
    console.log(result)
    return result;
}
async function actualizarPost(id,post){
    let result = false;
    await axios.put("post/"+id,post).then((res) =>{
        let dataResponse = res.data;
        result = true;
    }).catch((error)=>{
        console.log(error)
    });
    console.log(result)
    return result;
}
async function borrarPost(id){
    let result = false;
    await axios.delete("post/"+id).then((res) =>{
        let dataResponse = res.data;
        result = true;
    }).catch((error)=>{
        console.log(error)
    });
    console.log(result)
    return result;
}
async function logInUser(user){
    let result = false;
    await axios.post("auth/user/login",user).then((res) =>{
        let dataResponse = res.data;
        let token = dataResponse.data.token;
        localStorage.setItem("token",token);
        result = true;
    }).catch((error)=>{
        console.log(error)
    });
    console.log(result)
    return result;
}
async function logoutUser(){
    let result = false;
    let token = localStorage.getItem("token")
    if(token === undefined || token === null){
        return true;
    }
    await axios.get("auth/user/logout").then((res) =>{
        result = true;
    }).catch((error)=>{
        console.log(error)
    });
    localStorage.clear();
    console.log(result)
    return result;
}
async function getAllCategoria(){
    let result = [];
    await axios.get("category").then((res) =>{
        let dataResponse = res.data;
        result = dataResponse.data.data;
    }).catch((error)=>{
        console.log(error)
    });
    console.log(result)
    return result;
}

function getIsLogIn(){
    let token = localStorage.getItem("token");
    return (token !== null && token !== undefined)
}

export {getAllCategoria,getAllPost,crearPost,actualizarPost,borrarPost,logInUser,logoutUser,getIsLogIn}