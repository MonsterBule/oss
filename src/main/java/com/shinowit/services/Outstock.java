package com.shinowit.services;

import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeOutStockDetailsInfo;
import com.shinowit.entity.TMeOutStockInfo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/11/21.
 */
@Service
public class Outstock {
    @Resource
    private BaseDAO<TMeOutStockInfo> outstockdao;
    @Resource
    private BaseDAO<TMeOutStockDetailsInfo> detailsdao;
    // private TMeOutStockInfo stock;

    @Transactional
    public boolean insert(TMeOutStockInfo outstock, List<TMeOutStockDetailsInfo> detailslist) {
        boolean result = false;
        try {
            outstockdao.insert(outstock);
            for (TMeOutStockDetailsInfo dd : detailslist) {
                if (dd != null) {
                    dd.setBillcode(outstock);
                    detailsdao.insert(dd);
                }
            }
            result = true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    @Transactional
    public boolean delete(String outbillcode) {
        boolean result = false;
        try {
            if (detailsdao.executeHQL("delete from TMeOutStockDetailsInfo where billcode.outBillCode=?", outbillcode) > 0) {
                if (outstockdao.executeHQL("delete from TMeOutStockInfo where outBillCode=?", outbillcode) > 0) {
                    result = true;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return result;
    }

    public boolean update(TMeOutStockInfo outstock, TMeOutStockDetailsInfo detailslist) {
        boolean result = false;
        try {
            outstockdao.update(outstock);
            detailsdao.update(detailslist);
            result = true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }
}
