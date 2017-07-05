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

    addItem(item, todo) {
        this.QDList.forEach((l) => {
            if (l.index === item.index) {
                l.items.push(todo)
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



}


const observableQDListStore = new ObservableQDListStore()
export default observableQDListStore
                        