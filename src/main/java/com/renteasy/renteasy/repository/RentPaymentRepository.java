package com.renteasy.renteasy.repository;

import com.renteasy.renteasy.models.RentPayment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RentPaymentRepository extends JpaRepository<RentPayment, Long> {
}