/* eslint-env browser, jquery */


function viewcomplaint(id) {

    $.get('/complaint/' + id, {}, function (complaint) {
        /*M.toast({
            html: 'complaint Found ' + complaint.name
        });*/

        $('#complaint-location').html(complaint.location);
        $('#complaint-date').html(new Date(complaint.date));
        //console.log(complaint);
        $('#complaint-img').attr('src','/complaint/image/'+complaint._id);
        $('#complaint-description').html(complaint.description);

        $('#complaint-modal').modal('open');

        //console.log(product._id)
    });


}

function deletecomplaint(id) {

    if (confirm('Are you sure you want to delete?')) {
        $.post('/complaint/' + id + '/delete', function (status) {
            if (status) {
                document.location.reload();
            }
        });
    }

}

function updatecomplaint(id) {
    M.toast({
        html: 'Marked as done!'
    });
    //if(confirm('Are you sure you want to update?')){
    $.post('/complaint/' + id + '/update', function (status) {
        if (status) {
            document.location.reload();
        }
    });
    //}

}


function deleteAll() {
    
    if (confirm('Are you sure you want to delete all?')) {
        $.post('/complaints/all/delete', function (status) {
            if (status) {
                document.location.reload();
            }
        });
    }
}