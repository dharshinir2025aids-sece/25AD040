package com.renteasy.renteasy.controller;

import com.renteasy.renteasy.models.RentPayment;
import com.renteasy.renteasy.service.RentPaymentService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rent-payments")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175"
})
public class RentPaymentController {

    private final RentPaymentService rentPaymentService;

    public RentPaymentController(
            RentPaymentService rentPaymentService) {

        this.rentPaymentService = rentPaymentService;
    }

    @PostMapping
    public ResponseEntity<RentPayment> addPayment(
            @Valid @RequestBody RentPayment payment) {

        return ResponseEntity.ok(
                rentPaymentService.addPayment(payment)
        );
    }

    @GetMapping
    public ResponseEntity<List<RentPayment>> getAllPayments() {

        return ResponseEntity.ok(
                rentPaymentService.getAllPayments()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<RentPayment> getPaymentById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                rentPaymentService.getPaymentById(id)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<RentPayment> updatePayment(
            @PathVariable Long id,
            @Valid @RequestBody RentPayment payment) {

        return ResponseEntity.ok(
                rentPaymentService.updatePayment(id, payment)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePayment(
            @PathVariable Long id) {

        rentPaymentService.deletePayment(id);

        return ResponseEntity.ok(
                "Payment deleted successfully"
        );
    }

    @GetMapping("/tenant/{tenantId}")
    public ResponseEntity<List<RentPayment>> getPaymentsByTenant(
            @PathVariable Long tenantId) {

        return ResponseEntity.ok(
                rentPaymentService.getPaymentsByTenant(tenantId)
        );
    }

    @GetMapping("/tenant/{tenantId}/pending")
    public ResponseEntity<List<RentPayment>> getPendingPayments(
            @PathVariable Long tenantId) {

        return ResponseEntity.ok(
                rentPaymentService.getPendingPayments(tenantId)
        );
    }

    @GetMapping("/tenant/{tenantId}/dues")
    public ResponseEntity<Double> getPendingDues(
            @PathVariable Long tenantId) {

        return ResponseEntity.ok(
                rentPaymentService.getPendingDues(tenantId)
        );
    }

    @GetMapping("/unpaid")
    public ResponseEntity<List<RentPayment>> getCurrentMonthUnpaid(
            @RequestParam String month) {

        return ResponseEntity.ok(
                rentPaymentService.getCurrentMonthUnpaid(month)
        );
    }
}