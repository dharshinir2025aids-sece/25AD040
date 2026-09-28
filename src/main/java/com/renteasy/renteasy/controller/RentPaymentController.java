package com.renteasy.renteasy.controller;

import com.renteasy.renteasy.models.RentPayment;
import com.renteasy.renteasy.service.RentPaymentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rent-payments")
public class RentPaymentController {

    private final RentPaymentService rentPaymentService;

    public RentPaymentController(RentPaymentService rentPaymentService) {
        this.rentPaymentService = rentPaymentService;
    }

    @PostMapping
    public RentPayment addPayment(@RequestBody RentPayment payment) {
        return rentPaymentService.addPayment(payment);
    }

    @GetMapping
    public List<RentPayment> getAllPayments() {
        return rentPaymentService.getAllPayments();
    }

    @GetMapping("/{id}")
    public RentPayment getPaymentById(@PathVariable Long id) {
        return rentPaymentService.getPaymentById(id);
    }

    @GetMapping("/tenant/{tenantId}")
    public ResponseEntity<?> getPaymentsByTenant(@PathVariable Long tenantId) {
        return ResponseEntity.ok(
                rentPaymentService.getPaymentsByTenant(tenantId)
        );
    }

    @GetMapping("/tenant/{tenantId}/pending")
    public ResponseEntity<?> getPendingPayments(@PathVariable Long tenantId) {
        return ResponseEntity.ok(
                rentPaymentService.getPendingPayments(tenantId)
        );
    }

    @GetMapping("/tenant/{tenantId}/dues")
    public ResponseEntity<?> getPendingDues(@PathVariable Long tenantId) {
        return ResponseEntity.ok(
                rentPaymentService.getPendingDues(tenantId)
        );
    }

    @GetMapping("/unpaid")
    public ResponseEntity<?> getCurrentMonthUnpaid(
            @RequestParam String month) {

        return ResponseEntity.ok(
                rentPaymentService.getCurrentMonthUnpaid(month)
        );
    }
}