new Vue({
    el: '#personal_info',
    data: {
        activeName: 'first',
        form: {
            name: '', //用户名
            job_number: '', //账号
            identity: '', //身份
            place: '', //值班室
            phone: '', //联系方式
            remark: '', //备注
        },
        form1: {
            job_number: '', //用户名
            password_old: '', //旧密码
            password_new: '', //新密码
            password_new_sure: '' //确认新密码
        }
    },
    mounted() {
        //读取用户信息
        //获取用户信息
        let user_info = JSON.parse(sessionStorage.getItem('user_info'));
        this.form.name = user_info.name;
        this.form.job_number = user_info.job_number;
        this.form1.job_number = user_info.job_number;
        this.form.identity = user_info.identity;
        this.form.place = user_info.place;
        this.form.phone = user_info.phone;
        this.form.remark = user_info.remark;
    },
    methods: {
        // 修改账户信息
        submit_baseinfo() {
            let request_data = {
                job_number: this.form.job_number,
                phone: this.form.phone,
                remark: this.form.remark
            }
            console.log(request_data);
            api({
                url: "/ssm-demo/updateUser",
                data: request_data,
                success: res => {
                    // this. login_validate(res)
                    console.log(res);
                    if (res.state == 1) {
                        this.$message({message: '修改成功',type: 'success'});
                        // 修改存储内容
                        let user_info = JSON.parse(sessionStorage.getItem('user_info'));
                        user_info.phone = this.form.phone;
                        user_info.remark = this.form.remark;
                        sessionStorage.setItem('user_info',JSON.stringify(user_info));
                    } else {
                        this.$message.error('修改失败');
                    }
                }
            });
        },
        //清空基本信息
        reset_baseinfo() {
            this.form.phone = '',
                this.form.remark = ''
        },
        // 修改密码
        submit_salfinfo() {
            const password_old = this.form1.password_old.trim();
            const password_new = this.form1.password_new.trim();
            const password_new_sure = this.form1.password_new_sure.trim();
            if (password_old === '') {
                this.$message.error('请输入原密码');
            } else if (password_new === '') {
                this.$message.error('请输入新密码');
            } else if (password_new_sure === '') {
                this.$message.error('请再次输入密码');
            } else if (password_new !== password_new_sure) {
                this.$message.error('密码不一致 , 请检查');
            } else {
                // 验证并修改密码
                let request_data = {
                    job_number: this.form1.job_number,
                    password_old: this.form1.password_old,
                    password_new: this.form1.password_new,
                }
                api({
                    url: "/ssm-demo/updatePassword",
                    data: request_data,
                    success: res => {
                        console.log(res);
                        if (res.state == 1) {
                            this.$message({message: '密码修改成功,身份已过期,请重新登录',type: 'success'});
                            // 清除登录者信息
                            sessionStorage.removeItem('user_info');
                            // 退出登录
                            window.parent.location.href = '/ssm-demo/pages/Login/login.html'
                        } else {
                            this.$message.error('修改失败');                              
                        }
                    }
                });
            }
        },
        // 清空密码
        reset_salfinfo() {
            this.form1.password_old = '';
            this.form1.password_new = '';
            this.form1.password_new_sure = '';
        }
    }
})