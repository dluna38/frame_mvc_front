<template>
<!--  <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalPost">Crear post <i class="bi bi-patch-plus"></i></button>-->

  <div class="modal fade" id="modalPost" tabindex="-1" aria-labelledby="modal-post" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="modal-post">{{ titleModal }}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form id="formPost" @submit.prevent="submitPost">
            <div class="row">
              <div class="col">
                <label for="inputTitulo" class="form-label">Titulo</label>
                <input type="text" name="name" :value="defTitulo" class="form-control" id="inputTitulo">
              </div>
            </div>
            <div class="row">
              <div class="col">
                <label for="inputCategoria" class="form-label">Categoria</label>
                <select name="category_id" id="inputCategoria" class="form-select" :value="defCategoria" >
                  <option  v-for="item in listCategorias" :value="item.id">{{item.name}}</option>
                </select>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <label for="inputContenido" class="form-label">Contenido</label>
                <textarea name="description"  style="height: 150px" class="form-control" :value="defContenido" id="inputContenido"></textarea>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
          <button type="submit" form="formPost" class="btn btn-primary">Enviar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import {onMounted, ref} from "vue";
import {actualizarPost, crearPost, getAllCategoria, getIsLogIn} from "@/components/axiosRequest";
import router from "@/router";

const props = defineProps(['defTitulo','defContenido','defCategoria','titleModal','isEditing','classBtn','txtBtn'])
const emits = defineEmits(['update:defCategoria','doneSubmit'])

const listCategorias = ref([])

async function submitPost(event) {
  let result=false;
  let form = event.target
  let objMedia = Object.fromEntries(new FormData(form).entries());
  console.log(objMedia);

  if(props.isEditing !== -1){
    console.log("editando " +props.isEditing)
    result = await actualizarPost(props.isEditing,objMedia);
  }else {
    result = await crearPost(objMedia)
  }

  emits('doneSubmit',result);
}

async function getAllCategorias(){
  listCategorias.value = await getAllCategoria();
}

onMounted(()=>{
  getAllCategorias();
})

</script>