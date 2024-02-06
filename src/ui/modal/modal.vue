<template>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
        v-show="isModal" style="min-width: 50vw !important;">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">{{ modalTitle }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <slot></slot>
                </div>
                <div class="modal-footer">
                    <buttonComponent @click="saveCurrentInformation()">Сохранить</buttonComponent>
                    <!-- <button type="button" class="btn btn-primary">Сохранить</button> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import buttonComponent from '../button/buttonComponent.vue';
import { watch } from 'vue';
export default {
    name: 'modal_component',
    components: { buttonComponent },
    props: {
        isModal: {
            type: Boolean,
            default: false
        },
        modalTitle: {
            type: String,
            default: "Модалльное окно"
        }
    },
    setup(props, context) {
      watch(() => props.isModal, (newVal) => {
        
        if(!newVal){
            document.body.classList.remove('modal-open');
            const backdrop = document.querySelector('.modal-backdrop')
            if(backdrop){
                backdrop.remove()
            }
        }
      })
        const saveCurrentInformation = () => {
            context.emit('saveData', "true")
        }

        return {
            saveCurrentInformation
        }
    },
}
</script>