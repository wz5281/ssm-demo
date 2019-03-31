new Vue({
    el: '#account_manage_main',
    data() {
      return {
        user_list: [], //用户列表
        search_name: '',
        // 删除确认框
        del_dialog: false,
        del_job_number: '',
        del_index: '',
        //弹出表单标题
        dialogFormTitle:'编辑',
        //弹出表单形式
        dialogFormType:'alter',
        // 添加、编辑框
        dialogFormVisible:false,
        form: {
            job_number: '', //账号
            name: '', //用户名
            place: '', //值班室
            phone: '', //联系方式
            remark: '', //备注
        },
        
      }
    },
    mounted() {
      this.get_user_list();
    },
    computed: {
      // 筛选符合选择条件的
      show_list() {
        return this.user_list.filter(data => {
          return data.name.indexOf(this.search_name) !== -1;
        })
      }
    },
    methods: {
      submit_form(){
        if( this.dialogFormType == 'alter'){
          //提交编辑表单
          console.log('提交编辑')
          if(this.form.name == ''){
            this.$message.error('用户名不能为空');
          }else{
            this.sureAlter()
          }

        }else if(this.dialogFormType == 'add'){
          // 添加用户
          if(this.form.job_number == ''){
            this.$message.error('账号不能为空');
          }else if(this.form.name == ''){
            this.$message.error('用户名不能为空');
          }else if(this.form.place == ''){
            this.$message.error('值班室不能为空');
          }else{
            this.add_user();
          }
        }
      },
      //关闭表单弹窗
      claosForm(){
        this.clear_form();
        this.dialogFormVisible = false;  
      },
      //清空form
      clear_form(){
        this.$set(this.form,'job_number','');
        this.$set(this.form,'name','');
        this.$set(this.form,'place','');
        this.$set(this.form,'phone','');
        this.$set(this.form,'remark','');
      },
      // 获取用户列表(刷新)
      get_user_list() {
        api({
          url: '/ssm-demo/getUserList',
          success: res => {
            this.user_list = res.user_list;
          }
        })
      },
      //编辑
      handleEdit(index, row) {
        console.log(index, row);
        this.dialogFormTitle = '编辑';
        this.dialogFormType = 'alter';
        // form赋值
        this.$set(this.form,'job_number',row.job_number);
        this.$set(this.form,'name',row.name);
        this.$set(this.form,'place',row.place);
        this.$set(this.form,'phone',row.phone);
        this.$set(this.form,'remark',row.remark);
        this.dialogFormVisible = true;
      },
      // 删除
      handleDelete(index, row) {
        console.log(row.job_number);
        this.del_job_number = row.job_number;
        this.del_index = index;
        // 删除提示
        this.del_dialog = true;
      },
      // 确认删除
      sureDelete() {
        console.log(this.del_job_number);
        this.del_dialog = false;
        api({
          url: '/ssm-demo/deleteUser',
          data: {
            job_number: this.del_job_number
          },
          success: res => {
            if (res.state == 1) {
              // 删除成功
              this.$message({message: '删除成功',type: 'success'});
              // 刷新界面
              this.get_user_list();
            } else {
              //删除失败
              this.$message.error('删除失败');
            }
          }
        })
      },
      addBtn(){
        this.dialogFormTitle = '添加';
        this.dialogFormType = 'add';
        this.dialogFormVisible = true;
      },
      // 添加用户
      add_user(){
          // 增加
          // console.log(this.form)
          api({
          url: '/ssm-demo/addUser',
          data: this.form,
          success: res => {
            if (res.state == 1) {
              // 增加成功
              this.$message({message: '增加成功',type: 'success'});
              // 关闭
              this.dialogFormVisible = false;
              // 跟新用户列表
              this.get_user_list();
              // 清除form
              this.clear_form();
            } else {
              //增加失败
              this.$message.error('增加失败');
            }
          }
        })
       
      },
      //确认修改用户
      sureAlter(){
        console.log(this.form)
        api({
          url: '/ssm-demo/updateUsers',
          data: this.form,
          success: res => {
            if (res.state == 1) {
              // 修改成功
              this.$message({message: '修改成功',type: 'success'});
              // 关闭
              this.dialogFormVisible = false;
              // 跟新用户列表
              this.get_user_list();
              // 清除form
              this.clear_form();
            } else {
              //增加失败
              this.$message.error('修改失败');
            }
          }
        })
      }
    }
  })