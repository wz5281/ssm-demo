new Vue({
    el:'#wage_statistics',
    data:{
        formInline: {
            date_select: '',
          },
          wages_list: [
              {
            job_number: '1008611',
            name: '王小虎',
            place: '上海市普陀区金沙江路 1518 弄',
            register_time_all:'45',
            wages:'160'
          }
        ]
    },
    methods: {
        // 查询按钮
        searchBtn(){
            console.log('查询时间段')
            // console.log(this.date_select);
            let start_date = moment(this.formInline.date_select[0]).format('YYYY-MM-DD');
            let end_date = moment(this.formInline.date_select[0]).format('YYYY-MM-DD');
            console.log(`start_date: ${start_date}`)
            console.log(`end_date: ${end_date}`);
            // 获取时间段段内的工资统计
            api({
                url:"",
                data:{start_date,end_date},
                success:res=>{
                    console.log(res);
                    this.wages_list = res.wages_list;
                }
            })
        }
    }
})