<template>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" v-show="isModal" style="min-width: 50vw !important;">
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
                    <buttonComponent>Сохранить</buttonComponent>
                    <!-- <button type="button" class="btn btn-primary">Сохранить</button> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import buttonComponent from '../button/buttonComponent.vue';
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
    setup() {
        
    },
}
</script>