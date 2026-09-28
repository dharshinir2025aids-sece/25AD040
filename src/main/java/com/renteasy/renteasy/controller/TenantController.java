package com.renteasy.renteasy.controller;

import com.renteasy.renteasy.models.Tenant;
import com.renteasy.renteasy.service.TenantService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tenants")
public class TenantController {

    private final TenantService tenantService;

    public TenantController(TenantService tenantService) {
        this.tenantService = tenantService;
    }

    @PostMapping
    public ResponseEntity<?> addTenant(
            @Valid @RequestBody Tenant tenant) {

        try {
            return ResponseEntity.ok(
                    tenantService.addTenant(tenant)
            );
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(e.getMessage());
        }
    }

    @GetMapping
    public List<Tenant> getAllTenants() {
        return tenantService.getAllTenants();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTenantById(
            @PathVariable Long id) {

        Tenant tenant = tenantService.getTenantById(id);

        if (tenant == null) {
            return ResponseEntity.badRequest()
                    .body("Tenant not found");
        }

        return ResponseEntity.ok(tenant);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTenant(
            @PathVariable Long id,
            @Valid @RequestBody Tenant tenant) {

        try {
            return ResponseEntity.ok(
                    tenantService.updateTenant(id, tenant)
            );
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(e.getMessage());
        }
    }

    @PutMapping("/{id}/vacate")
    public ResponseEntity<?> vacateTenant(
            @PathVariable Long id) {

        try {
            return ResponseEntity.ok(
                    tenantService.vacateTenant(id)
            );
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTenant(
            @PathVariable Long id) {

        try {
            tenantService.deleteTenant(id);

            return ResponseEntity.ok(
                    "Tenant deleted successfully"
            );

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(e.getMessage());
        }
    }
}