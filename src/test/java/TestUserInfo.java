import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.annotation.Resource;
import java.sql.Types;

/**
 * Created by Administrator on 2014/12/15.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:application-context.xml"})
public class TestUserInfo {

    @Resource
    private JdbcTemplate jt;

    @Test
    public void test1() {

        String sql = "insert into TMe_InStockInfo (OperID,InTime,SupplierID,Handler)values(?,?,?,?)";
        for (int i = 1; i < 1000000; i++) {
            jt.update(sql, new Object[]{"001001", "2014-02-01", "000001", "11"}, new int[]{Types.VARCHAR, Types.VARCHAR, Types.VARCHAR, Types.VARCHAR});
        }
    }

}