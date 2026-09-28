package com.renteasy.renteasy.repository;

import com.renteasy.renteasy.models.Tenant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TenantRepository extends JpaRepository<Tenant, Long> {
}