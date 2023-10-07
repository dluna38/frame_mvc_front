<template>
  <button class="btn btn-info" v-if="!isLogIn" data-bs-toggle="modal" data-bs-target="#modalLogIn">Iniciar sesión <i class="bi bi-box-arrow-in-right"></i></button>
  <button class="btn btn-danger" v-if="isLogIn" @click="cerraSesion">Cerrar sesión <i class="bi bi-box-arrow-in-left"></i></button>

  <div class="modal fade" id="modalLogIn" tabindex="-1" aria-labelledby="modal-post" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="modal-post">Iniciar sesión</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <form id="formLogIn" @submit.prevent="submitPost">
              <div class="row">
                <div class="col">
                  <label for="inputEmail" class="form-label">Correo</label>
                  <input type="text" name="email" class="form-control" id="inputEmail">
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <label for="inputPassword" class="form-label">Contraseña</label>
                  <input type="password" name="password" class="form-control" id="inputPassword">
                </div>
              </div>
            </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
          <button type="submit" form="formLogIn" class="btn btn-success">Iniciar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import {crearPost, getIsLogIn, logInUser, logoutUser} from "@/components/axiosRequest";
import router from "@/router";
import {computed, onMounted, ref} from "vue";

const isLogIn = ref(false);
async function submitPost(event) {
  let form = event.target
  let objMedia = Object.fromEntries(new FormData(form).entries());
  console.log(objMedia);
  let result = await logInUser(objMedia);
  if(result){
    router.go(0);
    return;
  }
  alert("ERROR");
}

async function cerraSesion() {
  await logoutUser();
  router.go(0);
}
onMounted(() =>{
  if(getIsLogIn()){
    isLogIn.value=true;
  }
})
</script>