<template>
    <button
    class="base-button" v-bind="$attrs">
        <slot></slot>
    </button>
</template>

<style scoped>

.base-button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    background-color: rgb(15, 15, 15);
    color: white;
    cursor: pointer;
}

</style>