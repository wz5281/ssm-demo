let job_number = '';
// var dateArray = [1,2] // 假设已经签到的
// signFun(dateArray);
main();
function main(){
    job_number = JSON.parse(sessionStorage.getItem('user_info')).job_number;
    // 获取当前用户本月的签到记录
    get_register_log();
}
/** 获取签到记录 */
function get_register_log(){
    let nowMonth = moment().format("YYYY-MM");
    let request_info = {
        job_number,
        nowMonth
    }
    console.log(request_info)
    return;

    api({
        url:'',
        data:request_info,
        success:res=>{
            console.log(res);
            
        }
    })
}

/** 将本月签到记录提取为数组显示出来 */
function get_dateArray(){
    let dateArray = [];
    // 渲染日历
    signFun(dateArray)
    // 更新时长
}

/**签到显示 */
function signFun(dateArray) {
    var $dateBox = $("#js-qiandao-list"),
        $currentDate = $(".current-date"),
        $qiandaoBnt = $("#js-just-qiandao"),
        _html = '',
        _handle = true,
        myDate = new Date();
    $currentDate.text(myDate.getFullYear() + '年' + parseInt(myDate.getMonth() + 1) + '月' + myDate.getDate() + '日');
    var monthFirst = new Date(myDate.getFullYear(), parseInt(myDate.getMonth()), 1).getDay();
    var d = new Date(myDate.getFullYear(), parseInt(myDate.getMonth() + 1), 0);
    var totalDay = d.getDate(); //获取当前月的天数
    for (var i = 0; i < 42; i++) {
        _html += ' <li><div class="qiandao-icon"></div></li>'
    }
    $dateBox.html(_html) //生成日历网格
    var $dateLi = $dateBox.find("li");
    for (var i = 0; i < totalDay; i++) {
        $dateLi.eq(i + monthFirst).addClass("date" + parseInt(i + 1));
        for (var j = 0; j < dateArray.length; j++) {
            if (i == dateArray[j]) {
                $dateLi.eq(i + monthFirst).addClass("qiandao");
            }
        }
    } //生成当月的日历且含已签到
    $(".date" + myDate.getDate()).addClass('able-qiandao');

}