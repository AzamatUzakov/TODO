let edittodo = document.forms.edittodo
let form = document.forms.todo
let input = form.querySelector('input')
let cont = document.querySelector('.container')
let modal_bg = document.querySelector('.modal_bg')
let close = document.querySelector('.close')
let innpp = document.querySelector('.inpp')
let enter = document.querySelector('.enter')
let todos = []

console.dir(input)

form.onsubmit = (e) => {
    e.preventDefault();

    let task = {
        id: Math.random(),
        isDone: false,
        task: input.value,
        time: new Date().getHours() + ":" + new Date().getMinutes()
    }

    if (input.value.length !== 0) {
        todos.push(task)
        reload(todos, cont)
    }
}



function reload(arr, place) {
    place.innerHTML = ""

    for (let item of arr) {
        let item_div = document.createElement('div')
        let div_top = document.createElement('div')
        let span_top = document.createElement('span')
        let span_time = document.createElement('span')
        let delete_btn = document.createElement('button')
        let edit_btn = document.createElement('button')

        item_div.classList.add('item')
        div_top.classList.add('top')
        span_time.classList.add('time')

        span_top.innerHTML = item.task
        span_time.innerHTML = item.time
        delete_btn.innerHTML = "x"
        edit_btn.innerHTML = "edit"


        if (item.isDone) {
            span_top.style.textDecoration = 'line-through '
        }

        place.append(item_div)
        div_top.append(span_top, delete_btn, edit_btn)
        item_div.append(div_top, span_time)

        delete_btn.onclick = () => {
            todos = todos.filter(el => el.id !== item.id)
            item_div.classList.add('remove_anim')
            setTimeout(() => {
                item_div.remove()
            }, 1000)
        }
        close.onclick = () => {
            modal_bg.style.display = 'none'
        }
        edit_btn.onclick = () => {
            modal_bg.style.display = 'flex'
        }

        edittodo.onsubmit = (e) => {
            e.preventDefault()
            let new_todo = {}
            let fm = new FormData(edittodo)

            fm.forEach((value, key) => {
                new_todo[key] = value
            })

            for (let i of todos) {
                if (i.id == item.id) {
                    i.task = new_todo.task
                }
            }
            reload(todos, cont)
        }

        span_top.onclick = () => {
            item.isDone = !item.isDone
            if (item.isDone) {
                span_top.style.textDecoration = 'line-through 3px red '
            } else {
                span_top.style.textDecoration = 'none'

            }
        }
    }
}