package com.renteasy.renteasy.controller;

import com.renteasy.renteasy.models.Tenant;
import com.renteasy.renteasy.service.TenantService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tenants")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175"
})
public class TenantController {

    private final TenantService tenantService;

    public TenantController(TenantService tenantService) {
        this.tenantService = tenantService;
    }

    @PostMapping
    public ResponseEntity<Tenant> addTenant(
            @Valid @RequestBody Tenant tenant) {

        return ResponseEntity.ok(
                tenantService.addTenant(tenant)
        );
    }

    @GetMapping
    public ResponseEntity<List<Tenant>> getAllTenants() {

        return ResponseEntity.ok(
                tenantService.getAllTenants()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tenant> getTenantById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                tenantService.getTenantById(id)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tenant> updateTenant(
            @PathVariable Long id,
            @Valid @RequestBody Tenant tenant) {

        return ResponseEntity.ok(
                tenantService.updateTenant(id, tenant)
        );
    }

    @PutMapping("/{id}/vacate")
    public ResponseEntity<String> vacateTenant(
            @PathVariable Long id) {

        tenantService.vacateTenant(id);

        return ResponseEntity.ok(
                "Tenant vacated and room is now available"
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTenant(
            @PathVariable Long id) {

        tenantService.deleteTenant(id);

        return ResponseEntity.ok(
                "Tenant deleted successfully"
        );
    }
}