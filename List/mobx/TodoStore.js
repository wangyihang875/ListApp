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

    constructor(title,endDate) {
        this.title = title;
        this.endDate = endDate;
    }

}

                        