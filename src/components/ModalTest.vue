<template>

    <div class="modal-backdrop mard">
      <div class="cookie-banner">
        <div class="cookie-message">
          Ce site utilise des cookies pour améliorer votre expérience utilisateur.
        </div>
        <button class="cookie-button" id="acceptButton" @click="$emit('close')">Accepter</button>
        <button class="cookie-button decline"  @click="$emit('close')" id="declineButton">Refuser</button>
      </div>
    </div>
  </template>


<script setup lang="ts">
import { ref, defineEmits } from 'vue';

const emits = defineEmits(['close']);


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.modal-backdrop {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 30%; /* Réglez la hauteur souhaitée */
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: flex-end; /* Alignez le contenu en bas */
}

.modal {
  background: #FFFFFF;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  position: relative;
  border-bottom: 1px solid #eeeeee;
  color: #4AAE9B;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  flex-direction: column;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: #4AAE9B;
  background: transparent;
}

.btn-green {
  color: white;
  background: #4AAE9B;
  border: 1px solid #4AAE9B;
  border-radius: 2px;
}
.cookie-banner {
  height: 139px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #333;
  color: #fff;
  padding: 10px;
  text-align: center;
  font-family: Arial, sans-serif;
  z-index: 9999;
}

.cookie-message {
  display: inline-block;
  margin-right: 20px;
}

.cookie-button {
  background-color: #4CAF50;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}

.cookie-button.decline {
  background-color: #FF5722;
}
</style>
