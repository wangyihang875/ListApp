import {observable} from 'mobx'

class DefaultRWListStore {
    @observable RWList = []

    addItem(todo) {
        this.RWList.unshift(todo)
    }

    removeItem(id){
        this.RWList = this.RWList.filter((l) => {
            return l.id !== id
        })
    }

    itemSort(){
        let done = [];
        let undone = [];
        for(let i=0;i<this.RWList.length;i++){
            if(this.RWList[i].done){
                done.push(this.RWList[i])
                done.sort(this.compare('id'))
                
            }else{
                undone.push(this.RWList[i])
                undone.sort(this.compare('id'))
            }
        }
        this.RWList = undone.concat(done);

    }

    compare(property){
        return function(a,b){
            var value1 = a[property];
            var value2 = b[property];
            return value1 - value2;
        }
    }

}


const defaultRWListStore = new DefaultRWListStore()
export default defaultRWListStore
                        