<template>
    <div>
        <div v-for="i, index in amountNewRowFin" :key="index">

            <section class="enterdata mini_fin_report">
                <div class="input-box" style="margin-top: auto; margin-bottom: 1vh;">
                    <label></label>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" class="bi bi-plus-lg"
                        viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                    </svg>
                </div>
                <div class="input-box">
                    <label style="font-size: 13px;">Дата</label>
                    <input type="date" name="" id="">
                </div>
                <div class="input-box">
                     <label style="font-size: 13px;">Тип</label>
                    <select>
                        <option value="false">-</option>
                        <option value="true">+</option>
                    </select>
                </div>
                <div class="input-box">
                     <label style="font-size: 13px;">Сумма, ₽</label>
                    <input type="value">
                </div>
                <div class="input-box">
                     <label style="font-size: 13px;">Статья прихода / расхода</label>
                    <v-select style="width: 20vw;" />

                </div>
                <div class="button_block">
                    <div class="input-box">
                        <br>
                        <button type="button" class="btn btn-primary"><i class="bi bi-pencil-fill"></i></button>
                    </div>
                    <div class="input-box">
                        <br>
                        <button type="button" class="btn btn-danger"><i class="bi bi-trash"></i></button>
                    </div>
                </div>

            </section>
            <textarea rows="3" class="textarea" placeholder="Комментарий"></textarea>
            <hr>
        </div>
        </div>
</template>

<style scoped>
@import '../style/style-fin-report.scss';
</style>

<script>
export default {
    props: {
        amountNewRowFin: {
            type: Number,
        }
    },

    setup() {
        
    },
}
</script>