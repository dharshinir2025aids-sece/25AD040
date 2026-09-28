package com.renteasy.renteasy.service;

import com.renteasy.renteasy.models.RentPayment;
import com.renteasy.renteasy.repository.RentPaymentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RentPaymentService {

    private final RentPaymentRepository rentPaymentRepository;

    public RentPaymentService(RentPaymentRepository rentPaymentRepository) {
        this.rentPaymentRepository = rentPaymentRepository;
    }

    public RentPayment addPayment(RentPayment payment) {
        return rentPaymentRepository.save(payment);
    }

    public List<RentPayment> getAllPayments() {
        return rentPaymentRepository.findAll();
    }

    public RentPayment getPaymentById(Long id) {
        return rentPaymentRepository.findById(id).orElse(null);
    }

    public List<RentPayment> getPaymentsByTenant(Long tenantId) {
        return rentPaymentRepository.findByTenantId(tenantId);
    }

    public List<RentPayment> getPendingPayments(Long tenantId) {
        return rentPaymentRepository.findByTenantIdAndStatus(tenantId, "PENDING");
    }

    public double getPendingDues(Long tenantId) {

        List<RentPayment> pendingPayments =
                rentPaymentRepository.findByTenantIdAndStatus(tenantId, "PENDING");

        double total = 0;

        for (RentPayment payment : pendingPayments) {
            total = total + payment.getAmount();
        }

        return total;
    }
}