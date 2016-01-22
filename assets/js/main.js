
/*=> Main Javascript
--------------------------------------------------*/

(function($) {

    // Custom Javascript code goes here
    // $('.btn.ajax').on('click', function(e) {
    //     $.get('/environment/configure')
    //      .done(function(data) {
    //         console.log(data);
    //      });
    // });

    var $eventList = $('#eventlist');
    var evtSource = new EventSource('environment/configure');

    evtSource.onmessage = function(e) {

        console.log('received event');
        console.log(e);

        $eventList.append(
            $('<span />').css('display', 'block').html(e.data)
        );

        $eventList.scrollTop($eventList.prop('scrollHeight'));
    };      

    evtSource.onerror = function(e) {
        console.log('EventSource failed.');
        console.log(e);
    };

    console.log(evtSource);

})(jQuery || window.jQuery);
