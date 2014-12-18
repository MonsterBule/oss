import com.shinowit.entity.*;
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


public class test2 {

    @Resource
    private SessionFactory sessionFactory;

    private Logger logger = Logger.getLogger(getClass());

    @Test


    public void testMyDao() {
        Session session = this.sessionFactory.openSession();
        try {
            Transaction trans = session.beginTransaction();
            for (int i = 0; i < 100000; i++) {

                TMeMerchandiseInfo role = new TMeMerchandiseInfo();
                TMeMerchandiseCInfo q = new TMeMerchandiseCInfo();
                TMeUnitInfo unitInfo = new TMeUnitInfo();
                TMeProStatusInfo t = new TMeProStatusInfo();
                TAuOperInfo oper = new TAuOperInfo();
                int roleId = (int) (Math.random() * 6);

//                role.setRoleId(String.valueOf(roleId + 1));
//                role.setRoleId("001");
                t.setProStatusId(2);
                unitInfo.setUnitId(3);
                q.setMerchandiseCid("01");
                role.setPrice(BigDecimal.valueOf(11));
                role.setStatus(t);
                role.setUnit(unitInfo);
                role.setMerchandisc(q);
                role.setMerchandiseId(String.valueOf(i) + "a");
                role.setMerchandiseName(String.valueOf(i) + "a");
                role.setSaleStatus(true);
                role.setRemark("0000");

                session.save(role);
            }
            trans.commit();
            session.close();

        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}

