<template>
    <div class="col-3 input-effect">
        <input class="effect-20" type="text" placeholder="">
        <label>{{ labelValue }}</label>
        <span class="focus-border">
            <i></i>
        </span>
    </div>
</template>

<style>
@import './style/inputComponentStyle.scss';
</style>

<script>
export default {
    props: {
        labelValue: {
            type: String
        }
    },
    setup() {
        const handleInput = (event) => {
            const input = event.target;
            const label = input.nextElementSibling;

            if (input.value.trim() !== '') {
                label.classList.add('has-content');
            } else {
                label.classList.remove('has-content');
            }
        };

        return {
            handleInput,
        };
    },
}
</script>