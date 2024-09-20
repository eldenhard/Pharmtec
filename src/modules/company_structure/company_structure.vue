<template>
    <div class="company_structure">
        <h4>Структура компании</h4>
        <div class="company_structure_content">
            <div 
                class="list_item" 
                v-for="(item, index) in items" 
                :key="index"
                @mouseenter="setHover(index, true)" 
                @mouseleave="setHover(index, false)"
            >
                <p class="header">{{ item.header }}</p>
                <p class="description">{{ item.description }}</p>
                <link_element_ui class="test" :hovered="hoveredIndex === index" />
            </div>
        </div>
    </div>
</template>



<script setup>
import { ref } from 'vue';
import link_element_ui from '../../ui/link_element/link_element.vue';

// Массив с данными для каждой карточки
const items = ref([
  { header: 'ДЕПАРТАМЕНТ ФИНАНСОВ И УПРАВЛЕНИЯ ЗАПАСАМИ', description: 'Направления деятельности: финансы и бухгалтерский учет, обеспечение IT-инфраструктуры, закупки, логистика и склады' },
  { header: 'ДЕПАРТАМЕНТ СТРАТЕГИЧЕСКОГО ПЛАНИРОВАНИЯ И АНАЛИТИКИ', description: 'Направления деятельности: аналитика рынка, управление эффективностью, анализ результатов продаж и показателей эффективности' },
  { header: 'ДЕПАРТАМЕНТ РАЗРАБОТОК И МЕДИЦИНСКОЙ ПОДДЕРЖКИ', description: 'Направления деятельности: медицинская поддержка, разработка и исследования продуктов' },

  { header: 'КОММЕРЧЕСКИЙ ДЕПАРТАМЕНТ', description: 'Направления деятельности: дистрибуция и продажи продуктов' },
  { header: 'ПРОИЗВОДСТВО ИНТЕЛБИО', description: 'Направления деятельности: юридическая поддержка во всех направлениях' },
  { header: 'ПРАВОВАЯ ПОДДЕРЖКА', description: 'Направления деятельности: медицинская поддержка, разработка и исследования продуктов' },

  { header: 'ДЕПАРТАМЕНТ МАРКЕТИНГА', description: 'Направления деятельности: маркетинговая стратегия, управление продвижением продуктов' },
  { header: 'УПРАВЛЕНИЕ ПЕРСОНАЛОМ', description: 'Направления деятельности: кадровый документооборот, подбор, обучение, развитие персонала' },
]);

const hoveredIndex = ref(null);

const setHover = (index, value) => {
    hoveredIndex.value = value ? index : null;
};
</script>

<style scoped>
@import url('./style/style.scss');
</style>