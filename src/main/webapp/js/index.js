new Vue({
    el: "#indexMain",
    data: {
        name: '未登录',
        // 退出登录确认框
        dialogVisible: false,
        home_show:true,
    },
    mounted() {
        // 获取登录者信息
        if (sessionStorage.getItem('user_info')) {
            this.name = JSON.parse(sessionStorage.getItem('user_info')).name ;
        }else{
            // 未登录 , 跳转至登录
            window.location.href = './pages/Login/login.html'
        }
        this.home_active();
    },
    methods: {
        // 退出登录
        logout() {
            this.dialogVisible = false
            //清除登录者信息和token
            sessionStorage.removeItem("name");
            //退回登录页
            window.location.href = './pages/Login/login.html'
        },
        
        // 首页切换
        home_active(){
            // 点击导航链接时隐藏首页
            let a_list = $('.sub-menu a');
            a_list.on('click',()=>{
                this.home_show = false;
            })
            a_list.on('click',function(){
                a_list.removeClass('current');
                this.classList.add('current');
            })
            
            //导航全部删除之后显示首页
            let tab_title = this.$refs.tab_title
            $(tab_title).bind('click',(e)=>{
                let tag = $(e.target);
                if(tag.hasClass('layui-tab-close')){
                    if($(tab_title).find('li').length == 0){
                        this.home_show = true;
                    }
                }
            })
        },
        // 切换到首页
        gohome(){
            this.home_show = true;
        }
    }
})
