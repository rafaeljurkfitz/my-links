const ul = document.querySelector("ul")
const input = document.querySelector("input")
const form = document.querySelector('form')

async function load() {
    const res = await fetch("http://localhost:3000/").then((data) => data.json())
    res.urls.map(url => addElement(url))
}

load()

function create(name, url) {
    fetch(`http://localhost:3000/?name=${name}&url=${url}`)
}

function del(name, url) {
    fetch(`http://localhost:3000/?name=${name}&url=${url}&del=1`)
}

function addElement({ name, url }) {
    const li = document.createElement('li')
    const a = document.createElement("a")
    const trash = document.createElement("span")

    a.href = url
    a.innerHTML = name
    a.target = "_blank"

    trash.innerHTML = "x"
    trash.onclick = () => removeElement(trash)

    li.append(a)
    li.append(trash)
    ul.append(li)
}

function removeElement(el) {
    const url = el.parentNode.getElementsByTagName('a')[0].getAttribute('href')
    const name = el.parentNode.getElementsByTagName('a')[0].innerHTML
    if (confirm('Tem certeza que deseja deletar?')) {
        el.parentNode.remove()
        del(name, url)
    }
        
        
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    let { value } = input

    if (!value)
        return alert('Preencha o campo')

    const [name, url] = value.split(",")

    if (!url)
        return alert('formate o texto da maneira correta')

    if (!/^http/.test(url))
        return alert("Digite a url da maneira correta")

    addElement({ name, url })
    create(name, url)
    

    input.value = ""
})