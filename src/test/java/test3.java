import com.shinowit.entity.TAuOperInfo;
import com.shinowit.entity.TMeMerchandiseInfo;
import com.shinowit.entity.TMeOutStockDetailsInfo;
import com.shinowit.entity.TMeOutStockInfo;
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
import java.math.BigDecimal;


@Transactional
@TransactionConfiguration(transactionManager = "transactionManager", defaultRollback = true)
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:application-context.xml"})


public class test3 {

    @Resource
    private SessionFactory sessionFactory;

    private Logger logger = Logger.getLogger(getClass());

    @Test


    public void testMyDao1() {
        Session session = this.sessionFactory.openSession();
        try {
            Transaction trans = session.beginTransaction();
            for (int i = 0; i < 100000; i++) {

                // TMeInStockDetailsInfo role = new TMeInStockDetailsInfo();
                TMeOutStockDetailsInfo role = new TMeOutStockDetailsInfo();
                TMeOutStockInfo t = new TMeOutStockInfo();
                TMeMerchandiseInfo m = new TMeMerchandiseInfo();
                TAuOperInfo oper = new TAuOperInfo();
                oper.setOperId("001001");
                int roleId = (int) (Math.random() * 6);

                t.setOutBillCode("8a8299924a4c5b4f014a4c5b55bb0000");
                m.setMerchandiseId("00004");
                role.setBillcode(t);
                role.setChandise(m);
                role.setNum(5);
                role.setStockPrice(BigDecimal.valueOf(10));
                role.setPrice(BigDecimal.valueOf(11));


                session.save(role);
            }
            trans.commit();
            session.close();

        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}

