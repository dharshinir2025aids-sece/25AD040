package com.renteasy.renteasy.repository;

import com.renteasy.renteasy.models.RentPayment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RentPaymentRepository extends JpaRepository<RentPayment, Long> {

    List<RentPayment> findByTenantId(Long tenantId);

    List<RentPayment> findByTenantIdAndStatus(Long tenantId, String status);

    List<RentPayment> findByMonthAndStatus(String month, String status);
}