package test;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.alibaba.fastjson.JSONObject;
import com.java.mapper.RegisterDao;
import com.java.mapper.UserDao;
import com.java.model.Register;
import com.java.model.User;

@RunWith(SpringJUnit4ClassRunner.class)
//告诉junit spring配置文件
@ContextConfiguration("classpath:applicationContext.xml")            
public class UserTest {
      @Autowired 
      private UserDao userDao;
      
     @Autowired 
     private RegisterDao registerDao;
     
     @Test
     public void test1() {
    	  User user = new User();
    	  user.setId(1);
    	  user.setIdentity("学生");
    	  user.setJob_number("2016180207");
    	  user.setName("王卓");
    	  user.setPlace("北区");
    	  user.setPhone("13648347440");
    	  user.setRemark("加热");
    	  //userDao.updateUser(user);
     }  
     
     @Test
     public void test2() {
    	  User user = new User();
    	  user.setId(6);
    	  user.setJob_number("2019");
    	  user.setName("钢铁侠");
    	  user.setPlace("北区");
    	  user.setPhone("13648347440");
    	  user.setRemark("加热");
    	  userDao.updateUsers(user);
     }  
     
     @Test
     public void Test3() throws ParseException {
    	 Register re = new Register();
    	 SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    	 Date star = df.parse("2019-3-1 21:20:20");
    	 Date end = df.parse("2019-3-30 23:28:20");
    	 long diff = end.getTime()-star.getTime();
    	 long day=diff/(24*60*60*1000);
    	 long hour=(diff/(60*60*1000)-day*24);
    	 long min=((diff/(60*1000))-day*24*60-hour*60);
    	 String diff_time = day+"天"+hour+"小时"+min+"分钟";
    	 long diff_time_min = min;
    	 re.setUser_id("2016");
         re.setRegister_time(star);
         re.setSignback_time(end);
         re.setDiff_time(diff_time);
         re.setDiff_time_min(diff_time_min);
    	 registerDao.addRegisterRecord(re);
     }
}
