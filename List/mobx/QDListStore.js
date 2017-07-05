import {observable} from 'mobx'

class ObservableQDListStore {
    @observable QDList = []

    addListItem(name, listItemNo,createDate) {
        this.QDList.push({
            name: name,
            items: [],
            index: listItemNo,
            createDate:createDate
        })
    }

    removeListItem(listItemNo) {
        this.QDList = this.QDList.filter((l) => {
            return l.index !== listItemNo.index
        })
    }

    addItem(itemNo, todo) {
        this.QDList.forEach((l) => {
            if (l.index === itemNo) {
                l.items.unshift(todo)
            }
        })
    }

    removeItem(itemNo,todoNo){
        this.QDList.forEach((l,i) => {
            if (l.index === itemNo) {
                this.list[i].items = this.list[i].items.filter((n)=>{
                    return n.id !== todoNo
                })
            }

        })
    }

    itemSort(itemNo){
        let done = [];
        let undone = [];
        this.QDList.forEach((l,i) => {
            if (l.index === itemNo) {

                for(let j=0;j<this.QDList[i].items.length;j++){
                    if(this.QDList[i].items[j].done){
                        done.push(this.QDList[i].items[j])
                        done.sort(this.compare('id'))

                    }else{
                        undone.push(this.QDList[i].items[j])
                        undone.sort(this.compare('id'))
                    }
                }
                this.QDList[i].items = undone.concat(done);


            }
        })
    }

    compare(property){
        return function(a,b){
            var value1 = a[property];
            var value2 = b[property];
            return value1 - value2;
        }
    }

}


const observableQDListStore = new ObservableQDListStore()
export default observableQDListStore
                        