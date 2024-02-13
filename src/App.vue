<template>
    <div>
      <select v-model="selectedEntity">
        <option value="none">Не выбрано</option>
        <option value="leads">Сделка</option>
        <option value="contacts">Контакт</option>
        <option value="companies">Компания</option>
      </select>
      <button :class="{ active: selectedEntity !== 'none' }" @click="createEntity"
              :disabled="selectedEntity === 'none' || creatingEntity">
        {{ creatingEntity ? 'Сохранение...' : 'Создать' }}
      </button>
      <div v-if="createdEntities">
        <h3>Созданные сущности:</h3>
        <ul>
          <li v-for="entity in createdEntities" :key="entity.entity_id">{{ entity.entity_id }} - {{ entity.entity_type }}</li>
        </ul>
      </div>
    </div>
</template>

<script>
import {onMounted, ref} from 'vue';

import {useApi, getData, getToken} from "./rest/api.js";

export default {
  name: 'App',
  setup() {
    const selectedEntity = ref('none');
    const creatingEntity = ref(false);
    const createdEntities = ref([]);

    onMounted(async () => {
      await getToken()
      createdEntities.value = await getData()
    })

    async function createEntity() {
      creatingEntity.value = true;
      try {
         await useApi(selectedEntity.value)
         createdEntities.value = await getData()

      } catch (e) {
        console.error('Ошибка при создании сущности', e);
      } finally {
        creatingEntity.value = false;
      }
    }

    return {
      selectedEntity,
      creatingEntity,
      createdEntities,
      createEntity
    };
  }
};
</script>

<style>
button {
  background-color: #ffffff;
  color: #000000;
}

button.active {
  background-color: #007bff;
  color: #ffffff;
}
</style>
