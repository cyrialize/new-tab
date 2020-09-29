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
    for (let i = 0; i < tasks.length; i++) {
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

    $('#light-switch').click(function() {

        let href = $('#theme').attr('href') ? '' : 'dark-theme.css';
        $('#theme').attr('href', href);

        let text = href === 'dark-theme.css' ? 'Lights On!' : 'Lights Off!';
        $(this).text(text);
    });
});