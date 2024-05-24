import { reactive } from 'vue';
// import { shuffle } from './helpers';

export const store = reactive({
    status: "home",
    changeStatus(t) {
        this.status = t;
        console.log(this.status);
    }
});
