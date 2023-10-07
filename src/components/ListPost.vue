<template>
  <div class="container">
    <button v-if="isLogIn" style="margin-bottom: 10px; margin-top: 10px" @click="startCrearPost" class="btn btn-success">Crear post <i class="bi bi-patch-plus"></i></button>

    <select class="form-select" style="margin-bottom: 10px" @change="onChangeCategoria">
      <option>TODAS</option>
      <option v-for="categoria in listaCategorias" :value="categoria.id">{{categoria.name}}</option>
    </select>
    <div v-for="item in listaPost">
      <PostItem style="margin-bottom: 10px"
                :categoria="item.category_name"
                :titulo="item.name"
                :cuerpo="item.description"
                :id="item.id"
                @editar-item="editarPost(item)"
                @borrar-item="deletePost(item)"/>
    </div>
    <div v-if="!listaPost.length">No se encontro resultados</div>
  </div>
  <ModalPost v-if="isLogIn" @done-submit="doneSubmit" :def-titulo="setTitulo" :def-contenido="setContenido" v-model:def-categoria="setCategoria" :is-editing="isEditPost" :title-modal="setTitleModal"/>

  <div v-if="isLogIn" class="toast-container position-fixed bottom-0 end-0 p-3">
    <div id="toastNoti" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-body">
        <h4>{{ txtToast }}</h4>
      </div>
    </div>
  </div>

</template>

<script setup>
import PostItem from "@/components/PostItem.vue";
import {onBeforeMount, onMounted, ref} from "vue";
import {borrarPost, getAllCategoria, getAllPost, getIsLogIn} from "@/components/axiosRequest";
import ModalPost from "@/components/ModalPost.vue";
import { Modal,Toast } from 'bootstrap'
import router from "@/router";

const listaPost = ref([])
const listaCategorias = ref([]);
const setTitulo =ref("")
const setContenido =ref("")
const setCategoria =ref("")
const setTitleModal =ref("Crear Post")
const isEditPost = ref(-1);
const txtCreado = "Post creado con éxito";
const txtEditado = "Post editado con éxito";
const txtBorrado = "Post borrado con éxito";
const txtFallo = "Ocurrió un error realizando la operación";
const txtToast=ref(txtCreado)

let toastBootstrap = null;

let modalInstance = null;

function showToast(mensaje){
  if(toastBootstrap === null) {
    toastBootstrap = new Toast(document.getElementById('toastNoti'), {autohide: true,delay:2000});
  }
  txtToast.value=mensaje;
  toastBootstrap.show();
}
function editarPost(item){
  console.log("click en editar"+item.id)
  setTitulo.value=item.name;
  setContenido.value=item.description;
  setCategoria.value=item.category_id;
  setTitleModal.value="Editar Post";
  isEditPost.value=item.id;

  getModalInstance().show();
}
function startCrearPost(){
  setTitulo.value="";
  setContenido.value="";
  setCategoria.value="";
  isEditPost.value=-1;
  setTitleModal.value="Crear Post"
  getModalInstance().show();
}
function doneSubmit(result){
  console.log("submit finalizado")
  if(result) {
    if(isEditPost.value === -1){
      showToast(txtCreado);
    }else{
      showToast(txtEditado);
    }
    getAllPosts(null);
    closeModal();
    return;
  }
  showToast(txtFallo);
}
function closeModal() {
  getModalInstance().hide();
}
async function deletePost(item) {
  console.log("click en borrar" + item.id)
  let result = await borrarPost(item.id);
  if(result){
    showToast(txtBorrado);
    await getAllPosts(null);
  }else {
    showToast(txtFallo);
  }
}

async function onChangeCategoria(event){
  console.log(event.target.value)
  if(event.target.value === "TODAS"){
    await getAllPosts(null);
    return;
  }
  await getAllPosts(event.target.value);
}

async function getAllPosts(categoria){
  listaPost.value = await getAllPost(categoria);
}

async function getAllCategorias(){
  listaCategorias.value = await getAllCategoria();
}

function getModalInstance(){
  if(modalInstance === null){
    modalInstance=new Modal(document.getElementById('modalPost'), {
      target: "#modalPost",
      backdrop: "static",
    });
    return modalInstance;
  }
  return modalInstance;
}

const isLogIn = ref(false);
onBeforeMount(() => {
  getAllPosts(null);
  getAllCategorias();
  if(getIsLogIn()){
    isLogIn.value=true;
  }
})


</script>