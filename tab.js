function addTask(text = '') {
    let newTask = $('#task-template').clone(true);
    $(newTask).removeAttr('id');
    $(newTask).find('input').addClass('task');
    $(newTask).find('.task').val(text);
    $('#tasks').append(newTask);
}

$(document).ready(function() {

    let tasksCookie = Cookies.get('tasks');
    let tasks =  tasksCookie ? JSON.parse(tasksCookie) : [];
    console.log(tasks);
    for (let i = 0; i < tasks.length; i++) {
        console.log(tasks[i]);
        addTask(tasks[i]);
    }

    $('#notes').val(Cookies.get('notes'));

    $('#notes').on('input', function() {
        Cookies.set('notes', $('#notes').val());
    })

    $('#clear').click(function() {
        $('#notes').val('');
        Cookies.set('notes', '');
    });

    $('#delete-task').click(function() {
        let task = $(this).prev().val();
        let index = tasks.indexOf(task);
        tasks.splice(index, 1);
        Cookies.set('tasks', JSON.stringify(tasks));
        $(this).parent('div').remove();
    });

    $('#add-task').click(function() {
        addTask();
    });

    $('#save-tasks').click(function() {
        $('.task').each(function() {
            console.log('saving ' + $(this).val())
            tasks.push($(this).val());
        });

        Cookies.set('tasks', JSON.stringify(tasks));
    });
});