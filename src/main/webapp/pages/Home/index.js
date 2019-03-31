new Vue({
  el:'#main',
  data:{
    name:'test',
    identity:'暂无信息',
    job_number:'暂无信息',
    user_id:'暂无信息',
    place:'暂无信息',
    student:'重庆电子工程职业学院',
    news:[]
  },
  mounted () {
      //获取用户信息
      if(sessionStorage.getItem('user_info')){
        let user_info = JSON.parse( sessionStorage.getItem('user_info') );
        this.name = user_info.name;
        this.identity = user_info.identity;
        this.job_number = user_info.job_number;
        this.place = user_info.place;
      }
      if(sessionStorage.getItem('news')){
          let news = JSON.parse(sessionStorage.getItem('news'))
          for(var i=0;i<news.length;i++){
            this.news.push(news[i]);
          }
      }else{
        this.getnews();
      }
  },
  methods: {
    // 获取每日新闻
    getnews(){
      let errNews = '暂无新闻信息'
      $.ajax({
        url:'https://www.apiopen.top/journalismApi',
        type:'GET',
        success:res=>{
          if(res.msg != "成功!"){
            this.news.push(errNews);
            return;
          };
          // console.log(res.data.toutiao)
          let news = res.data.toutiao;
          for(var i=0;i<news.length;i++){
            this.news.push(news[i].title);
            // 存起来避免重复获取
            sessionStorage.setItem('news',JSON.stringify(this.news));
            if(i>=11){
              break;
            }
          }
        },
        error:()=>{
            this.news.push(errNews);
        }
      }
      )
    }
  }
})

// 轮播图
layui.use('carousel', function(){
    var carousel = layui.carousel;
    //建造实例
    carousel.render({
      elem: '#home_carousel'
      ,width: '100%' //设置容器宽度
      ,height: '450px'
    });
  });