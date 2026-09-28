package com.renteasy.renteasy.controller;

import com.renteasy.renteasy.models.RentPayment;
import com.renteasy.renteasy.service.RentPaymentService;
import jakarta.validation.Valid;
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
    public ResponseEntity<?> addPayment(
            @Valid @RequestBody RentPayment payment) {

        return ResponseEntity.ok(
                rentPaymentService.addPayment(payment)
        );
    }

    @GetMapping
    public List<RentPayment> getAllPayments() {
        return rentPaymentService.getAllPayments();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPaymentById(
            @PathVariable Long id) {

        RentPayment payment =
                rentPaymentService.getPaymentById(id);

        if (payment == null) {
            return ResponseEntity.badRequest()
                    .body("Payment not found");
        }

        return ResponseEntity.ok(payment);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePayment(
            @PathVariable Long id,
            @Valid @RequestBody RentPayment payment) {

        try {
            return ResponseEntity.ok(
                    rentPaymentService.updatePayment(id, payment)
            );
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePayment(
            @PathVariable Long id) {

        try {
            rentPaymentService.deletePayment(id);

            return ResponseEntity.ok(
                    "Payment deleted successfully"
            );

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(e.getMessage());
        }
    }

    @GetMapping("/tenant/{tenantId}")
    public ResponseEntity<?> getPaymentsByTenant(
            @PathVariable Long tenantId) {

        return ResponseEntity.ok(
                rentPaymentService.getPaymentsByTenant(tenantId)
        );
    }

    @GetMapping("/tenant/{tenantId}/pending")
    public ResponseEntity<?> getPendingPayments(
            @PathVariable Long tenantId) {

        return ResponseEntity.ok(
                rentPaymentService.getPendingPayments(tenantId)
        );
    }

    @GetMapping("/tenant/{tenantId}/dues")
    public ResponseEntity<?> getPendingDues(
            @PathVariable Long tenantId) {

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