const $ = (element) => {
    return document.querySelector(element)
}

$('#bezaras').addEventListener('click', () => {
    const list = $('nav').classList
    if (list.contains('toggled')) {
        list.remove('toggled')
    } else {
        list.add('toggled')
    }
})