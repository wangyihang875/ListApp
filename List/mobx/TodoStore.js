import {observable} from 'mobx'

export default class TodoStore {
    id = Date.now();

    @observable
    title = '';

    @observable
    done = false;

    @observable
    remark = '';

    @observable
    endDate = '';

    constructor(title) {
        this.title = title;
    }

}

                        