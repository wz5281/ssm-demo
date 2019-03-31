new Vue({
    el: "#login",
    data: {
        job_number: '',
        password: '',
        login_text:'登录'
    },
    methods: {
        //job_number必填提示
        job_number_req(){
            if(this.job_number.trim() == ''){
                this.$message({
                showClose: true,
                message: '请输入账号',
                type: 'warning'
                });
            }
        },
        //password必填提示
        password_req(){
            if(this.password.trim() == ''){
                this.$message({
                    showClose: true,
                    message: '请输入密码',
                    type: 'warning'
                });
            }
        },
        login(){
            // 判断必填项
            if(this.job_number.trim() == '') {
                this.$message({
                showClose: true,
                message: '请输入账号',
                type: 'warning'
                });
            }else if(this.password.trim() == ''){
                this.$message({
                    showClose: true,
                    message: '请输入密码',
                    type: 'warning'
                });
            }else{
                const job_number = this.job_number.trim();
                const password = this.password.trim();
                let login_info = {
                		job_number:job_number,
                		password:password
                }
                //发起登录请求
                this.login_text = '登录中...'
                this.login_request(login_info);
            }
        },
        // 登录请求
        login_request(login_info){
            console.log(login_info);
            const url = '/ssm-demo/checkLogin'
            api({
                url,
                data:login_info,
                success:res=>{
                    // 后续验证
                    this. login_validate(res)
                    this.login_text = '登录'
                },
                error:err=>{
                    this.login_text = '登录'
                }
            })
        },

        // 登录验证
        login_validate(res){
            console.log(res)
           if(res.state =="1"){
            // 登录成功
            // 跳转
            window.location.href = '/ssm-demo/index.html'
            // 存储登录信息
            sessionStorage.setItem('user_info',JSON.stringify(res.user_info) );
           }else{       
            this.$message.error(res.errMsg);
           }
        },
        
        
   
    }
})