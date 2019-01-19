var list = [];

function appendNewItem(item) {
    let dom = $.parseHTML(`<li class='item ${item.completed?'completed' :''}'><span class="remove"><i class='fa fa-trash' ></i></span> ${item.content}</li>`)[0]
    $('ul').append(dom)
    return dom;
}

function renewLS() {
    let string = JSON.stringify(list.map(item => ({
        content: item.content,
        completed: item.completed
    })))
    localStorage.setItem('todo', string);
}
$('ul').on('click', 'li', function (event) {
    let ind = list.findIndex((item) => item.dom === $(this)[0]);
    if(ind===-1) return;
    list[ind].completed = !list[ind].completed;
    renewLS()
    $(this).toggleClass('completed')
})
$('ul').on('click', '.remove', function () {
    list = list.filter(item => item.dom !== $(this).parent()[0])
    renewLS()
    $(this).parent().fadeOut(500, function(){
        $(this).remove()
    });
});

$('#add').on('click', function () {
    $('input[type="text"]').fadeToggle();
})
$('input[type="text"]').keypress(function () {
    if (event.which !== 13) return;
    let dom = appendNewItem({
        content: $(this).val(),
        completed: false
    })
    list.push({
        content: $(this).val(),
        completed: false,
        dom
    })
    renewLS()
    $(this).val('');
});

$(document).ready(function () {
    list = JSON.parse(localStorage.getItem('todo') || '[]').map(item => ({
        content: item.content,
        completed: item.completed,
        dom: appendNewItem(item)
    }));
})
