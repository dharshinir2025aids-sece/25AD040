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
    public ResponseEntity<?> addTenant(@Valid @RequestBody Tenant tenant) {
        try {
            return ResponseEntity.ok(tenantService.addTenant(tenant));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public List<Tenant> getAllTenants() {
        return tenantService.getAllTenants();
    }

    @GetMapping("/{id}")
    public Tenant getTenantById(@PathVariable Long id) {
        return tenantService.getTenantById(id);
    }

    @PutMapping("/{id}/vacate")
    public ResponseEntity<?> vacateTenant(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(tenantService.vacateTenant(id));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}