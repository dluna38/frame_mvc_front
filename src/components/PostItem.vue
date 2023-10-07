<template>
  <div class="card">
    <div class="card-header">
      <div class="row">
        <div class="col-10">
          <h5>{{ categoria }}</h5>
        </div>
        <div class="col-1" v-if="isLogIn">
          <button @click="$emit('editar-item')" class="btn btn-primary"><i class="bi bi-pencil-square"></i></button>
        </div>
        <div class="col-1" v-if="isLogIn">
          <button @click="$emit('borrar-item')" class="btn btn-danger"><i class="bi bi-trash"></i></button>
        </div>
      </div>
    </div>
    <div class="card-body">
      <h5 class="card-title">{{ titulo }}</h5>
      <p class="card-text">{{ cuerpo }}</p>
      <div class="row align-items-end">
        <div class="col-3">
          <a href="#" class="btn btn-primary">Seguir leyendo</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {getIsLogIn} from "@/components/axiosRequest";

defineProps(['titulo','categoria','cuerpo','id'])

const isLogIn = ref(false);
onMounted(()=>{
  if(getIsLogIn()){
    isLogIn.value=true;
  }
})
</script>