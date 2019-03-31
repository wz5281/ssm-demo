/**ajax */
function api(options){
    let {url,data,success,error} = options;
    data = JSON.stringify(data);
    $.ajax({
        type: "POST",
        url,	
        data,
        contentType: "application/json",
        dataType: "json", 
        success: res => {
            if(success != undefined){
                success(res);
            }
        },
        error: err => {
            if(error != undefined){
                error(err);
            }
        },
    });
}

function api_mock(options){
    let {url,data,success,error} = options;
    $.ajax({
        type: "POST",
        url,	
        data,
        dataType: "json", 
        success: res => {
            if(success != undefined){
                success(res);
            }
        },
        error: err => {
            if(error != undefined){
                error(err);
            }
        },
    });
}