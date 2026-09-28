package com.renteasy.renteasy.controller;

import com.renteasy.renteasy.models.RentPayment;
import com.renteasy.renteasy.service.RentPaymentService;
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
}