import com.shinowit.entity.TMeInStockInfo;
import org.apache.log4j.Logger;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.transaction.TransactionConfiguration;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.sql.Timestamp;


/**
 * Created by Administrator on 2014-11-05.
 */

@Transactional
@TransactionConfiguration(transactionManager = "transactionManager", defaultRollback = true)
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:application-context.xml"})
public class test1 {


    Transaction tran = null;
    @Resource
    private SessionFactory sessionFactory;
    private Logger logger = Logger.getLogger(getClass());

    @Test
    public void test() {
        Session session = sessionFactory.openSession();

        tran = session.beginTransaction();
        TMeInStockInfo t = new TMeInStockInfo();
        t.getOper().setOperId("001001");
        t.setInTime(Timestamp.valueOf("2014-01-01"));
        for (int i = 0; i < 100000; i++) {
            session.save(t);
            session.getTransaction().commit();
            session.close();
        }


    }

}
