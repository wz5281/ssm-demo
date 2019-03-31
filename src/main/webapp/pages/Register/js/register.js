//初始化签到按钮
var particles = new Particles('.qiandao');
var particles1 = new Particles('.qiantui');
let user_name = '';
let job_number = '';
main();

function main() {

    // 获取登录者信息
    user_name = JSON.parse(sessionStorage.getItem('user_info')).name;
    job_number = JSON.parse(sessionStorage.getItem('user_info')).job_number;
    
    $('#name').html(user_name);

    // 推荐链接
    $('.tuijian .go').click(function () {
        let link = $(this).attr('data-link');
        console.log(link);
        window.open(link);
    })
    
    //判断是否已签到
    if (sessionStorage.getItem('register_time')) {
        // 已签到
        let register_time = sessionStorage.getItem('register_time')
        register(register_time);
    }
    // 判断是已否签退
    if (sessionStorage.getItem('signback_time')) {
        let signback_time = sessionStorage.getItem('signback_time')
        signback(signback_time);
    }
}

/**签到 */
function register(register_time) {
    //隐藏签到按钮
    //更新签到状态
    $('#register_state').html('待签退');
    particles.disintegrate({
        complete: function () {
            $('#signback_btn').show();
        }
    });
    $('#register_btn').hide();
    //已签到的情况
    if (register_time) {
        $('#register_time').html(register_time);
    }
    //未签到的情况
    else {
        //记录当前签到时间
        let nowTime = getnowDate();
        $('#register_time').html(nowTime);
        sessionStorage.setItem('register_time', nowTime);
    }
}


/**签退 */
function signback(signback_time){
    if(!signback_time){
        //未签到
        //当前时间与签到时间相比 , 小于45分钟无法签退
        let register_time = sessionStorage.getItem('register_time');
        let nowTime = getnowDate();
        let diffDate = GetDateDiff(register_time, nowTime, "second");
        //时间差以秒记
        if (diffDate < 3) {
            alert('时间未到不能签退哦')
            return;
        }else{
            //可以签退
            if (window.confirm('确认要签退吗?')) {
                $('#signback_time').html(nowTime);
                sessionStorage.setItem('signback_time', nowTime);
                particles1.disintegrate({
                    direction: 'right',
                    type: 'triangle',
                    complete: function () {
                        $('#signback_tip').show();
                    }
                });
                $('#signback_btn').hide();
                // 发送签退请求
                console.log('签退请求')
                // 时间差(分钟)
                let diff_time_min = diffDate / 60;
                signback_request({
                    register_time,	//签到时间
                    signback_time:nowTime,	//签退时间
                    diff_time_min:diff_time_min.toFixed(2) 	// 值班时间
                });
            }
        }
    }else{
        // 有签退记录
        $('#signback_time').html(signback_time);
        particles1.disintegrate({
            direction: 'right',
            type: 'triangle',
            complete: function () {
                $('#signback_tip').show();
            }
        });
        $('#signback_btn').hide();
    }
}

/**签退请求 */
function  signback_request(r_info){
    let request_info = {
        user_id:job_number,     //账号
        register_time:r_info.register_time,  //签到时间
        signback_time:r_info.signback_time,  //签退时间
        diff_time_min:r_info.diff_time_min,   //签到时长
    }
    console.log(request_info)
    api({
        url:'/ssm-demo/addRegisterRecord',
        data:request_info,
        success:res=>{
            console.log(res);
        }
    })
}


/**
 * 获取当前时间
 */
function getnowDate() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    // var nowDate = year + "-" + month + "-" + day;
    var nowDate = `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`
    return nowDate;
}

/*
 * 获得时间差,时间格式为 年-月-日 小时:分钟:秒 或者 年/月/日 小时：分钟：秒
 * 其中，年月日为全格式，例如 ： 2010-10-12 01:00:00
 * 返回精度为：秒，分，小时，天
 */
function GetDateDiff(startTime, endTime, diffType) {
    //将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式
    startTime = startTime.replace(/\-/g, "/");
    endTime = endTime.replace(/\-/g, "/");
    //将计算间隔类性字符转换为小写
    diffType = diffType.toLowerCase();
    var sTime = new Date(startTime); //开始时间
    var eTime = new Date(endTime); //结束时间
    //作为除数的数字
    var divNum = 1;

    switch (diffType) {

        case "second":

            divNum = 1000;

            break;

        case "minute":

            divNum = 1000 * 60;

            break;

        case "hour":

            divNum = 1000 * 3600;

            break;

        case "day":

            divNum = 1000 * 3600 * 24;

            break;

        default:

            break;

    }

    return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(divNum));

}